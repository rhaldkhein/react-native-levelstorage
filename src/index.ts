import RNLeveldown from 'react-native-leveldown'
import LevelUp, { LevelUp as ILevelUp } from 'levelup'
import { AbstractIterator } from 'abstract-leveldown'

class Storage {
  private _db: ILevelUp<RNLeveldown, AbstractIterator<any, any>>

  static create(
    name: string):
    Storage {

    return new Storage(name)
  }

  constructor(name: string) {
    this._db = LevelUp(new RNLeveldown(name))
  }

  async setItem<TKey, TVal>(
    key: TKey,
    value: TVal,
    callback?: (err: Error) => void):
    Promise<void> {

    return this._db.put(key, value, callback)
  }

  async getItem<TKey, TVal>(
    key: TKey,
    callback?: (err: Error | null, value: TVal | null) => void):
    Promise<TVal | null> {

    try {
      return await this._db.get(key)
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

  async removeItem<TKey>(
    key: TKey,
    callback?: (err: Error) => void):
    Promise<void> {

    return this._db.put(key, callback)
  }
}

export default Storage.create('__DEFAULT__')
