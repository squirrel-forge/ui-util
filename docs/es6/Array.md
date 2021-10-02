### @squirrel-forge/util Documentation

> [Back to Readme](../../README.md)

# Javascript / Array

## Table of contents

 - [inArray()](#inArray)
 - [mergeArray()](#mergeArray)

---

### inArray

inArray - Check if a value exists inside an array

#### Description

```javascript
inArray( needle, haystack, strict = true, silent = true ) : boolean
```

Check if a value exists inside an array in strict or none strict, can throw exceptions.

#### Parameters
Parameter    | Type    | Default | Description
------------ | ------- |:-------:| ---
**needle**   | *       |    -    | Value to find
**haystack** | Array   |    -    | Array to search
**strict**   | Boolean |   true  | Use strict matching
**silent**   | Boolean |   true  | Do not throw exception

#### Return Values
Type/Value | Description
---------- | ---

#### Exceptions

##### InArrayException

 1. **Error iterating array values**
    > Is thrown if an error occurs during comparison.

#### Examples

```javascript
isArray( 1, [ 1, 2, 3 ] ) // true
isArray( '1', [ 1, 2, 3 ] ) // false
```

---

### mergeArray

mergeArray - Merge two or more arrays together

#### Description

```javascript
mergeArray( [unique[,clone[,strict]],] array1, array2 [,array[,...]] ) : Array
```

Merges two or more arrays and returns a new array.

#### Parameters
Parameter    | Type    | Default | Description
------------ | ------- |:-------:| ---
**unique**   | Boolean |   true  | Keep only unique values
**clone**    | Boolean |  false  | Clone values
**strict**   | Boolean |   true  | Strict comparison
**array1**   | Array   |    -    | Array to merge
**array...** | Array   |    -    | Array to merge

#### Return Values
Type/Value | Description
---------- | ---
**Array**  | A new array with the merged values

#### Examples

```javascript
mergeArray([1],[2],[3]) // [1,2,3] 
```
