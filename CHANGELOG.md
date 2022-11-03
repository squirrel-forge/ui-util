# Changelog

## 0.9.18
 - Added *getPropertyValues()* for fetching custom property values of a given context.

## 0.9.17
 - Fixed *getFocusable()* NodeList does not support array methods.

## 0.9.16
 - Added path normalize for *Scroller.event_scrollToClick()* path comparison.

## 0.9.15
 - Added *normalizePath()* function, to normalize path strings for comparison.

## 0.9.14
 - Added *bindMultiClick()* method, for clean single and double click binding on same element without conflicts.

## 0.9.13
 - Extended *Scroller* binding option to include all links that start or contain a hash.
 - Extended *Scroller* click handler to handle root path links with hashes if the path matches the current path.

## 0.9.12
 - Fixed *Tracker* api and internal arguments to be consistent.
 - Added *Tracker* constructor argument *executor* to allow customization of the actual tracking event firing.

## 0.9.11
 - Added *Tracker* class a tracking helper class to run tracking events with conditions and dynamic data assignment.
 - Removed devDependencies from *package.json*.

## 0.9.10
 - Added *location.pop*, *location.before.update*, *location.replace* and *location.push* events to *LocationManager* class.
 - Updated docs.

## 0.9.9
 - Updated *LocationManager* with some improved debug information.
 - Updated *LocationManager.update()* method to only throw on push if same url.

## 0.9.8
 - Added *isValidFunctionName* function to check string assignments.
 - Added *CallbackEvents* class prototype to handle callback responses via events.
 - Added *LocationManager* class to handle url changes and easy state setting and detection.
 - Moved *getScrollbarWidth* and *getVisibility* internally, only direct imports require a path change.
 - Updated docs and hopefully fixed all hash links.

## 0.9.7
 - Added third boolean argument *unbind* with default *false* to *bindNodeList* function.
 - Added third boolean argument *loop* to *tabFocusLock* function and moved optional *selector* to fourth argument. 

## 0.9.6
 - Added *tabFocusLock* and *getFocusable* functions for focus handling and context restrictions.

## 0.9.5
 - Added *Scroller* config *initial* option as Array to allow custom target and event binding.
 - Cleanup *isEmpty* function.

## 0.9.4
 - Improved documentation, code and readme.
 - Set *cloneObject()* argument *recursive* explicitly to default false, causes no change in behaviour.

## 0.9.3
 - Fixed *Slide functions* instant animation speed 0 not triggering complete since no transition event was fired. 

## 0.9.2
 - Added *Ratio* value class for ratio calculations and expression.
 - Added *autoTop* config option to *Scroller* class utility.
 - Made *Scroller.bind()* public for binding async contexts at own convenience.
 - Link bound by *Scroller.bind()* will now be marked by attribute ```<a data-scrollto="true">``` and the scrollTo action may be disabled by setting the attribute to *false* after the listener is bound. 

## 0.9.1
 - Fixed/changed *Scroller* default offset option from *null* to *0*.

## 0.9.0
 - Updated *EventDispatcher.dispatchEvent* return value to mimic native dispatchEvent return value.
 - Updated *Scroller.scrollTo* and made *scroll.before* event cancellable and added *scrollTo* params to event data.

## 0.8.10
 - Remove *withTop* argument for *scrollTo* function.
 - Allow *scrollTo* argument *offset* as function returning a number.

## 0.8.9
 - *Slide* function argument speed only accepts number in ms.
 - Improved *Plugins* context debug logging origin.

## 0.8.8
 - Added *CustomEvent* return to *EventDispatcher.dispatchEvent()* method.
 - Added event dispatch *scroll.after* to *Scoller.scrollTo()* method.
 - Added *hijack* option to *scroll.before* event for *Scroller.scrollTo()* to allow preventing/hijacking the scroll action.

## 0.8.7
 - Fixed *Plugins.runAsync()* method internals.

## 0.8.6
 - Updated documentation.

## 0.8.5
 - Added *options.complete* for *Scroller* class to provide a default complete callback option.
 - Fixed *Scroller.event_scrollToClick()* event target, should be currentTarget.

## 0.8.4
 - Fixed *scrollTo* functions *withTop* option to respect scroll position.
 - Added *Plugins.require()* to check for and fetch required plugins or throw an error.

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
