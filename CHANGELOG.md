# Changelog

## 0.8.4
 - Fixed *scrollTo* functions *withTop* option to respect scroll position.
 - Added *Plugins.require()* to check for and fetch required plugins or throw and error.

## 0.8.3
 - Minor improvements.

## 0.8.2
 - Added *Exception.previousToStack()* fallback for none string stacks.
 - Improved docs nav and some minor typos.

## 0.8.1
 - Added *detach* method to *ConsoleInterceptor* for global use, change default constructor argument host from document to window.
 - Improved *Scroller* options offset can be arguments array and added *Scroller.scrollTo()* method, removed *scrollComplete( delay )* option.

## 0.8.0
 - Restructured package separated from *@squirrel-forge/ui-core@0.7.2* module.
