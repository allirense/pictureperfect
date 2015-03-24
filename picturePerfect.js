/*!
 * PicturePerfect.js v 0.1
 * Contain your images!
 * MIT License
 */

(function($){
  $.fn.picturePerfect = function(selector) {
    this.each( function() {
      var $this = $(this);
      $this.imagesLoaded().always(function(instance) {
        $this.find(selector).children('img').each(function() {
            var image = new Image();
            image.src = $(this).attr('src');
            var h = image.naturalHeight;
            var w = image.naturalWidth;
            var newWidth;
            var newHeight;
            var centered = true;
            var parentWidth = $(this).parent('div').width();
            var parentHeight = $(this).parent('div').height();
            // Set orientation and height or width
            if (h > w) {
              var orientation = 'portrait';
              $(this).css({
                'width' : '100%',
                'height' : 'auto'
              });
              newWidth = $(this).width();
              newHeight = $(this).height();
            } else if (w > h) {
              var orientation = 'landscape';
              $(this).css({
                'width' : 'auto',
                'height' : '100%'
              });
              newWidth = $(this).width();
              newHeight = $(this).height();
            } else {
              var orientation = 'square';
              $(this).css({
                'width' : '100%',
                'height' : '100%'
              });
            }
            var heightOffset = (parentHeight - newHeight)/2;
            var widthOffset = (parentWidth - newWidth)/2
            // Center image horizontally or vertically as needed
            if (centered && orientation === 'portrait') {
                $(this).css('top',heightOffset + 'px');
            } else if (centered && orientation === 'landscape') {
              $(this).css('left',widthOffset + 'px');
            } 
        });
      });
    });
  }
})(jQuery);