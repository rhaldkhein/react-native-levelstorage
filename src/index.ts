import RNLevelDown from 'react-native-leveldown'
import LevelUp, { LevelUp as ILevelUp } from 'levelup'
import { AbstractIterator, AbstractIteratorOptions } from 'abstract-leveldown'
import pDoWhilst from 'p-do-whilst'

class Storage {
  private _db: ILevelUp<RNLevelDown, AbstractIterator<any, any>>

  constructor(name: string) {
    this._db = LevelUp(new RNLevelDown(name))
  }

  get length(): Promise<number> {
    return new Promise((resolve, reject) => {
      let count = 0
      this.forEach(() => {
        count++
      }).then(() => resolve(count)).catch(reject)
    })
  }

  /**
   * Clears the storage.
   */
  public async clear():
    Promise<void> {

    // #FIX: getting error in dependency package
    // return this._db.clear(err => {
    //   console.log('cleared', err)
    // })

    // #WARNING: workaround
    const keys = await this.keys()
    await Promise.all(keys.map(key => this._db.del(key)))
  }

  /**
   * Create new instance of storage.
   * @param name
   */
  public create(
    name: string):
    Storage {

    return new Storage(name)
  }

  /**
   * Iterates over elements of collection, returning an array of all elements predicate returns truthy for.
   * @param condition function to invoke per iteration
   * @param options
   */
  public async filter(
    condition: (value: string, key: string) => boolean,
    options?: AbstractIteratorOptions<any>):
    Promise<string[]> {

    const result = await this._filter(condition, options)
    return result.map(res => res[1])
  }

  public async forEach(
    iteratee: (value: string, key: string) => false | void,
    options?: AbstractIteratorOptions<any>):
    Promise<void> {

    return this._each(iteratee, options)
  }

  public async getItem(
    key: string):
    Promise<string | null> {

    try {
      if (typeof key !== 'string') {
        throw new Error('Key must be string')
      }
      return await this._db.get(key, { asBuffer: false })
    } catch (error) {
      if (error.type !== 'NotFoundError') {
        throw error
      }
    }
    return null
  }

  public async keys():
    Promise<string[]> {

    const result = await this._filter()
    return result.map(res => res[0])
  }

  public async removeItem(
    key: string):
    Promise<void> {

    if (typeof key !== 'string') {
      throw new Error('Key must be string')
    }
    return this._db.del(key)
  }

  public async setItem(
    key: string,
    value: string):
    Promise<void> {

    if (typeof key !== 'string' || typeof value !== 'string') {
      throw new Error('Key and value must be string')
    }
    return this._db.put(key, value)
  }

  public async values():
    Promise<string[]> {

    const result = await this._filter()
    return result.map(res => res[1])
  }

  private async _filter(
    filter?: (value: string, key: string) => boolean,
    options?: AbstractIteratorOptions<any>):
    Promise<[string, string][]> {

    options = options || {}
    options.keyAsBuffer = false
    options.valueAsBuffer = false
    const iter = this._db.iterator(options)
    const items: [string, string][] = []
    let error: Error | undefined
    try {
      await pDoWhilst(
        () => this._next(iter),
        (result: [string, string] | undefined) => {
          if (result === undefined) return false
          if (!filter || filter(result[1], result[0])) {
            items.push(result)
          }
          return true
        }
      )
    } catch (err) {
      error = err
    }
    await new Promise((resolve, reject) => {
      iter.end((err) => {
        if (err || error) reject(err || error)
        else resolve()
      })
    })
    return items
  }

  private async _each(
    iteratee: (value: string, key: string) => false | void,
    options?: AbstractIteratorOptions<any>):
    Promise<void> {

    options = options || {}
    options.keyAsBuffer = false
    options.valueAsBuffer = false
    const iter = this._db.iterator(options)
    let error: Error | undefined
    try {
      await pDoWhilst(
        () => this._next(iter),
        (result: [string, string] | undefined) => {
          if (
            result === undefined ||
            iteratee(result[1], result[0]) === false
          ) return false
          return true
        }
      )
    } catch (err) {
      error = err
    }
    await new Promise((resolve, reject) => {
      iter.end((err) => {
        if (err || error) reject(err || error)
        else resolve()
      })
    })
  }

  private async _next(
    iter: any):
    Promise<[string, string] | undefined> {

    return new Promise((resolve, reject) => {
      iter.next((err: Error, key: string, value: string) => {
        if (err) return reject(err)
        resolve(key ? [key, value] : undefined)
      })
    })
  }

}

export default new Storage('__DEFAULT__')
