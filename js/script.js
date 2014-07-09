/* /Reg{2,}ie/ - The practical online regex tester
 * by flatLand!
 * JS File - /js/script.js - main entry point
 * coded by leny@flatLand!
 * october 2012
 */

/*jshint nonstandard: true, browser: true, boss: true */
/*global jQuery */

// @codekit-prepend consolex.js
// @codekit-prepend jquery.dev.js
// @codekit-prepend bootstrap-tooltip.js

// @codekit-prepend components/reggie.js
// @codekit-prepend components/editor.js
// @codekit-prepend components/engine.js
// @codekit-prepend components/models/savedRegex.js
// @codekit-prepend components/ui/input.js
// @codekit-prepend components/ui/directory.js
// @codekit-prepend components/ui/source.js
// @codekit-prepend components/ui/results.js
// @codekit-prepend components/ui/toolbar.js
// @codekit-prepend components/managers/regexes.js

( function( $ ) {
	"use strict";

	var that = window.reggie;

	var changeTriggered = function( e ) {
		switch( e.source ) {
			case 'regex':
				that.managers.regexes.get.current().regex = e.value;
				break;
			case 'flags':
				that.managers.regexes.get.current().flags = e.value;
				break;
			case 'engine':
				that.managers.regexes.get.current().engine = e.value;
				break;
			case 'input':
				that.managers.regexes.get.current().input = e.value;
				break;
			case 'reload':
				that.managers.regexes.get.current().regex = e.regex;
				that.managers.regexes.get.current().flags = e.flags;
				that.managers.regexes.get.current().engine = e.engine;
				that.managers.regexes.get.current().input = that.editor.get.all();
				break;
		}
		// TODO : delaying change triggering
		that.ui.results.process();
		that.editor.markers.remove();
		if( !$.trim( that.managers.regexes.get.current().regex ) ) {
			that.ui.results.clear();
		} else {
			that.engine.exec( that.managers.regexes.get.current() );
		}
	}; // changeTriggered

	var engineSuccess = function( e ) {
		that.ui.results.display( e.results, e.engine || 'js' );
		that.editor.markers.add( e.results, e.engine || 'js' );
	}; // engineSuccess

	var engineError = function( e ) {
		that.ui.results.error( e.message );
	}; // engineError

	$( function() {
		that.editor.init( 'source' );
		that.ui.init();
		that.ui.input.focus();
		that.managers.regexes.init();
		that.managers.regexes.get.current().input = that.editor.get.all(); // TODO: change this

		$( document ).on( 'update.reggie', changeTriggered );
		$( document ).on( 'success.engine.reggie', engineSuccess );
		$( document ).on( 'error.engine.reggie', engineError );

		$( 'a[rel*="external"]' ).attr( 'target', '_new' );
		// $( '*[title]' ).tooltip();

		window.onresize = that.ui.resize;
	} );

}( jQuery ) );
