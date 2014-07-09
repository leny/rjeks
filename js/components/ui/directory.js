/* /Reg{2,}ie/ - The practical online regex tester
 * by flatLand!
 * JS File - /js/components/ui/directory.js
 * coded by leny@flatLand!
 * october 2012
 */

/*jshint nonstandard: true, browser: true, boss: true */
/*global jQuery */

( function( $ ) {
	"use strict";

	var that = window.reggie;

	var $directory,
		$list;

	var init = function() {
		$directory = $( '#directory' );
		$list = $directory.find( 'ul' );
	}; // init

	var resize = function() {
		$list.height( $directory.height() - $directory.find( 'h2' ).height() - 100 - that.ui.toolbar.height() );
	}; // resize

	that.ui.directory = {
		init: init,
		resize: resize
	};

}( jQuery ) );
