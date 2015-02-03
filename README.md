# mapScrollOff
mapScrollOff is a easy solution to the problem of page scrolling with Maps.
Requires [jQuery](http://www.jquery.com).
You can [Download](https://github.com/diazemiliano/mapScrollOff/releases) a **Pre-Release** version.
## Usage
1. Include jQuery in your html.
``` html
// html
<head>
<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js?ver=2.1.3"></script>
</head>
```
2. Include mapScrollOff Libs.
``` html
// html
<head>
<link rel="stylesheet" type="text/css" media="all" href="https://raw.githubusercontent.com/diazemiliano/mapScrollOff/master/style.css">
<script type="text/javascript" src="https://raw.githubusercontent.com/diazemiliano/mapScrollOff/master/mapScrollOff.js"></script>
</head>
```
3. Call mapScrollOff including the following code.
``` javascript
// html
<script type="text/javascript">
$(function() {
  $.mapScrollOff();
});
</script>
```
4. Edit defaults.
``` javascript
// html
<script type="text/javascript">
$(function() {
  var options =
    {
      // Only Google Maps
      iframeSelector:"iframe[src*=\"google.com/maps\"]"
    };
  $.mapScrollOff(options);
});
</script>
```
## Defaults
``` javascript
// JavaScript
var options = {
      // All Google Map's iframe's
      iframeSelector:"iframe[src*=\"google.com/maps\"]",
      // Custom class for map wrap
      wrapClass:"map-container",
      // Custom tag for wrapping
      wrapTag:"div",
      // Custom class for hover div
      hoverSelector:"map-enable",
      // Hover Message
      hoverMessage:"<p>Do <b>Clic</b> to Navigate the Map.</p>"
    };
```
## License
The MIT License (MIT) Copyright (c) 2015 Emiliano Díaz.
