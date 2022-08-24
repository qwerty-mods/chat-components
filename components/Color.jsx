const { React, getModuleByDisplayName } = require('powercord/webpack');
const { _parseColor, _numberToTextColor } = require('../utils');

const ColorPopout = require('./ColorPopout');
const Popout = getModuleByDisplayName('Popout', false);

class StringPart extends React.PureComponent {
	render() {
		const { parts } = this.props;

		for (let i = 1; i < parts.length; i += 2) {
			let color = parts[i];
			if (typeof color !== 'string') continue;

			parts[i] = <Popout
				position="top"
				align="center"
				animation="1"
                renderPopout={() => React.createElement(ColorPopout, {color})}
			>
				{props => 
					<span
						{...props}
						className='chatcomps-color-text'
						style={{
							'--color': color,
                            '--hoveredColor': _numberToTextColor(color),
                            '--backgroundColor': _parseColor(color, 0.1)[4]
						}}
					>
						{color}
					</span>
				}
			</Popout>
		}

		return parts;
	}
}

module.exports = StringPart;
