var mongoose=require('mongoose');

var ImageSchema=new mongoose.Schema({
	title:{
		type:String,
		required:true
	},
	category:{
		type:String,
		required:true
	},
	image:{
		type:String,
		required:true
	}
});

module.exports=ImageSchema;