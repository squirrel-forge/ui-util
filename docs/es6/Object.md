### @squirrel-forge/ui-util
> [Back to table of contents](../README.md)

# Documentation
### Javascript / Object

## Table of contents
 - [cloneObject()](#cloneObject)
 - [isPojo()](#isPojo)
 - [mergeObject()](#mergeObject)
 - [strAccess()](#strAccess)
 - [strCreate()](#strCreate)

---

### cloneObject
cloneObject - Clone object

#### Description
```javascript
cloneObject( source, recursive ) // Object
```
Clone an object with all properties and values, optionally clone all nested objects recursivly. 

#### Parameters
| Parameter     | Type    | Default | Description                       |
|---------------|---------|:-------:|-----------------------------------|
| **source**    | Object  |    -    | Object to clone                   |
| **recursive** | Boolean |  false  | Clone recursivly when set to true |

#### Return Values
| Type/Value | Description            |
|------------|------------------------|
| **Object** | Cloned object instance |

#### Examples
```javascript
const test = { foo : { foo : 1 } };
const clone = cloneObject( test, true );
// test !== clone = true
```

---

### isPojo
isPojo - Check for a plain object

#### Description
```javascript
isPojo( obj ) // boolean
```
Checks whether an object is a plan object or an instance of a class.

#### Parameters
| Parameter | Type   | Default | Description    |
|-----------|--------|:-------:|----------------|
| **obj**   | Object |    -    | Object to test |

#### Return Values
| Type/Value  | Description                 |
|-------------|-----------------------------|
| **Boolean** | True if the object is plain |

#### Examples
```javascript
isPojo( { foo : 1 } ); // true
isPojo( new Date() ); // false
```

---

### mergeObject
mergeObject - Merge one object into another

#### Description
```javascript
mergeObject( target, changes, extend = false, recursive = false, clone_array = false, no_array_merge = true ) // Object
```
Merges one object into another, provides extension, recursion, array cloning and merging abilities.
The function contains no reference recursion checks, so be mindful of what you merge.

#### Parameters
| Parameter          | Type    | Default | Description                                                                            |
|--------------------|---------|:-------:|----------------------------------------------------------------------------------------|
| **target**         | Object  |    -    | Object to merge into                                                                   |
| **changes**        | Object  |    -    | Object containing the data to merge                                                    |
| **extend**         | Boolean |  false  | Whether to add new properties to the target object or to omit them                     |
| **recursive**      | Boolean |  false  | Deep merge all properties on matching types, overwrites type changes when using extend |
| **clone_array**    | Boolean |  false  | Whether to clone array values or keep the references                                   |
| **no_array_merge** | Boolean |  false  | Whether to replace arrays or merge the given values                                    | 

#### Return Values
| Type/Value | Description                        |
|------------|------------------------------------|
| **Object** | The target object with merged data |

#### Examples
```javascript
const config = {
    debug : false,
    option1 : 1,
    option2 : { value : 2 },
};
mergeObject( config, {
    debug : true,
    option1 : 2,
    option2 : { label : 'text' },
}, true, true );
console.log( config );
/*
{
    debug : true,
    option1 : 2,
    option2 : { value : 2, label : 'text' },
}
*/
```

---

### strAccess
strAccess - Access object value structure with a dot string

#### Description
```javascript
strAccess( strpath, subject, exact = true, debug = null ) // *
```
Get a value or nested value from an object structure using a dot string notation. 

#### Parameters
| Parameter   | Type    | Default | Description                               |
|-------------|---------|:-------:|-------------------------------------------|
| **strpath** | String  |    -    | Dot string path to the requested property |
| **subject** | Object  |    -    | Object to traverse                        |
| **exact**   | Boolean |   true  | Return null if the value does not exist   |
| **debug**   | console |   null  | Console or alike object to show debugging |

#### Return Values
| Type/Value | Description                             |
|------------|-----------------------------------------|
| **null**   | Values is null or does not exist        |
| **any**    | The value corresponding to the dot path |

#### Examples
```javascript
const subject = { foo : { action : { label : 'text' } } };
strAccess( 'foo.action.label' ); // 'text'
strAccess( 'foo.action.icon' ); // null
strAccess( 'foo.action' ); // { label : 'text' }
```

---

### strCreate
strCreate - Create or set a nested object value with a dot string

#### Description
```javascript
strCreate( strpath, value, target, replace = false, any = false, debug = null ) // Object
```
Create or set a value inside an object structure using a dot string and a value.

#### Parameters
| Parameter   | Type    | Default | Description                                 |
|-------------|---------|:-------:|---------------------------------------------|
| **strpath** | String  |    -    | Path to create or set                       |
| **value**   | *       |    -    | The value to set                            |
| **target**  | Object  |    -    | The target object                           |
| **replace** | Boolean |  false  | Always replace existing values              |
| **any**     | Boolean |  false  | Access properties across any type of object |
| **debug**   | console |  null   | Console or alike object to show debugging   |

#### Return Values
| Type/Value | Description           |
|------------|-----------------------|
| **Object** | Returns target object |

#### Examples
```javascript
const base = { foo : { label : 'text' } };
strCreate( 'foo.link', '#anchor', base );
console.log( base );
// { foo : { label : 'text', link : '#anchor' } }
```
