<template>
    <section>

        <section  class="section--layout--lg form--style">
            <header>
                <h1 class="h1--title--pink">Modificar Informacion</h1>
            </header>

            <form action="" class="form--singup" @submit.prevent="actualizar">
                <div>
                    <div>
                        <div class="input--text">
                            <label for="nombre">Nombre: </label>
                            <input type="text" name="" id="nombre" placeholder="Ej:Juan" v-model="datos.nombre"  required>
                        </div>
                        <div class="input--text">
                            <label for="apellido">Apellido: </label>
                            <input type="text" name="" id="apellido" placeholder="Ej:Matos" v-model="datos.apellido">
                        </div>

                        <div class="input--text">
                            <label for="cedula">Cédulo: </label>
                            <input type="text" name="" id="cedula" placeholder="Ej:784954" v-model="datos.cedula"   required pattern="[0-9]{1,}">
                        </div>
                        <div class="input--text">
                            <label for="telefono">Teléfono: </label>
                            <input type="text" name="" id="telefono" placeholder="Ej:8294878987" v-model="datos.telefono"   required pattern="[0-9]{1,}">
                        </div>
                        <div class="input--text input--textarea" >
                            <label for="direccion">Dirección: </label> 
                            <textarea name="direcction" id="" placeholder="lorem"  v-model="datos.direccion"  required ></textarea>
                        </div>
                    </div>
                    <div>
                        <div class="input--text">
                            <label for="ciudad">Ciudad: </label>
                            <input type="text" name="" id="ciudad" placeholder="Ej:Santo Domingo" v-model="datos.ciudad"  required>
                        </div>
                        <div class="input--text">
                            <label for="telefono">Sector: </label>
                            <input type="text" name="" id="sector" placeholder="Ej:Pantoja" v-model="datos.sector" required>
                        </div>
                        <div class="input--text">
                            <label for="passwordUno">Nueva contraseña: </label>
                            <input type="password" name="" id="passwordUno" placeholder="" v-model="passwordUno"  >
                        </div>
                        <div class="input--text">
                            <label for="passwordDos">Confirmar contraseña:</label>
                            <input type="password" name="" id="passwordDos" placeholder="" v-model="passwordDos"  >
                            <p>{{error}}</p>
                        </div>
                    </div>
                </div>
                
                <div>
                    <input class="btn btn-lg" type="submit" value="Actulizar información">
                </div>
            </form>

        </section>
    </section>
</template>
<script>
    import firebase,{ functions } from 'firebase'
       export default {
        data(){
            return{
                error: "",
                userUid:"",
                passwordUno:null,
                passwordDos:null,
                datos:{
                    nombre: "",
                    apellido:"",
                    cedula:"",
                    telefono:"",
                    direccion:null,
                    ciudad:null,
                    sector:null,
                }
                
                
            }
        },
        created(){
            this.consultarDatos()
        },
     methods:{
            consultarDatos(){
                firebase.auth().onAuthStateChanged( (user) =>{
                    if(user){
                        this.userUid = user.uid
                        firebase
                        .database()
                        .ref('user/')
                        .child(this.userUid)
                        .on('value', (snap) =>{
                            this.datos.nombre = snap.val().datos.nombre
                            this.datos.apellido = snap.val().datos.apellido
                            this.datos.cedula = snap.val().datos.cedula
                            this.datos.telefono = snap.val().datos.telefono
                            this.datos.telefono = snap.val().datos.telefono
                            this.datos.direccion = snap.val().datos.direccion
                            this.datos.ciudad = snap.val().datos.ciudad
                            this.datos.sector = snap.val().datos.sector
                        })
                    }
                     


                })
            },
           actualizar(){
               if(this.passwordUno)
               {
                   
                  if(this.passwordUno == this.passwordDos){
                      var user = firebase.auth().currentUser;
                      user.updatePassword(this.passwordUno).then(function() {
                        // Update successful.
                        }).catch(function(error) {
                        // An error happened.
                        });
                        this.passwordUno = null
                         this.passwordDos = null
                  }else{
                      this.error = "La contraseña son diferentes"
                  }
               }
               firebase
                    .database()
                    .ref('user/')
                    .child(this.userUid)
                    .update({
                        datos:this.datos
                    })
                alert("Los datos se han actualizados")
           }

        }
    }
</script>

<style  scoped>
    .form--singup{
        padding-top:20px;
    }
   
    .input--textarea > textarea{
        resize: none;
        height: 100px;
        width: 100%;
        margin-left:5px;
        padding:10px 5px;
        border: 1px solid var(--color--gray-form);
        border-radius: 5px;
    }
    .form--singup > div:nth-child(1){
        display:flex;
        justify-content: space-between;
        flex-wrap: wrap;
    }
    .form--singup > div:nth-child(1) > div{
        width:45%;
    }
 
    .form--singup > div:nth-child(2){
        text-align: center;
        padding: 20px 0px;
    }
</style>
