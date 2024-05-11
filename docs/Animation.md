### @squirrel-forge/ui-util

> [Back to table of contents](../README.md#table-of-contents)

# Documentation

### Javascript / Animation

> [Table of contents](../README.md#table-of-contents) <[ Animation ]> [Array](Array.md)

## Table of contents

 - [afterPaint()](#afterpaint)
 - [cssTransition()](#csstransition)
 - [Easing()](#easing)
 - [holdElementViewportPosition()](#holdelementviewportposition)
 - [scrollComplete()](#scrollcomplete)
 - [Scroller](#scroller)
 - [scrollTo()](#scrollto)
 - [Slide functions](#slide-functions)
   - [slideToggle()](#slidetoggle)
   - [slideHide()](#slidehide)
   - [slideShow()](#slideshow)

---

### afterPaint

afterPaint - Run callback after the next frame was painted.

#### Description

```javascript
afterPaint( callback ) // void
```
Ensures callback run after the next frame was painted, any dom/style changes will be fully reflected when the callback runs.

#### Parameters

| Parameter    | Type          | Default | Description                 |
|--------------|---------------|:-------:|-----------------------------|
| **callback** | Function      |    -    | Callback to run after paint |

#### Return Values

| Type/Value | Description  |
|------------|--------------|
|  **void**  | None.        |

#### Examples

This example turns the element red and after the red was painted it makes the element blue,
if you add a transition a blend will run from red to blue instead of instantly being blue.

```javascript
elem.style.backgroundColor = 'red';
runAfterFramePaint(() => {
   elem.style.backgroundColor = 'blue';
});
```

---

### cssTransition

cssTransition - CSS transition helper for granular action control

#### Description

```javascript
cssTransition( element, initial = null, target = null, ended = null, complete = null ) // void
```

Allows for easy css transition control, changing an elements values with initial and complete state.

#### Parameters

| Parameter    | Type          | Default | Description                |
|--------------|---------------|:-------:|----------------------------|
| **element**  | HTMLElement   |    -    | Element to fix in viewport |
| **initial**  | null/Function |  null   | Set the initial state      |
| **target**   | null/Function |  null   | Set the target state       |
| **ended**    | null/Function |  null   | Set the ended state        |
| **complete** | null/Function |  null   | Set the complete state     |

#### Return Values

| Type/Value | Description  |
|------------|--------------|
|  **void**  | None.        |

#### Examples

This example hides an existing element with an opacity transition and sets initial and final visibility.

```javascript
cssTransition( element, ( element ) => {
   element.style.visibility = '';
   element.style.opacity = 1;
}, ( element ) => {
    element.style.opacity = 0;
}, ( element ) => {
   element.style.visibility = 'hidden'; 
} );
```

---

### Easing

Easing class - Static class with numerous easing handlers.

#### Class overview

```javascript
class Easing {
    static linear( t ) {} // number
    static inSine( t ) {} // number
    static outSine( t ) {} // number
    static inOutSine( t ) {} // number
    static inQuad( t ) {} // number
    static outQuad( t ) {} // number
    static inOutQuad( t ) {} // number
    static inCubic( t ) {} // number
    static outCubic( t ) {} // number
    static inOutCubic( t ) {} // number
    static inQuart( t ) {} // number
    static outQuart( t ) {} // number
    static inOutQuart( t ) {} // number
    static inQuint( t ) {} // number
    static outQuint( t ) {} // number
    static inOutQuint( t ) {} // number
    static inExpo( t ) {} // number
    static outExpo( t ) {} // number
    static inOutExpo( t ) {} // number
    static inCirc( t ) {} // number
    static outCirc( t ) {} // number
    static inOutCirc( t ) {} // number
    static inBack( t, magnitude = 1.70158 ) {} // number
    static outBack( t, magnitude = 1.70158 ) {} // number
    static inOutBack( t, magnitude = 1.70158 ) {} // number
    static inElastic( t, magnitude = 0.7 ) {} // number
    static outElastic( t, magnitude = 0.7 ) {} // number
    static inOutElastic( t, magnitude = 0.65 ) {} // number
    static outBounce( t ) {} // number
    static inBounce( t ) {} // number
    static inOutBounce( t ) {} // number
}
```

For more details check the [Easing source file](../src/js/Animation/Easing.js).

---

### holdElementViewportPosition

holdElementViewportPosition - Maintain viewport position while changing scroll height

#### Description

```javascript
holdElementViewportPosition( elem, duration ) // void
```

Maintain element position in viewport while changing scroll height through any type of animation.

#### Parameters

| Parameter    | Type        | Default | Description                         |
|--------------|-------------|:-------:|-------------------------------------|
| **elem**     | HTMLElement |    -    | Element to fix in viewport          |
| **duration** | Number      |    -    | How long to hold the position in ms |

#### Return Values

| Type/Value | Description  |
|------------|--------------|
|  **void**  | None.        |

#### Examples

Hiding an element above the viewport will cause the browser the slide/scroll current content out of view,
while running the hold position during this animation will maintain the current document view position.

```javascript
holdElementViewportPosition( document.getElementById( 'below-slidable' ), 300 );
slideHide( document.getElementById( 'slidable' ), () => console.log( 'slideHide::complete' ) );
```

---

### scrollComplete

scrollComplete - Run callback after scroll complete

#### Description

```javascript
scrollComplete( callback, delay, context ) // void
```

Run a callback after tracking a scroll action until it completes, for a max of *x* ms.

#### Parameters

| Parameter    | Type               | Default | Description               |
|--------------|--------------------|:-------:|---------------------------|
| **callback** | Function           |    -    | Complete callback         |
| **duration** | Number             |   300   | Internal check/call delay |
| **context**  | Window/HTMLElement | Window  | Context to bind events    |

#### Return Values

| Type/Value | Description |
|------------|-------------|
|  **void**  | None.       |

#### Examples

Scroll to a target and run a callback after completion.

```javascript
scrollComplete( () => { console.log( 'scrollComplete' ); } );
scrollTo( document.getElementById( 'scroll-target' ) );
```

---

### Scroller

Scroller class - Binds local scroll-to links and handles a smooth initial scroll on load.

#### Class overview

```javascript
class Scroller extends EventDispatcher {
  static getUrlWithHash( hash, url ) {} // string
  constructor( options, debug ) {}
  config : { // ScrollerOptions
    offset : Number|HTMLElement|Function|Array // Offset pixels, element, Function or Array of arguments, default: null
    bind : Boolean // Bind scrollTo links, default: true
    context : document.body|HTMLElement // Context to select scrollTo links from, default: document.body
    selector : String // Scroll to link selector, default: [href^="#"], [href*="#"]
    autoTop : Boolean // Scroll to top when using only # or #top without an actual element target
    capture : Boolean // Capture initial scroll, default: true
    initial : Number|'ready'|Array // Initial scroll delay after capture
    complete : null|Function // Complete callback for local scrollTo
  }
  initial : null|HTMLElement // Initial scroll-to target
  bind( selector = null, context = null ) {} // void
  scrollTo( element, complete = null ) {} // void
}
```

For more details check the [Scroller source file](../src/js/Animation/Scroller.js).

#### Events

Note: *The event context for the scroller is the **window** object*.
 - **scroll.initial.complete** - Fired when the initial scroll action has been completed.
 - **scroll.before** - Fired before a scroll action is executed, can be prevented by calling event.preventDefault().
 - **scroll.after** - Fired after a scroll action has completed.

---

### scrollTo

scrollTo - Scroll to element

#### Description

```javascript
scrollTo( element, offset = 0, behavior = 'smooth', minDiff = 3 ) // void
```

Scroll an element into focus, optionally using a numeric offset or element height as offset, like a sticky header.
For advanced scrolling mechanics and abstracted bindings check the [Scroller](#scroller) class.
Under the hood this uses native *window.scrollTo* with smoothscroll, you may [polyfill](https://www.npmjs.com/package/smoothscroll-polyfill) this for older browsers.

#### Parameters

| Parameter    | Type                        | Default  | Description                                                  |
|--------------|-----------------------------|:--------:|--------------------------------------------------------------|
| **element**  | HTMLElement                 |    -     | Element to scroll into viewport                              |
| **offset**   | Number/HTMLElement/Function |    0     | Scroll offset in pixels, element height or function callback |
| **behavior** | String                      | 'smooth' | Native window.scrollTo behavior option                       |
| **minDiff**  | Number                      |    3     | Minimum scroll distance                                      |

#### Return Values

| Type/Value | Description |
|------------|-------------|
|  **void**  | None.       |

#### Examples

Binding all local anchor links to use smooth scroll with a dynamic header offset, in practice you should use the [Scroller](#scroller) class for this.

```javascript
// Get our offset element
const header = document.getElementById( 'header' );

// Select anchors to bind
const anchors = document.querySelectorAll( 'a[href^="#"]' );

// Cycle selected elements
for( let i = 0; i < anchors.length; i++ ) {

    // Bind click event handler
    anchors[ i ].addEventListener( 'click', function( event ) {

        // Remove # from link and attempt to select as id
        const target = document.getElementById( this.getAttribute( 'href' ).substring( 1 ) );

        // Scroll to valid target and prevent default scroll/jump
        if ( target ) {
            event.preventDefault();
            scrollTo( target, header );
        }
    } );
}
```

---

## Slide functions

The slide functions require following structure to work properly:

```html
<style>
   .slidable,
   .slidable__content {
      /* Display is enforced via js */
      display: block;
      /* Following some properties recommended NOT to be used,
         to avoid inconsistent effects during animation */
      margin: 0;
      padding: 0;
      transform: none;
      border: none;
      outline: none;
      box-shadow: none;
   }
</style>
<div id="slidable" class="slidable">
    <div class="slidable__content">
        ...content to show or hide...
    </div>
</div>
```

### slideToggle

slideToggle - Toggle slide animation on element

#### Description

```javascript
slideToggle( item, speed = 300, easing = 'ease', callback = null ) // void
```

Toggle element visibility by sliding up to hide or down to show.

#### Parameters

| Parameter    | Type        | Default | Description                                              |
|--------------|-------------|:-------:|----------------------------------------------------------|
| **item**     | HTMLElement |    -    | Element to toggle                                        |
| **speed**    | Number      |   300   | Speed at which to animate in ms, can be used as callback |
| **easing**   | String      | 'ease'  | CSS easing, can be used as callback                      |
| **callback** | Function    |  null   | Function to execute after animation completion           |

#### Return Values

| Type/Value | Description |
|------------|-------------|
| **void**   | None.       |

#### Examples

```javascript
slideToggle( document.getElementById( 'slidable' ), () => console.log( 'slideToggle::complete' ) );
```

---

### slideHide

slideHide - Hide slide animation on element

#### Description

```javascript
slideHide( item, speed = 300, easing = 'ease', callback = null ) // void
```

Hide element by sliding up.

#### Parameters

| Parameter    | Type        | Default | Description                                              |
|--------------|-------------|:-------:|----------------------------------------------------------|
| **item**     | HTMLElement |    -    | Element to hide                                          |
| **speed**    | Number      |   300   | Speed at which to animate in ms, can be used as callback |
| **easing**   | String      | 'ease'  | CSS easing, can be used as callback                      |
| **callback** | Function    |  null   | Function to execute after animation completion           |

#### Return Values

| Type/Value | Description |
|------------|-------------|
| **void**   | None.       |

#### Examples

```javascript
slideHide( document.getElementById( 'slidable' ), () => console.log( 'slideHide::complete' ) );
```

---

### slideShow

slideShow - Show slide animation on element

#### Description

```javascript
slideShow( item, speed = 300, easing = 'ease', callback = null ) // void
```

Show element by sliding down.

#### Parameters

| Parameter    | Type        | Default | Description                                              |
|--------------|-------------|:-------:|----------------------------------------------------------|
| **item**     | HTMLElement |    -    | Element to show                                          |
| **speed**    | Number      |   300   | Speed at which to animate in ms, can be used as callback |
| **easing**   | String      | 'ease'  | CSS easing, can be used as callback                      |
| **callback** | Function    |  null   | Function to execute after animation completion           |

#### Return Values

| Type/Value | Description |
|------------|-------------|
| **void**   | None.       |

#### Examples

```javascript
slideShow( document.getElementById( 'slidable' ), () => console.log( 'slideShow::complete' ) );
```

---

> [Table of contents](../README.md#table-of-contents) <[ Animation ]> [Array](Array.md)
