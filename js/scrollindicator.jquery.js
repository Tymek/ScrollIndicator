(function ($) {
	'use strict';
	$.scrollIndicator = function (element, options) {
		var $element = $(element),
			defaults = {
				delay: 100,
				ieSupport: true,
				bindResize: true,
				bindDOMSubtreeModified: false
			},
			plugin = this,
			load,
			trigger,
			update,
			$bar;

		plugin.settings = {};

		plugin.init = function () {
			plugin.settings = $.extend({}, defaults, options);
			load();
		};

		plugin.reload = function () {
			plugin.docheight = $(document).height();
			plugin.winheingt = $(window).height();
			trigger();
		};

		load = function () {
			var bar;
			bar = document.createElement('progress');
			$bar = $(bar);
			$bar.addClass("scrollindicator");
			if (plugin.settings.ieSupport) {
				$bar.append('<div class="scrollindicator-ie"><span></span></div>');
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
			
			$bar.attr("value", value);
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
			if (undefined === $(this).data('scrollIndicator')) {
				var plugin = new $.scrollIndicator(this, options);
				$(this).data('scrollIndicator', plugin);
			}
		});

	};

}(jQuery));