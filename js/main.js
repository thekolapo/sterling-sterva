function toggleAnswer(x){
    $(x).siblings().toggle();

    if($(x).siblings().is( ":visible" )){
        $(x).children().find('i').removeClass('fa-plus-circle').addClass('fa-minus-circle');
    }
    else{
        $(x).children().find('i').removeClass('fa-minus-circle').addClass('fa-plus-circle');
    }
   
}



function expandText(x){
    $(x).parent().siblings().toggle();

    if ($(x).parent().siblings().is(':visible') ){
        $(x).html("Read Less");
    }
    else{
        $(x).html("Read More");
    }
}

function toggleConsumptionType(x){
    if(x.selectedIndex == 0){
        $('.box-add-device').css('display', 'none');
        $('#device-list').css('display', 'none');
    }
    else{
        $('.box-add-device').css('display', 'block');
        $('#device-list').css('display', 'block');
    }
   
}

function toggleChat(){
    $(".chat-box").toggle();
}

$( document ).ready(function() {
    var height = document.getElementById('hero-bottom-right').style.height;
    // alert(height);
    // $('#hero-bottom-left').css('height', ""+height+"px");
});

var ts;

$(document.body).on("touchstart", function(event) {
    ts = event.originalEvent.touches[0].clientY;
    event.preventDefault();
    event.stopPropagation();
});

$(document.body).on("touchmove", function(event) {
    event.preventDefault();
    event.stopPropagation();
});
    
$("a").on('click', function(event) {

    // Make sure this.hash has a value before overriding default behavior
    if (this.hash !== "") {
      // Prevent default anchor click behavior
      event.preventDefault();

      // Store hash
      var hash = this.hash;

      // Using jQuery's animate() method to add smooth page scroll
      // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
      $('html, body').animate({
        scrollTop: $(hash).offset().top
      }, 1000, function(){

        // Add hash (#) to URL when done scrolling (default click behavior)
        window.location.hash = hash;
      });
    } // End if
});

