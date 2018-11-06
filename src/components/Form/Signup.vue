<template>
    <section>

        <section  class="section--layout--lg form--style">
            <header>
                <h1 class="h1--title--pink">Registrarse</h1>
            </header>

            <form action="" class="form--singup" @submit.prevent="registrar">
                <div>
                    <div>
                        <div class="input--text">
                            <label for="nombre">Nombre: </label>
                            <input type="text" name="" id="nombre" placeholder="Ej:Juan" v-model="datos.nombre"  required>
                        </div>
                        <div class="input--text">
                            <label for="apellido">Apellido: </label>
                            <input type="text" name="" id="apellido" placeholder="Ej:Matos" v-model="datos.apellido" required>
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
                            <label for="correo">Correo: </label>
                            <input type="email" name="" id="correo" placeholder="Ej:juanmato1254@ex.ample" v-model="email" required>
                        </div>
                        <div class="input--text">
                            <label for="passwordUno">Contraseña: </label>
                            <input type="password" name="" id="passwordUno" placeholder="" v-model="passwordUno"  required>
                        </div>
                        <div class="input--text">
                            <label for="passwordDos">Validar contraseña:</label>
                            <input type="password" name="" id="passwordDos" placeholder="" v-model="passwordDos"  required>
                            <p class="error">{{error}}</p>
                        </div>
                    </div>
                </div>
                
                <div>
                    <input class="btn btn-lg" type="submit" value="Registrarse">
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
                email:"",
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
        methods:{
            registrar(){
                this.error = ""
                let that = this;
                if(this.passwordUno == this.passwordDos){
                    firebase
                        .auth()
                        .createUserWithEmailAndPassword(this.email, this.passwordUno)
                        .then(() => {
                            var user = firebase.auth().currentUser;
                            firebase
                                .database()
                                .ref('/user/')
                                .child(user.uid).set({
                                    datos:that.datos
                                }).then(() =>{
                                    this.enviarEmail()
                                    window.location.reload()                        
                                    this.$router.push("/")
                                })
                            
                            
                            
                        })
                        .catch((error) =>{
                            
                            if(error.code == "auth/weak-password"){
                                this.error = "La contraseña debe tener al menos 6 caracteres"
                            }
                            else if( error.code ==  "auth/email-already-in-use"){
                                    this.error = "La dirección de correo electrónico ya está en uso por otra cuenta"
                            }
                            // //L {code: "auth/email-already-in-use", message: "The email address is already in use by another account."}
                            // console.log(error)
                           
                    
                         });
                       
                }else{
                    this.error = "No coinciden"
                    // alert
                }
                
               
            },
               enviarEmail(){
                let user = firebase.auth().currentUser

                user.sendEmailVerification()
                    .then(function(){
                        alert("Correo de autentificación enviado")
                        // console.log("El correo hacido enviado")
                    },function(error){
                        // console.log(error);
                        }

                    )
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
