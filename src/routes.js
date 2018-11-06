import Home from './components/layout/page/Home.vue'
import About from './components/layout/page/About.vue'
import Computer from './components/layout/page/Computer.vue'
import Accessory from './components/layout/page/Accessory.vue'
import Print from './components/layout/page/Print.vue'
import Carshop from './components/layout/page/Carshop.vue'
import Login from './components/Form/Login.vue'
import Signup from './components/Form/Signup.vue'
import Admin from './components/layout/page/Admin.vue'
import Productos from './components/layout/page/Productos.vue'
import Registrar from './components/layout/page/Registrar.vue'
import User from './components/layout/page/User.vue'
import Orders from './components/layout/page/Orders.vue'
import DetailProduct from './components/layout/page/DetailProduct.vue'
import NotFound from './components/layout/NotFound.vue'
import firebase from 'firebase'


export const routes = [
    {path: '/', component: Home, name:'home' },
    {path: '*', component: NotFound, name:'found' },
    {path: '/nosotros', component: About, name:'about'},
    {path: '/computadoras', component: Computer, name:'computer'},
    {path: '/impresoras', component: Print, name:'print'},
    {path: '/iniciarsesion', component: Login, name:'login'},
    {path: '/carrito', component: Carshop, name:'carshop'},
    {path: '/registrarse', component: Signup, name:'signup'},
    { path: '/accesorios', component: Accessory, name: 'accessory' },
    {path:'/usuario', component:User ,name:'user'},
    {path:'/detalle/:tipo/:id', component:DetailProduct ,name:'detail'},
    {
        beforeEnter: (to, from, next) => {
              let tipo = ''
              firebase
                .auth()
                .onAuthStateChanged((user) => {
                    if(user){
                          firebase
                            .database()
                            .ref(`user/${user.uid}/datos`)
                            .on('value', snap => {
                              tipo = snap.val()
                              if (tipo['tipo'] == "admin" && to.path.includes('admin')) {
                                next()

                              } else {
                                window.location.reload()
                                next('/')
                              }
                            })
                    } else {
                      window.location.reload()
                      next('/')
                    }
                  
                })
            
           
        }
        ,path: '/admin',  component: Admin,  children:[
            {path: '', component: Productos, name:'productos'},
            {path: 'registrar', component: Registrar, name:'registrar'},
            {path: 'ordenes',component:Orders, name:'ordenes'}
        ]
    }
]