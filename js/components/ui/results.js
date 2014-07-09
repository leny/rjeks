/* /Reg{2,}ie/ - The practical online regex tester
 * by flatLand!
 * JS File - /js/components/ui/results.js
 * coded by leny@flatLand!
 * october 2012
 */

/*jshint nonstandard: true, browser: true, boss: true */
/*global jQuery */

( function( $ ) {
	"use strict";

	var that = window.reggie;

	var $matches,
		$error,
		$no_matches,
		$matches_amount,
		$waiting,
		aIgnoredCapture = [ '0', 'reggieIndex', 'reggieInput' ];

	var init = function() {
		$matches = $( '#paper_content #matches' );
		$error = $( '#error' );
		$no_matches = $( '#no_matches' );
		$waiting = $( '#waiting' );
		$matches_amount = $( '#matches_amount' );
	}; // init

	var process = function() {
		$matches.empty();
		$error.hide();
		$no_matches.hide();
		$matches_amount.hide();
		$waiting.show();
	}; // process

	var clear = function() {
		$matches.empty();
		$error.hide();
		$matches_amount.hide();
		$waiting.hide();
		$no_matches.show();
	}; // clear

	var display = function( aResults, sEngine ) {
		var iMatchesAmount,
			i,
			aResult;
		$waiting.hide();
		if( !aResults ) {
			$no_matches.show();
			return;
		}
		iMatchesAmount = aResults.length;
		if( iMatchesAmount === 0 ) {
			$no_matches.show();
			return;
		}
		$matches_amount.text( iMatchesAmount + ' Match' + ( iMatchesAmount > 1 ? 'es' : '' ) ).show();
		for( i = -1; aResult = aResults[ ++i ]; ) {
			$matches.append( generateMatchElement( aResult, sEngine ) );
		}
	}; // display

	var generateMatchElement = function( aResult, sEngine ) {
		var $result = $( '<li><strong>Match</strong><span></span></li>' ),
			$captures = $( '<ol></ol>' ),
			j, k, sProperty;
		$result.find( 'span' ).text( that.utils.safeTags( aResult[ 0 ] ) );
		if( sEngine === 'js' ) {
			if( aResult.length > 1 ) {
				for( j = 1, k = aResult.length; j < k; j++ ) {
					$captures.append( generateCaptureElement( j, aResult[ j ] ) );
				}
			}
		} else {
			for( sProperty in aResult ) {
				if( aIgnoredCapture.indexOf( sProperty ) === -1 ) {
					$captures.append( generateCaptureElement( sProperty, aResult[ sProperty ] ) );
				}
			}
		}
		if( $captures.find( 'li' ).size() ) {
			$result.append( $captures );
		}
		return $result;
	}; // generateMatchElement

	var generateCaptureElement = function( mKey, sValue ) {
		var $capture = $( '<li></li>' );
		$capture.text( that.utils.safeTags( sValue ) );
		if( isNaN( parseInt( mKey, 10 ) ) ) {
			$( '<span></span>' ).text( mKey ).prependTo( $capture );
			$capture.addClass( 'named' );
		}
		return $capture;
	}; // generateCaptureElement

	var error = function( oError ) {
		$waiting.hide();
		$error.find( 'span' ).text( oError.message ).end().show();
	}; // error

	window.reggie.ui.results = {
		clear: clear,
		display: display,
		error: error,
		init: init,
		process: process
	};

}( jQuery ) );
