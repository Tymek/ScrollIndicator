(function ($) {
	'use strict';
	$.scrollIndicator = function (element, options) {
		var $element,
			defaults = {
				animated: true,
				delay: 25,
				ieSupport: true,
				bindResize: true,
				html5: false,
				bindDOMSubtreeModified: false
			},
			plugin = this,
			load,
			trigger,
			update,
			$bar;
		
		plugin.settings = {};
		if (options === undefined) {
			options = element;
			element = 'body';
		}
		$element = $(element);
		
		plugin.init = function () {
			plugin.settings = $.extend({}, defaults, options);
			if (!plugin.settings.html5) {
				plugin.settings.ieSupport = true;
			}
			load();
		};
		
		plugin.reload = function () {
			plugin.docheight = $(document).height();
			plugin.winheingt = $(window).height();
			trigger();
		};
		
		load = function () {
			var bar;
			if (plugin.settings.html5) {
				bar = document.createElement('progress');
			} else {
				bar = document.createElement('div');
			}
			$bar = $(bar);
			$bar.addClass("scrollindicator");
			if (plugin.settings.animated) {
				$bar.addClass("animated");
			}
			
			if (plugin.settings.ieSupport) {
				$bar.append('<div class="scrollindicator-nohtml5"><span></span></div>');
			}
			
			if ($element.length < 1) {
				$element = $("body");
			}
			
			$element.prepend($bar);
			
			plugin.reload();
			
			$(window).on('scroll', trigger);
			
			if (plugin.settings.bindResize) {
				$(window).resize(plugin.reload);
			}
			
			if (plugin.settings.bindDOMSubtreeModified) {
				$('body').bind("DOMSubtreeModified", plugin.reload);
			}
			
			trigger();
		};
		
		update = function () {
			var top,
				value;
			
			top = $(window).scrollTop();
			top = (isNaN(top)) ? 0 : top;
			
			if (top === 0) {
				value = 0;
			} else {
			
				value = top / (plugin.docheight - plugin.winheingt);
				
				if (value > 1) {
					value = 1;
				}
			
			}
			
			if (plugin.settings.html5) {
				$bar.attr("value", value);
			}
			if (plugin.settings.ieSupport) {
				$bar.find("span").css("width", value * 100 + "%");
			}
		};
		
		trigger = function () {
			if (plugin.settings.delay) {
				clearTimeout(plugin.timeout);
				setTimeout(update, plugin.settings.delay);
				
			} else {
				update();
			}
		};
		
		plugin.init();
		
	};
	
	$.fn.scrollIndicator = function (options) {
		return this.each(function () {
			if (options === undefined) {
				options = {};
			}
			if (undefined === $(this).data('scrollIndicator')) {
				var plugin = new $.scrollIndicator(this, options);
				$(this).data('scrollIndicator', plugin);
			}
		});
		
	};
	
}(jQuery));