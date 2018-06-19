require(['jquery', 'handlebars'], function($, handlebars) {
    $('body').css('background', '#7e0505');
    $.ajax({
        url: '/list',
        dataType: 'json',
        success: function(data) {
            var tpl = $('#tpl').html();
            var template = handlebars.compile(tpl);
            var html = template(data);
            $('.cloths').append(html);
        }
    })
})