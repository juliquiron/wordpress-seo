/* global wpseoNetworkAdminGlobalL10n, ajaxurl */

import a11ySpeak from "a11y-speak";

( function( $ ) {
	"use strict";

	/**
	 * Displays given settings errors.
	 *
	 * @param {Object} settingsErrors The list of settings error objects.
	 *
	 * @returns {void}
	 */
	function displaySettingsErrors( settingsErrors ) {
		var $heading = $( ".wrap > h1" );
		var notices;
		var prefix;

		if ( ! settingsErrors.length ) {
			return;
		}

		notices = settingsErrors.map( function( settingsError ) {
			return "<div class='" + settingsError.type + " notice'><p>" + settingsError.message + "</p></div>";
		} );

		$heading.after( notices.join( "" ) );

		prefix = wpseoNetworkAdminGlobalL10n.error_prefix;
		if ( settingsErrors[ 0 ].type === "updated" ) {
			prefix = wpseoNetworkAdminGlobalL10n.success_prefix;
		}

		a11ySpeak( prefix.replace( "%s", settingsErrors[ 0 ].message ), "assertive" );
	}

	/**
	 * Handles a form submission with AJAX.
	 *
	 * @param {Event} event The submission event.
	 *
	 * @returns {void}
	 */
	function handleAJAXSubmission( event ) {
		var $form    = $( this );
		var $submit  = $form.find( "[type='submit']:focus" );
		var formData = $form.serialize();
		var action;

		event.preventDefault();

		$( ".wrap > .notice" ).remove();

		action = $form.find( "input[name='action']" ).val();
		if ( $submit.attr( "name" ) === "action" ) {
			action = $submit.val();
		}

		formData = formData.replace( /action=([a-zA-Z0-9_]+)/, "action=" + action );

		$.ajax( {
			type: "POST",
			url: ajaxurl,
			data: formData,
			success: function( response ) {
				if ( ! response.data ) {
					return;
				}

				displaySettingsErrors( response.data );
			},
			error: function( xhr ) {
				var response = xhr.responseJSON;

				if ( ! response.data ) {
					return;
				}

				displaySettingsErrors( response.data );
			},
		} );

		return false;
	}

	$( document ).ready( function() {
		var $form = $( "#wpseo-conf" );

		if ( ! $form.length ) {
			return;
		}

		$form.on( "submit", handleAJAXSubmission );
	} );
}( jQuery ) );
