/*!
 * mapScrollOff (jQuery Google Maps Scroll Off Plugin)
 * Version 0.3.x
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
          wrapClass:"map-wrap",
          // Custom class for hover div
          overlayClass:"map-overlay",
          // Hover Message
          overlayMessage:"<p>Has <b>Clic</b> para Navegar el Mapa.</p>",
          // Present on touchscreen devices
          inTouch:false,
          // Removes mapScroll
          stop:false
        }, options),

        // iframe Map Object
        iframeObject = $(this),

        // Creates overlay object
        overlayObject = $("<div class=\"" + opts.overlayClass + "\">" +
                          opts.overlayMessage +
                          "</div>"),
        wrapObject = $("<div class=\"" + opts.wrapClass + "\">" + "</div>");

    // Wraps the iframe
    wrapIframe = function()
    {
      // Check first if the iframe is already wraped
      if (!iframeObject.closest("." + opts.wrapClass).is("div")) {
        iframeObject.wrap(wrapObject);
      }

      // Update variable objects with DOM objects
      wrapObject = iframeObject
                      .closest("." + opts.wrapClass)
                      .append(overlayObject);
      overlayObject = wrapObject
                        .children("." + opts.overlayClass);

      coverObject();
    };

    coverObject = function()
    {
      overlayObject
        .height(iframeObject.height())
        .width(iframeObject.width())
        .css({
          "position":"relative",
          "top":iframeObject.position().top,
          "left":iframeObject.position().left
        });
    };

    // Overlay functions
    hideOverlay = function()
    {
      iframeObject.css({ "pointer-events":"initial" });
      $(this).fadeOut();
    };
    showOverlay = function()
    {
      iframeObject.css({ "pointer-events":"none" });
      overlayObject.show();
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

    // Init wrap and bind events
    start = function()
    {
      wrapIframe();

      $(window)
        .on("resize", coverObject);

      overlayObject
        .bind("click", hideOverlay);

      wrapObject
        .bind("mouseenter", showOverlay)
        .bind("mouseenter", coverObject);
    };

    stop = function()
    {
      iframeObject.unwrap();
      overlayObject.remove();
    };

    // Present always in no-touch devices
    if (!opts.stop) {
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
