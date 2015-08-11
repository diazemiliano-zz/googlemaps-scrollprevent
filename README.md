# mapScrollPrevent.js
#### Details
* [![License MIT](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/diazemiliano/mapScrollPrevent/blob/master/LICENSE)
* [![Website Link](https://img.shields.io/badge/website-http%3A%2F%2Fdiazemiliano.github.io%2FmapScrollPrevent%2F-lightgrey.svg)](http://diazemiliano.github.io/mapScrollPrevent/)

#### Available For
* [![jQuery v0.5.4](https://img.shields.io/badge/jQuery-0.5.4-brightgreen.svg)](https://github.com/diazemiliano/mapScrollPrevent/releases)
* [![Wordpress v0.1.0](https://img.shields.io/badge/Wordpress-0.1.0-brightgreen.svg)](https://github.com/diazemiliano/mapScrollPrevent/tree/wordpress) **Sorry Currently Outdated!**

## Resume

mapScrollPrevent is an easy solution to the problem of page scrolling with new "[Google Maps Iframe Embed](https://developers.google.com/maps/documentation/embed/guide)".
This [jQuery](http://www.jquery.com) and **Wordpress** plugin prevents Google Maps iframe from capturing the mouse's scrolling **wheel / touch** scrolling behavior wrapping the ``` <iframe>  ``` with a transparent ``` <div> ``` on **mouse / touch hover**, so you must **click / tap** them to activate the normal navigation.
This jQuery plugin is written with [CoffeeScript](http://coffeescript.org/) that compiles in JavaScript, so the source files are a little different from standard JavaScript.

Check the [Live Demo!](http://diazemiliano.github.io/mapScrollPrevent). Use it, enjoy it and please [contribute](https://github.com/diazemiliano/mapScrollPrevent/issues?q=is%3Aopen+is%3Aissue) to make it better.

You can [Download](https://github.com/diazemiliano/mapScrollPrevent/releases) a **Pre-Release** version.
If you are finding the wordpress version check the ~~[Wordpress Branch](https://github.com/diazemiliano/mapScrollPrevent/tree/wordpress)~~ (**Sorry Currently Outdated!**)

[![mapScrollPrevent](https://cdn.rawgit.com/diazemiliano/mapScrollPrevent/master/mapScrollPrevent.png)](http://diazemiliano.github.io/mapScrollPrevent)

## Table of contents
- [Examples](#examples)
- [Usage](#usage-as-jquery-plugin)
- [Default Options](#default-options)
- [Build From Source](#build-from-source)
- [License](#license)

## Examples
For usage examples check the [live demo](http://diazemiliano.github.io/mapScrollPrevent).

## Usage as jQuery plugin
1. Include jQuery and mapScrollPrevent Libs in your html.

      ``` html
      <head>
      // jQuery Google CDN
      <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js?ver=2.1.4"></script>
      // mapScrollPrevent rawgit CDN
      <script type="text/javascript" src="https://cdn.rawgit.com/diazemiliano/mapScrollPrevent/master/dist/mapScrollPrevent.js"></script>
      </head>
      ```

3. Call mapScrollOff including the following code.

      ``` html
      <script type="text/javascript">
      $(function() {
        // Only Google Maps Selector
        var googleMapSelector = "iframe[src*=\"google.com/maps\"]";
        $(googleMapSelector).mapScrollPrevent();
      });
      </script>
      ```

4. Edit defaults.

      ``` html
      <script type="text/javascript">
      $(function() {
        // Only Google Maps Selector
        var googleMapSelector = "iframe[src*=\"google.com/maps\"]";
        var options = {
                    hoverMessage:"<p>My custom message.</p>"
                  };
        $(googleMapSelector).mapScrollPrevent(options);
      });
      </script>
      ```

## Default Options
``` javascript
// JavaScript
var options = {
      // Custom class for map wrap
      wrapClass:"map-wrap",
      // Custom class for hover div
      overlayClass:"map-overlay",
      // Hover Message
      overlayMessage:"Has <b>Clic</b> para Navegar el Mapa",
      // Removes mapScroll
      stop:false
    };
```
## Build From Source
To build from source you can use the ```packaje.json``` file to install all "dev dependencies". We use [Gulp](gulpjs.com/) and some ```node-modules```.

1. Download or Clone this repo with a ```git``` client.
2. Install ```node.js```.
3. Do a ```npm install``` in your terminal.
4. Edit your ```mapScrollPrevent.coffee``` soruce file.
5. Do a ````gulp compress```` task in your terminal.
6. Use the newly compiled ```mapScrollPrevent.min.js``` file in the ```./dist/``` folder.
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
