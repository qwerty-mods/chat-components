const { getModule } = require('powercord/webpack');

const ColorUtils = getModule([ 'isValidHex' ], false);

function _parseColor (c, alpha = 1) { // Thanks to Ven
	c = c.replace('0x', '#')
    const e = document.createElement("span");
    e.style.color = c;
    document.head.appendChild(e);
    const [r, g, b, a] = getComputedStyle(e).color.match(/\d+(\.\d+)?/g).map(Number);
    e.remove();
    
    return [r, g, b, isNaN(a) ? 0xff : Math.round(a * 0xff), `rgba(${r}, ${g}, ${b}, ${alpha})`]
}

module.exports = {
    colorType (color) {
        if(color.startsWith('#') || color.startsWith('0x')) return 'hex';
        if(color.startsWith('rgba') || color.startsWith('rgb')) return 'rgba';
        if(color.startsWith('hsla') || color.startsWith('hsl')) return 'hsla';
    },

    _getColors (color, tab) {
        rgba = _parseColor(color)[4];
        color = ColorUtils.rgb2int(rgba)
        
        return {
            hex: ColorUtils.int2hex(color),
            rgba,
            hsla: ColorUtils.int2hsl(color)
        }
    },

    _parseColor,

    _numberToTextColor (color) { // Thanks to rolecolor-everywhere
        const [ r, g, b ] = _parseColor(color);
        const bgDelta = (r * 0.299) + (g * 0.587) + (b * 0.114);
        return ((255 - bgDelta) < 105) ? '#000000' : '#ffffff';
    }
}