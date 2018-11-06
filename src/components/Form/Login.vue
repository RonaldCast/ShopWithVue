<template>
    <section>
        <section class="login--style">
            <header>
                <h1 class="h1--title--pink">Iniciar sesión</h1>
            </header>
            <form action="" class="form--login" @submit.prevent="iniciarSeseion()">
                <div>
                    <div class="input--text">
                        <input type="email" name=""  placeholder="Correo eléctronico" v-model="email" required>
                    </div>
                    <div class="input--text">
                        <input type="password" name=""  placeholder="Contraseña" v-model="password" required >
                    </div>
                </div>
                <div>
                    <input class="btn btn-lg" type="submit" value="Ingresar">
                    <p class="error">{{error}}</p>
                    <p class="link" @click="restablecerPass">¿Olvidó su contraseña?</p>
                    <p class="link" @click="registrar">¿Aún no tiene una cuenta?</p>
                </div>
            </form>
        </section>
    </section>
</template>
<script>

   import firebase from 'firebase'

    export default {
        data(){
            return{
                error:"",
                email:"",
                password: ""
            }
        },
        methods:{
            registrar(){
                this.$router.push("/registrarse")
            },
            iniciarSeseion(){
                this.error = ""
                firebase
                    .auth()
                    .signInWithEmailAndPassword(this.email, this.password)
                    .then(() => {
                        
                        window.location.reload()
                        this.$router.push("/")
                        
                    })
                    .catch((error) => {
                       
                        var errorCode = error.code;
                        if(errorCode == "auth/wrong-password"){
                            this.error = "La contraseña no es válida o el usuario es incorrecto"
                        }
                        

                        console.log(error)
                });
            },
            restablecerPass(){
                this.error = ""
                if(this.email){
                    var auth = firebase.auth();
                        var emailAddress = "user@example.com";

                        auth.sendPasswordResetEmail(this.email).then(() =>{
                            alert("Correo enviado");
                        }).catch((error) => {
                            if(error.code == "auth/invalid-email"){
                                this.error = "La dirección de correo electrónico está mal formateada."
                            }
                            else if(error.code == "auth/user-not-found"){
                                 this.error = "No hay registro de usuario correspondiente a este correo. "
                            }
                            
                           console.log(error)
                        });
                }
                else{
                    alert("Debe de poner el correo para restablecer la contraseña");
                }
            }
        }
    }
</script>
<style scoped>
    .form--login > div:first-child{
        padding:15px 15px 5px 15px;
    }
    .form--login > div:last-child{
        text-align: center;
        padding:15px;
    }
    .form--login > div:last-child > input{
        margin-bottom: 10px;
    }
    .login--style{
        width:400px;
        
        margin:0 auto;
        margin-top:100px;
        margin-bottom:100px;
        background: var(--color--gray-form);
        padding: var(--section--padding--lg);
        
    }
    .login--style > header > h1{
        text-align: center;
    }
</style>
