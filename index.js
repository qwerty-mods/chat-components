const { Plugin } = require('powercord/entities');
const { getModule } = require('powercord/webpack');
const { inject, uninject } = require('powercord/injector');

const Color = require('./components/Color');
const Settings = require('./components/Settings');

const NONTEXT_PATTERN = /\b(0x|(?:rgb|hsl)a?\b)/;
const LOOKBEHIND_PATTERN = /\W$/;
const COLOR_PATTERN = /^(?:#|0x)(?:[a-f0-9]{8}|[a-f0-9]{6}|[a-f0-9]{3}(?<!#[0-9]{3})|(?:rgb|hsl)a?\([^\)]*?\))(?!\w)(?!]\((http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)\))/i;

module.exports = class ChatComponents extends Plugin {
    async startPlugin() {
        this.loadStylesheet('styles.css');

        powercord.api.settings.registerSettings(this.entityID, {
            category: 'chat-components',
            label: 'Chat Components',
            render: Settings
        });

        const parser = this.parser = await getModule(['parse', 'parseTopic']);

        // Add rule (See: https://github.com/Khan/simple-markdown#extension-overview)
        parser.defaultRules.chatComponentsColor = {
            order: parser.defaultRules.text.order - 1,
            match: (source, state) => {
                if (state.prevCapture && !LOOKBEHIND_PATTERN.test(state.prevCapture)) {
                    return null;
                }
                return COLOR_PATTERN.exec(source);
            },
            parse: match => {
                return {
                    color: match[1] || match[0],
                    content: match[0]
                }
            },
            react: node => this.settings.get('color-comps-main', true) ? Color(node.color) : node.content,
        };

        this.refreshParser();

        // Force simple-markdown's "text" rule to stop eating the text we need
        inject('color-components-text', parser.defaultRules.text, 'match', (args, res) => {
            if (!res) return res
            res[0] = res[0].split(NONTEXT_PATTERN).filter(Boolean)[0]
            return res
        })
    }

    pluginWillUnload() {
        delete this.parser.defaultRules.chatComponentsColor;
        this.refreshParser();
        uninject('color-components-text');
        powercord.api.settings.unregisterSettings(this.entityID);
    }

    refreshParser() {
        // Recreate parser with new rules
        this.parser.parse = this.parser.reactParserFor(this.parser.defaultRules);
    }
}
