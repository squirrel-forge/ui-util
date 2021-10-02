### @squirrel-forge/util Documentation

> [Back to Readme](../../README.md)

# Javascript / DOM

## Table of contents

 - [appendAfter()](#appendAfter)
 - [appendHTML()](#appendHTML)
 - [attributeJSON()](#attributeJSON)
 - [escapeHTML()](#escapeHTML)
 - [getVisibility()](#getVisibility)
 - [prepend()](#prepend)
 - [setTabIndex()](#setTabIndex)
 - [uniqid()](#uniqid)
 - [wrapTextByLines()](#wrapTextByLines)

---

### appendAfter

appendAfter - Append node after a specific node

#### Description

```javascript
appendAfter( newNode, referenceNode ) : void
```

Appends a node after a specified node.

#### Parameters
Parameter         | Type | Default | Description
----------------- | ---- |:-------:| ---
**newNode**       | Node |    -    | The node to append
**referenceNode** | Node |    -    | The node after which we want to append

#### Return Values
Type/Value | Description
---------- | ---
**void**   | None.

#### Examples

```javascript
appendAfter( document.getElementById( 'move-me' ), document.getElementById( 'after-this' ) )
```

---

### appendHTML

appendHTML - Append HTML string as one or multiple elements

#### Description

```javascript
appendHTML( element, str ) : void
```

Append HTML string as one or multiple elements, uses [str2node()](../String.md#str2node) to convert the string.

#### Parameters
Parameter   | Type        | Default | Description
----------- | ----------- |:-------:| ---
**element** | HTMLElement |    -    | Element to append to
**str**     | String      |    -    | The html string

#### Return Values
Type/Value | Description
---------- | ---
**void**   | Node.

#### Examples

```javascript
appendHTML( document.getElementById( 'target' ), '<section>...</section' )
```

---

### attributeJSON

attributeJSON - Get json object from element data attribute

#### Description

```javascript
attributeJSON( name, element, silent = true ) : Object
```

Get json object from element data attribute, can optionally throw exceptions on error.

#### Parameters
Parameter   | Type        | Default | Description
----------- | ----------- |:-------:| ---
**name**    | String      |    -    | Attribute name, excluding the 'data-' prefix
**element** | HTMLElement |    -    | Element to read
**silent**  | Boolean     |   true  | Set to false to throw an exception on error

#### Return Values
Type/Value | Description
---------- | ---
**null**   | Invalid or empty attribute
**Object** | Parsed json object data

#### Examples

```html
<div id="json-data" data-config='{"foo":1}'></div>
```
```javascript
attributeJSON( 'config', document.getElementById( 'json-data' ) ) // { foo : 1 }
```

---

### escapeHTML

escapeHTML - Escape html special chars

#### Description

```javascript
escapeHTML( text ) : string
```

Escape html special chars, only: &><"'

#### Parameters
Parameter | Type   | Default | Description
--------- | ------ |:-------:| ---
**text**  | String |    -    | String to escape

#### Return Values
Type/Value | Description
---------- | ---
**String** | Escaped string

#### Examples

```javascript
escapeHTML( 'foo > 1' ) // 'foo &gt; 1'
```

---

### getVisibility

getVisibility - Get element vertical visibility

#### Description

```javascript
getVisibility( elem, container = null ) : Object
```

Get element vertical visibility, considering scroll position, supplies relative and absolute values.

#### Parameters
Parameter     | Type        | Default         | Description
------------- | ----------- |:---------------:| ---
**elem**      | HTMLElement |        -        | Element to get visibility data for
**container** | HTMLElement | documentElement | Relative container

#### Return Values
Type/Value | Description
---------- | ---
**Object** | Visibility object { elem : Number %, view : Number %, height : Number pixels }

#### Examples

```javascript
getVisibility( document.getElementById( 'section' ) ) // { elem : 27.4578567, view : 42.5678, height : 347 }
```

---

### prepend

prepend - Prepend node to node

#### Description

```javascript
prepend( newNode, referenceNode ) : void
```

Prepend node to node, node is inserted before the firstChild.

#### Parameters
Parameter         | Type        | Default | Description
----------------- | ----------- |:-------:| ---
**newNode**       | HTMLElement |    -    | Element to prepend
**referenceNode** | HTMLElement |    -    | Element to prepend to

#### Return Values
Type/Value | Description
---------- | ---
**void**   | None.

#### Examples

```javascript
prepend( document.getElementById( 'node-to-insert' ), document.getElementById( 'node-to-prepend-to' ) )
```

---

### setTabIndex

setTabIndex - Set tabindex for query or collection

#### Description

```javascript
setTabIndex( source, value, auto_increment = null ) : void
```

Set tabindex for query or collection.

#### Parameters
Parameter          | Type            | Default | Description
------------------ | --------------- |:-------:| ---
**source**         | String NodeList |    -    | Query or items to process
**value**          | String Number   |    -    | Set as tabindex, ignored when using auto_increment
**auto_increment** | Number          |   null  | Set as number to start auto increment

#### Return Values
Type/Value | Description
---------- | ---
**void**   | None.

#### Examples

```javascript
setTabIndex( 'a', 0 )
setTabIndex( 'a', 0, 10 )
setTabIndex( 'a', null )
```

---

### uniqid

uniqid - Unique html attribute id

#### Description

```javascript
uniqid( prefix = '' ) : string
```

Get a unique html attribute id that is unused.

#### Parameters
Parameter  | Type   | Default | Description
---------- | ------ |:-------:| ---
**prefix** | String |    ''   | Prefix the id with given string

#### Return Values
Type/Value | Description
---------- | ---
**String** | Unique unused string id

#### Examples

```javascript
uniqid( 'prefix-' ) // 'prefix-npnm623gm2'
```

---

### wrapTextByLines

wrapTextByLines - Warp text by lines

#### Description

```javascript
wrapTextByLines( elem ) : void
```

Wrap text by lines in span elements.

#### Parameters
Parameter  | Type        | Default | Description
---------- | ----------- |:-------:| ---
**elem**   | HTMLElement |    -    | Element to separate into wrapped lines

#### Return Values
Type/Value | Description
---------- | ---
**void**   | None.

#### Examples

```javascript
wrapTextByLines( document.getElementById( 'myelement' ) )
```
