$.fn.editable.defaults.params = function (params) {
    params._token = BP.token;
    params._editable = 1;
    params._method = 'PUT';
    return params;
};

$.fn.editable.defaults.error = function (data) {
    var msg = '';
    if (data.responseJSON.errors) {
        $.each(data.responseJSON.errors, function (k, v) {
            msg += v + "\n";
        });
    }
    return msg
};

toastr.options = {
    closeButton: true,
    progressBar: true,
    showMethod: 'slideDown',
    timeOut: 4000
};

$.pjax.defaults.timeout = 5000;
$.pjax.defaults.maxCacheLength = 0;
$(document).pjax('a:not(a[target="_blank"])', {
    container: '#pjax-container'
});

NProgress.configure({parent: '#backport'});

$(document).on('pjax:timeout', function ( event) {
    event.preventDefault();
})

$(document).on('submit', 'form[pjax-container]', function (event) {
    $.pjax.submit(event, '#pjax-container');
});

$(document).on("pjax:popstate", function () {

    $(document).one("pjax:end", function (event) {
        $(event.target).find("script[data-exec-on-popstate]").each(function () {
            $.globalEval(this.text || this.textContent || this.innerHTML || '');
        });
    });
});

$(document).on('pjax:send', function (xhr) {

    if (xhr.relatedTarget && xhr.relatedTarget.tagName && xhr.relatedTarget.tagName.toLowerCase() === 'form') {
        $submit_btn = $('form[pjax-container] :submit');
        if ($submit_btn) {
            $submit_btn.button('loading')
        }
    }
    NProgress.start();
});

$(document).on('pjax:complete', function (xhr) {
    if (xhr.relatedTarget && xhr.relatedTarget.tagName && xhr.relatedTarget.tagName.toLowerCase() === 'form') {
        $submit_btn = $('form[pjax-container] :submit');
        if ($submit_btn) {
            $submit_btn.button('reset')
        }
    }
    NProgress.done();
});

$(function () {
    var menu = $('.bp-menu__nav');
    $('.bp-menu__nav li:not(.bp-menu__item--submenu) > a').on('click', function () {
        menu.find('.bp-menu__item--active').removeClass('bp-menu__item--active');
        var $parent = $(this).parent().addClass('bp-menu__item--active');
        $parent.siblings('.bp-menu__item--open').removeClass('bp-menu__item--open');
    });
    var submenu = $('.bp-menu__nav li > a[href="' + (location.pathname + location.search + location.hash) + '"]').parent().addClass('bp-menu__item--active');
    submenu.parents('li.bp-menu__item--submenu').addClass('bp-menu__item--open');

    $('[data-toggle="popover"]').popover();

    autosize($('textarea'));
});

(function ($) {
    $.fn.admin = BP;
    $.admin = BP;

})(jQuery);
