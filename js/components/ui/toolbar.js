/* /Reg{2,}ie/ - The practical online regex tester
 * by flatLand!
 * JS File - /js/components/ui/toolbar.js
 * coded by leny@flatLand!
 * october 2012
 */

/*jshint nonstandard: true, browser: true, boss: true */
/*global jQuery */

( function( $ ) {
	"use strict";

	var $toolbar,
		$reference,
		$reference_button;

	var init = function() {
		$toolbar = $( '#bottom' );
		$reference = $( '#quick_reference' );
		$reference_button = $( '#toggle_reference' );
		$reference_button.on( 'click', toggleQuickReference );
	}; // init

	var height = function() {
		return $toolbar.height();
	}; // height

	var toggleQuickReference = function() {
		$reference.fadeToggle( 'fast' );
	}; // toggleQuickReference

	window.reggie.ui.toolbar = {
		init: init,
		height: height
	};

}( jQuery ) );
