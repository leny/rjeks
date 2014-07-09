/* /Reg{2,}ie/ - The practical online regex tester
 * by flatLand!
 * JS File - /js/components/engine.js
 * coded by leny@flatLand!
 * october 2012
 */

/*jshint nonstandard: true, browser: true, boss: true */
/*global jQuery */

( function( $ ) {
	"use strict";

	var that = window.reggie;

	var bError = false;

	var execRegExp = function( oRegex ) {
		bError = false;
		switch( oRegex.engine ) {
			case 'php':
				execPHPEngine( oRegex );
				break;

			case 'ruby':
				// TODO
				break;

			case 'js':
				execJSEngine( oRegex );
				break;

			default:
				execJSEngine( oRegex );
				break;
		}
	}; // execRegExp

	var execJSEngine = function( oRegex ) {
		var rNewRegExp,
			aResults = [],
			aResult;
		try {
			rNewRegExp = new RegExp( oRegex.regex, oRegex.flags );
			if( rNewRegExp.global ) {
				while( ( aResult = rNewRegExp.exec( oRegex.input ) ) !== null ) {
					aResults.push( aResult );
				}
			} else {
				aResults.push( rNewRegExp.exec( oRegex.input ) );
			}
		} catch( x ) {
			return dispatchError( x );
		}
		dispatchJSSuccess( aResults );
	}; // execJSEngine

	var execPHPEngine = function( oRegex ) {
		var sCompleteRegex = '/' + oRegex.regex + '/' + oRegex.flags.replace( 'g', '' );
		$.ajax( {
			url: '/services/engine.php',
			data: {
				regex: sCompleteRegex,
				text: oRegex.input
			},
			dataType: 'json',
			type: 'post',
			success: dispatchPHPSuccess
		} );
	}; // execPHPEngine

	var dispatchJSSuccess = function( aResults ) {
		$( document ).trigger( $.Event( 'success.engine.reggie', {
			engine: 'js',
			results: aResults
		} ) );
	}; // dispatchJSSuccess

	var dispatchPHPSuccess = function( aResults ) {
		$( document ).trigger( $.Event( 'success.engine.reggie', {
			engine: 'php',
			results: aResults
		} ) );
	}; // dispatchPHPSuccess

	var dispatchError = function( sMessage ) {
		$( document ).trigger( $.Event( 'error.engine.reggie', {
			message: sMessage
		} ) );
	}; // dispatchError

	that.engine = {
		exec: execRegExp
	};

}( jQuery ) );
