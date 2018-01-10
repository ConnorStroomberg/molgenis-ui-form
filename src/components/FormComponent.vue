<template>
  <vue-form :id="id" :state="state">
    <template v-for="field in schema.fields">
      <form-field-component
        :data="formData"
        :field="field"
        :state="state"
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
      }
    },
    data () {
      return {
        state: {}
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
