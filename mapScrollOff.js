/*!
 * mapScrollOff (jQuery Google Maps Scroll Off Plugin)
 * Version 0.x.x
 * URL: https://github.com/diazemiliano/mapScrollOff
 * Description: mapScrollOff is a easy solution to the problem of page scrolling with Google Maps.
 * Author: Emiliano Díaz https://github.com/diazemiliano/
 * Copyright: The MIT License (MIT) Copyright (c) 2015 Emiliano Díaz.
 */

jQuery.fn.extend({
  mapScroll: function(options) {
    var opts = $.extend(true,
        {
          // Custom class for map wrap
          wrapClass:"x-map-inner",
          // Custom class for hover div
          hoverSelector:"map-enable",
          // Hover Message
          hoverMessage:"<p>Has <b>Clic</b> para Navegar el Mapa.</p>",
          // Present on touchscreen devices
          inTouch:false,
          // Removes mapScroll
          stop:false
        }, options),

        // iframe Map Object
        iframeObject = $(this),

        // Creates overlay object
        overlayObject = $(
                          "<div class=\"" + opts.hoverSelector + "\">" +
                          opts.hoverMessage +
                          "</div>"
                        ),
        wrapObject = "<div class=\"" + opts.wrapClass + "\">" + "</div>";
    // Overlay functions
    hideOverlay = function()
    {
      $(iframeObject).css({ "pointer-events":"initial" });
      $(this).fadeOut();
    };
    showOverlay = function()
    {
      $(iframeObject).css({ "pointer-events":"none" });
      $(this).fadeIn();
    };

    // Check touchscreen support
    isTouchScreen = function()
    {
      if (("ontouchstart" in window) ||
      (navigator.MaxTouchPoints > 0) ||
      (navigator.msMaxTouchPoints > 0))
      {
        return true;
      }
    };

    // Wraps the iframe
    wrapIframe = function()
    {
      // Check first if the iframe is already wraped
      if (!iframeObject.closest("." + opts.wrapClass).is("div")) {
        iframeObject.wrap(wrapObject);
      }
      iframeObject.append(hoverHtml);
    };

    // Init wrap and bind events
    start = function()
    {
      wrapIframe();
      overlayObject.on("click", hideOverlay);
      wrapObject.on("mouseenter", showOverlay);
    };

    stop = function()
    {
      iframeObject.unwrap();
      overlayObject.remove();
    };

    // Present always in no-touch devices
    if (!stop) {
      if (!isTouchScreen()) {
        start();
      } else if (isTouchScreen() && opts.inTouch) {
        start();
      }
    } else {
      stop();
    }
  }
});
