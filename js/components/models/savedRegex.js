/* /Reg{2,}ie/ - The practical online regex tester
 * by flatLand!
 * JS File - /js/components/models/savedRegex.js
 * coded by leny@flatLand!
 * october 2012
 */

/*jshint nonstandard: true, browser: true, boss: true */

( function() {

	window.reggie.models.SavedRegex = function( sID ) {
		var sUID = sID,
			sName,
			sRegex = '',
			sFlags = '',
			sInput,
			sEngine = 'js';

		var PublicInstance = {};

		Object.defineProperty( PublicInstance, 'id', {
			value: sUID
		} );

		Object.defineProperty( PublicInstance, 'name', {
			get: function() {
				return sName;
			},
			set: function( sValue ) {
				sName = sValue;
			}
		} );

		Object.defineProperty( PublicInstance, 'regex', {
			get: function() {
				return sRegex;
			},
			set: function( sValue ) {
				sRegex = sValue;
			}
		} );

		Object.defineProperty( PublicInstance, 'flags', {
			get: function() {
				return sFlags;
			},
			set: function( sValue ) {
				sFlags = sValue;
			}
		} );

		Object.defineProperty( PublicInstance, 'input', {
			get: function() {
				return sInput;
			},
			set: function( sValue ) {
				sInput = sValue;
			}
		} );

		Object.defineProperty( PublicInstance, 'engine', {
			get: function() {
				return sEngine;
			},
			set: function( sValue ) {
				sEngine = sValue;
			}
		} );

		return PublicInstance;
	};

}() );
