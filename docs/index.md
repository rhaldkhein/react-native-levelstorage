# Class: Storage\<T>

Fast and simple key-value pair storage for React Native using LevelDB native binding.

### Constructors

* [constructor](index.md#constructor)

### Accessors

* [length](index.md#length)

### Methods

* [clear](index.md#clear)
* [create](index.md#create)
* [filter](index.md#filter)
* [forEach](index.md#foreach)
* [getItem](index.md#getitem)
* [keys](index.md#keys)
* [removeItem](index.md#removeitem)
* [setItem](index.md#setitem)
* [values](index.md#values)

## Constructors

### constructor

\+ **new Storage**(`name`: string, `buffer?`: boolean): [Storage](index.md)

The level storage instance. Key must be `string` and value can either be `string` or `buffer`.

Default: `string`.

#### Parameters:

Name | Type | Default value | Description |
------ | ------ | ------ | ------ |
`name` | string | - | The name of the storage |
`buffer` | boolean | false | Make values as buffer, instead of string  |

**Returns:** [Storage](index.md)

## Accessors

### length

• get **length**(): Promise\<number>

Returns the number of items in the storage.

**Returns:** Promise\<number>

## Methods

### clear

▸ **clear**(): Promise\<void>

Removes all items in storage.

**Returns:** Promise\<void>

___

### create

▸ **create**(`name`: string): [Storage](index.md)\<string>

Create new instance of storage with string type values.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`name` | string | The name of storage  |

**Returns:** [Storage](index.md)\<string>

▸ **create**(`name`: string, `buffer`: true): [Storage](index.md)\<Buffer>

Create new instance of storage with Buffer type values.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`name` | string | The name of storage |
`buffer` | true | Set `true` to make values as buffer  |

**Returns:** [Storage](index.md)\<Buffer>

___

### filter

▸ **filter**(`condition`: (value: T, key: string) => boolean, `options?`: AbstractIteratorOptions\<any>): Promise\<T[]>

Iterates over items, returning new array of all items predicate returns truthy for.

Type `T` is either `string` or `buffer`.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`condition` | (value: T, key: string) => boolean | The function to invoke per iteration |
`options?` | AbstractIteratorOptions\<any> | The options object - `gt` (greater than), `gte` (greater than or equal) define the lower bound of the range to be iterated. - `lt` (less than), `lte` (less than or equal) define the higher bound of the range to be iterated. - `reverse` (boolean, default: false): iterate entries in reverse order. - `limit` (number, default: -1): limit the number of entries collected by this iterator.  |

**Returns:** Promise\<T[]>

___

### forEach

▸ **forEach**(`iteratee`: (value: T, key: string) => false \| void, `options?`: AbstractIteratorOptions\<any>): Promise\<void>

Iterates over items.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`iteratee` | (value: T, key: string) => false \| void | The function to invoke per iteration |
`options?` | AbstractIteratorOptions\<any> | The same options with `filter`  |

**Returns:** Promise\<void>

___

### getItem

▸ **getItem**(`key`: string): Promise\<T \| null>

Get the value. Either `string` or `buffer` depending on what you specified.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`key` | string | Name of the item  |

**Returns:** Promise\<T \| null>

___

### keys

▸ **keys**(): Promise\<string[]>

Returns an array of all keys.

**Returns:** Promise\<string[]>

___

### removeItem

▸ **removeItem**(`key`: string): Promise\<void>

Remove the item in storage

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`key` | string | Name of the item  |

**Returns:** Promise\<void>

___

### setItem

▸ **setItem**(`key`: string, `value`: T): Promise\<void>

Store a value

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`key` | string | Name of the item |
`value` | T | Value to store  |

**Returns:** Promise\<void>

___

### values

▸ **values**(): Promise\<T[]>

Returns an array of all values.

**Returns:** Promise\<T[]>
