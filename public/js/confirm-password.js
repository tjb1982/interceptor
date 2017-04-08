$(document).ready(function(){
    $('#submit').prop('disabled', true);

   $('#password, #confirm').on('keyup', function () {

       if($("#password").val().length == 0 && $("#confirm").val().length == 0){
           $('#submit').prop('disabled', true);
           $("#message").html("");
       } else if ( $("#password").val().length > 0 && ($('#password').val() == $('#confirm').val())) {
           $('#message').html('Matching').css('color', 'green');
           $('#submit').prop('disabled', false);
        } else {
            $('#message').html('Not Matching').css('color', 'red');
            $('#submit').prop('disabled', true);
        } 
    });
});