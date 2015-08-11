
/*
 * mapScrollPrevent (jQuery Google Maps Scroll Prevent Plugin)
 * Version 0.5.4
 * URL: https://github.com/diazemiliano/mapScrollPrevent
 * Description: mapScrollPrevent is an easy solution to the problem of page
 *              scrolling with Google Maps.
 * Author: Emiliano Díaz https://github.com/diazemiliano/
 * Copyright: The MIT License (MIT) Copyright (c) 2015 Emiliano Díaz.
 */
var $,
  indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

$ = jQuery;

$.fn.extend({
  mapScrollPrevent: function(options) {
    var applyCss, coverObject, defaults, hideOverlay, iframeObject, isTouchScreen, mapCSS, opts, overlayObject, showOverlay, start, stop, wrapIframe, wrapObject;
    defaults = {
      wrapClass: "map-wrap",
      overlayClass: "map-overlay",
      overlayMessage: "Clic para Navegar.",
      inTouch: true,
      stop: false
    };
    opts = $.extend(true, defaults, options);
    mapCSS = "/* --- mapScrollPrevent.js CSS Classes --- */ ." + opts.overlayClass + " { position: absolute; overflow:hidden; cursor: pointer; text-align: center; background-color: rgba(255, 255, 255, 0); -moz-transition: background-color .3s ease-in-out; -o-transition: background-color .3s ease-in-out; -webkit-transition: background-color .3s ease-in-out; transition: background-color .3s ease-in-out; } ." + opts.overlayClass + ":hover { background-color: rgba(255, 255, 255, 0.8); } ." + opts.overlayClass + " p { font-family: Lato, 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 13px; padding-top: 2.5%; padding-bottom: 2.5%; margin-right: auto; margin-left: auto; width: 70%; position: relative; top: 50%; transform: translateY(-50%); border-color: rgba(0, 0, 0, 0.3); color: rgba(58, 132, 223, 0); background-color: rgba(0, 0, 0, 0); -moz-transition: color 0.3s ease-in-out; -o-transition: color 0.3s ease-in-out; -webkit-transition: color 0.3s ease-in-out; transition: color 0.3s ease-in-out; -moz-border-radius-topleft: 2px; -webkit-border-top-left-radius: 2px; border-top-left-radius: 2px; -moz-border-radius-topright: 2px; -webkit-border-top-right-radius: 2px; border-top-right-radius: 2px; } ." + opts.overlayClass + ":hover p { background-color: rgb(255, 255, 255); color: rgb(58, 132, 223); -moz-box-shadow: rgba(0,0,0,0.3) 0px 1px 4px -1px; -webkit-box-shadow: rgba(0, 0, 0, 0.3) 0px 1px 4px -1px; box-shadow: rgba(0, 0, 0, 0.3) 0px 1px 4px -1px; } ." + opts.wrapClass + " { display: inline-block; } ." + opts.wrapClass + " iframe { position: relative; top: 0; left: 0; }";
    iframeObject = $(this);
    overlayObject = $("<div class=\"" + opts.overlayClass + "\"> <p>" + opts.overlayMessage + "</p></div>");
    wrapObject = $("<div class=\"" + opts.wrapClass + "\"></div>");
    if (!iframeObject.length) {
      return;
    }
    $.ajaxSetup({
      cache: true
    });
    wrapIframe = function() {
      if (!iframeObject.closest("." + opts.wrapClass).is("div")) {
        iframeObject.wrap(wrapObject);
      }
      wrapObject = iframeObject.closest("." + opts.wrapClass).append(overlayObject);
      overlayObject = wrapObject.children("." + opts.overlayClass);
      return coverObject();
    };
    applyCss = function() {
      return $("head").append("<style rel=\"stylesheet\" type=\"text/css\"> " + mapCSS + "</style>");
    };
    coverObject = function() {
      return overlayObject.height(iframeObject.height()).width(iframeObject.width()).css({
        "top": iframeObject.position().top,
        "left": iframeObject.position().left
      });
    };
    hideOverlay = function() {
      iframeObject.css({
        "pointer-events": "auto"
      });
      return $(this).fadeOut();
    };
    showOverlay = function() {
      coverObject();
      iframeObject.css({
        "pointer-events": "none"
      });
      return overlayObject.show();
    };
    isTouchScreen = function() {
      if (indexOf.call(window, "ontouchstart") >= 0 || navigator.MaxTouchPoints > 0 || navigator.msMaxTouchPoints > 0) {
        return true;
      }
    };
    start = function() {
      applyCss();
      wrapIframe();
      $(window).on("resize", coverObject);
      if (isTouchScreen()) {
        $(window).on("touchstart", showOverlay).on("touchend click", hideOverlay);
        return overlayObject.bind("click", hideOverlay);
      } else {
        overlayObject.bind("click", hideOverlay);
        return wrapObject.bind("mouseenter", showOverlay);
      }
    };
    stop = function() {
      iframeObject.removeAttr("style");
      if (iframeObject.parent().is("." + opts.wrapClass)) {
        iframeObject.unwrap();
      }
      return $("." + opts.overlayClass).remove();
    };
    if (!opts.stop) {
      return start();
    } else {
      return stop();
    }
  }
});
