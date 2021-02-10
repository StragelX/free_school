$(function () {
  $('.counter-data').appear(function () {
    $('.counter-number').countTo();
  });

  var scrollPos = 0;
  var header = document.getElementById("navigation");
  var sticky = document.getElementById("description").offsetTop;
  window.onscroll = function () {
    var currentScroll = (document.body.getBoundingClientRect()).top;
    if (currentScroll > scrollPos) {
      stickHeaderOnScroll(currentScroll, 'UP');
    } else {
      stickHeaderOnScroll(currentScroll, 'DOWN');
    }
    scrollPos = currentScroll;
  };

  function stickHeaderOnScroll(currentScroll, scrollDirection) {
    if (window.pageYOffset > sticky) {
      header.classList.add("sticky");
      // currentScroll *= -1;
      // var currentPosition = parseInt($('#navigation').css('top'));
      // var diff = currentPosition - currentScroll;

      if (scrollDirection === 'UP') {
        header.classList.add("sticky-fixed");
        header.setAttribute('style', 'top:0px');
        // header.setAttribute('style', 'transform:translateY(-90px)');
      } else {
        header.classList.remove("sticky-fixed");
      }
      // else {
      //   header.classList.remove("sticky-fixed");
      //   if (diff > 90 || diff < -90) {
      //     if (scrollDirection === 'DOWN' || currentScroll > 0) {
      //       currentScroll -= 90;
      //       header.setAttribute('style', 'top:' + currentScroll + 'px');
      //     }
      //   } else if (scrollDirection === 'UP' && diff > 0) {
      //     header.setAttribute('style', 'top:' + currentScroll + 'px');
      //   }
      // }
    } else {
      header.classList.remove("sticky");
      $('#navigation').removeAttr('style');
    }
  }

  // SCROLL DOWN SPEED
  $('a.page-scroll').on('click', function (event) {
    var targetHref = $(this).attr('href');
    $('html, body').animate({
      scrollTop: $(targetHref).offset().top
    }, 1200);
    event.preventDefault();
  });

  // Gallery
  var gallerySlider = function () {
    var current = $('#gallery-list').find('.active').index();
    $('#gallery-list').find('.active').removeClass('active');
    current += 1;
    if (current > 4) {
      current = 0;
    }

    $($('#gallery-list li')[current]).addClass('active');
    $('.gallery-img:visible').fadeOut(300, function () {
      $($('.gallery-img')[current]).fadeIn(300);
    });
  };

  var gallerySliderInterval = setInterval(gallerySlider, 5000);

  $('.show-requirements-details').on('click', function () {
    $(this).removeClass('show-requirements-details');
  });

  // MENU-BAR TOGGLE
  $('.bar-toggler').on('click', function () {
    $('.navbar-collapse').toggleClass('show');
    $('.bar-toggler').toggleClass('change');
  });

  $('.click-hide').on('click', function () {
    $('.bar-toggler').trigger('click')
  });

  function isFormError() {
    var isError = false;
    var list = ['parent_name', 'child_name', 'klass', 'city', 'email', 'phone'];
    $.each(list, function (key, field) {
      var value = $('input[name=' + field + ']').val();
      if (!value) {
        $('input[name=' + field + ']').parent().addClass('input-error');
        isError = true;
      } else {
        $('input[name=' + field + ']').parent().removeClass('input-error');
      }
    });

    var email = $('input[name=email]').val();
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    isEmailError = !re.test(email.toLowerCase());
    if (isEmailError) {
      $('input[name=email]').parent().addClass('input-error');
      isError = true;
    }

    return isError;
  }

  $('#sendRequestButton').on('click', function (e) {
    e.preventDefault();
    

    if (!isFormError()) {
      $('#sendRequestButton').hide();
      $('.error-note').hide();

      var data = $('form').serialize();
      $.post('/send.php', {data: data}, function (result) {
        $('#sendRequestButton').show();
        if (result['status'] === 'ok') {
          $('#formSentModal').modal('show');
        } else {
          alert('Помилка сервера! Зверніться за номером: +38(067)674-46-69 ');
        }
      }, 'json');
    } else {
      $('.error-note').show();
    }
  });

  $('.nav-link').on('click', function () {
    if ($('.navbar-collapse.show').length) {
      $('.bar-toggler').trigger('click');
    }
  });

  $('#gallery-list li').on('mouseenter', function () {
    var current = $(this).index();
    clearInterval(gallerySliderInterval);

    $('#gallery-list .active').removeClass('active');
    $(this).addClass('active');
    $('.gallery-img:visible').fadeOut(300, function () {
      $($('.gallery-img')[current]).fadeIn(300);
    });
  });

  $('#gallery-list li').on('mouseleave', function () {
    gallerySliderInterval = setInterval(gallerySlider, 5000);
  });

});