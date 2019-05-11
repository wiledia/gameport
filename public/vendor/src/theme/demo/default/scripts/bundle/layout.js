"use strict";
var KLayout = function() {
    var body;

    var header;
    var headerMenu;
    var headerMenuOffcanvas;

    var asideMenu;
    var asideMenuOffcanvas;
    var asideToggler;

    var asideSecondary;
    var asideSecondaryToggler;

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

        if (BPutil.attr(headerEl, 'data-kheader-minimize-mobile') == 'hide') {
            options.minimize.mobile = {};
            options.minimize.mobile.on = 'bp-header--hide';
            options.minimize.mobile.off = 'bp-header--show';
        } else {
            options.minimize.mobile = false;
        }

        if (BPutil.attr(headerEl, 'data-kheader-minimize') == 'hide') {
            options.minimize.desktop = {};
            options.minimize.desktop.on = 'bp-header--hide';
            options.minimize.desktop.off = 'bp-header--show';
        } else {
            options.minimize.desktop = false;
        }

        if (tmp = BPutil.attr(headerEl, 'data-kheader-minimize-offset')) {
            options.offset.desktop = tmp;
        }

        if (tmp = BPutil.attr(headerEl, 'data-kheader-minimize-mobile-offset')) {
            options.offset.mobile = tmp;
        }

        header = new KHeader('bp_header', options);
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

        var scroll;
        if (BPutil.attr(menu, 'data-kmenu-scroll') === '1') {
            scroll = {
                height: function() {
                    var height;

                    if (BPutil.isInResponsiveRange('desktop')) {
                        height =  
                            parseInt(BPutil.getViewPort().height) - 
                            parseInt(BPutil.actualHeight('bp_aside_brand')) - 
                            parseInt(BPutil.getByID('bp_aside_footer') ? BPutil.actualHeight('bp_aside_footer') : 0);
                    } else {
                        height =  
                            parseInt(BPutil.getViewPort().height) - 
                            parseInt(BPutil.getByID('bp_aside_footer') ? BPutil.actualHeight('bp_aside_footer') : 0);
                    }

                    height = height - (parseInt(BPutil.css(menu, 'marginBottom')) + parseInt(BPutil.css(menu, 'marginTop')));

                    return height;
                }
            };
        }

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
            BPutil.addClass(body, 'bp-aside--minimizing');

            if (BPutil.get('bp_page_portlet')) {
                pageStickyPortlet.updateSticky();      
            } 

            BPutil.transitionEnd(body, function() {
                BPutil.removeClass(body, 'bp-aside--minimizing');
            });

            headerMenu.pauseDropdownHover(800);
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

    // Aside secondary
    var initAsideSecondary = function() {
        if (!BPutil.get('bp_aside_secondary')) {
            return;
        }

        asideSecondaryToggler = new KToggle('bp_aside_secondary_toggler', {
            target: 'body',
            targetState: 'bp-aside-secondary--expanded'
        });

        asideSecondaryToggler.on('toggle', function(toggle) {
            if (BPutil.get('bp_page_portlet')) {
                pageStickyPortlet.updateSticky();      
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
        var asideWidth = 260;
        var asideMinimizeWidth = 78;
        var asideSecondaryWidth = 60;
        var asideSecondaryExpandedWidth = 310;

        return new KPortlet('bp_page_portlet', {
            sticky: {
                offset: parseInt(BPutil.css( BPutil.get('bp_header'), 'height')),
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
                        var left = 0;

                        if (BPutil.isInResponsiveRange('desktop')) {
                            if (BPutil.hasClass(body, 'bp-aside--minimize')) {
                                left += asideMinimizeWidth;
                            } else {
                                left += asideWidth;
                            }
                        }

                        left += parseInt(BPutil.css( BPutil.get('bp_content'), 'paddingLeft'));

                        return left; 
                    },
                    right: function() {
                        var right = 0;

                        if (BPutil.isInResponsiveRange('desktop')) {                            
                            if (BPutil.hasClass(body, 'bp-aside-secondary--enabled')) {
                                if (BPutil.hasClass(body, 'bp-aside-secondary--expanded')) {
                                    right += asideSecondaryExpandedWidth + asideSecondaryWidth;
                                } else {
                                    right += asideSecondaryWidth; 
                                }
                            } else {
                                right += parseInt(BPutil.css( BPutil.get('bp_content'), 'paddingRight')); 
                            }
                        }

                        if (BPutil.get('bp_aside_secondary')) {
                            right += parseInt(BPutil.css( BPutil.get('bp_content'), 'paddingRight') );
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
            this.initAsideSecondary();
            this.initPageStickyPortlet();

            // Non functional links notice(can be removed in production)u8-=9=./'pij'
            $('#bp_header_menu').on('click', '.bp-menu__submenu .bp-menu__link', function() {
                swal("You have clicked on a dummy link!", "To browse the theme features please refer to the left aside menu.", "warning");
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

        initAsideSecondary: function() { 
            initAsideSecondary();
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

        openAsideSecondary: function() {
            asideSecondaryToggler.toggleOn();
        },

        closeAsideSecondary: function() {
            asideSecondaryToggler.toggleOff();
        },

        getAsideSecondaryToggler: function() {
            return asideSecondaryToggler;
        },

        onAsideSecondaryToggle: function(handler) {
            if (asideSecondaryToggler) {
                asideSecondaryToggler.on('toggle', handler);
            }
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