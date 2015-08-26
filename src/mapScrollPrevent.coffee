###!
# mapScrollPrevent (jQuery Google Maps Scroll Prevent Plugin)
# Version 0.5.5
# URL: https://github.com/diazemiliano/mapScrollPrevent
# Description: mapScrollPrevent is an easy solution to the problem of page
#              scrolling with Google Maps.
# Author: Emiliano Díaz https://github.com/diazemiliano/
# Copyright: The MIT License (MIT) Copyright (c) 2015 Emiliano Díaz.
###

# Reference jQuery
do ($ = jQuery) ->

  $.fn.extend
    mapScrollPrevent : (options) ->
      defaults =
        ### Custom class for map wrap ###
        wrapClass:"map-wrap"
        ### Custom class for hover div###
        overlayClass:"map-overlay"
        ### Hover Message ###
        overlayMessage:"Clic para Navegar."

      opts = $.extend true, defaults, options

      mapCSS = "
        /* --- mapScrollPrevent.js CSS Classes --- */
        .#{ opts.overlayClass } {
          position: absolute;
          overflow:hidden;
          cursor: pointer;
          text-align: center;
          background-color: rgba(255, 255, 255, 0);
        }
        .#{ opts.overlayClass },
        .#{ opts.overlayClass } p {
          -moz-transition: all .3s ease-in-out;
          -o-transition: all .3s ease-in-out;
          -webkit-transition: all .3s ease-in-out;
          transition: all .3s ease-in-out;
        }
        .#{ opts.overlayClass }:hover {
          background-color: rgba(255, 255, 255, 0.8);
        }
        .#{ opts.overlayClass } p {
          font-family: Lato, 'Helvetica Neue', Helvetica, Arial, sans-serif;
          font-size: 13px;
          padding-top: 2.5%;
          padding-bottom: 2.5%;
          margin-right: auto;
          margin-left: auto;
          width: 70%;
          position: relative;
          top: 50%;
          transform: translateY(-50%);
          border-color: rgba(0, 0, 0, 0.3);
          color: rgba(58, 132, 223, 0);
          background-color: rgba(0, 0, 0, 0);
          -moz-border-radius-topleft: 2px;
          -webkit-border-top-left-radius: 2px;
          border-top-left-radius: 2px;
          -moz-border-radius-topright: 2px;
          -webkit-border-top-right-radius: 2px;
          border-top-right-radius: 2px;
        }
        .#{ opts.overlayClass }:hover p {
          background-color: rgb(255, 255, 255);
          color: rgb(58, 132, 223);
          -moz-box-shadow: rgba(0,0,0,0.3) 0px 1px 4px -1px;
          -webkit-box-shadow: rgba(0, 0, 0, 0.3) 0px 1px 4px -1px;
          box-shadow: rgba(0, 0, 0, 0.3) 0px 1px 4px -1px;
        }
        .#{ opts.wrapClass } {
          display: inline-block;
        }
        .#{ opts.wrapClass } iframe {
          position: relative;
          top: 0;
          left: 0;
        }"

      ### iframe Map Object ###
      iframeObject = $(@)

      ### Creates overlay object ###
      overlayObject =
        $("<div class=\"#{ opts.overlayClass }\">
        <p>#{ opts.overlayMessage }</p></div>")

      wrapObject =
        $("<div class=\"#{ opts.wrapClass }\"></div>")

      ### Early exit ###
      unless iframeObject.length
        return

      ### Wraps the iframe ###
      wrapIframe = ->
        ### Check first if the iframe is already wraped ###
        unless iframeObject.closest(".#{ opts.wrapClass }").is "div"
          iframeObject.wrap wrapObject

        ### Update variable objects with DOM objects ###
        wrapObject =
          iframeObject
            .closest ".#{ opts.wrapClass }"
            .append overlayObject

        overlayObject =
          wrapObject
            .children ".#{ opts.overlayClass }"

        coverObject()

      ### Apply all the css ###
      applyCss = ->
        $("head").append "<style rel=\"stylesheet\" type=\"text/css\">
        #{ mapCSS }</style>"

      coverObject = ->
        overlayObject
          .height iframeObject.height()
          .width iframeObject.width()
          .css
            "top": iframeObject.position().top
            "left": iframeObject.position().left

      ### Overlay functions ###
      hideOverlay = ->
        coverObject()
        iframeObject.css "pointer-events":"auto"
        overlayObject.hide()

      showOverlay = ->
        coverObject()
        iframeObject.css "pointer-events":"none"
        overlayObject.show()

      ### Check TouchScreen ###
      isTouchScreen = ->
        if $(window).bind "touchstart" then true

      ### Init wrap and bind events ###
      start : ->
        applyCss()
        wrapIframe()

        ### Dynamic Adjust ###
        $(window)
          .on "resize", coverObject

        iframeObject
          .on "resize", coverObject

        overlayObject
          .bind "click", hideOverlay

        wrapObject
          .bind "mouseleave", hideOverlay
          .bind "mouseenter", showOverlay

      ### Removes everything ###
      stop : ->
        iframeObject.removeAttr "style"
        if iframeObject.parent().is ".#{ opts.wrapClass }"
          iframeObject.unwrap()

        $(".#{ opts.overlayClass }").remove()
