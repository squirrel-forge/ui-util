### @squirrel-forge/ui-util
> [Back to table of contents](../README.md#table-of-contents)

# Documentation
### Javascript / Error
> [DOM](DOM.md) <[ Error ]> [Events](Events.md)

## Table of contents
 - [Exception](#exception)

---

### Exception
Exception class - Extension of the native *Error* with a previous implementation

#### Class overview
```javascript
class Exception extends Error {
  constructor( message, previous ) {}
  previous : *
  previousToStack : boolean
  previousPrefix : string
  addPreviousToStack() {}
}
```
For more details check the [Exception source file](../src/js/Error/Exception.js).

---

> [DOM](DOM.md) <[ Error ]> [Events](Events.md)
