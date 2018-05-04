<template>
  <validate :state="fieldState" :custom="{'validate': isValidDateTime(localValue) && isValid}">
    <div class="form-group">
      <label :for="field.id">{{ field.label }}</label>

      <div class="input-group">
        <flat-pickr
          :id="field.id"
          v-model="flatPickerDate"
          :config="config"
          :name="field.id"
          class="form-control"
          :class="{ 'is-invalid' : fieldState && (fieldState.$touched || fieldState.$submitted) && fieldState.$invalid}"
          :aria-describedby="field.id + '-description'"
          :required="isRequired"
          :disabled="field.disabled"
          @on-change="onDatePickerChange"
        >
        </flat-pickr>

        <div class="input-group-append">
          <button class="btn btn-outline-secondary" type="button" title="Toggle" data-toggle>
            <i class="fa fa-calendar">
              <span aria-hidden="true" class="sr-only">Toggle</span>
            </i>
          </button>
          <button v-if="!isRequired" class="date-field-clear-btn btn btn-outline-secondary" type="button" title="Clear"
                  data-clear>
            <i class="fa fa-times">
              <span aria-hidden="true" class="sr-only">Clear</span>
            </i>
          </button>
        </div>
      </div>

      <small>
        {{ localValue }}
      </small>

      <small :id="field.id + '-description'" class="form-text text-muted">
        {{ field.description }}
      </small>

      <form-field-messages :field-id="field.id" :field-state="fieldState">
      </form-field-messages>

    </div>
  </validate>
</template>

<script>
  import VueForm from 'vue-form'
  import FormFieldMessages from '../FormFieldMessages'
  import flatPickr from 'vue-flatpickr-component'
  import 'flatpickr/dist/flatpickr.css'
  import moment from 'moment'
  import { Portuguese } from 'flatpickr/dist/l10n/pt.js'
  import { Spanish } from 'flatpickr/dist/l10n/es.js'
  import { Italian } from 'flatpickr/dist/l10n/it.js'
  import { French } from 'flatpickr/dist/l10n/fr.js'
  import { Dutch } from 'flatpickr/dist/l10n/nl.js'
  import { German } from 'flatpickr/dist/l10n/de.js'

  const flatpickerLangMap = {
    pt: Portuguese,
    es: Spanish,
    it: Italian,
    fr: French,
    nl: Dutch,
    de: German
  }

  const USE_STRICT_MODE = true

  export default {
    name: 'DateFieldComponent',
    mixins: [VueForm],
    props: {
      value: {
        type: [String, Date],
        required: false
      },
      field: {
        type: Object,
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
      isTimeIncluded: {
        type: Boolean,
        required: false,
        default: false
      }
    },
    data () {
      return {
        // Store a local value to prevent changing the parent state
        localValue: this.value,
        flatPickerDate: null, // model for flatpicker component
        serverFormat: this.isTimeIncluded ? 'YYYY-MM-DDTHH:mm:ssZZ' : 'YYYY-MM-DD',
        config: {
          locale: flatpickerLangMap[this.$lng || 'en'],
          wrap: true,
          allowInput: false,
          enableTime: this.isTimeIncluded,
          dateFormat: this.isTimeIncluded ? 'M j, Y h:i:S K' : 'M j, Y'
        }
      }
    },
    methods: {
      /**
       * Convert a date string from the backend to a JavaScript Date object.
       * Include hours and minutes if time is enabled
       *
       * @param dateString as send from the server
       * @returns {Date} A date object
       */
      getDateFromDateString (dateString) {
        return moment(dateString, this.serverFormat, USE_STRICT_MODE).toDate()
      },

      /**
       * Validates a date (string or date object) to see if it is a proper date.
       *
       * @param inputValue
       * @returns {boolean}
       */
      isValidDateTime (inputValue) {
        if (inputValue === undefined) {
          return true // required field check if done else where
        } else {
          const date = typeof inputValue === 'string' ? this.getDateFromDateString(inputValue) : inputValue
          return date != null && moment.utc(date).isValid()
        }
      },

      onDatePickerChange (selectedDates) {
        if (selectedDates.length === 0) {
          this.localValue = null
        } else {
          const newDate = selectedDates[0]
          if (this.isValidDateTime(newDate)) {
            this.localValue = new Date(newDate.getTime())
          } else {
            this.localValue = JSON.parse(JSON.stringify(newDate)) // clone any type
          }
        }
      }

    },
    watch: {
      localValue (value) {
        this.$emit('input', value)
        this.$emit('dataChange')
      }
    },
    created () {
      if (this.value !== undefined) {
        this.flatPickerDate = moment.utc(this.value).toDate()
      }
    },
    components: {
      flatPickr,
      FormFieldMessages
    }
  }
</script>
