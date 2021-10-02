### @squirrel-forge/util Documentation

> [Back to Readme](../../README.md)

# Javascript / Animation

## Table of contents

 - [holdElementViewportPosition()](#holdElementViewportPosition)
 - [scrollTo()](#scrollTo)
 - [slideToggle()](#slideToggle)
 - [slideHide()](#slideHide)
 - [slideShow()](#slideShow)

---

### holdElementViewportPosition

holdElementViewportPosition - Maintain viewport position while changing scroll height

#### Description

```javascript
holdElementViewportPosition( elem, duration ) : void
```

Maintain element position in viewport while changing scroll height through any type of animation.

#### Parameters
Parameter    | Type        | Default | Description
------------ | ----------- |:-------:| ---
**elem**     | HTMLElement |    -    | Element to fix in viewport
**duration** | Number      |    -    | How long to hold the position in ms

#### Return Values
Type/Value | Description
---------- | ---
**void**   | None.

#### Examples

Hiding an element above the viewport will cause the browser the slide/scroll current content out of view,
while running the hold position during this animation will maintain the current document view position.
```javascript
holdElementViewportPosition( document.getElementById( 'below-slidable' ), 300 );
slideHide( document.getElementById( 'slidable' ), () => console.log( 'slideHide::complete' ) );
```

---

### scrollTo

scrollTo - Scroll to element

#### Description

```javascript
scrollTo( element, offset = 0, behavior = 'smooth' ) : void
```

Scroll an element into focus, optionally using a numeric offset or element height as offset, like a sticky header.
For advanced scrolling mechanics and abstracted bindings check the [Scroller](../Helpers/Scroller.md) helper.
Under the hood this uses native *window.scrollTo* with smoothscroll, [polyfill](../Polyfill.md#smoothscroll) this for for older browsers.

#### Parameters
Parameter    | Type               | Default  | Description
------------ | ------------------ |:--------:| ---
**element**  | HTMLElement        |     -    | Element to scroll into viewport
**offset**   | Number HTMLElement |     0    | Scroll offset in pixels or element height
**behavior** | String             | 'smooth' | Native window.scrollTo behavior option

#### Return Values
Type/Value | Description
---------- | ---
**void**   | None.

#### Examples

Binding all local anchor links to use smooth scroll with a dynamic header offset.
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
slideToggle( item, speed = 300, easing = 'ease', callback = null ) : void
```

Toggle element visibility by sliding up to hide or down to show.

#### Parameters
Parameter    | Type          | Default | Description
------------ | ------------- |:-------:| ---
**item**     | HTMLElement   |    -    | Element to toggle
**speed**    | Number String |   300   | Speed at which to animate in s or ms, numbers below 1 are treated as seconds, can be used as callback
**easing**   | String        |  'ease' | CSS easing, can be used as callback
**callback** | Function      |   null  | Function to execute after animation completion

#### Return Values
Type/Value | Description
---------- | ---
**void**   | None.

#### Examples

```javascript
slideToggle( document.getElementById( 'slidable' ), () => console.log( 'slideToggle::complete' ) );
```

---

### slideHide

slideHide - Hide slide animation on element

#### Description

```javascript
slideHide( item, speed = 300, easing = 'ease', callback = null ) : void
```

Hide element by sliding up.

#### Parameters
Parameter    | Type          | Default | Description
------------ | ------------- |:-------:| ---
**item**     | HTMLElement   |    -    | Element to hide
**speed**    | Number String |   300   | Speed at which to animate in s or ms, numbers below 1 are treated as seconds, can be used as callback
**easing**   | String        |  'ease' | CSS easing, can be used as callback
**callback** | Function      |   null  | Function to execute after animation completion

#### Return Values
Type/Value | Description
---------- | ---
**void**   | None.

#### Examples

```javascript
slideHide( document.getElementById( 'slidable' ), () => console.log( 'slideHide::complete' ) );
```

---

### slideShow

slideShow - Show slide animation on element

#### Description

```javascript
slideShow( item, speed = 300, easing = 'ease', callback = null ) : void
```

Show element by sliding down.

#### Parameters
Parameter    | Type          | Default | Description
------------ | ------------- |:-------:| ---
**item**     | HTMLElement   |    -    | Element to show
**speed**    | Number String |   300   | Speed at which to animate in s or ms, numbers below 1 are treated as seconds, can be used as callback
**easing**   | String        |  'ease' | CSS easing, can be used as callback
**callback** | Function      |   null  | Function to execute after animation completion

#### Return Values
Type/Value | Description
---------- | ---
**void**   | None.

#### Examples

```javascript
slideShow( document.getElementById( 'slidable' ), () => console.log( 'slideShow::complete' ) );
```
