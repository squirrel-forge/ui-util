### @squirrel-forge/ui-util
> [Back to table of contents](../README.md#table-of-contents)

# Documentation
### Javascript / DOM
> [Dev](Dev.md) <[ DOM ]> [Error](Error.md)

## Table of contents
 - [appendAfter()](#appendafter)
 - [appendHTML()](#appendhtml)
 - [attributeJSON()](#attributejson)
 - [getElementTagType()](#getelementtagtype)
 - [getPropertyValues()](#getpropertyvalues)
 - [prependChild()](#prependchild)
 - [uniqid()](#uniqid)
 - [requireUniqid()](#requireuniqid)
 - [unwrap()](#unwrap)
 - [wrap()](#wrap)

---

### appendAfter
appendAfter - Append node after a specific node

#### Description
```javascript
appendAfter( newNode, referenceNode ) // void
```
Appends a node after a specified node.

#### Parameters
| Parameter         | Type | Default | Description                            |
|-------------------|------|:-------:|----------------------------------------|
| **newNode**       | Node |    -    | The node to append                     |
| **referenceNode** | Node |    -    | The node after which we want to append |

#### Return Values
| Type/Value | Description |
|------------|-------------|
| **void**   | None.       |

#### Examples
```javascript
appendAfter( document.getElementById( 'move-me' ), document.getElementById( 'after-this' ) );
```

---

### appendHTML
appendHTML - Append HTML string as one or multiple elements

#### Description
```javascript
appendHTML( element, str ) // void
```
Append HTML string as one or multiple elements, uses [str2node()](String.md#str2node) to convert the string.

#### Parameters
| Parameter   | Type        | Default | Description          |
|-------------|-------------|:-------:|----------------------|
| **element** | HTMLElement |    -    | Element to append to |
| **str**     | String      |    -    | The html string      |

#### Return Values
| Type/Value | Description |
|------------|-------------|
| **void**   | Node.       |

#### Examples
```javascript
appendHTML( document.getElementById( 'target' ), '<section>...</section>' );
```

---

### attributeJSON
attributeJSON - Get json object from element data attribute

#### Description
```javascript
attributeJSON( name, element, silent = true ) // Object
```
Get json object from element data attribute, can optionally throw exceptions on error.

#### Parameters
| Parameter   | Type        | Default | Description                         |
|-------------|-------------|:-------:|-------------------------------------|
| **name**    | String      |    -    | Attribute name                      |
| **element** | HTMLElement |    -    | Element to read                     |
| **silent**  | Boolean     |   true  | False to throw error on parse Error |

#### Return Values
| Type/Value | Description                |
|------------|----------------------------|
| **null**   | Invalid or empty attribute |
| **Object** | Parsed json object data    |

#### Examples
```html
<div id="json-data" data-config='{"foo":1}'></div>
```
```javascript
attributeJSON( 'data-config', document.getElementById( 'json-data' ) ); // { foo : 1 }
```

---

### getElementTagType
getElementTagType - Get element tag type string

#### Description
```javascript
getElementTagType( element ) // string
```
Get element tag type string, compiled from tagName + type.

#### Parameters
| Parameter     | Type        | Default | Description                     |
|---------------|-------------|:-------:|---------------------------------|
| **element**   | HTMLElement |    -    | Element to get type string from |

#### Return Values
| Type/Value | Description     |
|------------|-----------------|
| **String** | Tag type string |

#### Examples
```javascript
getElementTagType( document.getElementById( 'input[type="hidden"]' ) ); // input-hidden
```

---

### getPropertyValues
getPropertyValues - Get custom property values from given context

#### Description
```javascript
getPropertyValues( values, context = null, assoc = true ) // string|Object|Array<string>
```
Get values from custom properties in given context, returns the actual computed value.

#### Parameters
| Parameter   | Type             |  Default   | Description                                             |
|-------------|------------------|:----------:|---------------------------------------------------------|
| **values**  | string/Array     |     -      | Property name/s excluding the double dash               |
| **context** | Body/HTMLElement | null/:root | Context to read values from, default: html/root element |
| **assoc**   | boolean          |    true    | Return associative object with property names           |

#### Return Values
| Type/Value        | Description                   |
|-------------------|-------------------------------|
| **String**        | Single property value         |
| **Object**        | Associative object with props |
| **Array<string>** | List of values                |

#### Examples
```css
:root {
   --prop-name: 10px; 
}
```
```javascript
getPropertyValues( 'prop-name' ); // '10px'
```

---

### prependChild
prependChild - Prepend node to node

#### Description
```javascript
prepend( newNode, referenceNode ) // void
```
Prepend node as child of node, newNode is inserted before the firstChild of referenceNode.

#### Parameters
| Parameter         | Type        | Default | Description           |
|-------------------|-------------|:-------:|-----------------------|
| **newNode**       | HTMLElement |    -    | Element to prepend    |
| **referenceNode** | HTMLElement |    -    | Element to prepend to |

#### Return Values
| Type/Value | Description |
|------------|-------------|
| **void**   | None.       |

#### Examples
```javascript
prepend( document.getElementById( 'node-to-insert' ), document.getElementById( 'node-to-prepend-to' ) );
```

---

### uniqid
uniqid - Unique html attribute id

#### Description
```javascript
uniqid( prefix = '', entropy = false ) // string
```
Get a unique html attribute id that is unused.

#### Parameters
| Parameter   | Type    | Default | Description                     |
|-------------|---------|:-------:|---------------------------------|
| **prefix**  | String  |   ''    | Prefix the id with given string |
| **entropy** | Boolean |  false  | Increase the id entropy         |

#### Return Values
| Type/Value | Description             |
|------------|-------------------------|
| **String** | Unique unused string id |

#### Examples
```javascript
uniqid( 'prefix-' ); // 'prefix-npnm623gm2'
```

---

### requireUniqid
requireUniqid - Require unique html attribute id

#### Description
```javascript
requireUniqid( element, prefix = '', entropy = false ) // string
```
Get a unique html attribute id that is unused.

#### Parameters
| Parameter   | Type        | Default | Description                       |
|-------------|-------------|:-------:|-----------------------------------|
| **element** | HTMLElement |    -    | Element that requires a unique id |
| **prefix**  | String      |   ''    | Prefix the id with given string   |
| **entropy** | Boolean     |  false  | Increase the id entropy           |

#### Return Values
| Type/Value | Description                          |
|------------|--------------------------------------|
| **String** | Unique string id set for the element |

#### Examples
```javascript
requireUniqid( document.querySelector( '.requires-id' ), 'prefix-' ); // 'prefix-npnm623gm2'
```

---

### unwrap
unwrap - Unwrap element

#### Description
```javascript
unwrap( element ) // void
```
Removes the given element and preserves any children.

#### Parameters
| Parameter   | Type        | Default | Description               |
|-------------|-------------|:-------:|---------------------------|
| **element** | HTMLElement |    -    | Element wrapper to remove |

#### Return Values
| Type/Value | Description |
|------------|-------------|
| **void**   | None.       |

#### Examples
```javascript
unwrap( document.getElementById( 'element-to-unwrap' ) ); // void
```

---

### wrap
wrap - Wrap element/s

#### Description
```javascript
unwrap( elements, wrapper = 'div', strict = true ) // HTMLElement
```
Wraps given element or elements with a given element

#### Parameters
| Parameter    | Type                 | Default | Description                                 |
|--------------|----------------------|:-------:|---------------------------------------------|
| **elements** | HTMLElement/NodeList |    -    | Element/s to wrap                           |
| **wrapper**  | HTMLElement/String   |  'div'  | Element to wrap around elements             |
| **strict**   | Boolean              |  true   | Throw error if wrapper is already connected |

#### Return Values
| Type/Value      | Description                   |
|-----------------|-------------------------------|
| **HTMLElement** | The wrapper element reference |

#### Examples
```javascript
wrap( document.querySelectorAll( '.selector' ) ); // HTMLDivElement
```

---

> [Dev](Dev.md) <[ DOM ]> [Error](Error.md)
