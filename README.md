# overl8d
Overload your function easi-fastest way

## Installion

    npm install overl8d
  
## Idea

```javascript
overl8d(
  String,/*Type, Type, Type, ...*/
  function (str) {} /* unnamed callback function */
)
```

Idea of `overl8d` is simple. Put overl8d function's parameters object types how many do you want, and put unnamed callback function in it (it really must be unnamed), overl8d makes calculations for you and generates new function. if you want to overload 0 (zero) parameter, just do not put any type... look down pls.

```javascript
overl8d(
  function () { console.log("hi");}
)(); // writes hi in console
```

You can use own types. But make sure you put name of them!

```javascript
function MyClass() {
  this.hello = function() {
    console.log("hello");
    return 0;
  }
}

var myClass = new MyClass();
overl8d(MyClass, function(myClass) {
  myClass.hello() 
})(myClass); // writes "hello" returns 0

```


## Using in nodejs

```javascript
var overl8d = require("overl8d");

/** @construct */
function Size(x, y) {
  this.x = x;
  this.y = y;
}

var Add = overl8d(Size, Size, function (size, size2) {
  return new Size(size.x + size2.x, size.y + size2.y);
},
Number, Number, Number, Number, function(x, y, x2, y2) {
  return new Size(x + x2, y + y2);
});

var size = new Size(1, 3);
var size2 = new Size(4, 5);
Add(size, size2); // Size {x: 5, y: 8}
Add(1, 3, 4, 5); // Size {x: 5, y: 8}
```


## using it on browser without amd

```html
<!-- load from nodemodules folder -->
<script src="../node_modules/overl8d/overl8d.js"></script>
```

after load

```javascript
var Add = overl8d(String, Function, function(s, f) {});
```

## using it on browser with amd

```javascript
require(['../node_modules/overl8d/overl8d.js'], function(overl8d) {
  var Add = overl8d(String, Function, function(s, f) {});
});
```
