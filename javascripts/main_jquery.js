$( document ).ready(function() {
  $(".toggle_container").hide();
  $(".toggle_trigger").click(function(){
    $(this).toggleClass("active").next().slideToggle("normal");
    return false;
  });
});

    


