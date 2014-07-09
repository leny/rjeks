/* /Reg{2,}ie/ - The practical online regex tester
 * by flatLand!
 * JS File - /js/components/managers/regexes.js
 * coded by leny@flatLand!
 * october 2012
 */

/*jshint nonstandard: true, browser: true, boss: true */

( function() {
	"use strict";

	var that = window.reggie;

	var oRegexes = {},
		sCurrentUID;

	var init = function() {
		// TODO : restore from local storage if needed
		sCurrentUID = create();
	}; // init

	var create = function() {
		var sUID = that.utils.genUID();
		oRegexes[ sUID ] = new that.models.SavedRegex( sUID );
		return sUID;
	}; // create

	var getRegex = function( sUID ) {
		// TODO: error managment
		return oRegexes[ sUID ];
	}; // getRegex

	that.managers.regexes = {
		get: {
			all: function() {
				return oRegexes;
			},
			current: function() {
				return getRegex( sCurrentUID );
			},
			one: getRegex
		},
		init: init
	};

}() );
