var keystone = require('keystone'),
    Types = keystone.Field.Types;
 
var Data = new keystone.List('Data', {
		label: 'Data Sheets',
		singular: 'Data Sheet',
		// nodelete: true,
		nocreate: false
	});
 
Data.add({
    name: { type: String, required: true, initial: true }, 
    num: { type: Number, require: true, initial: true }, 
    
});

Data.defaultColumns = "name, category, size, shape";  
Data.register();
