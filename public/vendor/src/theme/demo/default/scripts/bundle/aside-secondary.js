"use strict";
var KAsideSecondary = function() {
    var panel = BPutil.get('bp_aside_secondary');
    var content1 = BPutil.get('bp_aside_secondary_tab_1');
    var content2 = BPutil.get('bp_aside_secondary_tab_2');
    var content3 = BPutil.get('bp_aside_secondary_tab_3');
    var scroll1 = BPutil.find(content1, '.bp-aside-secondary__content-body');
    var scroll2 = BPutil.find(content2, '.bp-aside-secondary__content-body');
    var scroll3 = BPutil.find(content3, '.bp-aside-secondary__content-body');
    var mobileNavToggler;
    var lastOpenedTab;

    var getContentHeight = function(content) {
        var height;
        var head = BPutil.find(content, '.bp-aside-secondary__content-head');
        var body = BPutil.find(content, '.bp-aside-secondary__content-body');

        height = parseInt(BPutil.getViewPort().height) - parseInt(BPutil.actualHeight(head)) - 60;
        
        if (BPutil.isInResponsiveRange('desktop')) {
            height = height - BPutil.actualHeight(BPutil.get('bp_header'));
        } else {
            height = height - BPutil.actualHeight(BPutil.get('bp_header_mobile'));
        }

        return height;
    }
    
    var initNavs = function() {
        $('#bp_aside_secondary_nav a[data-toggle="tab"]').on('click', function (e) {
            if ((lastOpenedTab && lastOpenedTab.is($(this))) && $('body').hasClass('bp-aside-secondary--expanded')) {
                KLayout.closeAsideSecondary();
            } else {
                lastOpenedTab =  $(this);
                KLayout.openAsideSecondary();                
            }
        });

        $('#bp_aside_secondary_close').on('click', function (e) {
            KLayout.closeAsideSecondary();
        });

        $('#bp_aside_secondary_nav a[data-toggle="tab"]').on('shown.bs.tab', function (e) { 
            BPutil.scrollUpdate(scroll1);
            BPutil.scrollUpdate(scroll2);
            BPutil.scrollUpdate(scroll3);
        });

        mobileNavToggler = new KToggle('bp_aside_secondary_mobile_nav_toggler', {
            target: 'body',
            targetState: 'bp-aside-secondary--mobile-nav-expanded'
        });
    }

    var initContent1 = function() {
        BPutil.scrollInit(scroll1, {
            disableForMobile: true, 
            resetHeightOnDestroy: true, 
            handleWindowResize: true, 
            height: function() {
                return getContentHeight(content1);
            }
        });
    }

    var initContent2 = function() {
        BPutil.scrollInit(scroll2, {
            disableForMobile: true, 
            resetHeightOnDestroy: true, 
            handleWindowResize: true, 
            height: function() {
                return getContentHeight(content2);
            }
        });
    }

    var initContent3 = function() {
        BPutil.scrollInit(scroll3, {
            disableForMobile: true, 
            resetHeightOnDestroy: true, 
            handleWindowResize: true, 
            height: function() {
                return getContentHeight(content3);
            }
        });
    }

    return {     
        init: function() {  
            //initOffcanvas(); 
            initNavs();
            initContent1();
            initContent2();
            initContent3();
        }
    };
}();

$(document).ready(function() {
    if (BPutil.get('bp_aside_secondary')) {
        KAsideSecondary.init();
    }
});