/*	Browsr
	
	Places classes on <html> with:
		Engine name;
		Browser name and version;
		OS name;
		Devide type;

	Author:		Renan Couto
	Version:	0.3
	Created:	Aug Fri 02 2011
	Updated:	Jul Mon 09 2012
*/

;window.Browsr = (function(window, document, undefined) {

	var Browsr = {},

		engines = ['webkit', 'gecko', 'trident', 'presto'],
		browsers = ['msie', 'chrome', 'firefox', 'safari', 'opera'],
		oss = ['windows', 'android', 'linux', 'ipad', 'iphone', 'macos'];

		ua = navigator.userAgent.toLowerCase()
			.replace(/ /g, '')
			.replace(/\//g, ''),

		GetProperty = function(property, properties) {
			for (i in properties) {
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
	var re = new RegExp('version([0-9]+)'),
		version = ua.match(re);
		
	if (!version) {
		re = new RegExp(Browsr.browser + '([0-9]+)');
		version = ua.match(re);
	}
	
	Browsr.version = version[1];

	// Get IOS
	if (Browsr.os == 'iphone' || Browsr.os == 'ipad') {
		Browsr.ios = true;
	}
	
	// Get Device
	if (Browsr.os == 'iphone' || Browsr.os == 'ipad' || Browsr.os == 'android') {
		Browsr.device = 'mobile';
	}
	else {
		Browsr.device = 'desktop';
	}
	
	// Write Classes
	var html = document.getElementsByTagName('html')[0],
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