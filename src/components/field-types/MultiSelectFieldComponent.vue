<template>
  <validate :state="state" :custom="{'validate': isValid}">
    <div class="form-group">
      <label :for="field.id">{{ field.label }}</label>
      <!--
      /**
        For creating options that do not exist:
          - taggable = true
          - pushTags = true
          - createOption = Function
      */

      /**
        Filterable set to false because objects are only filtered on the label parameter
          we want filtering on multiple parameters
      */
      -->
      <div class="input-group">
        <v-select v-model="localValue"
                  class="form-control form-control-lg"
                  :options="options"
                  :onSearch="fetchOptions"
                  :filterable="false"
                  :inputId="field.id"
                  :name="field.id"
                  :required="isRequired"
                  :multiple="true">

          <template slot="option" slot-scope="option">
            <div v-if="option.type === 'ADD_OPTION'" @mousedown.prevent.stop="addNewOption($event, option)">Add new option</div>
            <span v-else>{{ option.label }}</span>
          </template>

          <div slot="no-options">
            <small v-if="localValue">Option '{{ localValue }}' not found.</small>
          </div>
        </v-select>

        <div class="input-group-append">
          <button class="btn btn-outline-secondary btn-lg" type="button" title="Add">
            <i class="fa fa-plus">
              <span aria-hidden="true" class="sr-only">Add</span>
            </i>
          </button>
        </div>
      </div>

      <small :id="field.id + '-description'" class="form-text text-muted">
        {{ field.description }}
      </small>

      <field-messages :name="field.id" show="$touched || $submitted" class="form-control-feedback">
        <div slot="required">This field is required</div>
        <div slot="validate">Validation failed</div>
      </field-messages>

    </div>
  </validate>
</template>

<style scoped>
  .input-group >>> .v-select {
    padding: 0.3rem 1rem;
    max-height: 3rem;
  }

  .input-group >>> .v-select > .dropdown-toggle {
    border: 0;
    max-height: 1rem;
  }
</style>

<script>
  import VueForm from 'vue-form'
  import vSelect from 'vue-select'

  import { FormField } from '../../flow.types'

  export default {
    name: 'MultiSelectFieldComponent',
    mixins: [VueForm],
    props: {
      value: {
        type: Array,
        required: false,
        default: () => []
      },
      field: {
        type: FormField,
        required: true
      },
      state: {
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
      }
    },
    data () {
      return {
        // Store a local value to prevent changing the parent state
        localValue: this.value,
        options: []
      }
    },
    methods: {
      fetchOptions (search, loading) {
        loading(true)
        this.field.options(search).then(response => {
          response.push({
            id: null,
            label: 'Add option',
            value: undefined,
            type: 'ADD_OPTION'
          })
          this.options = response
          loading(false)
        })
      },
      addNewOption (event, option) {
        console.log('add new option')
        // close the drop down
        event.target.parentElement.parentElement.parentElement.style.display = 'none'
        this.$emit('addOption', this.afterOptionCreation)
      },
      afterOptionCreation (newOption) {
        this.options.push(newOption)
        this.localValue.push(newOption)
      }
    },
    watch: {
      localValue (values) {
        // Emit value changes to the parent (form)
        this.$emit('input', values.map(value => value.id))
        // Emit value changes to trigger the hooks.onValueChange
        // Do not use input event for this to prevent unwanted behavior
        this.$emit('dataChange')
      }
    },
    created () {
      // If there is a value set, fetch an initial list of options
      if (this.value.length > 0) {
        // Call the field.options with the initial array of values
        this.field.options(this.value).then(response => {
          this.options = response

          // Replace localValue with the entire object so vue-select can use the label property
          // Filter the list of the options based on the actual selected IDs
          // a like query can return more then just your IDs
          this.localValue = this.options.filter(option => this.value.includes(option.id))
        })
      }
    },
    components: {
      vSelect
    }
  }
</script>
