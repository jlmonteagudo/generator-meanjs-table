'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	<%= classifiedSingularName %> = mongoose.model('<%= classifiedSingularName %>'),
	_ = require('lodash');

/**
 * Create a <%= humanizedSingularName %>
 */
exports.create = function(req, res) {
	var <%= camelizedSingularName %> = new <%= classifiedSingularName %>(req.body);
	<%= camelizedSingularName %>.user = req.user;

	<%= camelizedSingularName %>.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(<%= camelizedSingularName %>);
		}
	});
};

/**
 * Show the current <%= humanizedSingularName %>
 */
exports.read = function(req, res) {
	res.jsonp(req.<%= camelizedSingularName %>);
};

/**
 * Update a <%= humanizedSingularName %>
 */
exports.update = function(req, res) {
	var <%= camelizedSingularName %> = req.<%= camelizedSingularName %> ;

	<%= camelizedSingularName %> = _.extend(<%= camelizedSingularName %> , req.body);

	<%= camelizedSingularName %>.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(<%= camelizedSingularName %>);
		}
	});
};

/**
 * Delete an <%= humanizedSingularName %>
 */
exports.delete = function(req, res) {
	var <%= camelizedSingularName %> = req.<%= camelizedSingularName %> ;

	<%= camelizedSingularName %>.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(<%= camelizedSingularName %>);
		}
	});
};

/**
 * List of <%= humanizedPluralName %>
 */
exports.list = function(req, res) {

	var sort;
	var sortObject = {};
	var count = req.query.count || 5;
	var page = req.query.page || 1;


	var filter = {
		filters : {
			mandatory : {
				contains: req.query.filter
			}
		}
	};

	var pagination = {
		start: (page - 1) * count,
		count: count
	};

	if (req.query.sorting) {
		var sortKey = Object.keys(req.query.sorting)[0];
		var sortValue = req.query.sorting[sortKey];
		sortObject[sortValue] = sortKey;
	}
	else {
		sortObject.desc = '_id';
	}

	sort = {
		sort: sortObject
	};


	<%= classifiedSingularName %>
		.find()
		.filter(filter)
		.order(sort)
		.page(pagination, function(err, <%= camelizedPluralName %>){
			if (err) {
				return res.status(400).send({
					message: errorHandler.getErrorMessage(err)
				});
			} else {
				res.jsonp(<%= camelizedPluralName %>);
			}
		});

};

/**
 * <%= humanizedSingularName %> middleware
 */
exports.<%= camelizedSingularName %>ByID = function(req, res, next, id) {
	<%= classifiedSingularName %>.findById(id).populate('user', 'displayName').exec(function(err, <%= camelizedSingularName %>) {
		if (err) return next(err);
		if (! <%= camelizedSingularName %>) return next(new Error('Failed to load <%= humanizedSingularName %> ' + id));
		req.<%= camelizedSingularName %> = <%= camelizedSingularName %> ;
		next();
	});
};

/**
 * <%= humanizedSingularName %> authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.<%= camelizedSingularName %>.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
