(function ($) {
	'use strict';
	$.scrollIndicator = function (element, options) {
		var $element = $(element),
			defaults = {
				delay: 100,
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
		};

		load = function () {
			var bar;
			bar = document.createElement('progress'),
				$bar = $(bar);
				$bar.addClass("scrollindicator");

			if ($element.length < 1) {
				$element = $("body");
			}

			$element.prepend($bar);

			plugin.reload();

			$(window).on('scroll', trigger);

			if (plugin.settings.bindResize) {
				$(window).resize(trigger);
			}

			if (plugin.settings.bindDOMSubtreeModified) {
				$('body').bind("DOMSubtreeModified", trigger);
			}
		};

		update = function () {
			var value = $(window).scrollTop() / (plugin.docheight - plugin.winheingt);
			$bar.attr("value", value);
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