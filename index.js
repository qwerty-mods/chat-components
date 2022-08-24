const { Plugin } = require('powercord/entities');
const { React, getModule } = require('powercord/webpack');
const { inject, uninject } = require('powercord/injector');

const Color = require('./components/Color');

module.exports = class ChatComponents extends Plugin {
    async startPlugin() {
        this.loadStylesheet('styles.css');

		const parser = await getModule(['parse', 'parseTopic']);
        
		inject('chatcomponents', parser, 'parse', (args, res = {}) => { // *steals asportnoy's tone-indicator*
    		if (!Array.isArray(res)) return res;
            
            // Loop through each part of the message
            return res.map(el => {
                if (typeof el !== 'string') {
                    if (el?.props?.parts) { // face tone-indicators
                        return el; //todo
                    }

                    return el;
                }

                const colors = el.split(/(?<!\w)((?:#|0x)(?:[a-f0-9]{3}|[a-f0-9]{6}|[a-f0-9]{8})|(?:rgb|hsl)a?\(.*?\))(?!\w)/gi);

                if (!colors) return el;

                const res = [];
                let error = false;

                for (const [i, color] of colors.entries()) {
                    if (typeof color !== 'string') continue;

                    if (i % 2 === 0) {
                        if (error) res[res.length - 1] += color;
                        else res.push(color);
                    } else if (color !== null) {
                        res.push(color);
                        error = false;
                    } else {
                        res[res.length - 1] += color;
                        error = true;
                    }
                }

                return React.createElement(StringPart, {
                    parts: res,
                });
            });
        });
    }

    pluginWillUnload() {
        uninject('chatcomponents');
    }
}