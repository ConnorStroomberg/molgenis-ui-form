<template>
  <vue-form :id="id" :state="state">
    <template v-for="field in schema.fields">
      <form-field-component
        :data="formData"
        :field="field"
        :state="formState"
        @dataChange="onValueChanged">
      </form-field-component>
    </template>
  </vue-form>
</template>

<script>
  import VueForm from 'vue-form'
  import FormFieldComponent from './FormFieldComponent'
  import { isValidSchema } from '../util/SchemaService'

  export default {
    name: 'FormComponent',
    mixins: [VueForm],
    props: {
      id: {
        type: String,
        required: true
      },
      schema: {
        type: Object,
        required: true,
        validator: isValidSchema
      },
      formData: {
        type: Object,
        required: false,
        default: () => ({})
      },
      formState: {
        type: Object,
        required: true
      }
    },
    data () {
      return {
        state: this.formState
      }
    },
    methods: {
      onValueChanged () {
        this.$emit('onValueChanged')
      }
    },
    components: {
      FormFieldComponent
    }
  }
</script>
