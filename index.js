const { Plugin } = require('powercord/entities');
const { getModule } = require('powercord/webpack');

const Color = require('./components/Color');
const COLOR_PATTERN = /^((?:#|0x)(?:[a-f0-9]{8}|[a-f0-9]{6}|[a-f0-9]{3})|(?:rgb|hsl)a?\([^\)]*?\))/i;

module.exports = class ChatComponents extends Plugin {
    async startPlugin() {
        this.loadStylesheet('styles.css');

        const parser = this.parser = await getModule(['parse', 'parseTopic']);

        // Add rule (See: https://github.com/Khan/simple-markdown#extension-overview)
        parser.defaultRules.chatComponentsColor = {
            order: parser.defaultRules.mention.order,
            match: source => COLOR_PATTERN.exec(source),
            parse: match => {
                return {
                    color: match[1],
                    content: match[0]
                }
            },
            react: node => Color(node.color),
        };

        this.refreshParser();
    }

    pluginWillUnload() {
        delete this.parser.defaultRules.chatComponentsColor;
        this.refreshParser();
    }

    refreshParser() {
        // Recreate parser with new rules
        this.parser.parse = this.parser.reactParserFor(this.parser.defaultRules);
    }
}
