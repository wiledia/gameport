"use strict";
// Class definition

var KBootstrapMaxlength = function () {
    
    // Private functions
    var demos = function () {
        // minimum setup
        $('#bp_maxlength_1').maxlength({
            warningClass: "bp-badge bp-badge--warning bp-badge--rounded bp-badge--inline",
            limitReachedClass: "bp-badge bp-badge--success bp-badge--rounded bp-badge--inline"
        });

        // threshold value
        $('#bp_maxlength_2').maxlength({
            threshold: 5,
            warningClass: "bp-badge bp-badge--danger bp-badge--rounded bp-badge--inline",
            limitReachedClass: "bp-badge bp-badge--success bp-badge--rounded bp-badge--inline"
        });

        // always show
        $('#bp_maxlength_3').maxlength({
            alwaysShow: true,
            threshold: 5,
            warningClass: "bp-badge bp-badge--primary bp-badge--rounded bp-badge--inline",
            limitReachedClass: "bp-badge bp-badge--brand bp-badge--rounded bp-badge--inline"
        });

        // custom text
        $('#bp_maxlength_4').maxlength({
            threshold: 3,
            warningClass: "bp-badge bp-badge--danger bp-badge--rounded bp-badge--inline",
            limitReachedClass: "bp-badge bp-badge--success bp-badge--rounded bp-badge--inline",
            separator: ' of ',
            preText: 'You have ',
            postText: ' chars remaining.',
            validate: true
        });

        // textarea example
        $('#bp_maxlength_5').maxlength({
            threshold: 5,
            warningClass: "bp-badge bp-badge--primary bp-badge--rounded bp-badge--inline",
            limitReachedClass: "bp-badge bp-badge--brand bp-badge--rounded bp-badge--inline"
        });

        // position examples
        $('#bp_maxlength_6_1').maxlength({
            alwaysShow: true,
            threshold: 5,
            placement: 'top-left',
            warningClass: "bp-badge bp-badge--brand bp-badge--rounded bp-badge--inline",
            limitReachedClass: "bp-badge bp-badge--brand bp-badge--rounded bp-badge--inline"
        });

        $('#bp_maxlength_6_2').maxlength({
            alwaysShow: true,
            threshold: 5,
            placement: 'top-right',
            warningClass: "bp-badge bp-badge--success bp-badge--rounded bp-badge--inline",
            limitReachedClass: "bp-badge bp-badge--brand bp-badge--rounded bp-badge--inline"
        });

        $('#bp_maxlength_6_3').maxlength({
            alwaysShow: true,
            threshold: 5,
            placement: 'bottom-left',
            warningClass: "bp-badge bp-badge--warning bp-badge--rounded bp-badge--inline",
            limitReachedClass: "bp-badge bp-badge--brand bp-badge--rounded bp-badge--inline"
        });

        $('#bp_maxlength_6_4').maxlength({
            alwaysShow: true,
            threshold: 5,
            placement: 'bottom-right',
            warningClass: "bp-badge bp-badge--danger bp-badge--rounded bp-badge--inline",
            limitReachedClass: "bp-badge bp-badge--brand bp-badge--rounded bp-badge--inline"
        });

        // Modal Examples

        // minimum setup
        $('#bp_maxlength_1_modal').maxlength({
            warningClass: "bp-badge bp-badge--warning bp-badge--rounded bp-badge--inline",
            limitReachedClass: "bp-badge bp-badge--success bp-badge--rounded bp-badge--inline",
            appendToParent: true
        });

        // threshold value
        $('#bp_maxlength_2_modal').maxlength({
            threshold: 5,
            warningClass: "bp-badge bp-badge--danger bp-badge--rounded bp-badge--inline",
            limitReachedClass: "bp-badge bp-badge--success bp-badge--rounded bp-badge--inline",
            appendToParent: true
        });

        // always show
        // textarea example
        $('#bp_maxlength_5_modal').maxlength({
            threshold: 5,
            warningClass: "bp-badge bp-badge--primary bp-badge--rounded bp-badge--inline",
            limitReachedClass: "bp-badge bp-badge--brand bp-badge--rounded bp-badge--inline",
            appendToParent: true
        });

        // custom text
        $('#bp_maxlength_4_modal').maxlength({
            threshold: 3,
            warningClass: "bp-badge bp-badge--danger bp-badge--rounded bp-badge--inline",
            limitReachedClass: "bp-badge bp-badge--success bp-badge--rounded bp-badge--inline",
            appendToParent: true,
            separator: ' of ',
            preText: 'You have ',
            postText: ' chars remaining.',
            validate: true
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
    KBootstrapMaxlength.init();
});