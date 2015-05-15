#Spectingular-configurer


Initialize the module with:  
```javascript
require('spectingular-configurer')(grunt)
```

You can override the directory in where it should search for the config.
(it will search in 'dirname'/include)

```javascript
require('spectingular-configurer')(grunt, __dirname)
```

###How to use:
You can add the options for the config to the configure() method. 

***configurer.configure() will return a config object, you should pass that into the init method.

****configurer.init(config).

You can also provide extra options: configurer.init(options, config)

And to register a task:

***configurer.registerTasks(taskName,[tasks]);

###Tests

There are tests for the configurer, we use jasmine-node for making the tests.

You can run the tests by doing:
```
npm test
```


###note 
__dirname is an alias of for the directory the file is currently executed. 
if you execute Gruntfile.js from the root, __dirname will be the full path to the root. 
So it searches for includes in the include folder of the root.