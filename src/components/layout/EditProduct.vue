<template>
   <section class="section--layout--lg registrar--producto">
       <header>
           <h3 class="h3--title--gray">Editar Producto</h3>
       </header>
       <section>
        <form @submit.prevent="enviarInfo" id="registrarProducto" class="form--registrar">
            <div>
                <div>
                    <select  name="" id="" v-model="formulario.tipo" required>
                        <option   
                            v-for="tipo in tipos" :value="tipo" 
                            :key="tipo.id"
                        >
                        {{tipo}}
                        </option>
                        
                    </select>
                </div>
                <div class="container--img--prod">
                    <img :src="formulario.img" alt="" width="300" height="250">
                    <div>
                        <input  @change="guadarRuta" type="file" accept="image/png, image/jpeg">
                    </div>
                </div>
                <div class="input--text">
                    <label for="modelo">Modelo</label><input  type="text" v-model="formulario.modelo" min="0" required>
                </div>

                <div class="input--text">
                    <label for="precioCompra">Precio de compra</label><input type="number"  v-model="formulario.precioCompra"  id="precioCompra"  min="0" required>
                </div>

                <div class="input--text">
                    <label for="modelo">Precio de venta</label><input  type="number" v-model="formulario.precioVenta"  min="0" required>
                </div>

                <div class="input--text">
                    <label for="modelo">Precio de especial</label><input  type="number" v-model="formulario.precioEspecial"  min="0" required>
                </div>

                <div class="input--text">
                    <label for="modelo">Cantidad</label><input  type="number" v-model="formulario.cantidad"  min="0"  required>
                </div>
                <div class="input--text input--textarea">
                    <label for="descripcion">Descripcion</label>
                    <textarea name="" id="" cols="30" rows="10" v-model="formulario.descripcion"  required></textarea>
                </div>
                <div>
                    <label for="modelo">Especial</label><input type="checkbox" v-model="formulario.especial">
                </div>
            </div> 
            <div class="container--input--prod">
                <input class="btn btn--delete" type="button" @click="ocultar" value="Cancelar">
                <input class="btn " type="submit" value="Enviar">
            </div>
        </form>   
       </section>
   </section>

</template>
<script>
    import firebase,{ functions } from 'firebase'
import ProductosVue from './page/Productos.vue';

    export default {
        props:['producto'],
        data(){
            return{
                
                formulario:{
                    img:null,
                    modelo:null,
                    cantidad: null,
                    precioCompra: null,
                    precioVenta:null,
                    precioEspecial: null,
                    descripcion:"",
                    tipo:"Selecciona un tipo",
                    fechaIngreso:"",
                    especial:false

                },

                tipos:[
                    "Selecciona un tipo",
                    "impresora",
                    "computadora",
                    "accesorio"
                ]
                
            }
        },
        created() {
            this.productoEditar()
        },
        methods:{
            productoEditar(){
                firebase
                .database()
                .ref(`/producto/${this.producto.tipo}/${this.producto.key}`)
                .on('value',snapshot => this.infoProducto(snapshot.val()))
            },

            infoProducto(producto){
                for (const key in producto) {
                    this.formulario.img = producto[key].img
                    this.formulario.modelo = producto[key].modelo
                    this.formulario.cantidad = producto[key].cantidad
                    this.formulario.precioCompra = producto[key].precioCompra
                    this.formulario.precioVenta =producto[key].precioVenta
                    this.formulario.precioEspecial = producto[key].precioEspecial
                    this.formulario.descripcion = producto[key].descripcion
                    this.formulario.tipo = producto[key].tipo
                    this.formulario.especial = producto[key].especial
                }
                   
            },
            ocultar(){
                this.$emit('ocultar', null)
                document.getElementsByTagName("html")[0].style.overflow = "auto";
            },
            enviarInfo(){
                if(this.formulario.tipo != "Selecciona un tipo"){
                     this.formulario.fechaIngreso = this.establecerFecha();
                    firebase
                        .database()
                        .ref('/producto')
                        .child(`/${this.formulario.tipo}/${this.producto.key}`)
                        .update({data: this.formulario})
                        this.ocultar()
                     //alerta OK

                }else{
                    //modal-alerta error
                    console.log("Debe de elegir un tipo")
                }
               
            },
            guadarRuta(e){
                let file = e.target.files[0]
                var storage = firebase.storage()
                let fullURL = null
                var that = this
                
                if(!file){
                    // console.log("Sin imagenes")
                }else{
                    var storageRef = storage.ref(`/imgsProductos/${file.name}`)
                    var uploadTask = storageRef.put(file)

                    uploadTask.on('state_changed', (snapshot) =>{

                    },(error) =>{
                        // console.log(error)
                    }, () => {
                        // console.log("Archivo subido a firabase");
                         fullURL = uploadTask.snapshot.metadata.fullPath
                         storage.ref(`${fullURL}`).getDownloadURL().then(function(url){
                           that.formulario.img = url
                         })

                    })
                   
                }
               
            },
             establecerFecha(){
                let date = new Date()
                let fechaCompleta = `${date.getUTCDate()}/${date.getUTCMonth()}/${date.getUTCFullYear()}`
                return fechaCompleta
            },
        }
      
    }
</script>
<style scoped>
    .registrar--producto{
        background: var(--color-white);
        overflow: auto;
        padding:20px;
    }
    .form--registrar .input--text > input{
        border:1px solid #000;
    }
    .container--input--prod{
        text-align: center;
        padding: 20px;
    }
    .container--img--prod{
         text-align: center;
    }
    .input--textarea > textarea{
        resize: none;
        height: 100px;
        width: 100%;
        margin-left:5px;
        padding:10px 5px;
        border: 1px  solid #000;
        border-radius: 5px;
    }
</style>