### @squirrel-forge/ui-util
> [Back to table of contents](../README.md#table-of-contents)

# Documentation
### Javascript / Var
> [String](String.md) <[ Var ]> [Table of contents](../README.md#table-of-contents)

## Table of contents
 - [cast2type()](#cast2type)
 - [isEmpty()](#isEmpty)

---

### cast2type
cast2type - Cast any type to any other type or return null

#### Description
```javascript
cast2type( value, type, noTypeConversion = true, customSplitter = null, customStrFalseValues = null ) // *
```
Cast values from one type to another.

#### Parameters
| Parameter                 | Type    |        Default         | Description                                       |
|---------------------------|---------|:----------------------:|---------------------------------------------------|
| **value**                 | *       |           -            | Value to convert                                  |
| **type**                  | String  |           -            | Type to convert to                                |
| **noTypeConversion**      | Boolean |          true          | Do not convert across types (Array,Object,String) |
| **customSplitter**        | String  |          ','           | Splitter string                                   |
|  **customStrFalseValues** | Array   | ['0','false','off',''] | String values that evaluate to false              |

#### Return Values
| Type/Value | Description                 |
|------------|-----------------------------|
| **null**   | Empty or invalid conversion |
| **any**    | Converted value             |

#### Examples
```javascript
cast2type('true','boolean'); // true
```

---

### isEmpty
isEmpty - Check if a value is empty

#### Description
```javascript
isEmpty( value ) // boolean
```
Will check if a value is empty, the value can be a string or object, any other type is never empty.

#### Parameters
| Parameter | Type | Default | Description    |
|-----------|------|:-------:|----------------|
| **value** | *    |    -    | Value to check |

#### Return Values
| Type/Value  | Description                         |
|-------------|-------------------------------------|
| **boolean** | True if the supplied value is empty |

#### Examples
```javascript
isEmpty( {} ); // true
isEmpty( '' ); // true
isEmpty( [] ); // true
isEmpty( null ); // true
isEmpty( 0 ); // true
isEmpty( false ); // true
isEmpty(); // true
```

---

> [String](String.md) <[ Var ]> [Table of contents](../README.md#table-of-contents)
