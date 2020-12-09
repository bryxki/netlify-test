// const link = async () => {
//     const res = await fetch('/api');
//     const word = await res.text();
//     document.getElementById('word').innerText = word;
// };

// link();
$(document).ready(function() {
    $.ajax({
        url: "/api",
        //url: "http://localhost:9000/api",
        //headers: {  'Access-Control-Allow-Origin': 'http://localhost:9000/api'},
        method: "GET",
        type: "json",
        // crossDomain: true,
        // dataType: 'jsonp',
        //data: {word : word},
        success: function(result)
        {
            document.getElementById('word').innerText = result.word;
 
            console.log(result);
            console.log('success');
        },
        error:function(){
            console.log("ajax failure");
        }
    });
})