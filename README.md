# mapScrollPrevent
[![License MIT](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/diazemiliano/mapScrollPrevent/blob/master/LICENSE)
[![Version  0.4.x](https://img.shields.io/badge/version-0.4.x-orange.svg)](https://github.com/diazemiliano/mapScrollPrevent/releases)

mapScrollPrevent is a easy solution to the problem of page scrolling with Maps.
This plugin prevents a Google Maps iframe from capturing the mouse's scrolling wheel behavior.

Requires [jQuery](http://www.jquery.com).

You can [Download](https://github.com/diazemiliano/mapScrollPrevent/releases) a **Pre-Release** version.

## Table of contents
- [Examples](#examples)
- [Usage](#usage)
- [Default Options](#default-options)
- [License](#license)

## Examples
For usage examples check this [Link](https://jsfiddle.net/iridis/j0k5hj25/)

## Usage
1. Include jQuery and mapScrollPrevent Libs in your html.

      ``` html
      <head>
      // jQuery Google CDN
      <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js?ver=2.1.3"></script>
      // mapScrollPrevent rawgit CND
      <script type="text/javascript" src="https://rawgit.com/diazemiliano/mapScrollPrevent/master/mapScrollPrevent.js"></script>
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
      overlayMessage:"<p>Has <b>Clic</b> para Navegar el Mapa.</p>",
      // Present on touchscreen devices
      inTouch:false,
      // Removes mapScroll
      stop:false
    };
```

## License
The MIT License (MIT)

Copyright (c) 2015 Emiliano Díaz

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
