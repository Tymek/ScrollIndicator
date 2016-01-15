# Scroll Indicator
_Visualize reading progress with small and simple jQuery plugin._

Online demo and instructions available at [www.tymek.cz/lab/scrollindicator](http://www.tymek.cz/lab/scrollindicator/)

![Preview](http://www.tymek.cz/lab/scrollindicator/preview.gif)


---
### Build
```
$> npm install
$> grunt
```

---

### Basic example</h3>
```js
$(window).load(function () {
    $.scrollIndicator();
});
```

This will add progress bar to the top of your page.
Remember to include `scrollindicator.jquery.js` or it's minified version in your project, as well as css style.

### Usage
You can choose parent element for scroll bar:
```
$("#elementbyid").scrollIndicator();
```
In this case it will be helpful to include custom style. Without setting target element in this way, it will be attatched to `$("body")` element. (See basic example).
### Options
```
$.scrollIndicator({delay: 333, bindResize: false});
```
Pass options object on initialization.

#### `delay`
Time in miliseconds between interaction (ex. scroll or resize event) and plugin update.
Default: `100`

#### `html5`
Use of `progress` element. Disable for CSS3 animation.<br>
Default: `false`

#### `ieSupport`
Support for IE8 and IE9 browsers. Always `true` if HTML5 version is turned off.<br>
Default: `true`

#### `bindResize`
Re-calculate values on `window.resize` event.<br>
Default: `true`
#### `bindDOMSubtreeModified`
React to changes in DOM model. Experimental. **Not recommended.**<br>
Default: `false`
### Public methods
```js
$("#element").data('scrollIndicator').reload();
```
This will re-calculate slider value. Useful for sites with dynamic content. For now there is only that one useful public method is available.

### Planned features
- Anchor link support
- Animation with HTML5 progress element