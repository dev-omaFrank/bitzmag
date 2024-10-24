$("document").ready(function() {

    //Enable Form Input
    $("#email").click(function() { $(this).removeAttr("readonly"); });
    $("#password").click(function() { $(this).removeAttr("readonly"); });



    //Registration Form
    $('#login-form').submit(function(e) {
        e.preventDefault()

        $("#login-form").validate({
            rules: {
                email: {
                    required: true,
                    email: true
                }
            },

            messages: {
                email: swal('Alert!!', "Please enter a valid email address", "error")
            }

        })

        var password = $("#password").val();
        var regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (!regex.test(password)) {
            swal('Alert!!', "Invalid password. It must be at least 8 characters long, include an uppercase letter, a lowercase letter, a number, and a special character.", "error");
        }

        $('#submit-btn').removeClass("btn-primary");
        $('#submit-btn').addClass("btn-secondary");
        $('#submit-btn').html('<i class="fa fa-spinner fa-spin" aria-hidden="true"></i> Processing ...');

        $.ajax({
            url: '../process/',
            data: new FormData($(this)[0]),
            cache: false,
            contentType: false,
            processData: false,
            method: 'POST',
            type: 'POST',
            success: function(resp) {

                resp = JSON.parse(resp);

                if (resp.status == "success") {
                    swal('Alert!!', "Login Succesfull", "success");
                    setTimeout(function() {
                        location.replace('../home/')
                    }, 1000)
                } else {
                    swal('Alert!!', resp.msg, "error");
                }

            }
        })
        $('#submit-btn').removeClass("btn-secondary");
        $('#submit-btn').addClass("btn-primary");
        $('#submit-btn').html("<b>Login</b>");
    });

});
