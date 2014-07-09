/* /Reg{2,}ie/ - The practical online regex tester
 * by flatLand!
 * JS File - /js/components/ui/input.js
 * coded by leny@flatLand!
 * october 2012
 */

/*jshint nonstandard: true, browser: true, boss: true */
/*global jQuery */

( function( $ ) {
	"use strict";

	var that = window.reggie;

	var $regex,
		$flags,
		$reload,
		$engine,
		aExcludeKeys = [
			35, 36, 37, 38, 39, 40, 45
		];

	var init = function() {
		$regex = $( '#regex' );
		$flags = $( '#flags' );
		$reload = $( '#reload' );
		$engine = $( '#engine' );
		setEvents();
	}; // init

	var setEvents = function() {
		$reload.on( 'click', function() {
			$( document ).trigger( $.Event( 'update.reggie', {
				source: 'reload',
				engine: getLanguage(),
				flags: getFlags(),
				regex: getRegex()
			} ) );
		} );
		$regex.on( 'keyup', keyUpEvent );
		$flags.on( 'keyup', keyUpEvent );
		$regex.on( 'change blur', function() {
			dispatchChangeEvent( 'regex', getRegex() );
		} );
		$flags.on( 'change blur', function() {
			dispatchChangeEvent( 'flags', getFlags() );
		} );
		$engine.on( 'click', 'div button', switchLanguage );
	}; // setEvents

	var keyUpEvent = function( e ) {
		var iKeyCode = parseInt( e.keyCode, 10 );
		if( aExcludeKeys.indexOf( iKeyCode ) === -1 ) {
			dispatchChangeEvent( $( this ).attr( 'id' ), $( this ).val() );
		}
	}; // keyUpEvent

	var switchLanguage = function( e ) {
		e.preventDefault();
		if( $( this ).hasClass( 'active' ) ) {
			return;
		} else {
			$engine.find( 'button.active' ).removeClass( 'active' );
			$( this ).addClass( 'active' );
			dispatchChangeEvent( 'engine', getLanguage() );
		}
	}; // switchLanguage

	var dispatchChangeEvent = function( sSource, sValue ) {
		$( document ).trigger( $.Event( 'update.reggie', {
			source: sSource,
			value: sValue
		} ) );
	}; // dispatchChangeEvent

	var focus = function() {
		$regex.focus();
	}; // focus

	var getRegex = function() {
		return $.trim( $regex.val() ) || null;
	}; // getRegex

	var getFlags = function() {
		return $.trim( $flags.val() ) || '';
	}; // getFlags

	var getLanguage = function() {
		return $engine.find( 'button.active' ).first().attr( 'id' ) || 'js';
	}; // getLanguage

	that.ui.input = {
		init: init,
		focus: focus,
		get: {
			regex: getRegex,
			flags: getFlags,
			language: getLanguage
		}
	};

}( jQuery ) );
