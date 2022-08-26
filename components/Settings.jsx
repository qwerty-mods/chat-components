const { React } = require('powercord/webpack');
const { Category, SwitchItem, TextInput, SelectInput } = require('powercord/components/settings');

module.exports = class Settings extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            color_cat: true
        }
    }
    render() {
        const { getSetting, toggleSetting, updateSetting } = this.props;

        return (
            <>
                <Category
                    name="Color Component"
                    description="Here you can change how the color component acts"
                    opened={this.state.color_cat}
                    onChange={() => this.setState({color_cat:!this.state.color_cat})}
                >
                    <SwitchItem
                        value={getSetting("color-comps-main", true)}
                        onChange={() => toggleSetting("color-comps-main")}
                        description='Toggle whether or not color popouts are rendered in chat.'
                    >
                        Color Components
                    </SwitchItem>
                </Category>
            </>
        )        
    }
}