const { React, getModuleByDisplayName } = require('powercord/webpack');
const { _parseColor, _numberToTextColor } = require('../utils');

const ColorPopout = require('./ColorPopout');
const Popout = getModuleByDisplayName('Popout', false);

function Color(color) {
	return <Popout
		position="top"
		align="center"
		animation="1"
		renderPopout={() => React.createElement(ColorPopout, { color })}
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

module.exports = Color;
