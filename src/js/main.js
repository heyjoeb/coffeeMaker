/* main.js */
$(document).ready(function() {
  // SCROLL ANIMATION
    var $animationElements = $('.animate-element');
    var $window = $(window);

    function checkIfInView() {
      var windowHeight = $window.height();
      var windowTopPosition = $window.scrollTop();
      var windowBottomPosition = (windowTopPosition + windowHeight);
      $.each($animationElements, function() {
        var $element = $(this);
        var elementHeight = $element.outerHeight();
        var elementTopPosition = $element.offset().top;
        var elementBottomPosition = (elementTopPosition + elementHeight);
        //check to see if this current container is within viewport
        if ((elementBottomPosition >= windowTopPosition) &&
            (elementTopPosition <= windowBottomPosition)) {
          $element.addClass('in-view');
        } else {
          $element.removeClass('in-view');
        }
      });
    }
    $window.on('scroll resize', checkIfInView);
    $window.trigger('scroll');
  // ADD CLASS TO BODY ON SCROLL
    $(function () {
        $(window).scroll(function () {
            var top_offset = $(window).scrollTop();
            $('#scrollTop').html(top_offset);
            if (top_offset == 0) {
                $('body')
                .removeClass('is-scrolling')
            } else {
                $('body').addClass('is-scrolling');
            }
        })
    });
  // scrollspy
  $('body').scrollspy({ target: '#scroller' });
  // smoothscroll
  $('.section-main-header .nav-link, .navbar-brand, .footer-scroll a').click(function() {
    var sectionTo = $(this).attr('href');
    $('html, body').animate({
      scrollTop: $(sectionTo).offset().top
    }, 500);
  });
  //scroll donw
  $(".section-intro__btn").click(function() {
    $('html, body').animate({
        scrollTop: $("#program").offset().top
    }, 1000);
  });
  /* gallery slider */
  $('.section-gallery__slider').slick({
    arrows: true,
    centerMode: true,
    slidesToShow: 3,
    prevArrow: $('.prev'),
    nextArrow: $('.next'),
    responsive: [
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 2
        }
      },
      {
        breakpoint: 500,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
      // You can unslick at a given breakpoint now by adding:
      // settings: "unslick"
      // instead of a settings object
  ]
  });
  /* testimonials slider */
  $('.section-testimonials__slider').slick({
    arrows: true,
    dots: true,
    prevArrow: $('.prev-2'),
    nextArrow: $('.next-2')
  });
  /* partners slider */
  $('.section-partners__slider').slick({
    arrows: true,
    slidesToShow: 6,
    infinite: true,
    prevArrow: $('.prev-3'),
    nextArrow: $('.next-3'),
      responsive: [
        {
          breakpoint: 900,
          settings: {
            slidesToShow: 4
          }
        },
        {
          breakpoint: 500,
          settings: {
            slidesToShow: 1,
          }
        }
        // You can unslick at a given breakpoint now by adding:
        // settings: "unslick"
        // instead of a settings object
    ]
  });
});
var $gallery = $('.section-gallery__slider');
  var slideCount = null;
  $gallery.on('init', function(event, slick){
    slideCount = slick.slideCount;
    setSlideCount();
    setCurrentSlideNumber(slick.currentSlide);
  });

  $gallery.on('beforeChange', function(event, slick, currentSlide, nextSlide){
    setCurrentSlideNumber(nextSlide);
  });

  function setSlideCount() {
    var $el = $('.slide-count-wrap').find('.total');
    $el.text(slideCount);
  }

  function setCurrentSlideNumber(currentSlide) {
    var $el = $('.slide-count-wrap').find('.current');
    $el.text(currentSlide + 1);
  }
function init() {
  // FADE IN
  $('body').removeClass('fade-out');   
}
window.onload = init();
