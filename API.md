# CRUD API with "Single API"

This document describes the "Single API", an API which supports the most common database operations for all public tables in this project.

The public tables, or tables that are accessible for the logged in user, can be queried with this API for:
* Create
* Read
* Update
* Delete

## About Single API 

The Single API seeks to provide a simple unified way to communicate developer intentions by interpreting data from a single configuration object. There is a single route for all requests and a single request method is all what we need for CRUD operations.

## Three Singles 

* `POST` is the single request method needed
* `/api/crud` is the single route
* `config` is the single configuration object

The first two singles are always going to be the same so you, as a developer, only need to worry about the third one.


## The Third One

In your POST you only need to make sure to send `config` property in your request body and its value is going to be a string.

The string won't be an ordinary string but rather a JSON string, the configuration where you put everything you need. To make things simple, I am going to use a jQuery example here to show you how easily this can be used.


```javascript

//you only need to define this configuration object and everything else stays the same
let config = {
	model : 'Picture',
	type : 'read',
	condition : {} //empty string means you want all pictures
};


$.ajax({url : "/api/crud", //always the same
		type : 'POST', //always the same
		data : {config: JSON.stringify(config)} //stringify your config
		success : function(data){console.log(data);}
);

``` 

## The Config Object

As a developer, you only need to worry about supplying the right configuration. The config object is the place for it. Let's break down properties you can use with it.

(Please note that the properties change according to the 'type' property which sets the course for other properties. Therefore we are going to divide propeties based on `type`.)

## Types and properties

### Type `read`

When type is `read` you can use the following options

* `type`(required) : (string) is always `read`
* `model`(required) : (string) is the name of the model ex: `Picture`
* `conditions`(required) : (object) a key value pair for conditions. Examples are:

```javascript
{
	occupation : /host/,
	'name.last' : 'Ghost',
	age: { $gt : 17, $lt: 66 },
	likes: { $in : ['vaporizing', 'talking'] }
}

```

Example:

```javascript
let config = {
	model : 'Picture',
	type : 'read',
	condition : {'_id': 1} //will fetch the picture with this condition	
};

```
### Type `write`

Type write combines `create` and `update` for the simplicity. Update is only triggered when the configuration object contains the unique identifier usually and `id` or `_id`.


* `type`(required): (string) is always `write`
* `model`(required): (string) is the name of the model ex: `Picture`
* `condition`(required): (object) is your data representation of the Model you wish to insert/update(Please pay close attention to what you put in here beause the server can silently fail if you provide an unfit dataset. Please see the definitions of Models to know what properties you can put here)
* `idParam`(optional) : (string) can be `id` or `_id` or anything that specifies what is the unique key. If provided, the API will attempt to perform an update otherwise an insert will be performed.
 
Example:

```javascript
let config = {
	model : 'Picture',
	type : 'write',
	idParam : '_id',

	condition : {
		'_id': 1,
		title: 'the new title',
	    gallery: 'the new gallery',
	    //don't include the properties you don't wish to change
	}
};

```

### Type `delete`

Deletes the entity. Properties are

* `type`(required) : (string) is always `write`
* `model`(required) : (string) is the name of the model ex: `Picture`
* `conditions`(required) : (object) in a format {`idParam` : `idValue`} for example: `{'_id' : 555}`

Example:

```javascript
let config = {
	model: 'Picture',
	type: 'delete',
	condition : {'_id': 1}
};
```