<template>
  <div>
    <vue-form :state="formstate" @submit.prevent="onSubmit">

      <validate auto-label class="form-group required-field" :class="fieldClassName(formstate.name)">
        <label>Name</label>
        <input type="text" name="name" class="form-control" required v-model.lazy="model.name">

        <field-messages name="name" show="$touched || $submitted" class="form-control-feedback">
          <div>Success!</div>
          <div slot="required">Name is a required field</div>
        </field-messages>

      </validate>

      <div class="py-2 text-center">
        <button class="btn btn-primary" type="submit">Submit</button>
      </div>

    </vue-form>
  </div>
</template>

<script>
import VueForm from 'vue-form'

export default {
  name: 'FormComponent',
  mixins: [VueForm],
  data () {
    return {
      formstate: {},
      model: {
        name: 'Hello'
      }
    }
  },
  methods: {
    fieldClassName: function (field) {
      if (!field) {
        return ''
      }
      if ((field.$touched || field.$submitted) && field.$valid) {
        return 'has-success'
      }
      if ((field.$touched || field.$submitted) && field.$invalid) {
        return 'has-danger'
      }
    },
    onSubmit: function () {
      console.log(this.formstate.$valid)
    }
  }
}
</script>
