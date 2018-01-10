<template>
  <div id="form-demo" class="container">
    <div class="row">
      <div class="col-md-12">

        <blockquote class="blockquote text-center">
          <h1 class="display-3">MOLGENIS Form</h1>
          <footer class="blockquote-footer">Powered by<cite title="Source Title">Vue.js</cite></footer>
        </blockquote>

        <hr>

        <div class="card">
          <div class="card-header">
            <h5>Example form</h5>
          </div>
          <div id="alert-message" v-if="message" class="alert alert-info" role="alert">
            <button @click="message=null" type="button" class="close"><span aria-hidden="true">&times;</span></button>
            <span id="message-span">{{message}}</span>
          </div>
          <div class="card-body">
            <form-component id="example-form" :schema="schema" :formData="formData" @onValueChanged="onValueChanged"></form-component>
          </div>
          <div class="card-footer">
            <button id="save-btn" class="btn btn-primary" type="submit" v-on:click="onSubmit">Save</button>
            <button id="cancel-btn" class="btn btn-secondary" type="button" v-on:click="onCancel">Cancel</button>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
  import { EntityToStateMapper, FormComponent } from './molgenisUiForm'
  import EntityTypeV2Response from './formDemoMockResponse'

  export default {
    name: 'form-demo',
    components: {
      FormComponent
    },
    data () {
      return {
        message: null,
        schema: {
          fields: EntityToStateMapper.generateFormFields(EntityTypeV2Response.metadata)
        }
      }
    },
    methods: {
      onSubmit: function () {
        this.message = 'onSubmit: ' + JSON.stringify(this.formData)
      },
      onCancel: function () {
        this.message = 'form cancel from demo'
      },
      onValueChanged: function () {
        this.message = 'onValueChanged: ' + JSON.stringify(this.formData)
      }
    },
    computed: {
      formData () {
        return EntityToStateMapper.generateFormData(this.schema.fields, EntityTypeV2Response.items)
      }
    }
  }
</script>
