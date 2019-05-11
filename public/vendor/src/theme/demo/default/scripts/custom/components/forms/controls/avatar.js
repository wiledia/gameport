"use strict";
// Class definition
var bpAvatarDemo = function() {

    return {
        // Init demos
        init: function() {
           var avatar1 = new bpAvatar('bp_profile_avatar_1');
           var avatar2 = new bpAvatar('bp_profile_avatar_2');
           var avatar3 = new bpAvatar('bp_profile_avatar_3');
           var avatar4 = new bpAvatar('bp_profile_avatar_4');
        }
    };
}();

// Class initialization on page load
jQuery(document).ready(function() {
    bpAvatarDemo.init();
});