var KOffcanvasPanel = function() {
    var notificationPanel = BPutil.get('bp_offcanvas_toolbar_notifications');
    var quickActionsPanel = BPutil.get('bp_offcanvas_toolbar_quick_actions');
    var profilePanel = BPutil.get('bp_offcanvas_toolbar_profile');
    var searchPanel = BPutil.get('bp_offcanvas_toolbar_search');

    var initNotifications = function() {
        var head = BPutil.find(notificationPanel, '.bp-offcanvas-panel__head');
        var body = BPutil.find(notificationPanel, '.bp-offcanvas-panel__body');

        var offcanvas = new KOffcanvas(notificationPanel, {
            overlay: true,  
            baseClass: 'bp-offcanvas-panel',
            closeBy: 'bp_offcanvas_toolbar_notifications_close',
            toggleBy: 'bp_offcanvas_toolbar_notifications_toggler_btn'
        }); 

        BPutil.scrollInit(body, {
            disableForMobile: true, 
            resetHeightOnDestroy: true, 
            handleWindowResize: true, 
            height: function() {
                var height = parseInt(BPutil.getViewPort().height);
               
                if (head) {
                    height = height - parseInt(BPutil.actualHeight(head));
                    height = height - parseInt(BPutil.css(head, 'marginBottom'));
                }
        
                height = height - parseInt(BPutil.css(notificationPanel, 'paddingTop'));
                height = height - parseInt(BPutil.css(notificationPanel, 'paddingBottom'));    

                return height;
            }
        });
    }

    var initQucikActions = function() {
        var head = BPutil.find(quickActionsPanel, '.bp-offcanvas-panel__head');
        var body = BPutil.find(quickActionsPanel, '.bp-offcanvas-panel__body');

        var offcanvas = new KOffcanvas(quickActionsPanel, {
            overlay: true,  
            baseClass: 'bp-offcanvas-panel',
            closeBy: 'bp_offcanvas_toolbar_quick_actions_close',
            toggleBy: 'bp_offcanvas_toolbar_quick_actions_toggler_btn'
        }); 

        BPutil.scrollInit(body, {
            disableForMobile: true, 
            resetHeightOnDestroy: true, 
            handleWindowResize: true, 
            height: function() {
                var height = parseInt(BPutil.getViewPort().height);
               
                if (head) {
                    height = height - parseInt(BPutil.actualHeight(head));
                    height = height - parseInt(BPutil.css(head, 'marginBottom'));
                }
        
                height = height - parseInt(BPutil.css(quickActionsPanel, 'paddingTop'));
                height = height - parseInt(BPutil.css(quickActionsPanel, 'paddingBottom'));    

                return height;
            }
        });
    }

    var initProfile = function() {
        var head = BPutil.find(profilePanel, '.bp-offcanvas-panel__head');
        var body = BPutil.find(profilePanel, '.bp-offcanvas-panel__body');

        var offcanvas = new KOffcanvas(profilePanel, {
            overlay: true,  
            baseClass: 'bp-offcanvas-panel',
            closeBy: 'bp_offcanvas_toolbar_profile_close',
            toggleBy: 'bp_offcanvas_toolbar_profile_toggler_btn'
        }); 

        BPutil.scrollInit(body, {
            disableForMobile: true, 
            resetHeightOnDestroy: true, 
            handleWindowResize: true, 
            height: function() {
                var height = parseInt(BPutil.getViewPort().height);
               
                if (head) {
                    height = height - parseInt(BPutil.actualHeight(head));
                    height = height - parseInt(BPutil.css(head, 'marginBottom'));
                }
        
                height = height - parseInt(BPutil.css(profilePanel, 'paddingTop'));
                height = height - parseInt(BPutil.css(profilePanel, 'paddingBottom'));    

                return height;
            }
        });
    }

    var initSearch = function() {
        var head = BPutil.find(searchPanel, '.bp-offcanvas-panel__head');
        var body = BPutil.find(searchPanel, '.bp-offcanvas-panel__body');
        
        var offcanvas = new KOffcanvas(searchPanel, {
            overlay: true,  
            baseClass: 'bp-offcanvas-panel',
            closeBy: 'bp_offcanvas_toolbar_search_close',
            toggleBy: 'bp_offcanvas_toolbar_search_toggler_btn'
        }); 

        BPutil.scrollInit(body, {
            disableForMobile: true, 
            resetHeightOnDestroy: true, 
            handleWindowResize: true, 
            height: function() {
                var height = parseInt(BPutil.getViewPort().height);
               
                if (head) {
                    height = height - parseInt(BPutil.actualHeight(head));
                    height = height - parseInt(BPutil.css(head, 'marginBottom'));
                }
        
                height = height - parseInt(BPutil.css(searchPanel, 'paddingTop'));
                height = height - parseInt(BPutil.css(searchPanel, 'paddingBottom'));    

                return height;
            }
        });
    }

    return {     
        init: function() {  
            initNotifications(); 
            initQucikActions();
            initProfile();
            initSearch();
        }
    };
}();

$(document).ready(function() {
    KOffcanvasPanel.init();
});