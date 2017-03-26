var keystone = require('keystone'),
    Types = keystone.Field.Types;
 
var Location = new keystone.List('Location', {
		label: 'Locations',
		singular: 'Location',
		track: true,
		// nodelete: true,
		nocreate: false
	});
 
Location.add({
    name: { type: String, required: true, index: true },
    status: { type: Types.Number },
    enabled: { type: Boolean, label: "Enabled Location.", note: "If not enabled, will not appear on site."},
    category: { type: Types.Select, label: "Category", options: "residence, park, government building, school, hospital, commercial, other",  initial: true, required:true },
    size: { type: Types.Select, label: "Size", options: "small, large", required:true, initial: true },
    shape: { type: Types.Select, lable: "Shape", options: "square, rectangle", initial: true, required: true}
});

Location.register();
Location.defaultColumns = "name, category, size, shape";  