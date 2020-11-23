import RNLevelDown from 'react-native-leveldown'
import LevelUp, { LevelUp as ILevelUp } from 'levelup'
import { AbstractIterator, AbstractIteratorOptions } from 'abstract-leveldown'
import pDoWhilst from 'p-do-whilst'

export class Storage<T> {

  private _db: ILevelUp<RNLevelDown, AbstractIterator<string, T>>
  private _buffer: boolean

  /**
   * The level storage instance. Key must be `string` and value can either be `string` or `buffer`.
   *
   * Default: `string`.
   * @param name The name of the storage
   * @param buffer Make values as buffer, instead of string
   */
  constructor(
    name: string,
    buffer: boolean = false) {

    if (!name) {
      throw new Error('Storage name is required')
    }

    this._buffer = buffer
    this._db = LevelUp(new RNLevelDown(name))
  }

  /**
   * Returns the number of items in the storage.
   */
  get length(): Promise<number> {
    return new Promise((resolve, reject) => {
      let count = 0
      this.forEach(() => {
        count++
      }).then(() => resolve(count)).catch(reject)
    })
  }

  /**
   * Removes all items in storage.
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
   * Create new instance of storage with string type values.
   * @param name The name of storage
   */
  public create(
    name: string):
    Storage<string>

  /**
   * Create new instance of storage with Buffer type values.
   * @param name The name of storage
   * @param buffer Set `true` to make values as buffer
   */
  public create(
    name: string,
    buffer: true):
    Storage<Buffer>

  public create(
    name: string,
    buffer = false):
    Storage<string> | Storage<Buffer> {

    return buffer ? new Storage<Buffer>(name, true) : new Storage<string>(name)
  }

  /**
   * Iterates over items, returning new array of all items predicate returns truthy for.
   *
   * Type `T` is either `string` or `buffer`.
   * @param condition The function to invoke per iteration
   * @param options The options object
   * - `gt` (greater than), `gte` (greater than or equal) define the lower bound of the range to be iterated.
   * - `lt` (less than), `lte` (less than or equal) define the higher bound of the range to be iterated.
   * - `reverse` (boolean, default: false): iterate entries in reverse order.
   * - `limit` (number, default: -1): limit the number of entries collected by this iterator.
   */
  public async filter(
    condition: (value: T, key: string) => boolean,
    options?: AbstractIteratorOptions<any>):
    Promise<T[]> {

    const result = await this._filter(condition, options)
    return result.map(res => res[1])
  }

  /**
   * Iterates over items.
   * @param iteratee The function to invoke per iteration
   * @param options The same options with `filter`
   */
  public async forEach(
    iteratee: (value: T, key: string) => false | void,
    options?: AbstractIteratorOptions<any>):
    Promise<void> {

    return this._each(iteratee, options)
  }

  /**
   * Get the value. Either `string` or `buffer` depending on what you specified.
   * @param key Name of the item
   */
  public async getItem(
    key: string):
    Promise<T | null> {

    try {
      if (typeof key !== 'string') {
        throw new Error('Key must be string')
      }
      return await this._db.get(key, { asBuffer: this._buffer })
    } catch (error) {
      if (error.type !== 'NotFoundError') {
        throw error
      }
    }
    return null
  }

  /**
   * Returns an array of all keys.
   */
  public async keys():
    Promise<string[]> {

    const result = await this._filter()
    return result.map(res => res[0])
  }

  /**
   * Remove the item in storage
   * @param key Name of the item
   */
  public async removeItem(
    key: string):
    Promise<void> {

    if (typeof key !== 'string') {
      throw new Error('Key must be string')
    }
    return this._db.del(key)
  }

  /**
   * Store a value
   * @param key Name of the item
   * @param value Value to store
   */
  public async setItem(
    key: string,
    value: T):
    Promise<void> {

    if (typeof key !== 'string' || typeof value !== 'string') {
      throw new Error('Key and value must be string')
    }
    return this._db.put(key, value)
  }

  /**
   * Returns an array of all values.
   */
  public async values():
    Promise<T[]> {

    const result = await this._filter()
    return result.map(res => res[1])
  }

  private async _filter(
    filter?: (value: T, key: string) => boolean,
    options?: AbstractIteratorOptions<any>):
    Promise<[string, T][]> {

    options = options || {}
    options.keyAsBuffer = false
    options.valueAsBuffer = this._buffer
    const iter = this._db.iterator(options)
    const items: [string, T][] = []
    let error: Error | undefined
    try {
      await pDoWhilst(
        () => this._next(iter),
        (result: [string, T] | undefined) => {
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
    iteratee: (value: T, key: string) => false | void,
    options?: AbstractIteratorOptions<any>):
    Promise<void> {

    options = options || {}
    options.keyAsBuffer = false
    options.valueAsBuffer = this._buffer
    const iter = this._db.iterator(options)
    let error: Error | undefined
    try {
      await pDoWhilst(
        () => this._next(iter),
        (result: [string, T] | undefined) => {
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
    Promise<[string, T] | undefined> {

    return new Promise((resolve, reject) => {
      iter.next((err: Error, key: string, value: T) => {
        if (err) return reject(err)
        resolve(key ? [key, value] : undefined)
      })
    })
  }

}

export default new Storage<string>('__DEFAULT__')
