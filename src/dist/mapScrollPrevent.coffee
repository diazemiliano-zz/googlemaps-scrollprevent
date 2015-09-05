###!
# mapScrollPrevent (jQuery Google Maps Scroll Prevent Plugin)
# Version 0.6.1
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
        wrapClass: "mapscroll-wrap"
        ### Custom class for hover div ###
        overlayClass: "mapscroll-overlay"
        ### Press Duration ###
        pressDuration: 650
        ### Hover Message and Icons ###
        overlay:
          iconLocked :
            "<svg class=\"mapscroll-icon mapscroll-icon-locked\" xmlns=\"http://www.w3.org/2000/svg\" width=\"22\" height=\"22\" viewBox=\"0 0 1792 1792\" >
              <path transform=\"translate(1)\" d=\"M640 768h512v-192q0-106-75-181t-181-75-181 75-75 181v192zm832 96v576q0 40-28 68t-68 28h-960q-40 0-68-28t-28-68v-576q0-40 28-68t68-28h32v-192q0-184 132-316t316-132 316 132 132 316v192h32q40 0 68 28t28 68z\" />
            </svg>"
          iconUnloking:
            "<svg class=\"mapscroll-icon mapscroll-icon-unlocking\" xmlns=\"http://www.w3.org/2000/svg\" width=\"22\" height=\"22\" viewBox=\"0 0 1792 1792\">
              <path transform=\"translate(1)\" d=\"M1376 768q40 0 68 28t28 68v576q0 40-28 68t-68 28h-960q-40 0-68-28t-28-68v-576q0-40 28-68t68-28h32v-320q0-185 131.5-316.5t316.5-131.5 316.5 131.5 131.5 316.5q0 26-19 45t-45 19h-64q-26 0-45-19t-19-45q0-106-75-181t-181-75-181 75-75 181v320h736z\" />
            </svg>"
          iconUnlocked:
            "<svg class=\"mapscroll-icon mapscroll-icon-unlocked\" xmlns=\"http://www.w3.org/2000/svg\" width=\"22\" height=\"22\" viewBox=\"0 0 1792 1792\">
              <path transform=\"translate(1)\" d=\"M1728 576v256q0 26-19 45t-45 19h-64q-26 0-45-19t-19-45v-256q0-106-75-181t-181-75-181 75-75 181v192h96q40 0 68 28t28 68v576q0 40-28 68t-68 28h-960q-40 0-68-28t-28-68v-576q0-40 28-68t68-28h672v-192q0-185 131.5-316.5t316.5-131.5 316.5 131.5 131.5 316.5z\" />
            </svg>"
        ### Callbaks ###
        onMapLock : ->
        onMapUnlock : ->
        ### Print Log Messges ###
        printLog: false

      opts = $.extend true, defaults, options

      ### iframe Map Object ###
      context = $(@)

      ### Logging Style ###
      Log = (message) ->
        if opts.printLog
          if window.console and window.console.log
            dateTime = new Date()
            nowTime =
              dateTime.getHours() + ":" +
              dateTime.getMinutes() + ":" +
              dateTime.getSeconds()

            console.log "mapScrollPrevent [#{nowTime}] : #{message}"

      ### Early exit ###
      unless context.length
        return Log "No Iframes detected. Try changing your \"selector.\""
      else
        Log "#{context.length} iFrames detected."
        mapCSS = "
          /* --- mapScrollPrevent.js CSS Classes --- */
          .#{opts.overlayClass} {
            position: absolute;
            overflow:hidden;
            cursor: pointer;
            text-align: center;
            background-color: rgba(0, 0, 0, 0);
          }
          .mapscroll-button {
            text-rendering: optimizeLegibility;
            font-family: Lato, 'Helvetica Neue', Helvetica, Arial, sans-serif;
            font-size: 13px;
            padding-top: 6px;
            padding-bottom: 6px;
            width: 36px;
            position: absolute;
            right: 32px;
            bottom: 29px;
            border-color: rgba(0, 0, 0, 0.3);
            color: rgba(58, 132, 223, 0);
            background-color: rgba(255, 255, 255, 1);
            color: rgb(58, 132, 223);
            border-top-right-radius: 2px;
            border-top-left-radius: 2px;
            box-shadow: rgba(0, 0, 0, 0.3) 0px 1px 4px -1px;
          }
          .mapscroll-icon {
            position: relative;
            z-index: 1;
            fill: rgba(58, 132, 223, 1);
          }
          .mapscroll-progress {
            position: absolute;
            top: 0;
            bottom: 0;
            left: 0;
            width: 0%;
            display: block;
            background-color: rgba(58, 132, 223, 0.4);
          }
          .#{opts.wrapClass} {
            position: relative;
            text-align: center;
            display: inline-block;
          }
          .#{opts.wrapClass} iframe {
            position: relative;
            top: 0;
            left: 0;
          }
          .#{opts.overlayClass},
          .mapscroll-button,
          .mapscroll-icon {
            transition: all .3s ease-in-out;
          }
          .mapscroll-progress {
            transition: width #{opts.pressDuration/1000}s linear;
          }
          "

        ### Creates overlay object ###
        overlayObject =
          $("<div class=\"#{ opts.overlayClass }\"></div>")

        buttonObject =
          $("
          <div class=\"mapscroll-button\">
            <div class=\"mapscroll-progress\"></div>
            #{opts.overlay.iconLocked}
          </div>
          ")

        wrapObject =
          $("<div class=\"#{ opts.wrapClass }\"></div>")

        ### Apply all the css ###
        applyCss = ->
          $("head").append "<style rel=\"stylesheet\" type=\"text/css\">
          #{ mapCSS }</style>"
          Log "Plugin css applied."

        ### Wraps the iframe ###
        wrapIframe = ->
          ### Check first if the iframe is already wraped ###
          unless context.closest(".#{ opts.wrapClass }").is "div"
            context.wrap wrapObject
            Log "Iframe isn't wraped."

          ### Update with DOM objects ###
          wrapObject =
            context
              .closest ".#{ opts.wrapClass }"
              .append buttonObject
              .append overlayObject

          overlayObject =
            wrapObject
              .children ".#{ opts.overlayClass }"

          buttonObject =
            wrapObject
              .children ".mapscroll-button"

          coverObject()
          Log "Iframe now wraped."

        ### Dynamic Adjust ###
        coverObject = ->
          overlayObject
            .height context.height()
            .width context.width()
            .css
              "top": context.position().top
              "left": context.position().left
          Log "Overlay positioned."

        progress = (status="enable") ->
          progressObject = buttonObject.find(".mapscroll-progress")
          iconObject = buttonObject.find(".mapscroll-icon")

          switch status
            when "enable"
              iconObject.replaceWith("#{opts.overlay.iconUnloking}")
              progressObject.css({"width":"100%"})
              Log "Enabling Map."

            when "disable"
              context.css "pointer-events":"none"
              iconObject.replaceWith($("#{opts.overlay.iconLocked}"))
              progressObject.css({"width":"0%"})
              overlayObject.show()
              opts.onMapLock()
              Log "Disabling Map."

            when "unlocked"
              context.css "pointer-events":"auto"
              iconObject.replaceWith("#{opts.overlay.iconUnlocked}")
              progressObject.css({"width":"100%"})
              overlayObject.hide()
              opts.onMapUnlock()
              Log "Map Enabled."

        runTimeout = ->
          progress(status="unlocked")
          clearTimeout(@timeOut)

        ### Long Press Down Event ###
        longPressDown = ->
          @mouseDownTime = $.now()
          @timeOut = setTimeout runTimeout, opts.pressDuration
          progress()
          Log "LongPress Started."

        ### Long Press Up Event ###
        longPressUp = ->
          @mouseUpTime = $.now() - @mouseDownTime
          clearTimeout(@timeOut)

          if @mouseUpTime < opts.pressDuration
            progress(status="disable")
          else
            progress(status="unlocked")

          Log "#{@mouseUpTime / 1000}s Pressed. "
          Log "LongPress Stopped."

        ### Bind Events ###
        bindEvents = ->
          $(window)
            .bind "resize", coverObject
          context
            .bind "resize", coverObject

          wrapObject
            .bind "mousedown touchstart", longPressDown
            .bind "mouseup touchend", longPressUp

          Log "Events bounded."

        ### Init wrap and bind events ###
        start : ->
          Log "Starting plugin..."
          applyCss()
          wrapIframe()
          bindEvents()
          Log "Plugin Started."

        ### Removes everything ###
        stop : ->
          Log "Stopping plugin..."
          context.removeAttr "style"
          if context.parent().is ".#{ opts.wrapClass }"
            context.unwrap()

          $(".#{ opts.overlayClass }").remove()
          Log "Plugin Stopped."
