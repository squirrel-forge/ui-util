### @squirrel-forge/ui-util
> [Back to table of contents](../README.md)

# Documentation
### Javascript / Error

## Table of contents
 - [Exception](#Exception)

---

### Exception
Exception class - Extension of the native *Error* with a previous implementation

#### Class overview
```javascript
class Exception {
  constructor( message, previous ) {}
  previous : *
  previousToStack : boolean
  previousPrefix : string
  addPreviousToStack() {}
}
```
For more details check the [Exception source file](../../src/es6/Error/Exception.js).
