/*!
 * mapScrollPrevent (jQuery Google Maps Scroll Prevent Plugin)
 * Version 0.5.6
 * URL: https://github.com/diazemiliano/mapScrollPrevent
 * Description: mapScrollPrevent is an easy solution to the problem of page
 *              scrolling with Google Maps.
 * Author: Emiliano Díaz https://github.com/diazemiliano/
 * Copyright: The MIT License (MIT) Copyright (c) 2015 Emiliano Díaz.
 */
(function($) {
    return $.fn.extend({
        mapScrollPrevent: function(options) {
            var Log, applyCss, bindEvents, context, coverObject, defaults, hideOverlay, iframeObject, longPressDown, longPressUp, mapCSS, opts, overlayObject, progress, runTimeout, showOverlay, wrapIframe, wrapObject;
            defaults = {

                /* Custom class for map wrap */
                wrapClass: "map-wrap",

                /* Custom class for hover div */
                overlayClass: "map-overlay",

                /* Press Duration */
                pressDuration: 1000,

                /* Hover Message and Icons */
                overlay: {
                    message: "Clic para Navegar.",
                    iconLocked: "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 1792 1792\" > <path transform=\"translate(1)\" d=\"M640 768h512v-192q0-106-75-181t-181-75-181 75-75 181v192zm832 96v576q0 40-28 68t-68 28h-960q-40 0-68-28t-28-68v-576q0-40 28-68t68-28h32v-192q0-184 132-316t316-132 316 132 132 316v192h32q40 0 68 28t28 68z\" /> </svg>",
                    iconUnloking: "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 1792 1792\"> <path transform=\"translate(1)\" d=\"M1376 768q40 0 68 28t28 68v576q0 40-28 68t-68 28h-960q-40 0-68-28t-28-68v-576q0-40 28-68t68-28h32v-320q0-185 131.5-316.5t316.5-131.5 316.5 131.5 131.5 316.5q0 26-19 45t-45 19h-64q-26 0-45-19t-19-45q0-106-75-181t-181-75-181 75-75 181v320h736z\" /> </svg>",
                    iconUnlocked: "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 1792 1792\"> <path transform=\"translate(1)\" d=\"M1728 576v256q0 26-19 45t-45 19h-64q-26 0-45-19t-19-45v-256q0-106-75-181t-181-75-181 75-75 181v192h96q40 0 68 28t28 68v576q0 40-28 68t-68 28h-960q-40 0-68-28t-28-68v-576q0-40 28-68t68-28h672v-192q0-185 131.5-316.5t316.5-131.5 316.5 131.5 131.5 316.5z\" /> </svg>"
                },

                /* Callbaks */
                onOverlayShow: function() {},
                onOverlayHide: function() {},

                /* Print Log Messges */
                printLog: false
            };
            opts = $.extend(true, defaults, options);

            /* iframe Map Object */
            iframeObject = $(this);
            context = this;
            Log = function(message) {
                var dateTime, nowTime;
                if (opts.printLog) {
                    if (window.console && window.console.log) {
                        dateTime = new Date();
                        nowTime = dateTime.getHours() + ":" + dateTime.getMinutes() + ":" + dateTime.getSeconds();
                        return console.log("mapScrollPrevent [" + nowTime + "] : " + message);
                    }
                }
            };

            /* Early exit */
            if (!iframeObject.length) {
                return Log("No Iframes detected. Try changing your \"selector.\"");
            } else {
                Log(iframeObject.length + " iFrames detected.");
                mapCSS = "/* --- mapScrollPrevent.js CSS Classes --- */ ." + opts.overlayClass + " { position: absolute; overflow:hidden; cursor: pointer; text-align: center; background-color: rgba(255, 255, 255, 0); } ." + opts.overlayClass + ", ." + opts.overlayClass + " p, ." + opts.overlayClass + " p svg { -moz-transition: all .3s ease-in-out; -o-transition: all .3s ease-in-out; -webkit-transition: all .3s ease-in-out; transition: all .3s ease-in-out; } ." + opts.overlayClass + " p .progress { -moz-transition: width " + (opts.pressDuration / 1000) + "s linear; -o-transition: width " + (opts.pressDuration / 1000) + "s linear; -webkit-transition: width " + (opts.pressDuration / 1000) + "s linear; transition: width " + (opts.pressDuration / 1000) + "s linear; } ." + opts.overlayClass + ":hover { background-color: rgba(255, 255, 255, 0.8); } ." + opts.overlayClass + " p { text-rendering: optimizeLegibility; font-family: Lato, 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 13px; padding-top: 2.5%; padding-bottom: 2.5%; margin-right: auto; margin-left: auto; width: 70%; position: relative; top: 33%; /* transform: translateY(-50%); */ border-color: rgba(0, 0, 0, 0.3); color: rgba(58, 132, 223, 0); background-color: rgba(0, 0, 0, 0); -moz-border-radius-topleft: 2px; -webkit-border-top-left-radius: 2px; border-top-left-radius: 2px; -moz-border-radius-topright: 2px; -webkit-border-top-right-radius: 2px; border-top-right-radius: 2px; } ." + opts.overlayClass + ":hover p { background-color: rgb(255, 255, 255); color: rgb(58, 132, 223); -moz-box-shadow: rgba(0,0,0,0.3) 0px 1px 4px -1px; -webkit-box-shadow: rgba(0, 0, 0, 0.3) 0px 1px 4px -1px; box-shadow: rgba(0, 0, 0, 0.3) 0px 1px 4px -1px; } ." + opts.overlayClass + " p svg { fill: rgba(58, 132, 223, 0); } ." + opts.overlayClass + ":hover p svg { fill: rgba(58, 132, 223, 1); } ." + opts.overlayClass + " p .progress { position: absolute; top: 0; bottom: 0; left: 0; width: 0%; display: block; background-color: rgba(58, 132, 223, 0) ; } ." + opts.overlayClass + ":hover p .progress{ background-color: rgba(58, 132, 223, 0.4) ; } ." + opts.wrapClass + " { display: inline-block; } ." + opts.wrapClass + " iframe { position: relative; top: 0; left: 0; }";

                /* Creates overlay object */
                overlayObject = $("<div class=\"" + opts.overlayClass + "\"> <p> " + opts.overlay.iconLocked + " <br> " + opts.overlay.message + " <span class=\"progress\"></span> </p> </div>");
                wrapObject = $("<div class=\"" + opts.wrapClass + "\"></div>");

                /* Wraps the iframe */
                wrapIframe = function() {

                    /* Check first if the iframe is already wraped */
                    if (!iframeObject.closest("." + opts.wrapClass).is("div")) {
                        iframeObject.wrap(wrapObject);
                        Log("Iframe isn't wraped.");
                    }

                    /* Update variable objects with DOM objects */
                    wrapObject = iframeObject.closest("." + opts.wrapClass).append(overlayObject);
                    overlayObject = wrapObject.children("." + opts.overlayClass);
                    coverObject();
                    return Log("Iframe now wraped.");
                };

                /* Apply all the css */
                applyCss = function() {
                    $("head").append("<style rel=\"stylesheet\" type=\"text/css\"> " + mapCSS + "</style>");
                    return Log("Plugin css applied.");
                };
                coverObject = function() {
                    overlayObject.height(iframeObject.height()).width(iframeObject.width()).css({
                        "top": iframeObject.position().top,
                        "left": iframeObject.position().left
                    });
                    return Log("Overlay positioned.");
                };

                /* Overlay functions */
                hideOverlay = function() {
                    iframeObject.css({
                        "pointer-events": "auto"
                    });
                    overlayObject.hide();
                    opts.onOverlayHide();
                    return Log("Overlay is hidden.");
                };
                showOverlay = function() {
                    iframeObject.css({
                        "pointer-events": "none"
                    });
                    overlayObject.show();
                    opts.onOverlayShow();
                    return Log("Overlay is showed.");
                };
                progress = function(end) {
                    var iconObject, progressObject, totalWidth;
                    if (end == null) {
                        end = null;
                    }
                    totalWidth = overlayObject.find("p").width();
                    progressObject = overlayObject.find(".progress");
                    iconObject = overlayObject.find("svg");
                    if (end) {
                        progressObject.css({
                            "width": "0%"
                        });
                        return iconObject.replaceWith($("" + opts.overlay.iconLocked));
                    } else {
                        iconObject.replaceWith("" + opts.overlay.iconUnloking);
                        return progressObject.css({
                            "width": "100%"
                        });
                    }
                };
                runTimeout = function() {
                    var end;
                    hideOverlay();
                    clearTimeout(this.timeOut);
                    return progress(end = true);
                };

                /* Long Press Down Event */
                longPressDown = function() {
                    this.mouseDownTime = $.now();
                    this.timeOut = setTimeout(runTimeout, opts.pressDuration);
                    progress();
                    return Log("LongPress Started.");
                };

                /* Long Press Up Event */
                longPressUp = function() {
                    var end;
                    this.mouseUpTime = $.now() - this.mouseDownTime;
                    clearTimeout(this.timeOut);
                    progress(end = true);
                    Log((this.mouseUpTime / 1000) + "s Pressed. ");
                    return Log("LongPress Stopped.");
                };

                /* Bind Events */
                bindEvents = function() {

                    /* Dynamic Adjust */
                    $(window).bind("resize", coverObject);
                    iframeObject.bind("resize", coverObject);
                    overlayObject.bind("mousedown touchstart", longPressDown).bind("mouseup touchend", longPressUp);
                    wrapObject.bind("mouseenter", showOverlay).bind("mouseleave", hideOverlay);
                    return Log("Events bounded.");
                };
                return {

                    /* Init wrap and bind events */
                    start: function() {
                        Log("Starting plugin...");
                        applyCss();
                        wrapIframe();
                        bindEvents();
                        return Log("Plugin Started.");
                    },

                    /* Removes everything */
                    stop: function() {
                        Log("Stopping plugin...");
                        iframeObject.removeAttr("style");
                        if (iframeObject.parent().is("." + opts.wrapClass)) {
                            iframeObject.unwrap();
                        }
                        $("." + opts.overlayClass).remove();
                        return Log("Plugin Stopped.");
                    }
                };
            }
        }
    });
})(jQuery);
