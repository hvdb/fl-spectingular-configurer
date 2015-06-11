#Spectingular-configurer

##What does it do?

Grunt does not handle dynamic task-configuration very well.   
Furthermore, in grunt you often repeat yourself in terms of configuration, which causes your grunt files to become huge.

This npm-module gives you  
  
  
**1. the ability to split grunt configuration into separate files  
2. sensible defaults for commonly used tasks  
3. the option to override most defaults  
4. a way of initializing grunt with the ready-made configuration**


  
All to make sure all configuration is correct before grunt is started.

As extentions of this module, also look at  
* [spectingular-portal-package-configurer](https://stash.europe.intranet/projects/FL/repos/spectingular-portal-package-configurer/browse)*: This configurer gives you all the default config for packaging your project  
* [specintingular-portal-release-configurer](https://stash.europe.intranet/projects/FL/repos/spectingular-portal-release-configurer/browse)* This configurer gives you all the configuration to release you project to nexus


##Installing:
Add it to your package.json dependencies section like this:  "spectingular-configurer": "~0.1.4",

Require the module with (the grunt parameter should be the gunt-instance that you require in your gruntfile):

```
var configurer = require('spectingular-configurer')(grunt);
```

By default it loads the configuration from "path_where_you_execute_configurer"/include. 

You can override the directory in where it operates like this:  

``` 
var configurer = require('spectingular-configurer')(grunt, __dirname)
```

It will then search for an include directory in that path to load the configuration files.

*note* __dirname is a [node variable](https://nodejs.org/api/globals.html#globals_dirname) and reflects to the full path in which the task is executed.

##How to use:

###Get your config

####Intro
By default this module searches for configuration files in "path_where_you_execute_configurer"/include.

In this folder you should put configuration files, where the name of the file is the key of the grunt-config you need.
So if you need a grunt.copy config you add a file named "copy.js". See also the default configuration files for examples.

You can get the config you need by running the method configure();   

```
configurer.configure()
```

####Default configuration
The configurer also has some default configuration of itself:

bower-install-simple
paths  : sets up paths for tmp / dist / nolio directories
clean  : clean task config for tmp and bower



####Overriding options
The configurer does not merge configurations. 
If you want to override some configuration settings there should be an option for that build in.
  
You can pass in the overrides into the configurer() method as the 'options' argument.
At this point the default configuration of this configurer can not be overwritten

###Initialize grunt

**configurer.configure()** will return a config object, you should pass that into the init method.  
**configurer.init(config, config1, configN)** will load and concat all of the config and then pass to the initConfig function of Grunt.   

You can pass in as many config objects as you want.

There are 3 default configs added.  
bower-install-simple  
paths  
clean  

##Tests

There are tests for the configurer, for which we use jasmine-node.
You can run the tests using the command:
```
npm test
```



