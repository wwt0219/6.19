define(['jquery'], function($) {
    function arr(num) {
        $.ajax({
            url: '/arr',
            dataType: 'json',
            success: function(data) {
                var str = JSON.stringify(data);
                var arr = [];
                arr.push(str);

            }
        })
    }


})