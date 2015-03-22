## MEANJS-TABLE

meanjs-table is a yeoman generator based on the great [meanjs generator](https://github.com/meanjs/generator-meanjs). As the MEAN.JS Team says:

MEAN.JS is a full-stack JavaScript open-source solution, which provides a solid starting point for MongoDB, Node.js, Express, and AngularJS based applications. The idea is to solve the common issues with connecting those frameworks, build a robust framework to support daily development needs, and help developers use better practices while working with popular JavaScript components.

## Overview

The meanjs generator displays database records like a blog structure. However, when we are developing enterprise applications, it's common that when we create new entities we have to display them in a table form, and from this table we should be able to perform CRUD operations. I have adapted the crud-module subgenerator, so when you create a new module it's created in a table form from where you can create, read, update and remove each database record.

**Note:** meanjs-table generator uses [angular-formly](https://github.com/formly-js/angular-formly) to display forms so, as we will see below, it's very easy and very fast adapt our forms to our entities.

## Getting Started

At first place, you will need to install the meanjs-table generator:

```
$ npm install -g generator-meanjs-table
```

You have to create a new folder for your project and from this folder you will generate your application:

```
$ yo meanjs-table
```

Next, you will create a new entity:

```
$ yo meanjs-table:crud-module <module-name>
```

This will create both AngularJS and Express files supporting full CRUD functionality.

This subgenerator will create an entity with only one property called 'name'. If we want to add new properties to our entity, we weed to follow these three steps:

* Add new properties to the Mongoose Schema in app/models/**module-name**.server.model.js
* Add new properties to the angular-formly array properties in public/modules/**module-name**/services/**module-name**.form.client.service.js
* Add new columns for the new properties in the HTML table in public/modules/**module-name**/views/list-**module-name**.client.view.html


## License

[BSD license](http://opensource.org/licenses/bsd-license.php)
