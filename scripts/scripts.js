  $( document ).ready(function() {
    const swiper = new Swiper('.swiper-container', {
      loop: true,
      autoplay: true,
    });

    $('.modal .close').click(function(){
      $(this).closest(".modal").addClass("hidden");
      $("body").removeClass('no_scroll');
    })

    $('.video_wrap .inner .one').click(function(){
      $(".modal_overlay").removeClass("hidden");
      $("body").addClass('no_scroll');
    })

    $('.assigne_btn').click(function(){
      $(".form_overlay").removeClass("hidden");
      $("body").addClass('no_scroll');
    })

    $('.who_interested ul li').mouseover(function(){
      $('.who_interested .img_wrap img').attr('src',$(this).attr('data-img'));
    })

    $('.our_values ul li').mouseover(function(){
      $('.our_values .img_wrap img').attr('src',$(this).attr('data-img'));
    })

    $('.counter-number').appear(function () {
      $('.counter-number').countTo();
    });

    function isFormError() {
      var isError = false;
      var list = ['parent_name', 'child_name', 'klass', 'email', 'phone'];
      $.each(list, function (key, field) {
        var value = $('input[name=' + field + ']').val();
        if (!value) {
          $('input[name=' + field + ']').addClass('invalide');
          isError = true;
        } else {
          $('input[name=' + field + ']').removeClass('invalide');
        }
      });
  
      var email = $('input[name=email]').val();
      const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      isEmailError = !re.test(email.toLowerCase());
      if (isEmailError) {
        $('input[name=email]').addClass('invalide');
        isError = true;
      }
  
      return isError;
    }

    $('#sendRequestButton').on('click', function (e) {
      e.preventDefault();
  
      if (!isFormError()) {
        $('#sendRequestButton').hide();
        $('.error_note').hide();
  
        var data = $('form').serialize();
        $.post('/send.php', {data: data}, function (result) {
          $('#sendRequestButton').show();
          if (result['status'] === 'ok') {
            $(".thanks_overlay").removeClass("hidden");
            $("body").addClass('no_scroll');
          } else {
            alert('Помилка сервера! Зверніться за номером: +38(067)674-46-69 ');
          }
        }, 'json');
      } else {
        $('.error_note').show();
      }
    });
});