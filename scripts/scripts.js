  $( document ).ready(function() {
    const swiper = new Swiper('.swiper-container', {
      loop: true,
      autoplay: true,
    });

    $('.modal_overlay .close').click(function(){
        $(this).closest(".modal_overlay").addClass("hidden");
    })

    $('.form_overlay .close').click(function(){
      $(this).closest(".form_overlay").addClass("hidden");
  })

    $('.video_wrap .inner .one').click(function(){
        $(".modal_overlay").removeClass("hidden");
    })

    $('.assigne_btn').click(function(){
      $(".form_overlay").removeClass("hidden");
  })
});