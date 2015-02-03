/*!
 * mapScrollOff (jQuery Google Maps Scroll Off Plugin)
 * Version 0.1.x
 * URL: https://github.com/diazemiliano/mapScrollOff
 * Description: mapScrollOff is a easy solution to the problem of page scrolling with Google Maps.
 * Author: Emiliano Díaz https://github.com/diazemiliano
 * Copyright: The MIT License (MIT) Copyright (c) 2015 Emiliano Díaz.
 */

(function($) {
  $.mapScrollOff = function(options) {
    var opts = $.extend(true, {
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
        }, options),
        // Hover div object
        hoverHtml =
        $("<div class=\"" + opts.hoverSelector + "\">" + opts.hoverMessage + "</div>")
          .click(
            function() {
              $(opts.iframeSelector).css({ "pointer-events":"initial" });
              $(this).fadeOut();
          }),
        // Map wrap creation
        mapWrap =
        function() {
          //  Checks if a current wrap of the iframe exists to create it or not
          if (!$(opts.iframeSelector).closest("." + opts.wrapClass)) {
            $(opts.iframeSelector).wrap(
              "<" + opts.wrapTag + "class=\"" + opts.wrapClass + "\">" +
              "</" + opts.wrapTag + ">");
          }
          // Append the hover object to the wrap
          $("." + opts.wrapClass)
            .append(hoverHtml)
            .mouseenter(
              function() {
                $(this).find("." + opts.hoverSelector).fadeIn();
                $(opts.iframeSelector).css({ "pointer-events":"none" });
              });
          };
    // Call function
    mapWrap();
  };
}(jQuery));

// Call function on load with defaults
$(function() {
  $.mapScrollOff();
});
