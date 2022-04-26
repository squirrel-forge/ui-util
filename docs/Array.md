### @squirrel-forge/ui-util
> [Back to table of contents](../README.md#table-of-contents)

# Documentation
### Javascript / Array
> [Animation](Animation.md) <[ Array ]> [Dev](Dev.md)

## Table of contents
 - [mergeArray()](#mergeArray)

---

### mergeArray
mergeArray - Merge two or more arrays together

#### Description
```javascript
mergeArray( unique, clone, array1, arrayN ) // Array
```
Merges two or more arrays and returns a new array.

#### Parameters
| Parameter  | Type    | Default | Description             |
|------------|---------|:-------:|-------------------------|
| **unique** | Boolean |  true   | Keep only unique values |
| **clone**  | Boolean |  false  | Clone values            |
| **array1** | Array   |    -    | Array to merge          |
| **arrayN** | Array   |    -    | Array to merge          |

#### Return Values
| Type/Value | Description                        |
|------------|------------------------------------|
| **Array**  | A new array with the merged values |

#### Examples
```javascript
mergeArray([1],[2],[3]); // [1,2,3] 
```

---

> [Animation](Animation.md) <[ Array ]> [Dev](Dev.md)
