<template>
  <validate :state="fieldState" :custom="{validate: isValid, integer: isValidInt, long: isValidLong, range: isValidRange, unique: testUnique}">
    <div class="form-group">
      <label :for="field.id">{{ field.label }}</label>

      <input
        :id="field.id"
        v-model="localValue"
        :type="inputType"
        :name="field.id"
        class="form-control"
        :class="{ 'is-invalid' : fieldState && (fieldState.$touched || fieldState.$submitted) && fieldState.$invalid}"
        :aria-describedby="field.id + '-description'"
        :required="isRequired"
        :disabled="field.disabled"
        :step="stepSize">

      <small :id="field.id + '-description'" class="form-text text-muted">
        {{ field.description }}
      </small>

      <form-field-messages :field-id="field.id" :type="field.type" :range="field.range" :field-state="fieldState">
      </form-field-messages>
    </div>
  </validate>
</template>

<script>
  import VueForm from 'vue-form'
  import { FormField } from '../../flow.types'
  import FormFieldMessages from '../FormFieldMessages'
  import debounce from 'debounce'

  const MIN_JAVA_INT = -2147483648
  const MAX_JAVA_INT = 2147483647

  let debounceTime = 500

  export default {
    name: 'TypedFieldComponent',
    components: {
      FormFieldMessages
    },
    props: {
      value: {
        // The value representing a Number or String
        type: [String, Number],
        required: false
      },
      field: {
        type: FormField,
        required: true
      },
      fieldState: {
        type: Object,
        required: false
      },
      isValid: {
        type: Boolean,
        default: true
      },
      isRequired: {
        type: Boolean,
        default: false
      },
      inputDebounceTime: {
        type: Number,
        default: debounceTime
      }
    },
    mixins: [VueForm],
    data () {
      return {
        localValue: this.value
      }
    },
    watch: {
      localValue: debounce(function (value) {
        if (this.isNumberField && !Number.isNaN(Number(value))) {
          this.$emit('input', Number(value))
        } else {
          this.$emit('input', value)
        }

        // Emit value changes to trigger the onValueChange
        // Do not use input event for this to prevent unwanted behavior
        this.$emit('dataChange')
      }, debounceTime)
    },
    computed: {
      stepSize () {
        // Conditionally add step size, return false to omit step attribute
        return (this.field.type === 'integer' || this.field.type === 'long') ? 1 : false
      },
      inputType () {
        return this.isNumberField(this.field) ? 'number' : this.field.type
      }
    },
    methods: {
      testUnique () {
        const data = this.localValue
        if (this.field.unique) {
          const testFunction = this.field.unique
          return new Promise((resolve) => {
            testFunction(data, resolve)
          })
        } else {
          return new Promise((resolve) => {
            resolve(true)
          })
        }
      },
      isNumberField (field) {
        return field.type === 'integer' || field.type === 'long' || field.type === 'decimal'
      },
      isValidInt (value) {
        if (this.field.type !== 'integer') {
          return true
        }

        if (Number.isNaN(value)) {
          return false
        }
        const numberValue = Number(value)
        return Number.isSafeInteger(numberValue) && numberValue <= MAX_JAVA_INT && numberValue >= MIN_JAVA_INT
      },
      isValidLong (value) {
        if (this.field.type !== 'long') {
          return true
        }
        if (Number.isNaN(value)) {
          return false
        }
        const numberValue = Number(value)
        return Number.isInteger(numberValue)
      },
      isValidRange (value) {
        if (!this.isNumberField(this.field) || !this.field.range) {
          return true
        }
        if (Number.isNaN(value)) {
          return false
        }
        const numberValue = Number(value)
        if (this.field.range.hasOwnProperty('min') && numberValue < this.field.range.min) {
          return false
        }
        if (this.field.range.hasOwnProperty('max') && numberValue > this.field.range.max) {
          return false
        }

        return true
      }
    },
    created () {
      debounceTime = this.inputDebounceTime
    }
  }
</script>
