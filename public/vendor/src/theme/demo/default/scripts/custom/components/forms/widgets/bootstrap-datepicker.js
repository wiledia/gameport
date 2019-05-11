"use strict";
// Class definition

var KBootstrapDatepicker = function () {

    var arrows;
    if (BPutil.isRTL()) {
        arrows = {
            leftArrow: '<i class="la la-angle-right"></i>',
            rightArrow: '<i class="la la-angle-left"></i>'
        }
    } else {
        arrows = {
            leftArrow: '<i class="la la-angle-left"></i>',
            rightArrow: '<i class="la la-angle-right"></i>'
        }
    }
    
    // Private functions
    var demos = function () {
        // minimum setup
        $('#bp_datepicker_1, #bp_datepicker_1_validate').datepicker({
            rtl: BPutil.isRTL(),
            todayHighlight: true,
            orientation: "bottom left",
            templates: arrows
        });

        // minimum setup for modal demo
        $('#bp_datepicker_1_modal').datepicker({
            rtl: BPutil.isRTL(),
            todayHighlight: true,
            orientation: "bottom left",
            templates: arrows
        });

        // input group layout 
        $('#bp_datepicker_2, #bp_datepicker_2_validate').datepicker({
            rtl: BPutil.isRTL(),
            todayHighlight: true,
            orientation: "bottom left",
            templates: arrows
        });

        // input group layout for modal demo
        $('#bp_datepicker_2_modal').datepicker({
            rtl: BPutil.isRTL(),
            todayHighlight: true,
            orientation: "bottom left",
            templates: arrows
        });

        // enable clear button 
        $('#bp_datepicker_3, #bp_datepicker_3_validate').datepicker({
            rtl: BPutil.isRTL(),
            todayBtn: "linked",
            clearBtn: true,
            todayHighlight: true,
            templates: arrows
        });

        // enable clear button for modal demo
        $('#bp_datepicker_3_modal').datepicker({
            rtl: BPutil.isRTL(),
            todayBtn: "linked",
            clearBtn: true,
            todayHighlight: true,
            templates: arrows
        });

        // orientation 
        $('#bp_datepicker_4_1').datepicker({
            rtl: BPutil.isRTL(),
            orientation: "top left",
            todayHighlight: true,
            templates: arrows
        });

        $('#bp_datepicker_4_2').datepicker({
            rtl: BPutil.isRTL(),
            orientation: "top right",
            todayHighlight: true,
            templates: arrows
        });

        $('#bp_datepicker_4_3').datepicker({
            rtl: BPutil.isRTL(),
            orientation: "bottom left",
            todayHighlight: true,
            templates: arrows
        });

        $('#bp_datepicker_4_4').datepicker({
            rtl: BPutil.isRTL(),
            orientation: "bottom right",
            todayHighlight: true,
            templates: arrows
        });

        // range picker
        $('#bp_datepicker_5').datepicker({
            rtl: BPutil.isRTL(),
            todayHighlight: true,
            templates: arrows
        });

         // inline picker
        $('#bp_datepicker_6').datepicker({
            rtl: BPutil.isRTL(),
            todayHighlight: true,
            templates: arrows
        });
    }

    return {
        // public functions
        init: function() {
            demos(); 
        }
    };
}();

jQuery(document).ready(function() {    
    KBootstrapDatepicker.init();
});