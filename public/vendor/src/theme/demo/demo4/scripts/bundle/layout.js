"use strict";
var KLayout = function() {
    var body;

    var header;
    var headerMenu;
    var headerMenuOffcanvas;
    var mobileHeaderTopbarToggle;

    var asideMenu;
    var asideMenuOffcanvas;

    var scrollTop;

    var pageStickyPortlet;

    // Header
    var initHeader = function() {
        var tmp;
        var headerEl = BPutil.get('bp_header');
        var options = {
            classic: {
                desktop: true,
                mobile: false
            },
            offset: {},
            minimize: {}
        };

        options.minimize.mobile = false;

        if (BPutil.attr(headerEl, 'data-kheader-minimize') == 'on') {
            options.minimize.desktop = {};
            options.minimize.desktop.on = 'bp-header--minimize';
            options.offset.desktop = parseInt(BPutil.css(headerEl, 'height')) - 10;
        } else {
            options.minimize.desktop = false;
        }

        header = new KHeader('bp_header', options);

        if (asideMenu) {
            header.on('minimizeOn', function() {
                asideMenu.scrollReInit();
            });

            header.on('minimizeOff', function() {
                asideMenu.scrollReInit();
            });
        }        
    }

    // Header Menu
    var initHeaderMenu = function() {
        // init aside left offcanvas
        headerMenuOffcanvas = new KOffcanvas('bp_header_menu_wrapper', {
            overlay: true,
            baseClass: 'bp-header-menu-wrapper',
            closeBy: 'bp_header_menu_mobile_close_btn',
            toggleBy: {
                target: 'bp_header_mobile_toggler',
                state: 'bp-header-mobile__toolbar-toggler--active'
            }
        });

        headerMenu = new KMenu('bp_header_menu', {
            submenu: {
                desktop: 'dropdown',
                tablet: 'accordion',
                mobile: 'accordion'
            },
            accordion: {
                slideSpeed: 200, // accordion toggle slide speed in milliseconds
                expandAll: false // allow having multiple expanded accordions in the menu
            }
        });
    }

    // Header Topbar
    var initHeaderTopbar = function() {
        mobileHeaderTopbarToggle = new KToggle('bp_header_mobile_topbar_toggler', {
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
                        height = parseInt(BPutil.getViewPort().height) - parseInt(BPutil.actualHeight('bp_header', false)) - parseInt(BPutil.actualHeight('bp_footer', false));
                        height = height - parseInt(BPutil.css(menu, 'marginTop')) - parseInt(BPutil.css(menu, 'marginBottom'));
                    } else {
                        height = parseInt(BPutil.getViewPort().height);
                    }

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

    // Scrolltop
    var initScrolltop = function() {
        var scrolltop = new KScrolltop('bp_scrolltop', {
            offset: 200,
            speed: 400
        });
    }

    // Init page sticky portlet
    var initPageStickyPortlet = function() {
        return new KPortlet('bp_page_portlet', {
            sticky: {
                offset: parseInt(BPutil.css( BPutil.get('bp_header'), 'height')) + 200,
                zIndex: 90,
                position: {
                    top: function() {
                        if (BPutil.isInResponsiveRange('desktop')) {
                            return parseInt(BPutil.css( BPutil.get('bp_header'), 'height') );
                        } else {
                            return parseInt(BPutil.css( BPutil.get('bp_header_mobile'), 'height') );
                        }                        
                    },
                    left: function() {
                        if (BPutil.isInResponsiveRange('tablet-and-mobile')) {    
                            return parseInt(BPutil.css( BPutil.get('bp_content_wrapper'), 'paddingLeft')); 
                        }

                        return;
                    },
                    right: function() {
                        if (BPutil.isInResponsiveRange('tablet-and-mobile')) {    
                            return parseInt(BPutil.css( BPutil.get('bp_content_wrapper'), 'paddingRight')); 
                        }

                        return;
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
            $('#bp_aside_menu, #bp_header_menu').on('click', '.bp-menu__link[href="#"]', function() {
                if(location.hostname.match('keenthemes.com')) {
                    swal("You have clicked on a dummy link!", "To browse the theme features please refer to the header menu.", "warning");
                } else {
                    swal("You have clicked on a dummy link!", "This demo shows only its unique layout features. <b>Keen's</b> all available features can be re-used in this and any other demos by refering to <b>the default demo</b>.", "warning");    
                }
            });
        },

        initHeader: function() {
            initHeader();
            initHeaderMenu();
            initHeaderTopbar();
            initScrolltop();
        },

        initAside: function() { 
            initAside();
            initAsideMenu();
        },

        getAsideMenu: function() {
            return asideMenu;
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