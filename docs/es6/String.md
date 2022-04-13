### @squirrel-forge/ui-util
> [Back to table of contents](../README.md)

# Documentation
### Javascript / String

## Table of contents
 - [escapeHTML()](#escapeHTML) 
 - [simpleReplace()](#simpleReplace)
 - [str2node()](#str2node)
 - [str2time()](#str2time)
 - [strand()](#strand)
 - [strSlug()](#strSlug)
 - [trimChar()](#trimChar)
 - [ucfirst()](#ucfirst)

---

### escapeHTML
escapeHTML - Escape html special chars

#### Description
```javascript
escapeHTML( text ) // string
```
Escape html special chars, only: &><"'

#### Parameters
| Parameter | Type   | Default | Description      |
|-----------|--------|:-------:|------------------|
| **text**  | String |    -    | String to escape |

#### Return Values
| Type/Value | Description    |
|------------|----------------|
| **String** | Escaped string |

#### Examples
```javascript
escapeHTML( 'foo > 1' ); // 'foo &gt; 1'
```

---

### simpleReplace
simpleReplace - Replace variables inside a string

#### Description
```javascript
simpleReplace( tmpl, data, prefix = ':', suffix = '' ) // string
```
Replaces an object properties as variables in a given string with the corresponding object values.

#### Parameters
| Parameter  | Type   | Default | Description                             |
|------------|--------|:-------:|-----------------------------------------|
| **tmpl**   | String |    -    | Template string to replace variables in |
| **data**   | Object |    -    | Data object with properties and values  |
| **prefix** | String |   ':'   | Prefix for the matching regex           |
| **suffix** | String |   ''    | Suffix for the matching regex           |

#### Return Values
| Type/Value | Description              |
|------------|--------------------------|
| **String** | Replaced template string |

#### Examples
```javascript
simpleReplace( 'Hello :name!', { name : 'Coder' } ); // 'Hello Coder!'
```

---

### str2node
str2node - Convert a html string to an actual element

#### Description
```javascript
str2node( str, multiple = true ) // Node|NodeList
```
Can convert a html string to a node object that can be used in the DOM.

#### Parameters
| Parameter    | Type    | Default | Description                                                               |
|--------------|---------|:-------:|---------------------------------------------------------------------------|
| **str**      | String  |    -    | HTML string to convert                                                    |
| **multiple** | Boolean |  true   | Return firstChild only if set to false, used when converting single nodes |

#### Return Values
| Type/Value      | Description                          |
|-----------------|--------------------------------------|
| **null**        | Returned if the string was empty     |
| **HTMLElement** | Returned if multiple is set to false |
| **NodeList**    | Returned if multiple is set to true  |

#### Examples
```javascript
str2node( '<button type="submit"><span>submit</span></button>' ); // HTMLButtonElement
```

---

### str2time
str2time - Convert a string to Date object

#### Description
```javascript
str2time( value ) // Date
```
Converts a string date *y-m-d* or *d-m-y* to Date object or returns null if failed.

#### Parameters
| Parameter | Type   | Default | Description       |
|-----------|--------|:-------:|-------------------|
| **value** | String |    -    | String to convert |

#### Return Values
| Type/Value | Description            |
|------------|------------------------|
| **null**   | Could not be converted |
| **Date**   | Date object            |

#### Examples
```javascript
str2time( '28.02.1984'); // Date
```

---

### strand
strand - Generate a random string

#### Description
```javascript
strand() // string
```
Generates a random string 10 characters in length, this function is optimized for speed not uniqueness.

#### Parameters
The function has no parameters.

#### Return Values
| Type/Value | Description   |
|------------|---------------|
| **String** | Random string |

#### Examples
```javascript
strand(); // npnm623gm2
```

---

### strSlug
strSlug - Convert string to slug

#### Description
```javascript
strSlug( str ) // string
```
Convert string to slug, removes all sorts of special characters.

#### Parameters
| Parameter | Type   | Default | Description        |
|-----------|--------|:-------:|--------------------|
| **str**   | String |    -    | String to sanitize |

#### Return Values
| Type/Value | Description      |
|------------|------------------|
| **String** | Sanitized string |

#### Examples
```javascript
strSlug( 'äöüà' ); // aoua
```

---

### trimChar
trimChar - Trim custom character

#### Description
```javascript
trimChar( string, charToRemove ) // string
```
Trim a string with a custom char.

#### Parameters
| Parameter        | Type   | Default | Description       |
|------------------|--------|:-------:|-------------------|
| **str**          | String |    -    | String to trim    |
| **charToRemove** | String |    -    | Character to trim | 

#### Return Values
| Type/Value | Description    |
|------------|----------------|
| **String** | Trimmed string |

#### Examples
```javascript
trimChar( 'foo', 'o' ); // 'f'
```

---

### ucfirst
ucfirst - Capitalize the first character

#### Description
```javascript
ucfirst( str ) // string
```
Capitalize the first character.

#### Parameters
| Parameter | Type   | Default | Description                          |
|-----------|--------|:-------:|--------------------------------------|
| **str**   | String |    -    | String to capitalize first character |

#### Return Values
| Type/Value | Description        |
|------------|--------------------|
| **String** | Capitalized string |

#### Examples
```javascript
ucfirst( 'foo' ); // 'Foo'
```
