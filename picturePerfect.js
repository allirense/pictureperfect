/*!
 * PicturePerfect.js v 1.0.2
 * Contain your images!
 * Bult by Alli Rense www.allirense.com
 * MIT License
 */

(function ($) {
  'use strict';
  $.fn.picturePerfect = function(settings) {
    // Options!
    /* var defaults = {
      selector: '.image-container',
      centered: true
    },
    settings = $.extend({}, defaults, options); */
    var config = {
      'selector': '.image-container',
      'centered': true
    };
    if (settings){$.extend(config, settings);}
    return this.each( function() {;
      var $this = $(this);
      $this.imagesLoaded().always(function(instance) {
        $this.find(config.selector).children('img').each(function() {
            var image = new Image();
            var thisImg = $(this);
            image.src = thisImg.attr('src');
            var h = image.naturalHeight;
            var w = image.naturalWidth;
            var imageRatio = h/w;
            var parentWidth = thisImg.parent().width();
            var parentHeight = thisImg.parent().height();
            var parentRatio = parentHeight/parentWidth;
            var heightDif = parentHeight - h;
            var ratioDif = parentRatio - imageRatio;
            // Define Resizing Functions
            var newWidth;
            var newHeight;
            console.log('img ht: ' + h + ' img wd: ' + w);
            console.log('ratio: ' + imageRatio);
            console.log('parent h: ' + parentHeight + ' parent w: ' + parentHeight);
            console.log('parent ratio: ' + parentRatio);
            console.log('height dif: ' + heightDif);
            console.log('ratio dif: ' + ratioDif);
            
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
            console.log('height dif: ' + hDif);
            // Determine Ratio Difference
            var rDif;
            if (ratioDif === 0) {
              rDif = 'none'
            } else if (ratioDif > 0) {
              rDif = 'pos'
            } else {
              rDif = 'neg'
            }
            console.log('ratio dif: ' + rDif);
            // Run resizing function depending on Height and Ratio Difference
            var auto;
            if (rDif === 'none') {
              console.log('no ratio difference, running bothFull');
              var auto = 'none';
              bothFull();
            } else if ((hDif === 'none' && rDif === 'pos') || (hDif === 'pos' && rDif === 'pos') || (hDif === 'neg' && rDif === 'pos') || (hDif === 'none' && rDif === 'neg')) {
              console.log('running widthAuto')
              var auto = 'width'
              widthAuto();
            } else if ((hDif === 'pos' && rDif === 'neg') || (hDif === 'neg' && rDif === 'neg')) {
              console.log('running heightAuto');
              var auto = 'height';
              heightAuto();
            }
            console.log('----------------------');
            // Center image horizontally or vertically as needed
            var heightOffset = (parentHeight - newHeight)/2;
            var widthOffset = (parentWidth - newWidth)/2
            if (config.centered) {
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