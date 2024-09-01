"use strict";

$(document).ready(function () {
	/* Video Lightbox */
	if (!!$.prototype.simpleLightboxVideo) {
		$('.video').simpleLightboxVideo();
	}

	/*ScrollUp*/
	if (!!$.prototype.scrollUp) {
		$.scrollUp();
	}

	/*Responsive Navigation*/
	$("#nav-mobile").html($("#nav-main").html());
	$("#nav-trigger span").on("click",function() {
		if ($("nav#nav-mobile ul").hasClass("expanded")) {
			$("nav#nav-mobile ul.expanded").removeClass("expanded").slideUp(250);
			$(this).removeClass("open");
		} else {
			$("nav#nav-mobile ul").addClass("expanded").slideDown(250);
			$(this).addClass("open");
		}
	});

	$("#nav-mobile").html($("#nav-main").html());
	$("#nav-mobile ul a").on("click",function() {
		if ($("nav#nav-mobile ul").hasClass("expanded")) {
			$("nav#nav-mobile ul.expanded").removeClass("expanded").slideUp(250);
			$("#nav-trigger span").removeClass("open");
		}
	});

	/* Sticky Navigation */
	if (!!$.prototype.stickyNavbar) {
		$('#header').stickyNavbar();
	}

	$('#content').waypoint(function (direction) {
		if (direction === 'down') {
			$('#header').addClass('nav-solid fadeInDown');
		}
		else {
			$('#header').removeClass('nav-solid fadeInDown');
		}
	});

});


/* Preloader and animations */
$(window).load(function () { // makes sure the whole site is loaded
	$('#status').fadeOut(); // will first fade out the loading animation
	$('#preloader').delay(350).fadeOut('slow'); // will fade out the white DIV that covers the website.
	$('body').delay(350).css({'overflow-y': 'visible'});

	/* WOW Elements */
	if (typeof WOW == 'function') {
		new WOW().init();
	}

	/* Parallax Effects */
	if (!!$.prototype.enllax) {
		$(window).enllax();
	}

});

/* scroll up */
!function (l, o, e) {
    "use strict";
    l.fn.scrollUp = function (o) {
        l.data(e.body, "scrollUp") || (l.data(e.body, "scrollUp", !0), l.fn.scrollUp.init(o));
    };

    l.fn.scrollUp.init = function (r) {
        var s, t, c, i, n, a, d, p = l.fn.scrollUp.settings = l.extend({}, l.fn.scrollUp.defaults, r), f = !1;

        switch (d = p.scrollTrigger ? l(p.scrollTrigger) : l("<a/>", { id: p.scrollName, href: "#top" }),
            p.scrollTitle && d.attr("title", p.scrollTitle),
            d.appendTo("body"),
            p.scrollImg || p.scrollTrigger || d.html(p.scrollText),
            d.css({ display: "none", position: "fixed", zIndex: p.zIndex }),
            p.activeOverlay && l("<div/>", {
                id: p.scrollName + "-active"
            }).css({
                position: "absolute", top: p.scrollDistance + "px", width: "100%", borderTop: "1px dotted" + p.activeOverlay, zIndex: p.zIndex
            }).appendTo("body"),
            p.animation) {
            case "fade":
                s = "fadeIn", t = "fadeOut", c = p.animationSpeed;
                break;
            case "slide":
                s = "slideDown", t = "slideUp", c = p.animationSpeed;
                break;
            default:
                s = "show", t = "hide", c = 0;
        }

        i = "top" === p.scrollFrom ? p.scrollDistance : l(e).height() - l(o).height() - p.scrollDistance;
        n = l(o).scroll(function () {
            l(o).scrollTop() > i ? f || (d[s](c), f = !0) : f && (d[t](c), f = !1);
        });

        p.scrollTarget ? "number" == typeof p.scrollTarget ? a = p.scrollTarget : "string" == typeof p.scrollTarget && (a = Math.floor(l(p.scrollTarget).offset().top)) : a = 0;

        d.click(function (o) {
            o.preventDefault();
            l("html, body").animate({ scrollTop: a }, p.scrollSpeed, p.easingType);
        });
    };

    l.fn.scrollUp.defaults = {
        scrollName: "scrollUp",
        scrollDistance: 300,
        scrollFrom: "top",
        scrollSpeed: 300,
        easingType: "linear",
        animation: "slide",
        animationSpeed: 200,
        scrollTrigger: !1,
        scrollTarget: !1,
        scrollText: "",
        scrollTitle: !1,
        scrollImg: !1,
        activeOverlay: !1,
        zIndex: 2147483647
    };

    l.fn.scrollUp.destroy = function (r) {
        l.removeData(e.body, "scrollUp");
        l("#" + l.fn.scrollUp.settings.scrollName).remove();
        l("#" + l.fn.scrollUp.settings.scrollName + "-active").remove();
        l.fn.jquery.split(".")[1] >= 7 ? l(o).off("scroll", r) : l(o).unbind("scroll", r);
    };

    l.scrollUp = l.fn.scrollUp;
}(jQuery, window, document);

/* lightbox */
!function (a) {
    a.extend(a.fn, {
        simpleLightboxVideo: function () {
            var b = { delayAnimation: 300, keyCodeClose: 27 };
            a.simpleLightboxVideo.vars = a.extend({}, b);
            var c = this;
            return c.click(function () {
                var b = window.innerHeight > 540 ? (window.innerHeight - 540) / 2 : 0;
                var c = '<iframe src="" width="640" height="480" id="slvj-video-embed" style="border:0;"></iframe>',
                    d = '<div id="slvj-close-icon"></div>',
                    e = '<div class="slvj-lightbox" style="margin-top:' + b + 'px">',
                    f = '<div id="slvj-back-lightbox">',
                    g = '<div id="slvj-background-close"></div>',
                    h = '<div id="slvj-window">',
                    i = "</div></div></div>";
                
                a("body").append(h + g + f + e + d + c + i);
                a("#slvj-window").hide();
                
                var j;
                if ("youtube" == a(this).data("videosite")) {
                    j = "http://www.youtube.com/embed/" + a(this).data("videoid") + "?autoplay=1";
                } else if ("vimeo" == a(this).data("videosite")) {
                    j = "http://player.vimeo.com/video/" + a(this).data("videoid") + "?autoplay=1";
                }
                
                a("#slvj-window").fadeIn();
                a("#slvj-video-embed").attr("src", j);
                
                a("#slvj-close-icon").click(function () {
                    a("#slvj-window").fadeOut(a.simpleLightboxVideo.vars.delayAnimation, function () {
                        a(this).remove();
                    });
                });
                
                a("#slvj-background-close").click(function () {
                    a("#slvj-window").fadeOut(a.simpleLightboxVideo.vars.delayAnimation, function () {
                        a(this).remove();
                    });
                });
                
                return !1;
            }), a(document).keyup(function (b) {
                if (27 == b.keyCode) {
                    a("#slvj-window").fadeOut(a.simpleLightboxVideo.vars.delayAnimation, function () {
                        a(this).remove();
                    });
                }
            }), a(window).resize(function () {
                var b = window.innerHeight > 540 ? (window.innerHeight - 540) / 2 : 0;
                a(".slvj-lightbox").css({ marginTop: b + "px" });
            }), !1;
        }
    });
}(jQuery);

!function (a) {
    a.simpleLightboxVideo = function (b, c) {
        return a(c).simpleLightboxVideo();
    };
}(jQuery);

/*enllax*/
!function (t) {
    "use strict";
    t.fn.enllax = function (r) {
        var a = t(window).height(),
            n = t(document).height(),
            o = t.extend({ ratio: 0, type: "background", direction: "vertical" }, r),
            e = t("[data-enllax-ratio]");

        e.each(function () {
            var r, e, s, i = t(this),
                c = i.offset().top,
                l = i.outerHeight(),
                p = i.data("enllax-ratio"),
                d = i.data("enllax-type"),
                x = i.data("enllax-direction");

            r = p ? p : o.ratio;
            e = d ? d : o.type;
            s = x ? x : o.direction;

            var f = Math.round(c * r),
                u = Math.round((c - a / 2 + l) * r);

            if ("background" == e) {
                if ("vertical" == s) {
                    i.css({ "background-position": "center " + -f + "px" });
                } else if ("horizontal" == s) {
                    i.css({ "background-position": -f + "px center" });
                }
            } else if ("foreground" == e) {
                if ("vertical" == s) {
                    i.css({
                        "-webkit-transform": "translateY(" + u + "px)",
                        "-moz-transform": "translateY(" + u + "px)",
                        transform: "translateY(" + u + "px)"
                    });
                } else if ("horizontal" == s) {
                    i.css({
                        "-webkit-transform": "translateX(" + u + "px)",
                        "-moz-transform": "translateX(" + u + "px)",
                        transform: "translateX(" + u + "px)"
                    });
                }
            }

            t(window).on("scroll", function () {
                var o = t(this).scrollTop();
                f = Math.round((c - o) * r);
                u = Math.round((c - a / 2 + l - o) * r);

                if ("background" == e) {
                    if ("vertical" == s) {
                        i.css({ "background-position": "center " + -f + "px" });
                    } else if ("horizontal" == s) {
                        i.css({ "background-position": -f + "px center" });
                    }
                } else if ("foreground" == e && n > o) {
                    if ("vertical" == s) {
                        i.css({
                            "-webkit-transform": "translateY(" + u + "px)",
                            "-moz-transform": "translateY(" + u + "px)",
                            transform: "translateY(" + u + "px)"
                        });
                    } else if ("horizontal" == s) {
                        i.css({
                            "-webkit-transform": "translateX(" + u + "px)",
                            "-moz-transform": "translateX(" + u + "px)",
                            transform: "translateX(" + u + "px)"
                        });
                    }
                }
            });
        });
    };
}(jQuery);


/*prototype*/
jQuery.easing["jswing"] = jQuery.easing["swing"];

jQuery.extend(jQuery.easing, {
    def: "easeOutQuad",
    swing: function (x, t, b, c, d) {
        return jQuery.easing[jQuery.easing.def](x, t, b, c, d);
    },
    easeInQuad: function (x, t, b, c, d) {
        return c * (t /= d) * t + b;
    },
    easeOutQuad: function (x, t, b, c, d) {
        return -c * (t /= d) * (t - 2) + b;
    },
    easeInOutQuad: function (x, t, b, c, d) {
        if ((t /= d / 2) < 1) return c / 2 * t * t + b;
        return -c / 2 * (--t * (t - 2) - 1) + b;
    },
    easeInCubic: function (x, t, b, c, d) {
        return c * (t /= d) * t * t + b;
    },
    easeOutCubic: function (x, t, b, c, d) {
        return c * ((t = t / d - 1) * t * t + 1) + b;
    },
    easeInOutCubic: function (x, t, b, c, d) {
        if ((t /= d / 2) < 1) return c / 2 * t * t * t + b;
        return c / 2 * ((t -= 2) * t * t + 2) + b;
    },
    easeInQuart: function (x, t, b, c, d) {
        return c * (t /= d) * t * t * t + b;
    },
    easeOutQuart: function (x, t, b, c, d) {
        return -c * ((t = t / d - 1) * t * t * t - 1) + b;
    },
    easeInOutQuart: function (x, t, b, c, d) {
        if ((t /= d / 2) < 1) return c / 2 * t * t * t * t + b;
        return -c / 2 * ((t -= 2) * t * t * t - 2) + b;
    },
    easeInQuint: function (x, t, b, c, d) {
        return c * (t /= d) * t * t * t * t + b;
    },
    easeOutQuint: function (x, t, b, c, d) {
        return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
    },
    easeInOutQuint: function (x, t, b, c, d) {
        if ((t /= d / 2) < 1) return c / 2 * t * t * t * t * t + b;
        return c / 2 * ((t -= 2) * t * t * t * t + 2) + b;
    },
    easeInSine: function (x, t, b, c, d) {
        return -c * Math.cos(t / d * (Math.PI / 2)) + c + b;
    },
    easeOutSine: function (x, t, b, c, d) {
        return c * Math.sin(t / d * (Math.PI / 2)) + b;
    },
    easeInOutSine: function (x, t, b, c, d) {
        return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b;
    },
    easeInExpo: function (x, t, b, c, d) {
        return t == 0 ? b : c * Math.pow(2, 10 * (t / d - 1)) + b;
    },
    easeOutExpo: function (x, t, b, c, d) {
        return t == d ? b + c : c * (-Math.pow(2, -10 * t / d) + 1) + b;
    },
    easeInOutExpo: function (x, t, b, c, d) {
        if (t == 0) return b;
        if (t == d) return b + c;
        if ((t /= d / 2) < 1) return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
        return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
    },
    easeInCirc: function (x, t, b, c, d) {
        return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b;
    },
    easeOutCirc: function (x, t, b, c, d) {
        return c * Math.sqrt(1 - (t = t / d - 1) * t) + b;
    },
    easeInOutCirc: function (x, t, b, c, d) {
        if ((t /= d / 2) < 1) return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b;
        return c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
    },
    easeInElastic: function (x, t, b, c, d) {
        var s = 1.70158,
            p = 0,
            a = c;
        if (t == 0) return b;
        if ((t /= d) == 1) return b + c;
        if (!p) p = d * 0.3;
        if (a < Math.abs(c)) {
            a = c;
            var s = p / 4;
        } else var s = p / (2 * Math.PI) * Math.asin(c / a);
        return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * 2 * Math.PI / p)) + b;
    },
    easeOutElastic: function (x, t, b, c, d) {
        var s = 1.70158,
            p = 0,
            a = c;
        if (t == 0) return b;
        if ((t /= d) == 1) return b + c;
        if (!p) p = d * 0.3;
        if (a < Math.abs(c)) {
            a = c;
            var s = p / 4;
        } else var s = p / (2 * Math.PI) * Math.asin(c / a);
        return a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * 2 * Math.PI / p) + c + b;
    },
    easeInOutElastic: function (x, t, b, c, d) {
        var s = 1.70158,
            p = 0,
            a = c;
        if (t == 0) return b;
        if ((t /= d / 2) == 2) return b + c;
        if (!p) p = d * 0.3 * 1.5;
        if (a < Math.abs(c)) {
            a = c;
            var s = p / 4;
        } else var s = p / (2 * Math.PI) * Math.asin(c / a);
        if (t < 1)
            return -0.5 * a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * 2 * Math.PI / p) + b;
        return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * d - s) * 2 * Math.PI / p) * 0.5 + c + b;
    },
    easeInBack: function (x, t, b, c, d, s) {
        if (s == undefined) s = 1.70158;
        return c * (t /= d) * t * ((s + 1) * t - s) + b;
    },
    easeOutBack: function (x, t, b, c, d, s) {
        if (s == undefined) s = 1.70158;
        return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
    },
    easeInOutBack: function (x, t, b, c, d, s) {
        if (s == undefined) s = 1.70158;
        if ((t /= d / 2) < 1) return c / 2 * t * t * (((s *= 1.525) + 1) * t - s) + b;
        return c / 2 * ((t -= 2) * t * (((s *= 1.525) + 1) * t + s) + 2) + b;
    },
    easeInBounce: function (x, t, b, c, d) {
        return c - jQuery.easing.easeOutBounce(x, d - t, 0, c, d) + b;
    },
    easeOutBounce: function (x, t, b, c, d) {
        if ((t /= d) < 1 / 2.75) {
            return c * 7.5625 * t * t + b;
        } else if (t < 2 / 2.75) {
            return c * (7.5625 * (t -= 1.5 / 2.75) * t + 0.75) + b;
        } else if (t < 2.5 / 2.75) {
            return c * (7.5625 * (t -= 2.25 / 2.75) * t + 0.9375) + b;
        } else {
            return c * (7.5625 * (t -= 2.625 / 2.75) * t + 0.984375) + b;
        }
    },
    easeInOutBounce: function (x, t, b, c, d) {
        if (t < d / 2) return jQuery.easing.easeInBounce(x, t * 2, 0, c, d) * 0.5 + b;
        return jQuery.easing.easeOutBounce(x, t * 2 - d, 0, c, d) * 0.5 + c * 0.5 + b;
    }
});


/* img lo */
(function(){
    function e(){}
    function t(e,t){
        for(var n=e.length;n--;)
            if(e[n].listener===t)return n;
        return -1;
    }
    function n(e){
        return function(){
            return this[e].apply(this,arguments);
        }
    }
    var i=e.prototype, r=this, o=r.EventEmitter;
    
    i.getListeners=function(e){
        var t,n,i=this._getEvents();
        if("object"==typeof e){
            t={};
            for(n in i)
                i.hasOwnProperty(n)&&e.test(n)&&(t[n]=i[n]);
        } else t=i[e]||(i[e]=[]);
        return t;
    };
    
    i.flattenListeners=function(e){
        var t,n=[];
        for(t=0;e.length>t;t+=1)
            n.push(e[t].listener);
        return n;
    };
    
    i.getListenersAsObject=function(e){
        var t,n=this.getListeners(e);
        return n instanceof Array&&(t={},t[e]=n),t||n;
    };
    
    i.addListener=function(e,n){
        var i,r=this.getListenersAsObject(e),o="object"==typeof n;
        for(i in r)
            r.hasOwnProperty(i)&&-1===t(r[i],n)&&r[i].push(o?n:{listener:n,once:!1});
        return this;
    };
    
    i.on=n("addListener");
    
    i.addOnceListener=function(e,t){
        return this.addListener(e,{listener:t,once:!0});
    };
    
    i.once=n("addOnceListener");
    
    i.defineEvent=function(e){
        return this.getListeners(e),this;
    };
    
    i.defineEvents=function(e){
        for(var t=0;e.length>t;t+=1)
            this.defineEvent(e[t]);
        return this;
    };
    
    i.removeListener=function(e,n){
        var i,r,o=this.getListenersAsObject(e);
        for(r in o)
            o.hasOwnProperty(r)&&(i=t(o[r],n),-1!==i&&o[r].splice(i,1));
        return this;
    };
    
    i.off=n("removeListener");
    
    i.addListeners=function(e,t){
        return this.manipulateListeners(!1,e,t);
    };
    
    i.removeListeners=function(e,t){
        return this.manipulateListeners(!0,e,t);
    };
    
    i.manipulateListeners=function(e,t,n){
        var i,r,o=e?this.removeListener:this.addListener,s=e?this.removeListeners:this.addListeners;
        if("object"!=typeof t||t instanceof RegExp)
            for(i=n.length;i--;)
                o.call(this,t,n[i]);
        else
            for(i in t)
                t.hasOwnProperty(i)&&(r=t[i])&&("function"==typeof r?o.call(this,i,r):s.call(this,i,r));
        return this;
    };
    
    i.removeEvent=function(e){
        var t,n=typeof e,i=this._getEvents();
        if("string"===n)delete i[e];
        else if("object"===n)
            for(t in i)
                i.hasOwnProperty(t)&&e.test(t)&&delete i[t];
        else delete this._events;
        return this;
    };
    
    i.removeAllListeners=n("removeEvent");
    
    i.emitEvent=function(e,t){
        var n,i,r,o,s=this.getListenersAsObject(e);
        for(r in s)
            if(s.hasOwnProperty(r))
                for(i=s[r].length;i--;)
                    n=s[r][i],n.once===!0&&this.removeListener(e,n.listener),
                    o=n.listener.apply(this,t||[]),
                    o===this._getOnceReturnValue()&&this.removeListener(e,n.listener);
        return this;
    };
    
    i.trigger=n("emitEvent");
    
    i.emit=function(e){
        var t=Array.prototype.slice.call(arguments,1);
        return this.emitEvent(e,t);
    };
    
    i.setOnceReturnValue=function(e){
        return this._onceReturnValue=e,this;
    };
    
    i._getOnceReturnValue=function(){
        return this.hasOwnProperty("_onceReturnValue")?this._onceReturnValue:!0;
    };
    
    i._getEvents=function(){
        return this._events||(this._events={});
    };
    
    e.noConflict=function(){
        return r.EventEmitter=o,e;
    };
    
    "function"==typeof define&&define.amd?define("eventEmitter/EventEmitter",[],function(){
        return e;
    }):"object"==typeof module&&module.exports?module.exports=e:this.EventEmitter=e;
}).call(this);

(function(e){
    function t(t){
        var n=e.event;
        return n.target=n.target||n.srcElement||t,n;
    }
    var n=document.documentElement,i=function(){};
    n.addEventListener?i=function(e,t,n){
        e.addEventListener(t,n,!1);
    }:n.attachEvent&&(i=function(e,n,i){
        e[n+i]=i.handleEvent?function(){
            var n=t(e);
            i.handleEvent.call(i,n);
        }:function(){
            var n=t(e);
            i.call(e,n);
        },e.attachEvent("on"+n,e[n+i]);
    });
    
    var r=function(){};
    n.removeEventListener?r=function(e,t,n){
        e.removeEventListener(t,n,!1);
    }:n.detachEvent&&(r=function(e,t,n){
        e.detachEvent("on"+t,e[t+n]);
        try{delete e[t+n];}
        catch(i){e[t+n]=void 0;}
    });
    
    var o={bind:i,unbind:r};
    "function"==typeof define&&define.amd?define("eventie/eventie",o):e.eventie=o;
})(this);

(function(e,t){
    "function"==typeof define&&define.amd?define(["eventEmitter/EventEmitter","eventie/eventie"],function(n,i){
        return t(e,n,i);
    }):"object"==typeof exports?module.exports=t(e,require("eventEmitter"),require("eventie")):e.imagesLoaded=t(e,e.EventEmitter,e.eventie);
}(this,function(e,t,n){
    function i(e,t){
        for(var n in t)
            e[n]=t[n];
        return e;
    }
    
    function r(e){
        return"[object Array]"===d.call(e);
    }
    
    function o(e){
        var t=[];
        if(r(e))t=e;
        else if("number"==typeof e.length)
            for(var n=0,i=e.length;i>n;n++)
                t.push(e[n]);
        else t.push(e);
        return t;
    }
    
    function s(e,t,n){
        if(!(this instanceof s))return new s(e,t);
        "string"==typeof e&&(e=document.querySelectorAll(e)),
        this.elements=o(e),
        this.options=i({},this.options),
        "function"==typeof t?n=t:i(this.options,t),
        n&&this.on("always",n),
        this.getImages(),
        a&&(this.jqDeferred=new a.Deferred);
        var r=this;
        setTimeout(function(){
            r.check();
        });
    }
    
    function c(e){
        this.img=e;
    }
    
    function f(e){
        this.src=e,v[e]=this;
    }
    
    var a=e.jQuery,u=e.console,h=u!==void 0,d=Object.prototype.toString;
    s.prototype=new t,s.prototype.options={};
    
    s.prototype.getImages=function(){
        this.images=[];
        for(var e=0,t=this.elements.length;t>e;e++){
            var n=this.elements[e];
            "IMG"===n.nodeName&&this.addImage(n);
            for(var i=n.querySelectorAll("img"),r=0,o=i.length;o>r;r++){
                var s=i[r];
                this.addImage(s);
            }
        }
    };
    
    s.prototype.addImage=function(e){
        var t=new c(e);
        this.images.push(t);
    };
    
    s.prototype.check=function(){
        function e(e,r){
            return t.options.debug&&h&&u.log("confirm",e,r),
            t.progress(e),n++,n===i&&t.complete(),!0;
        }
        var t=this,n=0,i=this.images.length;
        if(this.hasAnyBroken=!1,!i)return this.complete(),void 0;
        for(var r=0;i>r;r++){
            var o=this.images[r];
            o.on("confirm",e),o.check();
        }
    };
    
    s.prototype.progress=function(e){
        this.hasAnyBroken=this.hasAnyBroken||!e.isLoaded;
        var t=this;
        setTimeout(function(){
            t.emit("progress",t,e),
            t.jqDeferred&&t.jqDeferred.notify&&t.jqDeferred.notify(t,e);
        });
    };
    
    s.prototype.complete=function(){
        var e=this.hasAnyBroken?"fail":"done";
        this.isComplete=!0;
        var t=this;
        setTimeout(function(){
            if(t.emit(e,t),t.emit("always",t),t.jqDeferred){
                var n=t.hasAnyBroken?"reject":"resolve";
                t.jqDeferred[n](t);
            }
        });
    };
    
    a&&(a.fn.imagesLoaded=function(e,t){
        var n=new s(this,e,t);
        return n.jqDeferred.promise(a(this));
    });
    
    c.prototype=new t;
    
    c.prototype.check=function(){
        var e=v[this.img.src]||new f(this.img.src);
        if(e.isConfirmed)return this.confirm(e.isLoaded,"cached was confirmed"),void 0;
        if(this.img.complete&&void 0!==this.img.naturalWidth)return this.confirm(0!==this.img.naturalWidth,"naturalWidth"),void 0;
        var t=this;
        e.on("confirm",function(e,n){
            return t.confirm(e.isLoaded,n),!0;
        }),e.check();
    };
    
    c.prototype.confirm=function(e,t){
        this.isLoaded=e,this.emit("confirm",this,t);
    };
    
    var v={};
    
    f.prototype=new t;
    
    f.prototype.check=function(){
        if(!this.isChecked){
            var e=new Image;
            n.bind(e,"load",this),n.bind(e,"error",this),e.src=this.src,this.isChecked=!0;
        }
    };
    
    f.prototype.handleEvent=function(e){
        var t="on"+e.type;
        this[t]&&this[t](e);
    };
    
    f.prototype.onload=function(e){
        this.confirm(!0,"onload"),this.unbindProxyEvents(e);
    };
    
    f.prototype.onerror=function(e){
        this.confirm(!1,"onerror"),this.unbindProxyEvents(e);
    };
    
    f.prototype.confirm=function(e,t){
        this.isConfirmed=!0,this.isLoaded=e,this.emit("confirm",this,t);
    };
    
    f.prototype.unbindProxyEvents=function(e){
        n.unbind(e.target,"load",this),n.unbind(e.target,"error",this);
    };
    
    return s;
}));

