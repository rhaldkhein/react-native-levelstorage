# react-native-levelstorage

Fast and simple key-value pair storage for React Native using LevelDB native binding.  This package wraps [react-native-leveldown](https://github.com/andymatuschak/react-native-leveldown) and [levelup](https://github.com/Level/levelup) and provides LocalStorage like API.

Big thanks to them for creating LevelDB native bindings for both Android and iOS. 

### Features

- Multiple storage instances
- Store buffer value
- No size limit
- Fast native bindings

### Requirements

- react: 16.8+
- react-native: 0.60+

### Install

```sh
npm install react-native-levelstorage
```

### Usage

```js
const storage = require('react-native-levelstorage')
await storage.setItem('hello', 'world')
await storage.getItem('hello') // -> "world"
```

### API

Go to [API Documentation](https://rhaldkhein.github.io/react-native-levelstorage/)

### License

MIT