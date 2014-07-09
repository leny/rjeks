/* /Reg{2,}ie/ - The practical online regex tester
 * by flatLand!
 * JS File - /js/components/editor.js
 * coded by leny@flatLand!
 * october 2012
 */

/*jshint nonstandard: true, browser: true, boss: true */
/*global jQuery, ace, require */

( function() {
	"use strict";

	var that = window.reggie;

	var oEditor,
		aMarkers = [],
		Range = require('ace/range').Range,
		sDefaultLorem = "Lorem ipsum dolor sit amet, consectetuer adipiscing elit.\nAenean commodo ligula eget dolor. Aenean massa.\nCum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.\nDonec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim.";

	var initEditor = function( sID ) {
		oEditor = ace.edit( sID );
		oEditor.getSession().setValue( sDefaultLorem );
		oEditor.commands.removeCommand( 'gotoline' );
		oEditor.getSession().on( 'change', dispatchChangeEvent );
		resizeEditor();
	}; // initEditor

	var resizeEditor = function() {
		if( oEditor ) {
			oEditor.resize();
		}
	}; // resizeEditor

	var dispatchChangeEvent = function() {
		$( document ).trigger( $.Event( 'update.reggie', {
			source: 'input',
			value: getContent()
		} ) );
	}; // dispatchChangeEvent

	var getContent = function() {
		return oEditor.getSession().getValue();
	}; // getContent

	var getLines = function() {
		return getContent().split( "\n" );
	}; // getLines

	var addMarkers = function( aResults, sEngine ) {
		var i, j, aResult, aLines, oRange, iResultIndex, sResultInput, iStartLine, iEndLine, iStartIndex, iEndIndex;
		if( !aResults ) { return; }
		if( aResults.length === 0 ) { return; }
		for( i = -1; aResult = aResults[ ++i ]; ) {
			if( sEngine === 'php' ) {
				iResultIndex = aResult.reggieIndex;
				sResultInput = aResult.reggieInput;
			} else {
				iResultIndex = aResult.index;
				sResultInput = aResult.input;
			}
			aLines = sResultInput.split( "\n" );
			iStartLine = sResultInput.substr( 0, iResultIndex ).split( "\n" ).length - 1;
			iEndLine = iStartLine + sResultInput.substr( iResultIndex, aResult[ 0 ].length ).split( "\n" ).length - 1;
			iStartIndex = iResultIndex;
			if( iStartLine > 0 ) {
				for( j = 0; j < iStartLine; j++ ) {
					iStartIndex -= aLines[ j ].length + 1;
				}
			}
			iEndIndex = iStartIndex + aResult[ 0 ].length;
			if( iEndLine > iStartLine ) {
				iEndLine -= aLines[ iStartLine ].length - iStartIndex + 1;
				for( j = iStartLine + 1; j < iEndLine; j++ ) {
					iEndLine -= aLines[ j ] + 1;
				}
			}
			oRange = new Range( iStartLine, iStartIndex, iEndLine, iEndIndex );
			aMarkers.push( oEditor.getSession().addMarker( oRange, "ace_selected_word", "text" ) );
		}
	}; // addMarkers

	var removeMarkers = function() {
		var i, oMarker;
		for( i = -1; oMarker = aMarkers[ ++i ]; ) {
			oEditor.getSession().removeMarker( oMarker );
		}
	}; // removeMarkers

	that.editor = {
		get: {
			all: getContent,
			content: getContent,
			lines: getLines
		},
		init: initEditor,
		markers: {
			add: addMarkers,
			remove: removeMarkers
		},
		resize: resizeEditor
	};

}() );
