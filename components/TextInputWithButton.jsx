/**
* NOTICE OF LICENSE
*
* This source file is subject to the Open Software License (OSL 3.0)
* that is bundled with this plugin in the file LICENSE.md.
* It is also available through the world-wide-web at this URL:
* https://opensource.org/licenses/OSL-3.0
*
* DISCLAIMER
*
* Do not edit or add to this file if you wish to upgrade the plugin to
* newer versions in the future. If you wish to customize the plugin for
* your needs please document your changes and make backups before you update.
*
*
* @copyright Copyright (c) 2020-2021 GriefMoDz
* @license   OSL-3.0 (Open Software License ("OSL") v. 3.0)
* @link      https://github.com/GriefMoDz/better-status-indicators
*
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
* IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
* FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
* AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
* LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
* OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
* SOFTWARE.
*/

// Modified for my needs

const { React, getModule } = require('powercord/webpack');
const { Flex } = require('powercord/components');

const Button = getModule([ 'ButtonLink' ], false).default || (() => null);
const ColorUtils = getModule([ 'isValidHex' ], false);

let classes;

const ButtonIconStyles = Object.freeze({
  color: 'var(--text-normal)',
  lineHeight: 0,
  backgroundImage: 'none',
  marginTop: 0
});

function joinClassNames(...args) {
  return args.filter(Boolean).join(' ')
}

const Input = React.memo(props => {
  return <Flex.Child className={classes?.input.split(' ').splice(1).join(' ')} style={{ cursor: 'auto' }}>
    <input
      type='text'
      value={props.defaultValue}
      disabled={props.disabled}
    />
  </Flex.Child>
});

const IconButton = React.memo(props =>
  <Button
    className={joinClassNames(classes?.button, props.copyClassName)}
    disabled={props.disabled}
    size={Button.Sizes.MIN}
    color={Button.Colors.GREY}
    look={Button.Looks.GHOST}
    onClick={props.onButtonClick}
  >
    <span className={`${props.buttonIcon}`} style={ButtonIconStyles}></span>
  </Button>
);

module.exports = React.memo(props => {
  classes ??= getModule([ 'container', 'editIcon' ], false);

  return <div className={joinClassNames(classes?.container, classes?.hasValue, props.disabled && classes?.disabled, props.className)}>
    <Flex className={classes?.layout}>
      <Input {...props} />
      <IconButton {...props} />
    </Flex>
  </div>;
});
