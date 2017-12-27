# molgenis-ui-form

> Library for generating HTML web forms
##Usage 

Add library using yarn.

```yarn add @molgenis/molgenis-ui-form```

Import vue component using.

```import { FormComponent } from '@molgenis/molgenis-ui-form'```

Import entity mapper EntityToStateMapper using.

```import { EntityToStateMapper } from '@molgenis/molgenis-ui-form'```

This takes a molgenis entity response and turns it into a molgenis-ui-form data object

```
...
const formSchema = EntityToStateMapper.generateFormFields(response.meta)
const formData = EntityToStateMapper.generateFormData(formSchema, response.items[0]

data () {
  return {
    schema: {
      fields: formSchema
    },
    data: formData
  }
}
...
```

Use in template 

```
<template>
    <form-component id="my-form" :schema="schema" :data="data"></form-component>
</template>
```


## Build Setup

``` bash
# install dependencies
yarn install

# serve with hot reload at localhost:8080
yarn run dev

# build for production with minification
yarn run build

# build for production and view the bundle analyzer report
yarn run build --report

# run unit tests
yarn run unit

# run e2e tests
yarn run e2e

# run all tests
yarn test
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
