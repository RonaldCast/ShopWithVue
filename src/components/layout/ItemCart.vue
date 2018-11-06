<template>
    <section>
        <div class="container--item--cart">
            <div>
                <img :src="producto.data.data.img" alt="" width="55" height="50">
            </div>
            <div>
                <p class="model--product">{{producto.data.data.modelo}}</p>
            </div>
            <div>
                <span>Cantidad:</span>
                <input class="amount--input" type="number" min="1" :max="producto.data.data.cantidad" @input="aumentarCantidad(producto.key)"  v-model.number="cantidad">
            </div>
            <div>
                <p><span>Precio unidad: </span><span>RD${{evaluarPrecio(producto.data.data.precioEspecial,producto.data.data.precioVenta, producto.data.data.especial)}}</span></p>
            </div>
            <div>
                <p><span>Precio total: </span><span>RD${{precioTotal}}</span></p>
            </div>
            <div>
                <button class="btn btn--delete" @click="eliminarProducto(producto.key)">Eliminar</button>
            </div>
        </div>
    </section>
</template>
<script>
    import firebase from 'firebase'

    export default {
        props:['producto'],
        data(){
            return{
                precioTotal:0,
                cantidad: 0,
                userId: null,
                key: this.producto.key,
                precioUd: 0,
                modelo: null

            }
        },
        created() {
             this.actualizarCantidad()
        },

        methods:{
            aumentarCantidad(key){ 
                firebase
                    .database()
                    .ref(`user/${this.userId}/datos/carrito/${key}`)
                    .update({
                        cantidad: this.cantidad,
                    })
                  
            },
             evaluarPrecio(pEspecial, pVenta, boolEspecial){
                if(boolEspecial){
                    this.calcularPrecioTotal(this.cantidad, pEspecial)
                    this.precioUd = pEspecial;
                    return pEspecial
                    
                }
                else{
                    this.calcularPrecioTotal(this.cantidad, pVenta)
                    this.precioUd = pVenta;
                    return pVenta
                }
                this.actualizarCantidad()
             },
            actualizarCantidad(){
                     firebase
                    .auth()
                    .onAuthStateChanged((user) => {
                        if(user){
                            this.userId = user.uid
                            this.cantidad = this.producto.cantidadSel
                            this.modelo =  this.producto.data.data.modelo
                            
                            firebase
                                .database()
                                .ref(`user/${this.userId}/datos/carrito/${this.key}`)
                                .update({
                                    precioUnidad: this.precioUd,
                                    modelo: this.modelo
                                    
                                })
                        }
                    })  
                
            },
            calcularPrecioTotal(cantidad, precio){
                this.precioTotal = cantidad * precio
            },
            eliminarProducto(key){
                firebase
                    .database()
                    .ref(`user/${this.userId}/datos/carrito/${key}`)
                    .remove()
            }

        },

        watch:{
            cantidad(){
                if(this.cantidad > this.producto.data.data.cantidad){
                    this.cantidad = this.producto.data.data.cantidad
                }
            },
            precioTotal(){
                if(this.userId ){
                    firebase
                    .database()
                    .ref(`user/${this.userId}/datos/carrito/${this.key}`)
                    .update({
                        precioTotal: this.precioTotal,
                        
                    })
                }
            }
        }
    
    }
</script>
<style scoped>
    .container--item--cart{
        display:flex;
        justify-content: space-between;
        align-content: center;
        background: var(--color--gray-form);
        padding:15px;
        margin-top: 17px; 
        -webkit-box-shadow: var(--shodow--form);
        -moz-box-shadow: var(--shodow--form);
         box-shadow: var(--shodow--form);
    }

    .container--item--cart > div {
        align-self: center;

    }
    .container--item--cart >  div > p > span:nth-child(1){
        color: var(--color--pink);
        font-weight: 500;
        
    }
     .container--item--cart >  div > p > span:nth-child(2){
        color: var(--color--price);
        font-weight: 500;
        
    }
    .model--product{
        color: var(--color-gray);
        font-weight: 500;
    }
  

</style>

