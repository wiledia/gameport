var KQuickPanel = function() {
    var panel = BPutil.get('bp_quick_panel');
    var notificationPanel = BPutil.get('bp_quick_panel_tab_notifications');
    var actionsPanel = BPutil.get('bp_quick_panel_tab_actions');
    var settingsPanel = BPutil.get('bp_quick_panel_tab_settings');

    var getContentHeight = function() {
        var height;
        var nav = BPutil.find(panel, '.bp-quick-panel__nav');
        var content = BPutil.find(panel, '.bp-quick-panel__content');

        height = parseInt(BPutil.getViewPort().height) - parseInt(BPutil.actualHeight(nav)) - (2 * parseInt(BPutil.css(nav, 'padding-top'))) - 10;

        return height;
    }

    var initOffcanvas = function() {
        var offcanvas = new KOffcanvas(panel, {
            overlay: true,  
            baseClass: 'bp-quick-panel',
            closeBy: 'bp_quick_panel_close_btn',
            toggleBy: 'bp_quick_panel_toggler_btn'
        });   
    }

    var initNotifications = function() {
        BPutil.scrollInit(notificationPanel, {
            disableForMobile: true, 
            resetHeightOnDestroy: true, 
            handleWindowResize: true, 
            height: function() {
                return getContentHeight();
            }
        });
    }

    var initActions = function() {
        BPutil.scrollInit(actionsPanel, {
            disableForMobile: true, 
            resetHeightOnDestroy: true, 
            handleWindowResize: true, 
            height: function() {
                return getContentHeight();
            }
        });
    }

    var initSettings = function() {
        BPutil.scrollInit(settingsPanel, {
            disableForMobile: true, 
            resetHeightOnDestroy: true, 
            handleWindowResize: true, 
            height: function() {
                return getContentHeight();
            }
        });
    }

    var updatePerfectScrollbars = function() {
        $(panel).find('a[data-toggle="tab"]').on('shown.bs.tab', function (e) { 
            BPutil.scrollUpdate(notificationPanel);
            BPutil.scrollUpdate(actionsPanel);
            BPutil.scrollUpdate(settingsPanel);
        });
    }

    return {     
        init: function() {  
            initOffcanvas(); 
            initNotifications();
            initActions();
            initSettings();
            updatePerfectScrollbars();
        }
    };
}();

$(document).ready(function() {
    KQuickPanel.init();
});