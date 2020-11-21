import RNLevelDown from 'react-native-leveldown'
import LevelUp, { LevelUp as ILevelUp } from 'levelup'
import { AbstractIterator } from 'abstract-leveldown'

class Storage {
  private _db: ILevelUp<RNLevelDown, AbstractIterator<any, any>>

  constructor(name: string) {
    this._db = LevelUp(new RNLevelDown(name))
  }

  create(
    name: string):
    Storage {

    return new Storage(name)
  }

  async setItem(
    key: string,
    value: string,
    callback?: (err?: Error) => void):
    Promise<void> {

    try {
      if (typeof key !== 'string' || typeof value !== 'string') {
        throw new Error('Key and value must be string')
      }
      await this._db.put(key, value)
      if (callback) callback()
    } catch (error) {
      if (callback) callback(error)
      else throw error
    }
  }

  async getItem(
    key: string,
    callback?: (err?: Error, value?: string | null) => void):
    Promise<string | null> {

    try {
      if (typeof key !== 'string') {
        throw new Error('Key must be string')
      }
      const value = await this._db.get(key, { asBuffer: false })
      if (callback) callback(undefined, value)
      return value
    } catch (error) {
      if (error.type === 'NotFoundError') {
        if (callback) callback(undefined, null)
      } else {
        if (callback) callback(error, null)
        else throw error
      }
    }
    return null
  }

  async removeItem(
    key: string,
    callback?: (err?: Error) => void):
    Promise<void> {

    try {
      await this._db.del(key)
      if (callback) callback()
    } catch (error) {
      if (callback) callback(error)
      else throw error
    }
  }

  private async _open() { }

  private async _close() { }

}

export default new Storage('__DEFAULT__')
