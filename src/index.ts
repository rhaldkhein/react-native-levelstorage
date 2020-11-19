import RNLevelDown from 'react-native-leveldown'
import LevelUp, { LevelUp as ILevelUp } from 'levelup'
import { AbstractIterator } from 'abstract-leveldown'
import { Buffer } from 'buffer'

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
    value: string | Buffer,
    callback?: (err: Error) => void):
    Promise<void> {

    if (!Buffer.isBuffer(value) && typeof value !== 'string') {
      throw new Error('Value must be string or buffer')
    }
    return this._db.put(key, value, callback)
  }

  async getItem(
    key: string,
    callback?: (err: Error | null, value: Buffer | null) => void):
    Promise<string | null>

  async getItem(
    key: string,
    buffer: boolean,
    callback?: (err: Error | null, value: Buffer | null) => void):
    Promise<string | Buffer | null>

  async getItem(
    key: string,
    buffer?: boolean | ((err: Error | null, value: Buffer | null) => void),
    callback?: (err: Error | null, value: Buffer | null) => void):
    Promise<string | Buffer | null> {
    if (!callback && typeof buffer === 'function') {
      callback = buffer
      buffer = false
    }
    if (buffer === undefined) {
      buffer = false
    }
    try {
      const value = await this._db.get(key, { asBuffer: (buffer as boolean) })
      if (callback) callback(null, value)
      return value
    } catch (error) {
      if (error.type === 'NotFoundError') {
        if (callback) callback(null, null)
      } else {
        if (callback) callback(error, null)
        else throw error
      }
    }
    return null
  }

  async removeItem(
    key: string,
    callback?: (err: Error) => void):
    Promise<void> {

    return this._db.del(key, callback)
  }

  private async _open() { }

  private async _close() { }

}

export default new Storage('__DEFAULT__')
