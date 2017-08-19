/**
  * @file
  * Javascript file for theme custimization on lastarter_sub
  *
  *
  */

(function ($, Drupal, window, document, undefined) {
  function transitionBackgroundsInit(numBackgrounds, transitionLength) {
    var next = 0;

    var path = $('script[src*=script-sub]').attr('src');
    path = path.substring(0, path.indexOf("/js/"));

    var ch35tile = '70941'; // for prod
    if($('.isotope-nid-64551').length) {
      ch35tile = '64551'; // for staging
    }

    var firstHero = $('.front .header__region .view-heros .view-content .field-content img').attr('src');

    function transitionHero(next) {
      if(next == 0) {
        $('.front .header__region .view-heros .view-content .field-content')
        .prepend('<img src=' + firstHero + '>');
      }
      else {
        $('.front .header__region .view-heros .view-content .field-content')
        .prepend('<img src="' + path + '/images/heros/hero_' + next + '.jpg">');
      }

      $('.front .header__region .view-heros .view-content .field-content img:eq(1)')
      .fadeOut(4000, function() {
        $(this).remove();
      });
    }

    function transitionTile(nid, tileNum, next) {
      $('.front .view-isotope-tiles .isotope-nid-' + nid + ' article.node-' + nid + ':eq(0)')
        .clone().prependTo('.front .view-isotope-tiles .isotope-nid-' + nid)
        .css('background-image','url("' + path + '/images/tiles/hero_' + next + '/tile_' + tileNum + '.jpg")');

      $('.front .view-isotope-tiles .isotope-nid-' + nid + ' article.node-' + nid + ':eq(1)').
      fadeOut(4000, function() {
        $(this).remove();
      });
    }

    function transitionBackgrounds(direction) {
      // Go forwards one image
      if(direction == 1) {
        if(next == numBackgrounds-1) {
          next = 0;
        }
        else {
          next++;
        }
      }
      // Go backwards one image
      else {
        if(next == 0) {
          next = numBackgrounds-1;
        }
        else {
          next--;
        }
      }
      transitionHero(next);
      transitionTile(1261, 0, next);
      transitionTile(1266, 1, next);
      transitionTile(1271, 2, next);
      transitionTile(ch35tile, 3, next);
    }

    // Init controls + transitions
    $('.front .header__region .view-heros').addClass('transition-backgrounds');

    $('.front .view-heros.transition-backgrounds').prepend('<div id="prev"><i class="fa fa-chevron-left" aria-hidden="true"></i></div>');
    $('.front .view-heros.transition-backgrounds').append('<div id="next"><i class="fa fa-chevron-right" aria-hidden="true"></i></div>');

    var interval = setInterval(transitionBackgrounds, transitionLength, 1);
    $('.front .view-heros.transition-backgrounds #next').click(function() {
      clearInterval(interval);
      transitionBackgrounds(1);
      interval = setInterval(transitionBackgrounds, transitionLength, 1);
    });
    $('.front .view-heros.transition-backgrounds #prev').click(function() {
      clearInterval(interval);
      transitionBackgrounds(-1);
      interval = setInterval(transitionBackgrounds, transitionLength, 1);
    });
  }

  $( document ).ready(function() {
    transitionBackgroundsInit(3, 16000);
  });
})(jQuery, Drupal, this, this.document);
