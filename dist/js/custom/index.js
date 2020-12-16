jQuery(function() {
    $.ajax({
        //url: "https://sad-newton-07bc38.netlify.app/.netlify/functions/api",
        url: "http://localhost:9000/.netlify/functions/api",
        method: "GET",
        type: "json",
        // crossDomain: true,
        // dataType: 'jsonp',
        //data: {word : word},
        success: function(result)
        {
            //document.getElementById('word').innerText = result.word;
            $('#word').text(result.word);
            console.log(result);
            console.log('success');
        },
        error:function(){
            console.log("ajax failure");
        }
    });
})