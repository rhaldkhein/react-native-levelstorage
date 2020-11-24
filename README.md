# react-native-levelstorage

Fast and simple key-value pair storage for React Native using LevelDB native binding.

This package wraps [react-native-leveldown](https://github.com/andymatuschak/react-native-leveldown) and [levelup](https://github.com/Level/levelup) and provides LocalStorage-like API. Big thanks to them for creating LevelDB native bindings for both Android and iOS. 

### Features

- Multiple storage instances
- Store buffer value
- No size limit
- Fast native bindings

### Requirements

- react-native: 0.60+
- react-native-leveldown: 1.0.0+

### Install

```sh
npm install react-native-levelstorage react-native-leveldown
```

### Usage

Basic:
```js
import storage from 'react-native-levelstorage'
await storage.setItem('hello', 'world')
await storage.getItem('hello') // -> "world"
await storage.removeItem('hello')
await storage.clear()
```

Loop & Filter:
```js
await storage.forEach((value, key) => {
  // do something with value and key
})
const result = await storage.filter((value, key) => {
  return value.indexOf('foo') > -1
})
// result is array of values that contains `foo`
```

Multi Storage:
```js
const users = await storage.create('users')
const jd = { id: 123, name: 'John Doe', age: 120 }
await users.setItem('123', JSON.stringify(jd))

// New storage for posts
const posts = await storage.create('posts')

// Buffer storage for images (pass `true`)
const images = await storage.create('images', true)
images.setItem('123', Buffer.from([0, 0, 0]))
images.getItem('123') // -> Buffer
```

### API

Go to [API Documentation](https://rhaldkhein.github.io/react-native-levelstorage/)

### License

MIT