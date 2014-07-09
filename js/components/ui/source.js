/* /Reg{2,}ie/ - The practical online regex tester
 * by flatLand!
 * JS File - /js/components/ui/source.js
 * coded by leny@flatLand!
 * october 2012
 */

/*jshint nonstandard: true, browser: true, boss: true */
/*global jQuery */

( function( $ ) {
	"use strict";

	var that = window.reggie;

	var $source,
		$container;

	var init = function() {
		$source = $( '#source' );
		$container = $source.parent();
	}; // init

	var resize = function() {
		$source.height( $container.height() - $container.find( 'h2' ).height() - 130 - that.ui.toolbar.height() );
	}; // resize

	that.ui.source = {
		init: init,
		resize: resize
	};

}( jQuery ) );
