#Spectingular-configurer

####What does it do?

It will load all configuration from the filesystem and replaces the options that you pass in the configurer.  
After all the configuration is set correct it will run grunt.initConfig(). This way we know for sure all configuration is correct before grunt is started.

By default it loads the configuration from __dirname/include. You can change the starting directory by passing in the full path.
It will then search for a include directory in that path to load the configuration.
The configurer doesn't do merging, so if you want to change some configuration settings there should be an option for that build in.  
You can pass in the option in the configurer() method.

####How to use it:

Initialize the module with:  
```javascript
var configurer = require('spectingular-configurer')(grunt);
```

You can override the directory in where it should search for the config.
(it will search in 'dirname'/include)

```javascript
var configurer = require('spectingular-configurer')(grunt, __dirname)
```
*note* __dirname is a [node variable](https://nodejs.org/api/globals.html#globals_dirname) and reflects to the full path in which the task is executed.

###How to use:
You can pass in options to override the default settings that will be loaded from the disk.  
It loads all configuration from __dirname/include and then gives back the config object.

**configurer.configure()** will return a config object, you should pass that into the init method.  
**configurer.init(config)** will load and concat all of the config and then pass to the initConfig function of Grunt. You can pass in as many as config objects you have.

And to register a task:  
**configurer.registerTasks(taskName,[tasks])**; taskName: Name of the task. [tasks] array of tasks.

###Tests

There are tests for the configurer, we use jasmine-node for making the tests.  
You can run the tests by doing:
```
npm test
```
