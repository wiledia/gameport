"use strict";
// Class definition

var KBootstrapSelect = function () {
    
    // Private functions
    var demos = function () {
        // minimum setup
        $('.bp_selectpicker').selectpicker();
    }

    return {
        // public functions
        init: function() {
            demos(); 
        }
    };
}();

jQuery(document).ready(function() {    
    KBootstrapSelect.init();
});