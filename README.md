# googlemaps-scrollprevent.js
## Resume

googlemaps-scrollprevent is an easy solution to the problem of page scrolling with new "[Google Maps Iframe Embed](https://developers.google.com/maps/documentation/embed/guide)".
This [jQuery](http://www.jquery.com) and **Wordpress** plugin prevents Google Maps iframe from capturing the mouse's scrolling **wheel / touch** scrolling behavior wrapping the ``` <iframe>  ``` with a transparent ``` <div> ``` on **mouse / touch hover**, so you must **click / tap** the unlock button to toggle the normal navigation. See the [Live Demo.](http://diazemiliano.github.io/googlemaps-scrollprevent)
This jQuery plugin is written with [CoffeeScript](http://coffeescript.org/) that compiles in JavaScript, so the source files are a little different from standard JavaScript.

#### Details
* [![License MIT](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/diazemiliano/googlemaps-scrollprevent/blob/master/LICENSE)
* [![Website Link](https://img.shields.io/badge/website-http%3A%2F%2Fdiazemiliano.github.io%2Fgooglemaps--scrollprevent-blue.svg)](http://diazemiliano.github.io/googlemaps-scrollprevent/)

#### Available For
* [![jQuery v0.6.1](https://img.shields.io/badge/jQuery-0.6.1-brightgreen.svg)](https://github.com/diazemiliano/googlemaps-scrollprevent/releases)
* [![Wordpress v0.1.0](https://img.shields.io/badge/Wordpress-0.1.0-brightgreen.svg)](https://github.com/diazemiliano/googlemaps-scrollprevent/tree/wordpress) *Sorry Currently Outdated!*

## Table of contents
- [Examples](#examples)
- [Usage](#usage-as-jquery-plugin)
- [Default Options](#default-options)
- [Build From Source](#build-from-source)
- [License](#license)

## Examples
For usage examples check the [live demo](http://diazemiliano.github.io/googlemaps-scrollprevent).

## Usage as jQuery plugin
1. Include jQuery and googlemaps-scrollprevent Libs in your html.

    ``` html
    <head>
      // jQuery Google CDN
      <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js?ver=2.1.4"></script>
      // googlemaps-scrollprevent rawgit CDN
      <script type="text/javascript" src="https://cdn.rawgit.com/diazemiliano/googlemaps-scrollprevent/master/dist/googlemaps-scrollprevent.js"></script>
    </head>
    ```

1. Start mapScrollOff including the following code.

    ``` html
    <script type="text/javascript">
    $(function() {
      // Only Google Maps Selector
      var googleMapSelector = "iframe[src*=\"google.com/maps\"]";
      $(googleMapSelector).scrollprevent().start();
    });
    </script>
    ```
    Or Stop with:
    ``` javascript
    // JavaScript

    // Stop
    $(googleMapSelector).scrollprevent().stop();
    ```

1. Edit defaults.

    ``` html
    <script type="text/javascript">
    $(function() {
      // Only Google Maps Selector
      var googleMapSelector = "iframe[src*=\"google.com/maps\"]";
      var options = { pressDuration: 1000 };
      $(googleMapSelector).scrollprevent(options).start();
    });
    </script>
    ```

1. With Callbacks

    ``` javascript
    // JavaScript
    $(function(){
     $("#btn-start").click(function(){
       $("iframe[src*='google.com/maps']").scrollprevent({
           onMapLock: function() {
             // Your code here.
             alert("Map Locked")
           },
           onMapUnlock: function() {
             // Your code here.
             alert("Map Unlocked")
           }
       }).start();
     });
    });
    ```

## Default Options
``` javascript
// JavaScript
var options = {

      // Custom class for map wrap
      wrapClass:"map-wrap",

      // Custom class for hover div
      overlayClass:"map-overlay",

      // Press Duration
      pressDuration: 650,

      // Hover Message and Icons
      overlay: {
          iconLocked: "<svg class=\"mapscroll-icon-locked\" xmlns=\"http://www.w3.org/2000/svg\" width=\"22\" height=\"22\" viewBox=\"0 0 1792 1792\" > <path transform=\"translate(1)\" d=\"M640 768h512v-192q0-106-75-181t-181-75-181 75-75 181v192zm832 96v576q0 40-28 68t-68 28h-960q-40 0-68-28t-28-68v-576q0-40 28-68t68-28h32v-192q0-184 132-316t316-132 316 132 132 316v192h32q40 0 68 28t28 68z\" /> </svg>",
          iconUnloking: "<svg class=\"mapscroll-icon-unlocking\" xmlns=\"http://www.w3.org/2000/svg\" width=\"22\" height=\"22\" viewBox=\"0 0 1792 1792\"> <path transform=\"translate(1)\" d=\"M1376 768q40 0 68 28t28 68v576q0 40-28 68t-68 28h-960q-40 0-68-28t-28-68v-576q0-40 28-68t68-28h32v-320q0-185 131.5-316.5t316.5-131.5 316.5 131.5 131.5 316.5q0 26-19 45t-45 19h-64q-26 0-45-19t-19-45q0-106-75-181t-181-75-181 75-75 181v320h736z\" /> </svg>",
          iconUnlocked: "<svg class=\"mapscroll-icon-unlocked\" xmlns=\"http://www.w3.org/2000/svg\" width=\"22\" height=\"22\" viewBox=\"0 0 1792 1792\"> <path transform=\"translate(1)\" d=\"M1728 576v256q0 26-19 45t-45 19h-64q-26 0-45-19t-19-45v-256q0-106-75-181t-181-75-181 75-75 181v192h96q40 0 68 28t28 68v576q0 40-28 68t-68 28h-960q-40 0-68-28t-28-68v-576q0-40 28-68t68-28h672v-192q0-185 131.5-316.5t316.5-131.5 316.5 131.5 131.5 316.5z\" /> </svg>"
      },

      // Callbaks
      onMapLock: function() {},
      onMapUnlock: function() {},

      // Print Log Messges
      printLog: false
    };
```

## Build From Source
To build from source you can use the ```packaje.json``` file to install all "dev dependencies". We use [Gulp](gulpjs.com/) and some ```node-modules```.

1. Download or Clone this repo with a ```git``` client.
2. Install ```node.js```.
3. Do a ```npm install``` in your terminal.
4. Edit your ```googlemaps-scrollprevent.coffee``` soruce file.
5. Do a ````gulp compress```` task in your terminal.
6. Use the newly compiled ```googlemaps-scrollprevent.min.js``` file in the ```./dist/``` folder.
7. If you make *cool* improvements please contribute.

## License
**The MIT License (MIT)**

**Copyright (c) 2015 Emiliano Díaz**

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
