### @squirrel-forge/ui-util
> [Back to table of contents](../README.md)

# Documentation
### Javascript / Animation
> [Table of contents](../README.md) <[ Animation ]> [Array](Array.md)

## Table of contents
 - [holdElementViewportPosition()](#holdElementViewportPosition)
 - [scrollComplete()](#scrollComplete)
 - [Scroller](#Scroller)
 - [scrollTo()](#scrollTo)
 - [Slide functions](#Slide-functions)
   - [slideToggle()](#slideToggle)
   - [slideHide()](#slideHide)
   - [slideShow()](#slideShow)

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
// Event names: scroll.initial.complete
class Scroller extends EventDispatcher {
  static getUrlWithHash( hash, url ) {} // string
  constructor( options, debug ) {}
  config : { // ScrollerOptions
    offset : null|Number|HTMLElement|Array // Offset pixels or element or Array of arguments, default: null
    bind : Boolean // Bind scrollTo links, default: true
    context : document.body|HTMLElement // Context to select scrollTo links from, default: document.body
    selector : String // Scroll to link selector, default: [href^="#"]
    capture : Boolean // Capture initial scroll, default: true
    initial : Number|'ready' // Initial scroll delay after capture
    hashClean : Number // scrollComplete delay, default: 300
  }
  initial : null|HTMLElement // Initial scroll-to target
  scrollTo( element, complete = null ) {} // void
}
```
For more details check the [Scroller source file](../../src/es6/Animation/Scroller.js).

---

### scrollTo
scrollTo - Scroll to element

#### Description
```javascript
scrollTo( element, offset = 0, behavior = 'smooth', minDiff = 3, withTop = true ) // void
```
Scroll an element into focus, optionally using a numeric offset or element height as offset, like a sticky header.
For advanced scrolling mechanics and abstracted bindings check the [Scroller](Animation/Scroller.md) class.
Under the hood this uses native *window.scrollTo* with smoothscroll, you may [polyfill](https://www.npmjs.com/package/smoothscroll-polyfill) this for for older browsers.

#### Parameters
| Parameter    | Type               | Default  | Description                               |
|--------------|--------------------|:--------:|-------------------------------------------|
| **element**  | HTMLElement        |    -     | Element to scroll into viewport           |
| **offset**   | Number/HTMLElement |    0     | Scroll offset in pixels or element height |
| **behavior** | String             | 'smooth' | Native window.scrollTo behavior option    |
| **minDiff**  | Number             |    3     | Minimum scroll distance                   |
| **withTop**  | Boolean            |  false   | Include the top value of offset element   |

#### Return Values
| Type/Value | Description |
|------------|-------------|
|  **void**  | None.       |

#### Examples
Binding all local anchor links to use smooth scroll with a dynamic header offset, in practice you should use the [Scroller](Animation/Scroller.md) class for this.
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
        const target = document.getElementById( this.getAttribute( 'href' ).substr( 1 ) );

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
<div id="slidable" style="padding:0;transform:none">
    <div style="margin:0;transform:none">
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
| Parameter    | Type          | Default | Description                                                                                           |
|--------------|---------------|:-------:|-------------------------------------------------------------------------------------------------------|
| **item**     | HTMLElement   |    -    | Element to toggle                                                                                     |
| **speed**    | Number/String |   300   | Speed at which to animate in s or ms, numbers below 1 are treated as seconds, can be used as callback |
| **easing**   | String        |  'ease' | CSS easing, can be used as callback                                                                   |
| **callback** | Function      |   null  | Function to execute after animation completion                                                        |

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
| Parameter    | Type          | Default | Description                                                                                           |
|--------------|---------------|:-------:|-------------------------------------------------------------------------------------------------------|
| **item**     | HTMLElement   |    -    | Element to hide                                                                                       |
| **speed**    | Number/String |   300   | Speed at which to animate in s or ms, numbers below 1 are treated as seconds, can be used as callback |
| **easing**   | String        | 'ease'  | CSS easing, can be used as callback                                                                   |
| **callback** | Function      |  null   | Function to execute after animation completion                                                        |

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
| Parameter    | Type          | Default | Description                                                                                           |
|--------------|---------------|:-------:|-------------------------------------------------------------------------------------------------------|
| **item**     | HTMLElement   |    -    | Element to show                                                                                       |
| **speed**    | Number/String |   300   | Speed at which to animate in s or ms, numbers below 1 are treated as seconds, can be used as callback |
| **easing**   | String        | 'ease'  | CSS easing, can be used as callback                                                                   |
| **callback** | Function      |  null   | Function to execute after animation completion                                                        |

#### Return Values
| Type/Value | Description |
|------------|-------------|
| **void**   | None.       |

#### Examples
```javascript
slideShow( document.getElementById( 'slidable' ), () => console.log( 'slideShow::complete' ) );
```

---

> [Table of contents](../README.md) <[ Animation ]> [Array](Array.md)
