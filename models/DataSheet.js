var keystone = require('keystone'),
    Types = keystone.Field.Types;
 
var DataSheet = new keystone.List('DataSheet', {
		label: 'Data Sheets',
		singular: 'Data Sheet',
		track: true,
		// nodelete: true,
		nocreate: false
	});
 
DataSheet.add({
    name: { type: String, required: true, initial:true }
});

DataSheet.defaultColumns = "name, category, size, shape";  
DataSheet.register();
