/*!
 * mapScrollOff (jQuery Google Maps Scroll Off Plugin)
 * Version 0.2.x
 * URL: https://github.com/diazemiliano
 * Description: mapScrollOff is a easy solution to the problem of page scrolling with Google Maps.
 * Author: Emiliano Díaz
 * Copyright: The MIT License (MIT) Copyright (c) 2015 Emiliano Díaz.
 */

(function($) {
  $.mapScrollOff = function(options) {
    var opts = $.extend(true, {
          // All Google Map's iframe's
          iframeSelector:"iframe[src*=\"google.com/maps\"]",
          // Custom class for map wrap
          wrapClass:"x-map-inner",
          // Custom tag for wrapping
          wrapTag:"div",
          // Custom class for hover div
          hoverSelector:"map-enable",
          // Hover Message
          hoverMessage:"<p>Has <b>Clic</b> para Navegar el Mapa.</p>",
          // Present on touchscreen devices
          inTouch:false,
          // Break Point in Medium devices
          desktopBreak:992
        }, options),
        // Check touchscreen
        isTouch =
        function() {
          if (("ontouchstart" in window) ||
          (navigator.MaxTouchPoints > 0) ||
          (navigator.msMaxTouchPoints > 0))
          {
            return true;
          }
        },
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
    // Present always in no-touch devices
    if (!isTouch()) {
      mapWrap();
    } else
    // Present in touch devices if needed
    if (isTouch() && opts.inTouch) {
      mapWrap();
    }
  };
}(jQuery));
