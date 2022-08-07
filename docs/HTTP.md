### @squirrel-forge/ui-util
> [Back to table of contents](../README.md#table-of-contents)

# Documentation
### Javascript / HTTP
> [Events](Events.md) <[ HTTP ]> [Layout](Layout.md)

## Table of contents
 - [AsyncRequest](#asyncrequest)
 - [JsonP](#jsonp)
 - [LocationManager](#locationmanager)

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

### LocationManager
LocationManager class - Class for handling urls, get params, push and replace states etc.
The class extends [EventDispatcher](Events.md#eventdispatcher) class.

#### Class overview
```javascript
class LocationManager extends EventDispatcher {
    static decodeSearch( query ) {} // Object
    static encodeSearch( data ) {} // String
    constructor( protocols = null, debug = null ) {}
    url( data, absolute = true ) {} // String
    search( param = null ) {} // null|String|Object
    update( state, title = null, data = null, replace = false ) {} // void
}
```
For more details check the [LocationManager source file](../src/es6/HTTP/LocationManager.js).

#### Events
 - **location.pop** - Fired right after default *window.popstate* event and contains original event information in *event.detail.event*.
 - **location.before.update** - Fired before an url update is made with push or replace state, can be prevented by calling event.preventDefault().
 - **location.replace** - Fired after *history.replaceState()* and contains *title*, *url* and *state* information.
 - **location.push** - Fired after *history.pushState()* and contains *title*, *url* and *state* information.

---

> [Events](Events.md) <[ HTTP ]> [Layout](Layout.md)
