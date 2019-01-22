# ember-actions-service

ember-actions-service is an Ember Addon to wrap common store and model methods with [ember-concurrency](https://ember-concurrency.com/) tasks and making them available as a service.

[![Build Status](https://travis-ci.org/tarmann/ember-actions-service.svg)](https://travis-ci.org/tarmann/ember-actions-service)
[![Maintainability](https://api.codeclimate.com/v1/badges/99c5ff8cbb04e86a3581/maintainability)](https://codeclimate.com/github/tarmann/ember-actions-service/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/99c5ff8cbb04e86a3581/test_coverage)](https://codeclimate.com/github/tarmann/ember-actions-service/test_coverage)
[![Ember Observer Score](https://emberobserver.com/badges/ember-actions-service.svg)](https://emberobserver.com/addons/ember-bundle-select)

## Usage

Blueprint:

```bash
ember g actions-service user
```

Route

```js
import Ember from 'ember';
import { actionsMixin } from 'ember-actions-service';

export default Ember.Route.extend(actionsMixin('user'), {});
```

Template using route-actions

```hbs
{{user-editor saveAction=(route-action "userActions" user "save")}}
```

## Actions

The following actions perform a [ember-concurrency](https://ember-concurrency.com/) task and return a task instance.

* find
* findAll
* create
* save
* delete
* unload
* rollback

## Custom Actions

To implement a new action just include a new task into the service generated following the format bellow:

```js
  doSomethingTask: task(function * (store, callback, model){
    updatedModel = yield doSomething(model);
    return { callback, model: updatedModel };
  })
```

Compatibility
------------------------------------------------------------------------------

* Ember.js v2.18 or above
* Ember CLI v2.13 or above


Installation
------------------------------------------------------------------------------

```
ember install ember-actions-service
```

License
------------------------------------------------------------------------------

This project is licensed under the [MIT License](LICENSE.md).
