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
1. Include jQuery in your html.

      ``` html
      <head>
      <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js?ver=2.1.3"></script>
      </head>
      ```

2. Include mapScrollPrevent Lib.

      ``` html
      <head>
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
The MIT License (MIT) Copyright (c) 2015 Emiliano Díaz.
