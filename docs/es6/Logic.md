### @squirrel-forge/ui-util
> [Back to table of contents](../README.md)

# Documentation
### Javascript / Logic
> [HTTP](HTTP.md) <[ Logic ]> [Number](Number.md)

## Table of contents
 - [Config](#Config)
 - [Plugin](#Plugin)
 - [Plugins](#Plugins)

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
For more details check the [Config source file](../../src/es6/Logic/Config.js).

---

### Plugin
Plugin class - Plugin class for use with the [Plugins](#Plugins) class

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
For more details check the [Plugin source file](../../src/es6/Logic/Plugin.js).

---

### Plugins
Plugins class - A plugins handler class for use with the [Plugin](#Plugin) class

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
For more details check the [Plugins source file](../../src/es6/Logic/Plugins.js).

---

> [HTTP](HTTP.md) <[ Logic ]> [Number](Number.md)
