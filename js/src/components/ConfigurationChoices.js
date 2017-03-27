import React from "react";

import { localize } from "yoast-components/utils/i18n";
import ConfigurationChoice from "./ConfigurationChoice";

class ConfigurationChoices extends React.Component {
	// Go to the next step..

	/**
	 * @summary Renders the Choices component.
	 *
	 * @returns {JSX.Element} Rendered Choices Component.
	 */
	render() {
		let choiceProps = {
			nextStep: this.props.nextStep,
			previousStep: this.props.previousStep,
		};

		return (<div>
				<h2>{this.props.properties.title}</h2>
				<p>{this.props.properties.label}</p>
				<div className="yoast-wizard-columns yoast-wizard-columns__even">
					{
						this.props.properties.choices.map(function(choice, key) {
							return <ConfigurationChoice key={key} {...choiceProps} {...choice} />;
						})
					}
				</div>
		</div>
		);
	}
}

export default localize( ConfigurationChoices );
