### @squirrel-forge/ui-util
> [Back to table of contents](../README.md#table-of-contents)

# Documentation
### Javascript / Logic
> [Layout](Layout.md) <[ Logic ]> [Number](Number.md)

## Table of contents
 - [Config](#config)
 - [Plugin](#plugin)
 - [Plugins](#plugins)
 - [Tracker](#tracker)

---

### Config
Config class - A class for holding configuration data, with defaults and inheritance extension

#### Class overview
```javascript
class Config {
  static clone( data ) {} // Object|Array
  static merge( data, target, extend = false ) {} // void
  static extendInheritance( extended ) {} // null|Object
  constructor( defaults = {}, extended = [] ) {}
  defaults : Object
  data : Object
  exposed : Object
  get( name ) {} // *
  set( name, value ) {} // void
  merge( data, extend = false ) {} // void
  require( ...names ) {} // Array
}
```
For more details check the [Config source file](../src/es6/Logic/Config.js).

---

### Plugin
Plugin class - Plugin class for use with the [Plugins](#plugins) class

#### Class overview
```javascript
class Plugin {
  constructor( options = {}, context = null, debug = null ) {}
  options : Object
  debug : null|Console
  context : null|Object
  _context_check( context ) {} // void
}
```
For more details check the [Plugin source file](../src/es6/Logic/Plugin.js).

---

### Plugins
Plugins class - A plugins handler class for use with the [Plugin](#plugin) class

#### Class overview
```javascript
class Plugins {
  constructor( plugins = [], context = null, append = true, debug = null ) {}
  append : null|Boolean
  debug : null|Console
  context : null|Object
  load( plugins ) {} // void
  init( Construct, options = {}, replace = false ) {} // Object
  runAsync( method, params = [], restrict = null ) {} // Promise[]
  run( method, params = [], restrict = null ) {} // Object
  exec( name, method, params = [], silent = false ) {} // *
  get( name ) {} // null|Object
  has( name ) {} // boolean
}
```
For more details check the [Plugins source file](../src/es6/Logic/Plugins.js).

---

### Tracker
Tracker class - A tracking helper class width condition and dynamic data

#### Class overview
```javascript
class Tracker {
    static getData( tracker, params ) {} // TrackingData|Object
    constructor( executor = null, debug = null ) {}
    debug : null|Console
    run( trackers, params = [] ) {} // void
    ranOnceAlready( tracker, params = [] ) {} // boolean
    clearOnce( group = null ) {} // void
}
```
For more details check the [Tracker source file](../src/es6/Logic/Tracker.js).

#### Examples
How to run a tracker.
```javascript
tracker.run( [
    {
        trigger : ( tracker, arg1, arg2 ) => { return arg1 === 'argument'; },
        once : 'event_name',
        group : ( tracker, arg1, arg2 ) => {
            return arg1 + arg2;
        },
        data : {
            event : 'event_name',
            dynamic : ( tracker, arg1, arg2 ) => {
                return arg1.length + arg2.length;
            },
        },
    },
], [ 'argument', 'argument...' ]);
```
Check the [UiVideoPluginTracking](https://github.com/squirrel-forge/ui-video/blob/main/src/es6/Plugins/UiVideoPluginTracking.js) class plugin of the [UiVideoComponent](https://github.com/squirrel-forge/ui-video#readme) for an implementation example.

---

> [Layout](Layout.md) <[ Logic ]> [Number](Number.md)
