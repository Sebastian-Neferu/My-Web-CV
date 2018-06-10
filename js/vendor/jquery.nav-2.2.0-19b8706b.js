/*
 * jQuery One Page Nav Plugin
 * http://github.com/davist11/jQuery-One-Page-Nav
 *
 * Copyright (c) 2010 Trevor Davis (http://trevordavis.net)
 * Dual licensed under the MIT and GPL licenses.
 * Uses the same license as jQuery, see:
 * http://jquery.org/license
 *
 * @version 2.2.0
 *
 * Example usage:
 * $('#nav').onePageNav({
 *   currentClass: 'current',
 *   changeHash: false,
 *   scrollSpeed: 750
 * });
 */
!function(n,t,i,e){var s=function(e,s){this.elem=e,this.$elem=n(e),this.options=s,this.metadata=this.$elem.data("plugin-options"),this.$nav=this.$elem.find("a"),this.$win=n(t),this.sections={},this.didScroll=!1,this.$doc=n(i),this.docHeight=this.$doc.height()};s.prototype={defaults:{currentClass:"current",changeHash:!1,easing:"swing",filter:"",scrollSpeed:750,scrollOffset:0,scrollThreshold:.5,begin:!1,end:!1,scrollChange:!1},init:function(){var t=this;return t.config=n.extend({},t.defaults,t.options,t.metadata),""!==t.config.filter&&(t.$nav=t.$nav.filter(t.config.filter)),t.$nav.on("click.onePageNav",n.proxy(t.handleClick,t)),t.getPositions(),t.bindInterval(),t.$win.on("resize.onePageNav",n.proxy(t.getPositions,t)),this},adjustNav:function(n,t){n.$elem.find("."+n.config.currentClass).removeClass(n.config.currentClass),t.addClass(n.config.currentClass)},bindInterval:function(){var n,t=this;t.$win.on("scroll.onePageNav",function(){t.didScroll=!0}),t.t=setInterval(function(){n=t.$doc.height(),t.didScroll&&(t.didScroll=!1,t.scrollChange()),n!==t.docHeight&&(t.docHeight=n,t.getPositions())},250)},getHash:function(n){return n.attr("href").split("#")[1]},getPositions:function(){var t,i,e,s=this;s.$nav.each(function(){t=s.getHash(n(this)),e=n("#"+t),e.length&&(i=e.offset().top,s.sections[t]=Math.round(i)-s.config.scrollOffset)})},getSection:function(n){var t=null,i=Math.round(this.$win.height()*this.config.scrollThreshold);for(var e in this.sections)this.sections[e]-i<n&&(t=e);return t},handleClick:function(i){var e=this,s=n(i.currentTarget),o=s.parent(),a="#"+e.getHash(s);o.hasClass(e.config.currentClass)||(e.config.begin&&e.config.begin(),e.adjustNav(e,o),e.unbindInterval(),n.scrollTo(a,e.config.scrollSpeed,{axis:"y",easing:e.config.easing,offset:{top:-e.config.scrollOffset},onAfter:function(){e.config.changeHash&&(t.location.hash=a),e.bindInterval(),e.config.end&&e.config.end()}})),i.preventDefault()},scrollChange:function(){var n,t=this.$win.scrollTop(),i=this.getSection(t);null!==i&&(n=this.$elem.find('a[href$="#'+i+'"]').parent(),n.hasClass(this.config.currentClass)||(this.adjustNav(this,n),this.config.scrollChange&&this.config.scrollChange(n)))},unbindInterval:function(){clearInterval(this.t),this.$win.unbind("scroll.onePageNav")}},s.defaults=s.prototype.defaults,n.fn.onePageNav=function(n){return this.each(function(){new s(this,n).init()})}}(jQuery,window,document);