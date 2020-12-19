jQuery(function() {
    //login
    $('#login').on("submit", function(e) {
        e.preventDefault();
        $.ajax({
            url: "https://sad-newton-07bc38.netlify.app/.netlify/functions/api",
            //url: "http://localhost:9000/.netlify/functions/api/login",
            method: "POST",
            type: "json",
            data: {email: $('#email').val(), password: $('#password').val()},
            // crossDomain: true,
            // dataType: 'jsonp',
            //data: {word : word},
            success: function(result)
            {
                //document.getElementById('word').innerText = result.word;
                //$('#word').text(result.word);
                console.log(result);
                //console.log('success');
            },
            error:function(){
                console.log("ajax failure");
            }
        });
    });

    //register
    $('#register').on("submit", function(e) {
        e.preventDefault();
        $.ajax({
            url: "https://sad-newton-07bc38.netlify.app/.netlify/functions/api",
            //url: "http://localhost:9000/.netlify/functions/api/register",
            method: "POST",
            type: "json",
            data: {name: $('#r-name').val(), email: $('#r-email').val(), password: $('#r-password').val()},
            // crossDomain: true,
            // dataType: 'jsonp',
            //data: {word : word},
            success: function(result)
            {
                //document.getElementById('word').innerText = result.word;
                //$('#word').text(result.word);
                console.log(result);
                //console.log('success');
            },
            error:function(){
                console.log("ajax failure");
            }
        });
    });
})