// plugin setup
var bpAvatar = function(elementId, options) {
    // Main object
    var the = this;
    var init = false;

    // Get element object
    var element = BPutil.get(elementId);
    var body = BPutil.get('body');

    if (!element) {
        return; 
    }

    // Default options
    var defaultOptions = {
    };

    ////////////////////////////
    // ** Private Methods  ** //
    ////////////////////////////

    var Plugin = {
        /**
         * Construct
         */

        construct: function(options) {
            if (BPutil.data(element).has('avatar')) {
                the = BPutil.data(element).get('avatar');
            } else {
                // reset menu
                Plugin.init(options);

                // build menu
                Plugin.build();

                BPutil.data(element).set('avatar', the);
            }

            return the;
        },

        /**
         * Init avatar
         */
        init: function(options) {
            the.element = element;
            the.events = [];

            the.input = BPutil.find(element, 'input[type="file"]');
            the.holder = BPutil.find(element, '.bp-avatar__holder');
            the.cancel = BPutil.find(element, '.bp-avatar__cancel');
            the.src = BPutil.css(the.holder, 'backgroundImage');

            // merge default and user defined options
            the.options = BPutil.deepExtend({}, defaultOptions, options);
        },

        /**
         * Build Form Wizard
         */
        build: function() {
            // Handle avatar change
            BPutil.addEvent(the.input, 'change', function(e) {
                e.preventDefault();

	            if (the.input && the.input.files && the.input.files[0]) {
	                var reader = new FileReader();
	                reader.onload = function(e) {
	                    BPutil.css(the.holder, 'background-image', 'url('+e.target.result +')');
	                }
	                reader.readAsDataURL(the.input.files[0]);

	                BPutil.addClass(the.element, 'bp-avatar--changed');
	            }
            });

            // Handle avatar cancel
            BPutil.addEvent(the.cancel, 'click', function(e) {
                e.preventDefault();

	            BPutil.removeClass(the.element, 'bp-avatar--changed');
	            BPutil.css(the.holder, 'background-image', the.src);
	            the.input.value = "";
            });
        },

        /**
         * Trigger events
         */
        eventTrigger: function(name) {
            //BPutil.triggerCustomEvent(name);
            for (var i = 0; i < the.events.length; i++) {
                var event = the.events[i];
                if (event.name == name) {
                    if (event.one == true) {
                        if (event.fired == false) {
                            the.events[i].fired = true;
                            event.handler.call(this, the);
                        }
                    } else {
                        event.handler.call(this, the);
                    }
                }
            }
        },

        addEvent: function(name, handler, one) {
            the.events.push({
                name: name,
                handler: handler,
                one: one,
                fired: false
            });

            return the;
        }
    };

    //////////////////////////
    // ** Public Methods ** //
    //////////////////////////

    /**
     * Set default options 
     */

    the.setDefaults = function(options) {
        defaultOptions = options;
    };
    
    /**
     * Attach event
     */
    the.on = function(name, handler) {
        return Plugin.addEvent(name, handler);
    };

    /**
     * Attach event that will be fired once
     */
    the.one = function(name, handler) {
        return Plugin.addEvent(name, handler, true);
    };

    // Construct plugin
    Plugin.construct.apply(the, [options]);

    return the;
};