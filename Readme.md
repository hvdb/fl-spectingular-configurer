#Spectingular-configurer

##What does it do?

Grunt does not handle dynamic task-configuration very well.   
And in grunt you oftern repeat yourself in term of configuration, and your gruntfiles become huge.

This npm-module gives you
1. the ability to split grunt configuration into separate files  
2. sensible defaults for commonly used tasks  
3. the option to override most defaults
4. a way of initializing grunt with the ready-made configuration


All to make sure all configuration is correct before grunt is started.

As extentions of this module, also look at
*spectingular-portal-package-configurer*: This configurer gives you all the default config for packaging your project
*specintingular-portal-release-configurer* This configurer gives you all the configuration to release you project to nexus


##Installing:
As this is a npm module, add it to your package.json dependencies section like this:  "spectingular-configurer": "~0.1.1",

Require the module with (the grunt parameter should be the gunt-instance that you require in your gruntfile):  
```javascript
var configurer = require('spectingular-configurer')(grunt);
```

By default it loads the configuration from "path_where_you_execute_configurer"/include. 
You can override the directory in where it operates like this:

```javascript
var configurer = require('spectingular-configurer')(grunt, __dirname)
```

It will then search for a include directory in that path to load the configuration files.

*note* __dirname is a [node variable](https://nodejs.org/api/globals.html#globals_dirname) and reflects to the full path in which the task is executed.

##How to use:

###Get your config

####Intro
By default this modules searches for configuration files in "path_where_you_execute_configurer"/include. 

In this folder you should put configuration files, where the name of the file is the key of the grunt-config you need.
So if you need a grunt.copy config you add a file named "copy.js". See also the default configuration files for examples.

You can get the config you need by running the method configure();
```javascript
configurer.configure()
```

####Default configuration
The configurer also has some default configuration of itself.
It sets basic paths and a grunt-clean configuration. 


####Overriding options
The configurer does not merge configurations. 
If you want to override some configuration settings there should be an option for that build in.
  
You can pass in the overrides into the configurer() method as the 'option' argument.

###Initialize grunt

**configurer.configure()** will return a config object, you should pass that into the init method.  
**configurer.init(config, config1, configN)** will load and concat all of the config and then pass to the initConfig function of Grunt. You can pass in as many as config objects you have.

There are 3 default configs added.  
bower-install-simple  
paths  
clean  

##Tests

There are tests for the configurer, we use jasmine-node for making the tests.  
You can run the tests by doing:
```javascript
npm test
```



