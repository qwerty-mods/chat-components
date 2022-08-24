const { React, getModule, getModuleByDisplayName } = require('powercord/webpack');
const { colorType, _getColors } = require('../utils');
const { clipboard } = require('electron');

const TextInputWithButton = require('./TextInputWithButton');

module.exports = class ColorPopout extends React.Component {
	state = {
        tab: colorType(this.props.color),
        colors: _getColors(this.props.color, colorType(this.props.color)),
        copied: false
    };

    render() {
        return (
            <div className='chatcomps-color-popout'>
                <div className='chatcomps-color-header'>
                    {this.renderHeaderItem('hex')}
                    {this.renderHeaderItem('rgba')}
                    {this.renderHeaderItem('hsla')}
                </div>
                <div className='chatcomps-color-body'>
                    <div
                        className='chatcomps-color-preview'
                        style={{ '--color': this.state.colors[this.state.tab] }}
                    />
                    <div className='chatcomps-color-info'>
                        <div className='chatcomps-color-info-title'>
                            Color Code
                        </div>
                        <TextInputWithButton
                            placeholder=''
                            buttonText={this.state.copied ? 'Copied' : 'Copy'}
                            buttonIcon='fas fa-light fa-copy chatcomps-color-info-copy-icon'
                            onButtonClick={() => {
                                clipboard.writeText(this.state.colors[this.state.tab]);
                                setTimeout(() => document.getElementsByClassName('chatcomps-color-info-copy')[0].blur(), 2000);
                            }}
                            defaultValue={this.state.colors[this.state.tab]}
                            className='chatcomps-color-info-value'
                            copyClassName='chatcomps-color-info-copy'
                        />
                    </div>
                </div>
            </div>
        )
    }

	renderHeaderItem(id) {
        return (
            <div
                className={`chatcomps-color-header-item ${this.state.tab === id ? 'chatcomps-color-header-item-selected' : ''}`}
                onClick={() => this.setState({ tab: id })}
            >
                {id}
            </div>
        )
	}
}