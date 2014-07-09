/* /Reg{2,}ie/ - The practical online regex tester
 * by flatLand!
 * JS File - /js/components/reggie.js
 * coded by leny@flatLand!
 * october 2012
 */

/*jshint nonstandard: true, browser: true, boss: true */

window.reggie = {};

( function() {
	"use strict";

	var aUIDKeys = "abcdef123456789";

	var safeTags = function( str ) {
		return ( typeof str === 'string' ) ? str.replace( /&/g, '&amp;' ).replace( /</g, '&lt;' ).replace( />/g,'&gt;' ) : str;
	}; // safeTags

	var genUID = function( iLength ) {
		var sUID = '';
		for ( var i = 0; i < ( iLength || 8 ); i++ ) {
			sUID += aUIDKeys.charAt( Math.floor( Math.random() * aUIDKeys.length ) );
		}
		return sUID;
	}; // genUID

	var initUIs = function() {
		window.reggie.ui.input.init();
		window.reggie.ui.directory.init();
		window.reggie.ui.source.init();
		window.reggie.ui.results.init();
		window.reggie.ui.toolbar.init();
		resizeContainers();
	}; // initUIs

	var resizeContainers = function() {
		window.reggie.ui.directory.resize();
		window.reggie.ui.source.resize();
		window.reggie.editor.resize();
	}; // resizeContainers

	window.reggie = {
		editor: {},
		engine: {},
		models: {},
		managers: {},
		ui: {
			init: initUIs,
			resize: resizeContainers
		},
		utils: {
			genUID: genUID,
			safeTags: safeTags
		}
	};

}() );
