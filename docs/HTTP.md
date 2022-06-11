### @squirrel-forge/ui-util
> [Back to table of contents](../README.md#table-of-contents)

# Documentation
### Javascript / HTTP
> [Events](Events.md) <[ HTTP ]> [Logic](Logic.md)

## Table of contents
 - [AsyncRequest](#AsyncRequest)
 - [JsonP](#JsonP)

---

### AsyncRequest
AsyncRequest class - An XMLHttpRequest wrapper with events and response parsing

#### Class overview
```javascript
class AsyncRequest extends EventDispatcher {
  static unique_url( url, cache = false ) {} // string
  constructor( options = null, parent = null, debug = null ) {}
  url : string
  user : string
  pwd : string
  method : string
  cache : boolean
  type : string
  successStatus : Array
  error : boolean
  status : Number
  statusText : string
  readyState : Number
  responseText : string
  responseType : string
  responseParsed : *
  responseParsingError : *
  send( data = null, modifyProcessed = null ) {} // void
  abort() {} // void
  _parse_auto() {} // void
  _parse_html() {} // void
  _parse_svg() {} // void
  _parse_string() {} // void
  _parse_json() {} // void
}
```
For more details check the [AsyncRequest source file](../src/es6/HTTP/AsyncRequest.js).

#### Events
 - **error** - Fired when the request failed or returned an error.
 - **success** - Fired when the request was successful.
 - **complete** - Fired when the request has completed.
 - **progress** - Fired when upload progress is made.
 - **readystatechange** - Fired when the XMLHttpRequest state changes.

---

### JsonP
JsonP class - Extension of the native *Error* with a previous implementation

#### Class overview
```javascript
class JsonP {
  static getCallbackName( prefix = 'jsonPCallback_' ) {} // String
  static promise( url, limit = 10000 ) {} // Promise
  constructor( url, success, timeout = null, limit = 10000 ) {}
}
```
For more details check the [JsonP source file](../src/es6/HTTP/JsonP.js).

---

> [Events](Events.md) <[ HTTP ]> [Logic](Logic.md)
