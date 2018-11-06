<template>
    <nav>
        <div class="section--layout">
            <ul>
                <router-link :to="{name:'home'}" active-class="active" exact tag="li">
                    <a>Inicio</a> 
                </router-link>
                <router-link :to="{name:'about'}" active-class="active" exact tag="li">
                    <a>¿Quienes Somos?</a>
                </router-link>
                <router-link :to="{name:'computer'}" active-class="active" exact tag="li"> 
                    <a>Computadoras</a> 
                </router-link>
                <router-link :to="{name:'print'}" active-class="active" exact tag="li"> 
                    <a>Impresoras</a> 
                </router-link>
                <router-link :to="{name:'accessory'}" active-class="active" exact tag="li">
                    <a>Accesorios</a>
                </router-link>
                <router-link :to="{name:'carshop'}" active-class="active" exact tag="li"> 
                    <a>Carrito</a>
                </router-link> 
                <template v-if="is_signed">
                     <li class="singout" @click="cerrarSesion"><a>Cerra Sesión</a></li>
                    <router-link :to="{name:'user'}" active-class="active" exact tag="li"> 
                       <a>{{nombre}}{{apellido}}</a> 
                    </router-link>
                </template>
                <template v-else>
                    <router-link :to="{name:'login'}" active-class="active" exact tag="li"> 
                        <a>Iniciar sesión</a> 
                    </router-link>
                    <router-link :to="{name:'signup'}" active-class="active" exact tag="li"> 
                        <a>Registrar</a> 
                    </router-link>
                   
                </template>

                
            </ul>
        </div>
    
    </nav>

</template>
<script>
    import firebase from 'firebase'

    export default {
        data(){
            return{
                is_signed:false,
                nombre:"",
                apellido:"",
                cantidadCarrito:0
                
            }

        },
        created(){
           this.obtenerIdUser();
        },
        methods:{
            obtenerIdUser(){
                firebase.auth().onAuthStateChanged((user) => {
                    if (user) 
                    {
                        // console.log(user)
                        firebase
                        .database()
                        .ref('/user/')
                        .child(`${user.uid}/datos`)
                        .on('value', (snapshot) => {
                            this.nombre = snapshot.val().nombre
                            this.apellido = snapshot.val().apellido
                            
                        this.is_signed = true;    
                        })    
                    } 
                    else 
                    {
                        this.is_signed = false;
                    }
                })
                
            },

            cerrarSesion(){
                var user = firebase.auth().currentUser
                firebase.auth().signOut()
                .then(() => {

                    this.is_signed = false;
                    this.$router.push("/")
                    window.location.reload()
                //    console.log("hola",user);
                 })
                .catch(function(error) {
                    // console.log(error)
                    // console.log(user)
                });
            }
   
          },
        }
    
</script>
<style scoped>
    .singout{
        cursor: pointer;
    }
    .active{
        color:var(--color--blue-dark);
    }
    nav{
        background: var(--color-gray);
    }

    ul > li{
        list-style: none;
        display:inline-block;
    }

    ul > li a{
        display:block;
       color: var( --color-white);
       padding: var(--btn--padding);
       font-size: var(--font--text--md);
    }

    nav > div.section--layout{
        display: flex;
        justify-content: center;
    }
</style>
