// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Router from 'vue-router'
import ExamplePage from './example/ExamplePage'
import FormDemo from './example/FormDemo'
import NumberExample from './example/number-field/NumberExample'
import IntegerExample from './example/number-field/IntegerExample'
import LongExample from './example/number-field/LongExample'
import DecimalExample from './example/number-field/DecimalExample'
import i18n from '@molgenis/molgenis-i18n-js'

Vue.config.productionTip = false

Vue.use(Router)

const router = new Router({
  mode: 'history',
  linkExactActiveClass: 'active',
  routes: [
    {
      path: '/all',
      component: FormDemo
    },
    {
      path: '/number/',
      component: NumberExample
    },
    {
      path: '/integer/',
      component: IntegerExample
    },
    {
      path: '/long/',
      component: LongExample
    },
    {
      path: '/decimal/',
      component: DecimalExample
    },
    {
      path: '/',
      redirect: '/all'
    }]
})

Vue.use(i18n, {
  lng: 'en',
  fallbackLng: 'en',
  namespace: ['ui-form'],
  callback () {
    /* eslint-disable no-new */
    new Vue({
      el: '#form-demo',
      router,
      template: '<ExamplePage/>',
      components: { ExamplePage }
    })
  }
})
