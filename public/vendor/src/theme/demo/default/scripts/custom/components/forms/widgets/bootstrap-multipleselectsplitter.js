"use strict";
// Class definition

var KBootstrapMultipleSelectsplitter = function () {
    
    // Private functions
    var demos = function () {
        // minimum setup
        $('#bp_multipleselectsplitter_1, #bp_multipleselectsplitter_2').multiselectsplitter();
    }

    return {
        // public functions
        init: function() {
            demos(); 
        }
    };
}();

jQuery(document).ready(function() {    
    KBootstrapMultipleSelectsplitter.init();
});