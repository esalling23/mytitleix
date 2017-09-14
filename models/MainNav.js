/**
 * City Accelerator Website
 * 
 * MainNav page Model
 * @module index
 * @class index
 * @author Erica Salling
 * 
 * For field docs: http://keystonejs.com/docs/database/
 *
 * ==========
 */

var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * index model
 * @constructor
 * See: http://keystonejs.com/docs/database/#lists-options
 */
var MainNav = new keystone.List('MainNav', 
	{
		label: 'Main Navigation',
		singular: 'Main Navigation',
		nodelete: true
	});

/**
 * Model Fields
 * @main MainNav
 */
MainNav.add({
	name: { type: String, default: "Main Navigation Bar", label: 'Navigation Title Text', hidden: true, required: true, initial: true },
	// description: { type: Types.Markdown, label: "Description",  initial: true, required: true },
	links: { 
		type: Types.Relationship, 
		ref: 'Link',
		label: 'Links', 
		many: true, 
		note: 'Order is important!'
	}, 
	logo: {
		type: Types.Relationship, 
		ref: 'Image', 
		label: 'Logo Image', 
		many: false, 
		note: 'Appears only on the home page. Will link to the home page.'
	},
	
	createdAt: { type: Date, default: Date.now, noedit: true, hidden: true }
});

// /**
//  * Methods
//  * =============
//  */
// // Remove a link or image reference if removed from database
// MainNav.schema.statics.removeRef = function(refId, callback) {

//     MainNav.model.update({
//             $or: [{
//                 'logo': refId
//             }, {
//                 'links': refId
//             }]
//         },

//         {
//             $pull: {
//                 'logo': refId,
//                 'links': refId
//             }
//         },

//         {
//             multi: true
//         },

//         function(err, result) {

//             callback(err, result);

//             if (err)
//                 console.error(err);
//         }
//     );

// };

/**
 * Model Registration
 */
MainNav.defaultSort = '-createdAt';
MainNav.defaultColumns = 'name, updatedAt';
MainNav.register();
