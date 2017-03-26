var keystone = require('keystone'),
    Types = keystone.Field.Types;
 
var Feed = new keystone.List('Feed', {
	label: 'Feed',
	singular: 'Feed',
	track: true,
	// nodelete: true,
	nocreate: false
});
 
Feed.add({
    name: { type: String, required: true, initial: true }
    // email: { type: Types.Email, initial: true, required: true, index: true },
    // pass: { type: String }
    // visited: { type: Types.Relationship}
    // resources: { types: Types.Relationship, ref: }
});
 
Feed.register();
Feed.defaultColumns = "name";
// module.exports = keystone.model('Feed', Feed);