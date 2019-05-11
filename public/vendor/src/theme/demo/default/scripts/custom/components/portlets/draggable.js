"use strict";
var KPortletDraggable = function () {

    return {
        //main function to initiate the module
        init: function () {
            $("#bp_sortable_portlets").sortable({
                connectWith: ".bp-portlet__head",
                items: ".bp-portlet", 
                opacity: 0.8,
                handle : '.bp-portlet__head',
                coneHelperSize: true,
                placeholder: 'bp-portlet--sortable-placeholder',
                forcePlaceholderSize: true,
                tolerance: "pointer",
                helper: "clone",
                cancel: ".bp-portlet--sortable-empty", // cancel dragging if portlet is in fullscreen mode
                revert: 250, // animation in milliseconds
                update: function(b, c) {
                    if (c.item.prev().hasClass("bp-portlet--sortable-empty")) {
                        c.item.prev().before(c.item);
                    }                    
                }
            });
        }
    };
}();

jQuery(document).ready(function() {
    KPortletDraggable.init();
});