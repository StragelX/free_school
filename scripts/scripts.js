  $( document ).ready(function() {
    const swiper = new Swiper('.swiper-container', {
      loop: true,
    });

    $('.modal_overlay .close').click(function(){
        $(this).closest(".modal_overlay").addClass("hidden");
    })

    $('.video_wrap .inner .one').click(function(){
        $(".modal_overlay").removeClass("hidden");
    })
});