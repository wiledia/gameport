"use strict";
// plugin setup
var KPortlet = function(elementId, options) {
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
        bodyToggleSpeed: 400,
        tooltips: true,
        tools: {
            toggle: {
                collapse: 'Collapse',
                expand: 'Expand'
            },
            reload: 'Reload',
            remove: 'Remove'
        },
        sticky: {
            offset: 300,
            zIndex: 101
        }
    };

    ////////////////////////////
    // ** Private Methods  ** //
    ////////////////////////////

    var Plugin = {
        /**
         * Construct
         */

        construct: function(options) {
            if (BPutil.data(element).has('portlet')) {
                the = BPutil.data(element).get('portlet');
            } else {
                // reset menu
                Plugin.init(options);

                // build menu
                Plugin.build();

                BPutil.data(element).set('portlet', the);
            }

            return the;
        },

        /**
         * Init portlet
         */
        init: function(options) {
            the.element = element;
            the.events = [];

            // merge default and user defined options
            the.options = BPutil.deepExtend({}, defaultOptions, options);
            the.head = BPutil.child(element, '.bp-portlet__head');
            the.foot = BPutil.child(element, '.bp-portlet__foot');

            if (BPutil.child(element, '.bp-portlet__body')) {
                the.body = BPutil.child(element, '.bp-portlet__body');
            } else if (BPutil.child(element, '.bp-form').length !== 0) {
                the.body = BPutil.child(element, '.bp-form');
            }
        },

        /**
         * Build Form Wizard
         */
        build: function() {
            // Remove
            var remove = BPutil.find(the.head, '[data-kportlet-tool=remove]');
            if (remove) {
                BPutil.addEvent(remove, 'click', function(e) {
                    e.preventDefault();
                    Plugin.remove();
                });
            }

            // Reload
            var reload = BPutil.find(the.head, '[data-kportlet-tool=reload]');
            if (reload) {
                BPutil.addEvent(reload, 'click', function(e) {
                    e.preventDefault();
                    Plugin.reload();
                });
            }

            // Toggle
            var toggle = BPutil.find(the.head, '[data-kportlet-tool=toggle]');
            if (toggle) {
                BPutil.addEvent(toggle, 'click', function(e) {
                    e.preventDefault();
                    Plugin.toggle();
                });
            }

            Plugin.setupTooltips();
        },

        /**
         * Enable stickt mode
         */
        initSticky: function() {
            var lastScrollTop = 0;
            var offset = the.options.sticky.offset;

            if (!the.head) {
                return;
            }

	        window.addEventListener('scroll', Plugin.onScrollSticky);
        },

	    /**
	     * Window scroll handle event for sticky portlet
	     */
	    onScrollSticky: function(e) {
		    var offset = the.options.sticky.offset;
		    if(isNaN(offset)) return;

		    var st = document.documentElement.scrollTop;

		    if (st >= offset && BPutil.hasClass(body, 'bp-portlet--sticky') === false) {
			    Plugin.eventTrigger('stickyOn');

			    BPutil.addClass(body, 'bp-portlet--sticky');
			    BPutil.addClass(element, 'bp-portlet--sticky');

			    Plugin.updateSticky();

		    } else if ((st*1.5) <= offset && BPutil.hasClass(body, 'bp-portlet--sticky')) {
			    // back scroll mode
			    Plugin.eventTrigger('stickyOff');

			    BPutil.removeClass(body, 'bp-portlet--sticky');
			    BPutil.removeClass(element, 'bp-portlet--sticky');

			    Plugin.resetSticky();
		    }
	    },

        updateSticky: function() {
            if (!the.head) {
                return;
            }

            var top;

            if (BPutil.hasClass(body, 'bp-portlet--sticky')) {
                if (the.options.sticky.position.top instanceof Function) {
                    top = parseInt(the.options.sticky.position.top.call());
                } else {
                    top = parseInt(the.options.sticky.position.top);
                }

                var left;
                if (the.options.sticky.position.left instanceof Function) {
                    left = parseInt(the.options.sticky.position.left.call());
                } else {
                    left = parseInt(the.options.sticky.position.left);
                }

                var right;
                if (the.options.sticky.position.right instanceof Function) {
                    right = parseInt(the.options.sticky.position.right.call());
                } else {
                    right = parseInt(the.options.sticky.position.right);
                }

                BPutil.css(the.head, 'z-index', the.options.sticky.zIndex);
                BPutil.css(the.head, 'top', top + 'px');
                BPutil.css(the.head, 'left', left + 'px');
                BPutil.css(the.head, 'right', right + 'px');
            }
        },

        resetSticky: function() {
            if (!the.head) {
                return;
            }

            if (BPutil.hasClass(body, 'bp-portlet--sticky') === false) {
                BPutil.css(the.head, 'z-index', '');
                BPutil.css(the.head, 'top', '');
                BPutil.css(the.head, 'left', '');
                BPutil.css(the.head, 'right', '');
            }
        },

        /**
         * Remove portlet
         */
        remove: function() {
            if (Plugin.eventTrigger('beforeRemove') === false) {
                return;
            }

            Plugin.removeTooltips();

            BPutil.remove(element);

            Plugin.eventTrigger('afterRemove');
        },

        /**
         * Set content
         */
        setContent: function(html) {
            if (html) {
                the.body.innerHTML = html;
            }
        },

        /**
         * Get body
         */
        getBody: function() {
            return the.body;
        },

        /**
         * Get self
         */
        getSelf: function() {
            return element;
        },

        /**
         * Setup tooltips
         */
        setupTooltips: function() {
            if (the.options.tooltips) {
                var collapsed = BPutil.hasClass(element, 'bp-portlet--collapse') || BPutil.hasClass(element, 'bp-portlet--collapsed');

                // Remove
                var remove = BPutil.find(the.head, '[data-kportlet-tool=remove]');
                if (remove) {
                    var tip = new Tooltip(remove, {
                        title: the.options.tools.remove,
                        placement: 'top',
                        offset: '0,5px',
                        trigger: 'hover',
                        template: '<div class="tooltip tooltip-portlet tooltip bs-tooltip-top" role="tooltip">\
                            <div class="tooltip-arrow arrow"></div>\
                            <div class="tooltip-inner"></div>\
                        </div>'
                    });

                    BPutil.data(remove).set('tooltip', tip);
                }

                // Reload
                var reload = BPutil.find(the.head, '[data-kportlet-tool=reload]');
                if (reload) {
                    var tip = new Tooltip(reload, {
                        title: the.options.tools.reload,
                        placement: 'top',
                        offset: '0,5px',
                        trigger: 'hover',
                        template: '<div class="tooltip tooltip-portlet tooltip bs-tooltip-top" role="tooltip">\
                            <div class="tooltip-arrow arrow"></div>\
                            <div class="tooltip-inner"></div>\
                        </div>'
                    });

                    BPutil.data(reload).set('tooltip', tip);
                }

                // Toggle
                var toggle = BPutil.find(the.head, '[data-kportlet-tool=toggle]');
                if (toggle) {
                    var tip = new Tooltip(toggle, {
                        title: (collapsed ? the.options.tools.toggle.expand : the.options.tools.toggle.collapse),
                        placement: 'top',
                        offset: '0,5px',
                        trigger: 'hover',
                        template: '<div class="tooltip tooltip-portlet tooltip bs-tooltip-top" role="tooltip">\
                            <div class="tooltip-arrow arrow"></div>\
                            <div class="tooltip-inner"></div>\
                        </div>'
                    });

                    BPutil.data(toggle).set('tooltip', tip);
                }
            }
        },

        /**
         * Setup tooltips
         */
        removeTooltips: function() {
            if (the.options.tooltips) {
                // Remove
                var remove = BPutil.find(the.head, '[data-kportlet-tool=remove]');
                if (remove && BPutil.data(remove).has('tooltip')) {
                    BPutil.data(remove).get('tooltip').dispose();
                }

                // Reload
                var reload = BPutil.find(the.head, '[data-kportlet-tool=reload]');
                if (reload && BPutil.data(reload).has('tooltip')) {
                    BPutil.data(reload).get('tooltip').dispose();
                }

                // Toggle
                var toggle = BPutil.find(the.head, '[data-kportlet-tool=toggle]');
                if (toggle && BPutil.data(toggle).has('tooltip')) {
                    BPutil.data(toggle).get('tooltip').dispose();
                }
            }
        },

        /**
         * Reload
         */
        reload: function() {
            Plugin.eventTrigger('reload');
        },

        /**
         * Toggle
         */
        toggle: function() {
            if (BPutil.hasClass(element, 'bp-portlet--collapse') || BPutil.hasClass(element, 'bp-portlet--collapsed')) {
                Plugin.expand();
            } else {
                Plugin.collapse();
            }
        },

        /**
         * Collapse
         */
        collapse: function() {
            if (Plugin.eventTrigger('beforeCollapse') === false) {
                return;
            }

            BPutil.slideUp(the.body, the.options.bodyToggleSpeed, function() {
                Plugin.eventTrigger('afterCollapse');
            });

            BPutil.addClass(element, 'bp-portlet--collapse');

            var toggle = BPutil.find(the.head, '[data-kportlet-tool=toggle]');
            if (toggle && BPutil.data(toggle).has('tooltip')) {
                BPutil.data(toggle).get('tooltip').updateTitleContent(the.options.tools.toggle.expand);
            }
        },

        /**
         * Expand
         */
        expand: function() {
            if (Plugin.eventTrigger('beforeExpand') === false) {
                return;
            }

            BPutil.slideDown(the.body, the.options.bodyToggleSpeed, function() {
                Plugin.eventTrigger('afterExpand');
            });

            BPutil.removeClass(element, 'bp-portlet--collapse');
            BPutil.removeClass(element, 'bp-portlet--collapsed');

            var toggle = BPutil.find(the.head, '[data-kportlet-tool=toggle]');
            if (toggle && BPutil.data(toggle).has('tooltip')) {
                BPutil.data(toggle).get('tooltip').updateTitleContent(the.options.tools.toggle.collapse);
            }
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
     * Remove portlet
     * @returns {KPortlet}
     */
    the.remove = function() {
        return Plugin.remove(html);
    };

    /**
     * Remove portlet
     * @returns {KPortlet}
     */
    the.initSticky = function() {
        return Plugin.initSticky();
    };

    /**
     * Remove portlet
     * @returns {KPortlet}
     */
    the.updateSticky = function() {
        return Plugin.updateSticky();
    };

    /**
     * Remove portlet
     * @returns {KPortlet}
     */
    the.resetSticky = function() {
        return Plugin.resetSticky();
    };

	/**
	 * Destroy sticky portlet
	 */
	the.destroySticky = function() {
		Plugin.resetSticky();
		window.removeEventListener('scroll', Plugin.onScrollSticky);
	};

    /**
     * Reload portlet
     * @returns {KPortlet}
     */
    the.reload = function() {
        return Plugin.reload();
    };

    /**
     * Set portlet content
     * @returns {KPortlet}
     */
    the.setContent = function(html) {
        return Plugin.setContent(html);
    };

    /**
     * Toggle portlet
     * @returns {KPortlet}
     */
    the.toggle = function() {
        return Plugin.toggle();
    };

    /**
     * Collapse portlet
     * @returns {KPortlet}
     */
    the.collapse = function() {
        return Plugin.collapse();
    };

    /**
     * Expand portlet
     * @returns {KPortlet}
     */
    the.expand = function() {
        return Plugin.expand();
    };

    /**
     * Get portletbody
     * @returns {jQuery}
     */
    the.getBody = function() {
        return Plugin.getBody();
    };

    /**
     * Get portletbody
     * @returns {jQuery}
     */
    the.getSelf = function() {
        return Plugin.getSelf();
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