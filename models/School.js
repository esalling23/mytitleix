var keystone = require('keystone'),
    Types = keystone.Field.Types;
 
var School = new keystone.List('School', {
		label: 'Schools',
		singular: 'School',
		// nodelete: true,
		nocreate: false, 
		autokey: { path: 'key', from: 'name', unique: true }
	});
 
School.add({
    name: { type: String, required: true, initial:true }, 
    data: { type: Types.Relationship, ref: 'DataSheet', many: true }
});

School.defaultColumns = "name, category, size, shape";  
School.register();
