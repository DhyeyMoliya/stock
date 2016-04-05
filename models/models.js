//interaction with mongodb database using mongoose module
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//set schema for products
var productSchema = new mongoose.Schema({
    created_by: { type: mongoose.Schema.Types.ObjectId, ref: 'UserModel'},
	product_name: String, //{ type: Schema.ObjectId, ref: 'User' },		//should be changed to ObjectId, ref "User"
	product_stock: Integer,
	unit_price: Double,
	description: String
}, { collection: 'products'});

//set schema for customers
var customerSchema = new mongoose.Schema({
	customer_name: String,
	email: String, 
	contact_no: String,	
}, { collection: 'customers'});

//set schema for orders
var orderSchema = new mongoose.Schema({
    order_date: { type: Date, default: Date.now },
    created_by: { type: mongoose.Schema.Types.ObjectId, ref: 'UserModel'},
	customer_id: {type: mongoose.Schema.Types.ObjectId, ref: 'CustomerModel'}, 
	order_description: String,
	products: [{type: mongoose.Schema.Types.ObjectId, ref: 'ProductModel'}],
	quantity: [{type: Integer}],
	payment_amount: Double
}, { collection: 'orders'});

//set schema for users
var userSchema = new mongoose.Schema({
	username: String,
	password: String,
	role: String,
    contact: String,//hash created from password
	created_at: {type: Date, default: Date.now}
}, { collection: 'users'});

//set models from schema
mongoose.model('ProductModel', productSchema);
mongoose.model('CustomerModel', customerSchema);
mongoose.model('OrderModel', orderSchema);
mongoose.model('UserModel', userSchema);
