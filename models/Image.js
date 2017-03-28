var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Image model
 * @constructor
 * See: http://keystonejs.com/docs/database/#lists-options
 */
var Image = new keystone.List('Image', 
	{
		label: 'Images',
		singular: 'Image',
		track: true,
		autokey: { path: 'key', from: 'name', unique: true }
	});

/**
 * Model Fields
 * @main Image
 */
Image.add({

	name: { type: String, label: 'Image Title', note: 'Make it unique!',required: true, initial: true },
	image: { type: Types.CloudinaryImage, label: 'Image', note: 'Do not leave without uploading an image!'},
	link: {
		type: String, 
		label: 'Image Link', 
		note: 'Only if the image redirects to a link' 
	},
	
	createdAt: { type: Date, default: Date.now, noedit: true, hidden: true }

});


/**
 * Model Registration
 */
Image.defaultSort = '-createdAt';
Image.defaultColumns = 'name, link, updatedAt';
Image.register();
