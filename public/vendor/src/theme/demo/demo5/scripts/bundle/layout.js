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
            closeBy: 'bp_aside_close',
            toggleBy: {
                target: 'bp_aside_toggler',
                state: 'bp-sub-header__toggler--active'
            }
        });
    }

    // Aside menu
    var initAsideMenu = function() {
        // Init aside menu
        var aside = BPutil.get('bp_aside');
        var menu = BPutil.get('bp_aside_menu');
        var menuDesktopMode = (BPutil.attr(menu, 'data-kmenu-dropdown') === '1' ? 'dropdown' : 'accordion');

        var scroll;
        if (BPutil.attr(menu, 'data-kmenu-scroll') === '1') {
            scroll = {
                height: function() {
                    var height;
                    
                    height = parseInt(BPutil.getViewPort().height);

                    var head = BPutil.find(aside, '.bp-aside__head');

                    if (head) {
                        height = height - parseInt(BPutil.actualHeight(head));
                        height = height - parseInt(BPutil.css(head, 'marginBottom'));
                    }

                    height = height - (parseInt(BPutil.css(menu, 'marginBottom')) + parseInt(BPutil.css(menu, 'marginTop')));
                    height = height - (parseInt(BPutil.css(aside, 'paddingBottom')) + parseInt(BPutil.css(aside, 'paddingTop')));    

                    return height;
                }
            };
        }

        asideMenu = new KMenu('bp_aside_menu', {
            // vertical scroll
            scroll: scroll,

            // submenu setup
            submenu: {
                desktop: 'accordion', // menu set to accordion in tablet mode
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
            offset: 300,
            speed: 600
        });
    }

    // Init page sticky portlet
    var initPageStickyPortlet = function() {
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
                        if (BPutil.isInResponsiveRange('tablet-and-mobile')) {    
                            return parseInt(BPutil.css( BPutil.get('bp_content'), 'paddingLeft')); 
                        }

                        return;
                    },
                    right: function() {
                        if (BPutil.isInResponsiveRange('tablet-and-mobile')) {    
                            return parseInt(BPutil.css( BPutil.get('bp_content'), 'paddingRight')); 
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