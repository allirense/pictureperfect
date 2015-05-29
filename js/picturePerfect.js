/*!
 * PicturePerfect.js v 0.1
 * Contain your images!
 * Bult by Alli Rense www.allirense.com
 * MIT License
 */

(function ($) {
  'use strict';
  $.fn.picturePerfect = function(options) {
    // Options!
    var defaults = {
      selector: '.image-container',
      centered: true
    },
    settings = $.extend({}, defaults, options);
    this.each( function() {;
      var $this = $(this);
      $this.imagesLoaded().always(function(instance) {
        $this.find(settings.selector).children('img').each(function() {
            var image = new Image();
            var thisImg = $(this);
            image.src = thisImg.attr('src');
            var h = image.naturalHeight;
            var w = image.naturalWidth;
            var imageRatio = h/w;
            var parentWidth = thisImg.parent('div').width();
            var parentHeight = thisImg.parent('div').height();
            var parentRatio = parentHeight/parentWidth;
            var heightDif = parentHeight - h;
            var ratioDif = parentRatio - imageRatio;
            // Define Resizing Functions
            var newWidth;
            var newHeight;
            function heightAuto() {
              thisImg.css({
                'width' : '100%',
                'height' : 'auto'
              });
              newWidth = thisImg.width();
              newHeight = thisImg.height();
            }
            function widthAuto() {
              thisImg.css({
                'width' : 'auto',
                'height' : '100%'
              });
              newWidth = thisImg.width();
              newHeight = thisImg.height();
            }
            function bothFull() {
              thisImg.css({
                'width' : '100%',
                'height' : '100%'
              });
            }
            // Determine Height Difference
            var hDif;
            if (heightDif === 0) {
              hDif = 'none'
            } else if (heightDif > 0) {
              hDif = 'pos'
            } else {
              hDif = 'neg'
            }
            // Determine Ratio Difference
            var rDif;
            if (ratioDif === 0) {
              rDif = 'none'
            } else if (ratioDif > 0) {
              rDif = 'pos'
            } else {
              rDif = 'neg'
            }
            // Run resizing function depending on Height and Ratio Difference
            var auto;
            if (rDif === 'none') {
              var auto = 'none';
              bothFull();
            } else if ((hDif === 'pos' && rDif === 'pos') || (hDif === 'neg' && rDif === 'pos') || (hDif === 'none' && rDif === 'neg')) {
              var auto = 'width'
              widthAuto();
            } else if ((hDif === 'none' && rDif === 'pos') || (hDif === 'pos' && rDif === 'neg') || (hDif === 'neg' && rDif === 'neg')) {
              var auto = 'height';
              heightAuto();
            }
            // Center image horizontally or vertically as needed
            var heightOffset = (parentHeight - newHeight)/2;
            var widthOffset = (parentWidth - newWidth)/2
            if (settings.centered) {
              if (auto === 'height') {
                thisImg.css('top',heightOffset + 'px');
              } else if (auto === 'width') {
                thisImg.css('left',widthOffset + 'px');
              } else {
                thisImg.css('top',heightOffset + 'px');
                thisImg.css('left',widthOffset + 'px');
              }
            }
        });
      });
    });
  }
})(jQuery);