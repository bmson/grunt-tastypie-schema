<img src="https://cloud.githubusercontent.com/assets/890821/6521108/f47b7c4c-c386-11e4-9faa-4f8e6350fd14.png" width="100" />

--

### Install

```
npm install grunt-tastypie-schema --save-dev
```

--

### tastypie-schema task

Run this task with `grunt tastypie-schema`

Files and options may be specified according to the grunt configuring tasks guide.

--

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

--

### Options

###### keys

Type: `Array`<br>
Default: `['fields', 'filtering', 'ordering']`

```
List of values to read from the tastypie schema.
```

--

### Usage Example

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
```

--

[![Code Climate](https://img.shields.io/codeclimate/github/bmson/grunt-tastypie-schema.svg?style=flat-square)](https://codeclimate.com/github/bmson/grunt-tastypie-schema)
[![Code Climate](https://img.shields.io/david/bmson/grunt-tastypie-schema.svg?style=flat-square)](https://david-dm.org/bmson/grunt-tastypie-schema/#info=dependencies)
[![Code Climate](https://img.shields.io/david/dev/bmson/grunt-tastypie-schema.svg?style=flat-square)](https://david-dm.org/bmson/grunt-tastypie-schema/#info=devDependencies)
[![Code Climate](https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square)](https://github.com/bmson/grunt-tastypie-schema/blob/master/LICENSE.md)
