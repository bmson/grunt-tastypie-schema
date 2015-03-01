# grunt-tastypie-schema

Crawls the Tastypie schema and exports as json

## Install

```
npm install grunt-tastypie-schema --save-dev
```

## tastypie-schema task

Run this task with `grunt tastypie-schema`

Files and options may be specified according to the grunt configuring tasks guide.

### Login

###### url

Type: `String`

```
Points to the login endpoint.
Will be called with a POST.
```

###### params

Type: `Object`

```
Parameters that will be sent to the login endpoint.
```

### Options

###### keys

Type: `Array`<br>
Default: `['fields', 'filtering', 'ordering']`

```
List of values to read from the tastypie schema.
```

## Usage Example

```js
module.exports = function (grunt) {
  grunt.initConfig({

    tastypie_schema: {
      production: {
        login: {
          url: 'https://url',
          params: {
            username: 'username',
            password: 'password'
          }
        },
        options: {
          keys: ['fields', 'filtering', 'ordering']
        },
        files: {
          'response.json': 'https://url/schema'
        }
      }
    }

  });

  grunt.loadNpmTasks('grunt-tastypie-schema');
};
