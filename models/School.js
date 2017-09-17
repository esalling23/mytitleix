var keystone = require('keystone'),
    Types = keystone.Field.Types;
 
var School = new keystone.List('School', {
		label: 'Data Sheets',
		singular: 'Data Sheet',
		// nodelete: true,
		nocreate: false
	});
 
School.add({
    name: { type: String, required: true, initial: true }, 
    enrollment: { type: Number, label: "Enrollment Number", required: true, initial: true },
    title: { type: String, label: "School Graph Title", required: true, initial: true }, 
    subtitle: { type: String, label: "School Graph Subtitle", required: true, initial: true }, 
    data: { 
    	type: Types.Relationship, 
    	ref: 'Data', 
    	label: 'Data Sets'
    }

});

School.defaultColumns = "name, enrollment, data";  
School.register();
