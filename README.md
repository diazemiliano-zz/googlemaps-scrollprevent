# mapScrollOff
[![License MIT](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/diazemiliano/mapScrollOff/blob/master/LICENSE)
[![Version  0.3.x](https://img.shields.io/badge/version-0.3.x-orange.svg)](https://github.com/diazemiliano/mapScrollOff/releases)

mapScrollOff is a easy solution to the problem of page scrolling with Maps.

Requires [jQuery](http://www.jquery.com).

You can [Download](https://github.com/diazemiliano/mapScrollOff/releases) a **Pre-Release** version.

## Table of contents
- [Usage](#usage)
- [Default Options](#default-options)
- [License](#license)

## Usage
1. Include jQuery in your html.

      ``` html
      <head>
      <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js?ver=2.1.3"></script>
      </head>
      ```

2. Include mapScrollOff Libs.

      ``` html
      <head>
      <link rel="stylesheet" type="text/css" media="all" href="https://raw.githubusercontent.com/diazemiliano/mapScrollOff/master/style.css">
      <script type="text/javascript" src="https://raw.githubusercontent.com/diazemiliano/mapScrollOff/master/mapScrollOff.js"></script>
      </head>
      ```

3. Call mapScrollOff including the following code.

      ``` html
      <script type="text/javascript">
      $(function() {
        var googleMapSelector = "iframe[src*=\"google.com/maps\"]";
        $(googleMapSelector).mapScroll();
      });
      </script>
      ```

4. Edit defaults.

      ``` html
      <script type="text/javascript">
      $(function() {
        var options =
          {
            // Only Google Maps
            hoverMessage:"<p>My custom message.</p>"
          };
        $.mapScrollOff(options);
      });
      </script>
      ```

## Default Options
``` javascript
// JavaScript
var options = {
      // Custom class for map wrap
      wrapClass:"map-container",
      // Custom class for hover div
      hoverSelector:"map-enable",
      // Hover Message
      hoverMessage:"<p>Do <b>Clic</b> to Navigate the Map.</p>",
      // Present on touchscreen devices
      inTouch:false
    };
```

## License
The MIT License (MIT) Copyright (c) 2015 Emiliano Díaz.
