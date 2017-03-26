var keystone = require('keystone'),
    Types = keystone.Field.Types;
 
var Player = new keystone.List('Player', {
	label: 'Players',
		singular: 'Player',
		track: true,
		// nodelete: true,
		nocreate: false
});
 
Player.add({
    userName: { type: String, required: true, initial: true, index: true },
    email: { type: Types.Email, initial: true, required: true, index: true },
    pass: { type: String }
    // visited: { type: Types.Relationship}
    // resources: { types: Types.Relationship, ref: }
});
 
Player.register();
Player.defaultColumns = "userName, email, pass";
// module.exports = keystone.model('Player', Player);