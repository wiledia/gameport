"use strict";
var KLayout = function() {
    var body;

    var header;
    var headerMenu;
    var headerMenuOffcanvas;

    var asideMenu;
    var asideMenuOffcanvas;
    var asideToggler;

    var scrollTop;

    var pageStickyPortlet;

    // Header
    var initHeader = function() {
        var tmp;
        var headerEl = BPutil.get('bp_header');
        var options = {
            offset: {},
            minimize: {}
        };

        options.minimize.mobile = false;

        if (BPutil.attr(headerEl, 'data-kheader-minimize') == 'on') {
            options.minimize.desktop = {};
            options.minimize.desktop.on = 'bp-header--minimize';
            options.offset.desktop = 1;
        } else {
            options.minimize.desktop = false;
        }

        header = new KHeader('bp_header', options);
    }

    // Header Topbar
    var initHeaderTopbar = function() {
        asideToggler = new KToggle('bp_header_mobile_topbar_toggler', {
            target: 'body',
            targetState: 'bp-header__topbar--mobile-on',
            togglerState: 'bp-header-mobile__toolbar-topbar-toggler--active'
        });
    }

    // Aside
    var initAside = function() {
        // init aside left offcanvas
        var asidBrandHover = false;
        var aside = BPutil.get('bp_aside');
        var asideBrand = BPutil.get('bp_aside_brand');
        var asideOffcanvasClass = BPutil.hasClass(aside, 'bp-aside--offcanvas-default') ? 'bp-aside--offcanvas-default' : 'bp-aside';

        asideMenuOffcanvas = new KOffcanvas('bp_aside', {
            baseClass: asideOffcanvasClass,
            overlay: true,
            closeBy: 'bp_aside_close_btn',
            toggleBy: {
                target: 'bp_aside_mobile_toggler',
                state: 'bp-header-mobile__toolbar-toggler--active'
            }
        });

        // Handle minimzied aside hover
        if (BPutil.hasClass(body, 'bp-aside--fixed')) {
            var insideTm;
            var outsideTm;

            BPutil.addEvent(aside, 'mouseenter', function(e) {
                e.preventDefault();

                if (BPutil.isInResponsiveRange('desktop') === false) {
                    return;
                }

                if (outsideTm) {
                    clearTimeout(outsideTm);
                    outsideTm = null;
                }

                insideTm = setTimeout(function() {
                    if (BPutil.hasClass(body, 'bp-aside--minimize') && BPutil.isInResponsiveRange('desktop')) {
                        BPutil.removeClass(body, 'bp-aside--minimize');
                        
                        // Minimizing class
                        BPutil.addClass(body, 'bp-aside--minimizing');
                        BPutil.transitionEnd(body, function() {
                            BPutil.removeClass(body, 'bp-aside--minimizing');
                        });

                        // Hover class
                        BPutil.addClass(body, 'bp-aside--minimize-hover');
                        asideMenu.scrollUpdate();
                        asideMenu.scrollTop();
                    }
                }, 50);
            });

            BPutil.addEvent(aside, 'mouseleave', function(e) {
                e.preventDefault();

                if (BPutil.isInResponsiveRange('desktop') === false) {
                    return;
                }

                if (insideTm) {
                    clearTimeout(insideTm);
                    insideTm = null;
                }

                outsideTm = setTimeout(function() {
                    if (BPutil.hasClass(body, 'bp-aside--minimize-hover') && BPutil.isInResponsiveRange('desktop')) {
                        BPutil.removeClass(body, 'bp-aside--minimize-hover');
                        BPutil.addClass(body, 'bp-aside--minimize');

                        // Minimizing class
                        BPutil.addClass(body, 'bp-aside--minimizing');
                        BPutil.transitionEnd(body, function() {
                            BPutil.removeClass(body, 'bp-aside--minimizing');
                        });

                        // Hover class
                        asideMenu.scrollUpdate();
                        asideMenu.scrollTop();
                    }
                }, 100);
            });
        }
    }

    // Aside menu
    var initAsideMenu = function() {
        // Init aside menu
        var menu = BPutil.get('bp_aside_menu');
        var menuDesktopMode = (BPutil.attr(menu, 'data-kmenu-dropdown') === '1' ? 'dropdown' : 'accordion');

        // Init scrollable menu container
        var scroll;
        if (BPutil.attr(menu, 'data-kmenu-scroll') === '1') {
            scroll = {
                height: function() {
                    var height;

                    if (BPutil.isInResponsiveRange('desktop')) {
                        height =  
                            parseInt(BPutil.getViewPort().height) - 
                            parseInt(BPutil.actualHeight('bp_aside_brand'));
                    } else {
                        height =  
                            parseInt(BPutil.getViewPort().height);
                    }

                    height = height - (parseInt(BPutil.css(body, 'paddingTop')) + parseInt(BPutil.css(body, 'paddingBottom')) + parseInt(BPutil.css(menu, 'marginBottom')) + parseInt(BPutil.css(menu, 'marginTop')));

                    return height;
                }
            };
        }

        // Init aside menu
        asideMenu = new KMenu('bp_aside_menu', {
            // vertical scroll
            scroll: scroll,

            // submenu setup
            submenu: {
                desktop: {
                    // by default the menu mode set to accordion in desktop mode
                    default: menuDesktopMode,
                    // whenever body has this class switch the menu mode to dropdown
                    state: {
                        body: 'bp-aside--minimize',
                        mode: 'dropdown'
                    }
                },
                tablet: 'accordion', // menu set to accordion in tablet mode
                mobile: 'accordion' // menu set to accordion in mobile mode
            },

            //accordion setup
            accordion: {
                expandAll: false // allow having multiple expanded accordions in the menu
            }
        });
    }

    // Sidebar toggle
    var initAsideToggler = function() {
        if (!BPutil.get('bp_aside_toggler')) {
            return;
        }

        asideToggler = new KToggle('bp_aside_toggler', {
            target: 'body',
            targetState: 'bp-aside--minimize',
            togglerState: 'bp-aside__brand-aside-toggler--active'
        }); 

        asideToggler.on('toggle', function(toggle) {     
            if (BPutil.get('main_portlet')) {
                pageStickyPortlet.updateSticky();      
            } 

            BPutil.addClass(body, 'bp-aside--minimizing');
            BPutil.transitionEnd(body, function() {
                BPutil.removeClass(body, 'bp-aside--minimizing');
            });

            asideMenu.pauseDropdownHover(800);

            // Remember state in cookie
            Cookies.set('bp_aside_toggle_state', toggle.getState());
            // to set default minimized left aside use this cookie value in your 
            // server side code and add "bp-brand--minimize bp-aside--minimize" classes to 
            // the body tag in order to initialize the minimized left aside mode during page loading.
        });

        asideToggler.on('beforeToggle', function(toggle) {   
            var body = BPutil.get('body'); 
            if (BPutil.hasClass(body, 'bp-aside--minimize') === false && BPutil.hasClass(body, 'bp-aside--minimize-hover')) {
                BPutil.removeClass(body, 'bp-aside--minimize-hover');
            }
        });
    }

    // Scrolltop
    var initScrolltop = function() {
        var scrolltop = new KScrolltop('bp_scrolltop', {
            offset: 300,
            speed: 600
        });
    }

    // Init page sticky portlet
    var initPageStickyPortlet = function() {
        var asideWidth = 280;
        var asideMinimizeWidth = 78;

        return new KPortlet('bp_page_portlet', {
            sticky: {
                offset: parseInt(BPutil.css( BPutil.get('bp_header'), 'height')),
                zIndex: 90,
                position: {
                    top: function() {
                        if (BPutil.isInResponsiveRange('desktop')) {
                            return 0;
                        } else {
                            return parseInt(BPutil.css( BPutil.get('bp_header_mobile'), 'height') );
                        }                        
                    },
                    left: function() {
                        var left = 0;

                        if (BPutil.isInResponsiveRange('desktop')) {
                            if (BPutil.hasClass(body, 'bp-aside--minimize')) {
                                left += asideMinimizeWidth;
                            } else {
                                left += asideWidth;
                            }
                        }

                        left += parseInt(BPutil.css(BPutil.getByClass('bp-content'), 'paddingLeft'));
                        left += parseInt(BPutil.css(body, 'paddingRight'));

                        return left; 
                    },
                    right: function() {
                        var right = 0;

                        if (BPutil.isInResponsiveRange('desktop')) {
                            return parseInt(BPutil.css(body, 'paddingRight'));
                        } else {
                            return parseInt(BPutil.css(BPutil.getByClass('bp-content'), 'paddingRight'));
                        }

                        return right;
                    }
                }
            }
        });
    }

    return {
        init: function() {
            body = BPutil.get('body');

            this.initHeader();
            this.initAside();
            this.initPageStickyPortlet();

            // Non functional links notice(can be removed in production)
            $('#bp_aside_menu').on('click', '.bp-menu__link[href="#"]', function() {
                if(!location.hostname.match('keenthemes.com')) {
                    swal("You have clicked on a dummy link!", "This demo shows only its unique layout features. <b>Keen's</b> all available features can be re-used in this and any other demos by refering to <b>the default demo</b>.", "warning");    
                }
            });
        },

        initHeader: function() {
            initHeader();
            initHeaderTopbar();
            initScrolltop();
        },

        initAside: function() { 
            initAside();
            initAsideMenu();
            initAsideToggler();
            
            this.onAsideToggle(function(e) {
                // Update sticky portlet
                if (pageStickyPortlet) {
                    pageStickyPortlet.updateSticky();
                }

                // Reload datatable
                var datatables = $('.bp-datatable');
                if (datatables) {
                    datatables.each(function() {
                        $(this).KDatatable('redraw');
                    });
                }                
            });
        },

        initPageStickyPortlet: function() {
            if (!BPutil.get('bp_page_portlet')) {
                return;
            }
            
            pageStickyPortlet = initPageStickyPortlet();
            pageStickyPortlet.initSticky();
            
            BPutil.addResizeHandler(function(){
                pageStickyPortlet.updateSticky();
            });

            initPageStickyPortlet();
        },

        getAsideMenu: function() {
            return asideMenu;
        },

        onAsideToggle: function(handler) {
            if (typeof asideToggler.element !== 'undefined') {
                asideToggler.on('toggle', handler);
            }
        },

        getAsideToggler: function() {
            return asideToggler;
        },

        closeMobileAsideMenuOffcanvas: function() {
            if (BPutil.isMobileDevice()) {
                asideMenuOffcanvas.hide();
            }
        },

        closeMobileHeaderMenuOffcanvas: function() {
            if (BPutil.isMobileDevice()) {
                headerMenuOffcanvas.hide();
            }
        }
    };
}();

$(document).ready(function() {
    KLayout.init();
});