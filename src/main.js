import Vue from 'vue'
import App from './App.vue'
import {routes} from './routes'
// import {store} from './store/store'
// import { library } from '@fortawesome/fontawesome-svg-core'
// import { faCoffee } from '@fortawesome/free-solid-svg-icons'
// import { fab } from '@fortawesome/free-brands-svg-icons'
// import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import VueRouter from 'vue-router'
import firebase from 'firebase'
  //fontawesome
  // library.add(fab)
  // Vue.component('font-awesome-icon', FontAwesomeIcon)
  
  //init router
  Vue.use(VueRouter)
  const router = new VueRouter({
    mode: 'history',
    routes
  })

  // Initialize Firebase
var config = {
  apiKey: "AIzaSyDcxJELA5mWaiYGhgTe_qvko_c44vmwFcU",
  authDomain: "tecnoser-00.firebaseapp.com",
  databaseURL: "https://tecnoser-00.firebaseio.com",
  projectId: "tecnoser-00",
  storageBucket: "gs://tecnoser-00.appspot.com",
  messagingSenderId: "1012676247608"
};
firebase.initializeApp(config);


  // if (to.path.includes('/admin/') && ) {

  // }
 


new Vue({
  el: '#app',
  router, 
  
  render: h => h(App)
})
