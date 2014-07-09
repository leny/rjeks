<?php
/* /Reg{2,}ie/ - The practical online regex tester
 * by flatLand!
 * PHP File - /services/engine.php
 * coded by leny@flatLand!
 * october 2012
 */

preg_match_all( $_POST[ 'regex' ], $_POST[ 'text' ], $aMatches, PREG_SET_ORDER | PREG_OFFSET_CAPTURE );

$aResults = array();

if( sizeof( $aMatches ) ) {
	foreach( $aMatches as $aMatch ) {
		$aResult = array();
		foreach( $aMatch as $i=>$aPart ) {
			$aResult[ $i ] = $aPart[ 0 ];
		}
		$aResult[ 'reggieInput' ] = $_POST[ 'text' ];
		$aResult[ 'reggieIndex' ] = $aMatch[ 0 ][ 1 ];
		$aResults[] = $aResult;
	}
}

header( 'Content-Type: text/javascript' );
die( json_encode( sizeof( $aResults ) ? $aResults : null ) );
