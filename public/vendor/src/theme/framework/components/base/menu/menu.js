"use strict";
var KMenu = function(elementId, options) {
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
        // accordion submenu mode
        accordion: {
            slideSpeed: 200, // accordion toggle slide speed in milliseconds
            autoScroll: false, // enable auto scrolling(focus) to the clicked menu item
            autoScrollSpeed: 1200,
            expandAll: true // allow having multiple expanded accordions in the menu
        },

        // dropdown submenu mode
        dropdown: {
            timeout: 500 // timeout in milliseconds to show and hide the hoverable submenu dropdown
        }
    };

    ////////////////////////////
    // ** Private Methods  ** //
    ////////////////////////////

    var Plugin = {
        /**
         * Run plugin
         * @returns {KMenu}
         */
        construct: function(options) {
            if (BPutil.data(element).has('menu')) {
                the = BPutil.data(element).get('menu');
            } else {
                // reset menu
                Plugin.init(options);

                // reset menu
                Plugin.reset();

                // build menu
                Plugin.build();

                BPutil.data(element).set('menu', the);
            }

            return the;
        },

        /**
         * Handles submenu click toggle
         * @returns {KMenu}
         */
        init: function(options) {
            the.events = [];

            the.eventHandlers = {};

            // merge default and user defined options
            the.options = BPutil.deepExtend({}, defaultOptions, options);

            // pause menu
            the.pauseDropdownHoverTime = 0;

            the.uid = BPutil.getUniqueID();
        },

        update: function(options) {
            // merge default and user defined options
            the.options = BPutil.deepExtend({}, defaultOptions, options);

            // pause menu
            the.pauseDropdownHoverTime = 0;

             // reset menu
            Plugin.reset();

            the.eventHandlers = {};

            // build menu
            Plugin.build();

            BPutil.data(element).set('menu', the);
        },

        reload: function() {
             // reset menu
            Plugin.reset();

            // build menu
            Plugin.build();
        },

        /**
         * Reset menu
         * @returns {KMenu}
         */
        build: function() {
            // General accordion submenu toggle
            the.eventHandlers['event_1'] = BPutil.on( element, '.bp-menu__toggle', 'click', Plugin.handleSubmenuAccordion);

            // Dropdown mode(hoverable)
            if (Plugin.getSubmenuMode() === 'dropdown' || Plugin.isConditionalSubmenuDropdown()) {
                // dropdown submenu - hover toggle
                the.eventHandlers['event_2'] = BPutil.on( element, '[data-kmenu-submenu-toggle="hover"]', 'mouseover', Plugin.handleSubmenuDrodownHoverEnter);
                the.eventHandlers['event_3'] = BPutil.on( element, '[data-kmenu-submenu-toggle="hover"]', 'mouseout', Plugin.handleSubmenuDrodownHoverExit);

                // dropdown submenu - click toggle
                the.eventHandlers['event_4'] = BPutil.on( element, '[data-kmenu-submenu-toggle="click"] > .bp-menu__toggle, [data-kmenu-submenu-toggle="click"] > .bp-menu__link .bp-menu__toggle', 'click', Plugin.handleSubmenuDropdownClick);
                the.eventHandlers['event_5'] = BPutil.on( element, '[data-kmenu-submenu-toggle="tab"] > .bp-menu__toggle, [data-kmenu-submenu-toggle="tab"] > .bp-menu__link .bp-menu__toggle', 'click', Plugin.handleSubmenuDropdownTabClick);
            }

            // General link click
            the.eventHandlers['event_6'] = BPutil.on(element, '.bp-menu__item:not(.bp-menu__item--submenu) > .bp-menu__link:not(.bp-menu__toggle):not(.bp-menu__link--toggle-skip)', 'click', Plugin.handleLinkClick);

            // Init scrollable menu
            if (the.options.scroll && the.options.scroll.height) {
                Plugin.scrollInit();
            }
        },

        /**
         * Reset menu
         * @returns {KMenu}
         */
        reset: function() {
            BPutil.off( element, 'click', the.eventHandlers['event_1']);

            // dropdown submenu - hover toggle
            BPutil.off( element, 'mouseover', the.eventHandlers['event_2']);
            BPutil.off( element, 'mouseout', the.eventHandlers['event_3']);

            // dropdown submenu - click toggle
            BPutil.off( element, 'click', the.eventHandlers['event_4']);
            BPutil.off( element, 'click', the.eventHandlers['event_5']);

            BPutil.off(element, 'click', the.eventHandlers['event_6']);
        },

        /**
         * Init scroll menu
         *
        */
        scrollInit: function() {
            if ( the.options.scroll && the.options.scroll.height ) {
                BPutil.scrollDestroy(element);
                BPutil.scrollInit(element, {disableForMobile: true, resetHeightOnDestroy: true, handleWindowResize: true, height: the.options.scroll.height});
            } else {
                BPutil.scrollDestroy(element);
            }
        },

        /**
         * Update scroll menu
        */
        scrollUpdate: function() {
            if ( the.options.scroll && the.options.scroll.height ) {
                BPutil.scrollUpdate(element);
            }
        },

        /**
         * Scroll top
        */
        scrollTop: function() {
            if ( the.options.scroll && the.options.scroll.height ) {
                BPutil.scrollTop(element);
            }
        },

        /**
         * Get submenu mode for current breakpoint and menu state
         * @returns {KMenu}
         */
        getSubmenuMode: function(el) {
            if ( BPutil.isInResponsiveRange('desktop') ) {
                if (el && BPutil.hasAttr(el, 'data-kmenu-submenu-toggle')) {
                    return BPutil.attr(el, 'data-kmenu-submenu-toggle');
                }

                if ( BPutil.isset(the.options.submenu, 'desktop.state.body') ) {
                    if ( BPutil.hasClass(body, the.options.submenu.desktop.state.body) ) {
                        return the.options.submenu.desktop.state.mode;
                    } else {
                        return the.options.submenu.desktop.default;
                    }
                } else if ( BPutil.isset(the.options.submenu, 'desktop') ) {
                    return the.options.submenu.desktop;
                }
            } else if ( BPutil.isInResponsiveRange('tablet') && BPutil.isset(the.options.submenu, 'tablet') ) {
                return the.options.submenu.tablet;
            } else if ( BPutil.isInResponsiveRange('mobile') && BPutil.isset(the.options.submenu, 'mobile') ) {
                return the.options.submenu.mobile;
            } else {
                return false;
            }
        },

        /**
         * Get submenu mode for current breakpoint and menu state
         * @returns {KMenu}
         */
        isConditionalSubmenuDropdown: function() {
            if ( BPutil.isInResponsiveRange('desktop') && BPutil.isset(the.options.submenu, 'desktop.state.body') ) {
                return true;
            } else {
                return false;
            }
        },

        /**
         * Handles menu link click
         * @returns {KMenu}
         */
        handleLinkClick: function(e) {
            if ( Plugin.eventTrigger('linkClick', this) === false ) {
                e.preventDefault();
            };

            if ( Plugin.getSubmenuMode(this) === 'dropdown' || Plugin.isConditionalSubmenuDropdown() ) {
                Plugin.handleSubmenuDropdownClose(e, this);
            }
        },

        /**
         * Handles submenu hover toggle
         * @returns {KMenu}
         */
        handleSubmenuDrodownHoverEnter: function(e) {
            if ( Plugin.getSubmenuMode(this) === 'accordion' ) {
                return;
            }

            if ( the.resumeDropdownHover() === false ) {
                return;
            }

            var item = this;

            if ( item.getAttribute('data-hover') == '1' ) {
                item.removeAttribute('data-hover');
                clearTimeout( item.getAttribute('data-timeout') );
                item.removeAttribute('data-timeout');
                //Plugin.hideSubmenuDropdown(item, false);
            }

            // console.log('test!');

            Plugin.showSubmenuDropdown(item);
        },

        /**
         * Handles submenu hover toggle
         * @returns {KMenu}
         */
        handleSubmenuDrodownHoverExit: function(e) {
            if ( the.resumeDropdownHover() === false ) {
                return;
            }

            if ( Plugin.getSubmenuMode(this) === 'accordion' ) {
                return;
            }

            var item = this;
            var time = the.options.dropdown.timeout;

            var timeout = setTimeout(function() {
                if ( item.getAttribute('data-hover') == '1' ) {
                    Plugin.hideSubmenuDropdown(item, true);
                }
            }, time);

            item.setAttribute('data-hover', '1');
            item.setAttribute('data-timeout', timeout);
        },

        /**
         * Handles submenu click toggle
         * @returns {KMenu}
         */
        handleSubmenuDropdownClick: function(e) {
            if ( Plugin.getSubmenuMode(this) === 'accordion' ) {
                return;
            }

            var item = this.closest('.bp-menu__item');

            if ( item.getAttribute('data-kmenu-submenu-mode') == 'accordion' ) {
                return;
            }

            if ( BPutil.hasClass(item, 'bp-menu__item--hover') === false ) {
                BPutil.addClass(item, 'bp-menu__item--open-dropdown');
                Plugin.showSubmenuDropdown(item);
            } else {
                BPutil.removeClass(item, 'bp-menu__item--open-dropdown' );
                Plugin.hideSubmenuDropdown(item, true);
            }

            e.preventDefault();
        },

        /**
         * Handles tab click toggle
         * @returns {KMenu}
         */
        handleSubmenuDropdownTabClick: function(e) {
            if (Plugin.getSubmenuMode(this) === 'accordion') {
                return;
            }

            var item = this.closest('.bp-menu__item');

            if (item.getAttribute('data-kmenu-submenu-mode') == 'accordion') {
                return;
            }

            if (BPutil.hasClass(item, 'bp-menu__item--hover') == false) {
                BPutil.addClass(item, 'bp-menu__item--open-dropdown');
                Plugin.showSubmenuDropdown(item);
            }

            e.preventDefault();
        },

        /**
         * Handles submenu dropdown close on link click
         * @returns {KMenu}
         */
        handleSubmenuDropdownClose: function(e, el) {
            // exit if its not submenu dropdown mode
            if (Plugin.getSubmenuMode(el) === 'accordion') {
                return;
            }

            var shown = element.querySelectorAll('.bp-menu__item.bp-menu__item--submenu.bp-menu__item--hover:not(.bp-menu__item--tabs)');

            // check if currently clicked link's parent item ha
            if (shown.length > 0 && BPutil.hasClass(el, 'bp-menu__toggle') === false && el.querySelectorAll('.bp-menu__toggle').length === 0) {
                // close opened dropdown menus
                for (var i = 0, len = shown.length; i < len; i++) {
                    Plugin.hideSubmenuDropdown(shown[0], true);
                }
            }
        },

        /**
         * helper functions
         * @returns {KMenu}
         */
        handleSubmenuAccordion: function(e, el) {
            var query;
            var item = el ? el : this;

            if ( Plugin.getSubmenuMode(el) === 'dropdown' && (query = item.closest('.bp-menu__item') ) ) {
                if (query.getAttribute('data-kmenu-submenu-mode') != 'accordion' ) {
                    e.preventDefault();
                    return;
                }
            }

            var li = item.closest('.bp-menu__item');
            var submenu = BPutil.child(li, '.bp-menu__submenu, .bp-menu__inner');

            if (BPutil.hasClass(item.closest('.bp-menu__item'), 'bp-menu__item--open-always')) {
                return;
            }

            if ( li && submenu ) {
                e.preventDefault();
                var speed = the.options.accordion.slideSpeed;
                var hasClosables = false;

                if ( BPutil.hasClass(li, 'bp-menu__item--open') === false ) {
                    // hide other accordions
                    if ( the.options.accordion.expandAll === false ) {
                        var subnav = item.closest('.bp-menu__nav, .bp-menu__subnav');
                        var closables = BPutil.children(subnav, '.bp-menu__item.bp-menu__item--open.bp-menu__item--submenu:not(.bp-menu__item--here):not(.bp-menu__item--open-always)');

                        if ( subnav && closables ) {
                            for (var i = 0, len = closables.length; i < len; i++) {
                                var el_ = closables[0];
                                var submenu_ = BPutil.child(el_, '.bp-menu__submenu');
                                if ( submenu_ ) {
                                    BPutil.slideUp(submenu_, speed, function() {
                                        Plugin.scrollUpdate();
                                        BPutil.removeClass(el_, 'bp-menu__item--open');
                                    });
                                }
                            }
                        }
                    }

                    BPutil.slideDown(submenu, speed, function() {
                        Plugin.scrollToItem(item);
                        Plugin.scrollUpdate();

                        Plugin.eventTrigger('submenuToggle', submenu);
                    });

                    BPutil.addClass(li, 'bp-menu__item--open');

                } else {
                    BPutil.slideUp(submenu, speed, function() {
                        Plugin.scrollToItem(item);
                        Plugin.eventTrigger('submenuToggle', submenu);
                    });

                    BPutil.removeClass(li, 'bp-menu__item--open');
                }
            }
        },

        /**
         * scroll to item function
         * @returns {KMenu}
         */
        scrollToItem: function(item) {
            // handle auto scroll for accordion submenus
            if ( BPutil.isInResponsiveRange('desktop') && the.options.accordion.autoScroll && element.getAttribute('data-kmenu-scroll') !== '1' ) {
                BPutil.scrollTo(item, the.options.accordion.autoScrollSpeed);
            }
        },

        /**
         * helper functions
         * @returns {KMenu}
         */
        hideSubmenuDropdown: function(item, classAlso) {
            // remove submenu activation class
            if ( classAlso ) {
                BPutil.removeClass(item, 'bp-menu__item--hover');
                BPutil.removeClass(item, 'bp-menu__item--active-tab');
            }

            // clear timeout
            item.removeAttribute('data-hover');

            if ( item.getAttribute('data-kmenu-dropdown-toggle-class') ) {
                BPutil.removeClass(body, item.getAttribute('data-kmenu-dropdown-toggle-class'));
            }

            var timeout = item.getAttribute('data-timeout');
            item.removeAttribute('data-timeout');
            clearTimeout(timeout);
        },

        /**
         * helper functions
         * @returns {KMenu}
         */
        showSubmenuDropdown: function(item) {
            // close active submenus
            var list = element.querySelectorAll('.bp-menu__item--submenu.bp-menu__item--hover, .bp-menu__item--submenu.bp-menu__item--active-tab');

            if ( list ) {
                for (var i = 0, len = list.length; i < len; i++) {
                    var el = list[i];
                    if ( item !== el && el.contains(item) === false && item.contains(el) === false ) {
                        Plugin.hideSubmenuDropdown(el, true);
                    }
                }
            }

            // adjust submenu position
            Plugin.adjustSubmenuDropdownArrowPos(item);

            // add submenu activation class
            BPutil.addClass(item, 'bp-menu__item--hover');

            if ( item.getAttribute('data-kmenu-dropdown-toggle-class') ) {
                BPutil.addClass(body, item.getAttribute('data-kmenu-dropdown-toggle-class'));
            }
        },

        /**
         * Handles submenu slide toggle
         * @returns {KMenu}
         */
        createSubmenuDropdownClickDropoff: function(el) {
            var query;
            var zIndex = (query = BPutil.child(el, '.bp-menu__submenu') ? BPutil.css(query, 'z-index') : 0) - 1;

            var dropoff = document.createElement('<div class="bp-menu__dropoff" style="background: transparent; position: fixed; top: 0; bottom: 0; left: 0; right: 0; z-index: ' + zIndex + '"></div>');

            body.appendChild(dropoff);

            BPutil.addEvent(dropoff, 'click', function(e) {
                e.stopPropagation();
                e.preventDefault();
                BPutil.remove(this);
                Plugin.hideSubmenuDropdown(el, true);
            });
        },

        /**
         * Handles submenu click toggle
         * @returns {KMenu}
         */
        adjustSubmenuDropdownArrowPos: function(item) {
            var submenu = BPutil.child(item, '.bp-menu__submenu');
            var arrow = BPutil.child( submenu, '.bp-menu__arrow.bp-menu__arrow--adjust');
            var subnav = BPutil.child( submenu, '.bp-menu__subnav');

            if ( arrow ) {
                var pos = 0;
                var link = BPutil.child(item, '.bp-menu__link');

                if ( BPutil.hasClass(submenu, 'bp-menu__submenu--classic') || BPutil.hasClass(submenu, 'bp-menu__submenu--fixed') ) {
                    if ( BPutil.hasClass(submenu, 'bp-menu__submenu--right')) {
                        pos = BPutil.outerWidth(item) / 2;
                        if (BPutil.hasClass(submenu, 'bp-menu__submenu--pull')) {
                            pos = pos + Math.abs( parseFloat(BPutil.css(submenu, 'margin-right')) );
                        }
                        pos = parseInt(BPutil.css(submenu, 'width')) - pos;
                    } else if ( BPutil.hasClass(submenu, 'bp-menu__submenu--left') ) {
                        pos = BPutil.outerWidth(item) / 2;
                        if ( BPutil.hasClass(submenu, 'bp-menu__submenu--pull')) {
                            pos = pos + Math.abs( parseFloat(BPutil.css(submenu, 'margin-left')) );
                        }
                    }
                } else {
                    if ( BPutil.hasClass(submenu, 'bp-menu__submenu--center') || BPutil.hasClass(submenu, 'bp-menu__submenu--full') ) {
                        pos = BPutil.offset(item).left - ((BPutil.getViewPort().width - parseInt(BPutil.css(submenu, 'width'))) / 2);
                        pos = pos + (BPutil.outerWidth(item) / 2);
                    }
                }

                BPutil.css(arrow, 'left', pos + 'px');
            }
        },

        /**
         * Handles submenu hover toggle
         * @returns {KMenu}
         */
        pauseDropdownHover: function(time) {
            var date = new Date();

            the.pauseDropdownHoverTime = date.getTime() + time;
        },

        /**
         * Handles submenu hover toggle
         * @returns {KMenu}
         */
        resumeDropdownHover: function() {
            var date = new Date();

            return (date.getTime() > the.pauseDropdownHoverTime ? true : false);
        },

        /**
         * Reset menu's current active item
         * @returns {KMenu}
         */
        resetActiveItem: function(item) {
            var list;
            var parents;

            list = element.querySelectorAll('.bp-menu__item--active');

            for (var i = 0, len = list.length; i < len; i++) {
                var el = list[0];
                BPutil.removeClass(el, 'bp-menu__item--active');
                BPutil.hide( BPutil.child(el, '.bp-menu__submenu') );
                parents = BPutil.parents(el, '.bp-menu__item--submenu');

                for (var i_ = 0, len_ = parents.length; i_ < len_; i_++) {
                    var el_ = parents[i];
                    BPutil.removeClass(el_, 'bp-menu__item--open');
                    BPutil.hide( BPutil.child(el_, '.bp-menu__submenu') );
                }
            }

            // close open submenus
            if ( the.options.accordion.expandAll === false ) {
                if ( list = element.querySelectorAll('.bp-menu__item--open') ) {
                    for (var i = 0, len = list.length; i < len; i++) {
                        BPutil.removeClass(parents[0], 'bp-menu__item--open');
                    }
                }
            }
        },

        /**
         * Sets menu's active item
         * @returns {KMenu}
         */
        setActiveItem: function(item) {
            // reset current active item
            Plugin.resetActiveItem();

            BPutil.addClass(item, 'bp-menu__item--active');

            var parents = BPutil.parents(item, '.bp-menu__item--submenu');
            for (var i = 0, len = parents.length; i < len; i++) {
                BPutil.addClass(parents[i], 'bp-menu__item--open');
            }
        },

        /**
         * Returns page breadcrumbs for the menu's active item
         * @returns {KMenu}
         */
        getBreadcrumbs: function(item) {
            var query;
            var breadcrumbs = [];
            var link = BPutil.child(item, '.bp-menu__link');

            breadcrumbs.push({
                text: (query = BPutil.child(link, '.bp-menu__link-text') ? query.innerHTML : ''),
                title: link.getAttribute('title'),
                href: link.getAttribute('href')
            });

            var parents = BPutil.parents(item, '.bp-menu__item--submenu');
            for (var i = 0, len = parents.length; i < len; i++) {
                var submenuLink = BPutil.child(parents[i], '.bp-menu__link');

                breadcrumbs.push({
                    text: (query = BPutil.child(submenuLink, '.bp-menu__link-text') ? query.innerHTML : ''),
                    title: submenuLink.getAttribute('title'),
                    href: submenuLink.getAttribute('href')
                });
            }

            return  breadcrumbs.reverse();
        },

        /**
         * Returns page title for the menu's active item
         * @returns {KMenu}
         */
        getPageTitle: function(item) {
            var query;

            return (query = BPutil.child(item, '.bp-menu__link-text') ? query.innerHTML : '');
        },

        /**
         * Trigger events
         */
        eventTrigger: function(name, args) {
            for (var i = 0; i < the.events.length; i++ ) {
                var event = the.events[i];
                if ( event.name == name ) {
                    if ( event.one == true ) {
                        if ( event.fired == false ) {
                            the.events[i].fired = true;
                            event.handler.call(this, the, args);
                        }
                    } else {
                        event.handler.call(this, the, args);
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
        },

        removeEvent: function(name) {
            if (the.events[name]) {
                delete the.events[name];
            }
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
     * Update scroll
     */
    the.scrollUpdate = function() {
        return Plugin.scrollUpdate();
    };

    /**
     * Re-init scroll
     */
    the.scrollReInit = function() {
        return Plugin.scrollInit();
    };

    /**
     * Scroll top
     */
    the.scrollTop = function() {
        return Plugin.scrollTop();
    };

    /**
     * Set active menu item
     */
    the.setActiveItem = function(item) {
        return Plugin.setActiveItem(item);
    };

    the.reload = function() {
        return Plugin.reload();
    };

    the.update = function(options) {
        return Plugin.update(options);
    };

    /**
     * Set breadcrumb for menu item
     */
    the.getBreadcrumbs = function(item) {
        return Plugin.getBreadcrumbs(item);
    };

    /**
     * Set page title for menu item
     */
    the.getPageTitle = function(item) {
        return Plugin.getPageTitle(item);
    };

    /**
     * Get submenu mode
     */
    the.getSubmenuMode = function(el) {
        return Plugin.getSubmenuMode(el);
    };

    /**
     * Hide dropdown submenu
     * @returns {jQuery}
     */
    the.hideDropdown = function(item) {
        Plugin.hideSubmenuDropdown(item, true);
    };

    /**
     * Disable menu for given time
     * @returns {jQuery}
     */
    the.pauseDropdownHover = function(time) {
        Plugin.pauseDropdownHover(time);
    };

    /**
     * Disable menu for given time
     * @returns {jQuery}
     */
    the.resumeDropdownHover = function() {
        return Plugin.resumeDropdownHover();
    };

    /**
     * Register event
     */
    the.on = function(name, handler) {
        return Plugin.addEvent(name, handler);
    };

    the.off = function(name) {
        return Plugin.removeEvent(name);
    };

    the.one = function(name, handler) {
        return Plugin.addEvent(name, handler, true);
    };

    ///////////////////////////////
    // ** Plugin Construction ** //
    ///////////////////////////////

    // Run plugin
    Plugin.construct.apply(the, [options]);

    // Handle plugin on window resize
    BPutil.addResizeHandler(function() {
        if (init) {
            the.reload();
        }
    });

    // Init done
    init = true;

    // Return plugin instance
    return the;
};

// Plugin global lazy initialization
document.addEventListener("click", function (e) {
    var body = BPutil.get('body');
    var query;
    if ( query = body.querySelectorAll('.bp-menu__nav .bp-menu__item.bp-menu__item--submenu.bp-menu__item--hover:not(.bp-menu__item--tabs)[data-kmenu-submenu-toggle="click"]') ) {
        for (var i = 0, len = query.length; i < len; i++) {
            var element = query[i].closest('.bp-menu__nav').parentNode;

            if ( element ) {
                var the = BPutil.data(element).get('menu');

                if ( !the ) {
                    break;
                }

                if ( !the || the.getSubmenuMode() !== 'dropdown' ) {
                    break;
                }

                if ( e.target !== element && element.contains(e.target) === false ) {
                    var items;
                    if ( items = element.querySelectorAll('.bp-menu__item--submenu.bp-menu__item--hover:not(.bp-menu__item--tabs)[data-kmenu-submenu-toggle="click"]') ) {
                        for (var j = 0, cnt = items.length; j < cnt; j++) {
                            the.hideDropdown(items[j]);
                        }
                    }
                }
            }
        }
    }
});
