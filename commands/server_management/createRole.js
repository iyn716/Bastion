/**
 * @file createRole command
 * @author Sankarsan Kampa (a.k.a k3rn31p4nic)
 * @license GPL-3.0
 */

exports.exec = async (Bastion, message, args) => {
  if (!args.name) {
    return Bastion.emit('commandUsage', message, this.help);
  }

  if (!Bastion.resolver.resolveColor(args.color)) {
    args.color = 0;
  }

  let maxLength = 100;
  args.name = args.name.join(' ');

  if (!args.name.length.inRange(0, maxLength)) {
    return Bastion.emit('error', '', Bastion.i18n.error(message.guild.language, 'roleNameLength', maxLength), message.channel);
  }

  let data = roleData(args.name, args.color);
  let role = await message.guild.createRole(data);

  await message.channel.send({
    embed: {
      color: Bastion.colors.GREEN,
      description: Bastion.i18n.info(message.guild.language, 'createRole', message.author.tag, role.name),
      footer: {
        text: `ID: ${role.id}`
      }
    }
  }).catch(e => {
    Bastion.log.error(e);
  });
};

exports.config = {
  aliases: [ 'creater' ],
  enabled: true,
  argsDefinitions: [
    { name: 'name', type: String, alias: 'n', multiple: true, defaultOption: true, defaultValue: [ 'new role' ] },
    { name: 'color', type: String, alias: 'c', defaultValue: '0' }
  ]
};

exports.help = {
  name: 'createRole',
  description: 'Creates a new role on your Discord server.',
  botPermission: 'MANAGE_ROLES',
  userTextPermission: 'MANAGE_ROLES',
  userVoicePermission: '',
  usage: 'createrole [[-n] Role Name] [-c hex-color-code]',
  example: [ 'createrole -n Role Name -c #dc143', 'createrole -c #dc143c', 'createrole Role Name', 'createrole' ]
};

/**
 * Takes Discord role info and returns the role data object for use.
 * @function roleData
 * @param {string} [name=new role] role The array that contains the character pool.
 * @param {string} [color=0] The array of the string to match with the character pool.
 * @returns {object} The Discord role data object.
*/
function roleData(name = 'new role', color = '#000000') {
  let data = {
    name: name,
    color: color
  };
  return data;
}
