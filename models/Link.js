/**
 * City Accelerator Website
 * 
 * Link page Model
 * @module Link
 * @class Link
 * @author Erica Salling
 * 
 * For field docs: http://keystonejs.com/docs/database/
 *
 * ==========
 */

var keystone = require('keystone');
var Types = keystone.Field.Types;
var _ = require('underscore');
/**
 * Link model
 * @constructor
 * See: http://keystonejs.com/docs/database/#lists-options
 */
var Link = new keystone.List('Link', 
	{
		label: 'Links',
		singular: 'Link',
		autokey: { path: 'key', from: 'name', unique: true }
	});

/**
 * Model Fields
 * @main Link
 */
Link.add({

	name: { type: String, label: 'Link text', required: true, initial: true },
	URL: { type: String, label: 'URL', required: true, initial: true },
	
	createdAt: { type: Date, default: Date.now, noedit: true, hidden: true }

});

// Link.schema.pre('remove', function(next) {

// 	var models = [ 'MainNav'];

//   // Remove resource from all that referenced it 
//   _.each(models, function(model, index){

//   	console.log(model);
//   	keystone.list(model).model.removeRef(this._id, function(err, removedCount) {

// 		if(err)
// 			console.error(err);
    
// 		if(removedCount > 0)
// 			console.log("Removed " +  removedCount + " references to '"+ this._id + "'");

// 		});
//   });
	

// 		next();

// });

/**
 * Model Registration
 */
Link.defaultSort = '-createdAt';
Link.defaultColumns = 'name, URL, updatedAt';
Link.register();
