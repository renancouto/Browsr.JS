/*	Browsr(https://github.com/renancouto/Browsr.JS) - browser detection engine

	@info:		Places classes on <html> with:
				- Engine name;
				- Browser name and version;
				- OS name;
				- Devide type;

	@author:	Renan Couto
	@version:	0.3.2
	@created:	Aug Fri 02 2011
	@updated:	Dec Thu 20 2012
	@license:	MIT & BSD
	@url:		https://github.com/renancouto/Browsr.JS

	@changelog:

	version: 0.3.2
	- Small fixes to variables definitions

	version: 0.3.1
	- Small fixes to variables definitions
	- New descriptive header
	- Removed version info from file name
*/

;window.Browsr = (function(window, document, undefined) {

	var Browsr = {},

		engines = ['webkit', 'gecko', 'trident', 'presto'],
		browsers = ['msie', 'chrome', 'firefox', 'safari', 'opera'],
		oss = ['windows', 'android', 'linux', 'ipad', 'iphone', 'macos'],

		ua = navigator.userAgent.toLowerCase()
			.replace(/ /g, '')
			.replace(/\//g, ''),

		pattern,
		version,
		html,
		classes,

		GetProperty = function(property, properties) {
			for (var i in properties) {
				var prop = ua.match(properties[i]);

				if (prop) {
					Browsr[property] = properties[i];
					return;
				}
			}
		};

	GetProperty('engine', engines);
	GetProperty('browser', browsers);
	GetProperty('os', oss);

	// Get Version
	pattern = new RegExp('version([0-9]+)');
	version = ua.match(pattern);

	if (!version) {
		pattern = new RegExp(Browsr.browser + '([0-9]+)');
		version = ua.match(pattern);
	}

	Browsr.version = version[1];

	// Get IOS
	if (Browsr.os == 'iphone' || Browsr.os == 'ipad') {
		Browsr.ios = true;
	}

	// Get Device
	Browsr.device = (Browsr.os == 'iphone' || Browsr.os == 'ipad' || Browsr.os == 'android') ? 'mobile' : 'desktop';

	// Write Classes
	html = document.getElementsByTagName('html')[0];
	classes = html.className;

	if (Browsr.engine) {
		classes += ' ' + Browsr.engine;
	}

	if (Browsr.browser) {
		classes += ' ' + Browsr.browser;
	}

	if (Browsr.version) {
		classes += ' ' + Browsr.browser + Browsr.version;
	}

	if (Browsr.os) {
		classes += ' ' + Browsr.os;
	}

	if (Browsr.ios) {
		classes += ' ios';
	}

	classes += ' ' + Browsr.device;

	html.className = classes;

	return Browsr;

})(this, this.document);