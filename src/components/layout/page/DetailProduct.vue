<template>
    <section>
        <div class="contianer--detailproduct section--layout--lg">
            <div class="detailproduct--photos">
                <div>
                    <img :src="producto.data.img" class="container--shadow" :alt="producto.data.modelo">
                </div>
            </div>
            <div class="detailproduct--info container--shadow">
                <header>
                    <div>
                        <h1 class="h1--title--pink">{{producto.data.modelo}}</h1>
                    </div>
                    <div>
                        <h3 class="h3--title--gray">Precio del producto</h3>
                        <div>
                            <p class="price">RD${{evaluarPrecio(producto.data.precioEspecial, producto.data.precioVenta, producto.data.especial)}}</p>
                            <div>
                               <span class="amount">Cantidad:</span> 
                               <input class="amount--input" type="number"  min="1" :max="producto.data.cantidad" v-model.number="cantidad">
                            </div>
                            <button class="btn btn--add" @click="addCarro(producto.tipo, producto.key)">Añadir</button>
                        </div>
                    </div>
                </header>
                <div>
                    <h3 class="h3--title--gray">Descripción</h3>
                    <p>{{producto.data.descripcion}}</p>
                </div>
            </div>
        </div>
        <!-- <pre>{{$data}}</pre> -->
        <offerproduct></offerproduct>
    </section>
</template>
<script>
    import firebase from 'firebase'
    import offerproduct from '../OfferProduct.vue'
    export default {
        components:{offerproduct},
        data(){
            return{
                cantidad:1,
                precioTotal:0,
                tipo: this.$route.params.tipo,
                key: this.$route.params.id,
                producto: {},
              

            }
        },

        created(){
            this.consultarProducto() 
        },
        methods:{
            consultarProducto(){
                firebase
                    .database()
                    .ref(`producto/${this.tipo}/${this.key}`)
                    .on('value', snap =>{
                        this.producto = snap.val()
                    })

            },
             evaluarPrecio(pEspecial, pVenta, boolEspecial){
                if(boolEspecial){
                    this.precioTotal = pEspecial
                    return pEspecial
                    
                }
                else{ 
                    this.precioTotal = pVenta
                    return pVenta
                }
               
             },
             addCarro(tipo, key){
                 firebase.auth().onAuthStateChanged((user) =>{
                     
                     if(user)
                     {
                         firebase
                            .database()
                            .ref('user/')
                            .child(`${user.uid}/datos/carrito/`).push({
                                key: this.key,
                                tipo: this.tipo,
                                cantidad: this.cantidad, 
                                precioTotal: this.precioTotal
                            }).then(() =>{
                                //Alert Producto agregado
                                alert("El producto sea añadido a su carrito")
                                // console.log("Producto agregado")
                            })

                     }
                     else{
                        //  alert  
                        //  console.log("Debe de registrase para poder a;nadir producto a su carrito");
                          alert("Debe de iniciar sesión para poder añadir productos a su carrito")
                            this.$route.push('/iniciarsesion')
                     }
                 })   
            },
        },
        watch:{
            '$route'(to){
                 
                this.tipo = to.params.tipo
                this.key = to.params.id
                this.consultarProducto()
            },
            cantidad(){
                if(this.cantidad > this.producto.data.cantidad){
                    this.cantidad = this.producto.data.cantidad
                }
            }
        }
    
    }
</script>
<style scoped>
    .contianer--detailproduct{
        display: flex;
        justify-content: space-between;
        margin-top:20px;
    }
    .detailproduct--info {
       width:600px;
       padding: 15px 25px 25px 25px;
    }
    .detailproduct--photos{ 
       width:350px;
    }
    .detailproduct--photos > div {
       
        width: 300px;
        height: 300px;
        text-align: center;
    }
    .detailproduct--photos > div > img{
        border-radius: 10px;
        width: 100%;
        height: 100%;
    }

    .detailproduct--info > div:last-child > h3{
        border-bottom:5px solid var(--color--blue);
        margin-bottom: 10px;
    }
    .amount{
        font-weight: 500;
    }
    .detailproduct--info > header > div > div{
        display:flex;
        justify-content: space-between
    }
</style>

