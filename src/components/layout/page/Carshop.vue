<template>
    <section>
        <section class="section--layout--lg">
            <header>
                <h1 class="h1--title--pink">Carrito ({{cantidadProducto}})</h1>
            </header>
            <div class="allProduct">
                <template v-if="prodSelect.length != 0">
                    <template v-for="producto in prodSelect">
                        <itemcart :producto="producto" :key="producto.key"></itemcart>
                    </template>
                </template>
                <template v-else>
                    <div class="cart--empty">
                        <h1>En esté apartado aparecerán los productos que se han agregado a su carrito de compra</h1>
                    </div>
                </template>
                <totalproduct></totalproduct>
            </div>
        </section>
        <offerproduct></offerproduct>
    </section>
</template>
<script>
    import offerproduct from '../OfferProduct.vue'
    import firebase from 'firebase'
    import itemcart from '../ItemCart.vue'
    import totalproduct from '../TotalProduct.vue'

    export default {
        components:{offerproduct, itemcart, totalproduct},
        
        data(){
            return{
                user:null,
                prodSelect:[]
            }
        },
        mounted(){
            this.consolutarProd()
        },
        methods:{
            consolutarProd(){
                firebase
                    .auth()
                    .onAuthStateChanged((user) =>{
                        if(user){
                            this.user = user.uid
                           firebase
                                .database()
                                .ref(`user/${user.uid}/datos/carrito`)
                                .on('value', snapshot => {
                                    this.recorrerCarrito(snapshot.val())
                                })     
                        }
                })
            },
            recorrerCarrito(productos){
                this.prodSelect = []
                for (const key in productos) {
                       firebase
                        .database()
                        .ref(`producto/${productos[key].tipo}/${productos[key].key}`)
                        .on('value', snapshot => {
                            
                              this.prodSelect.push({
                                    key:key,
                                    cantidadSel:productos[key].cantidad,
                                    data:snapshot.val()
                                })
                        })
            
                }
            },

        },
        computed:{
            cantidadProducto(){
                return this.prodSelect.length
            }
        }

    }
</script>
<style scoped>
    .cart--empty{
        height: 200px;
        display: flex;
        justify-content: center;
        align-items:center;
        color:rgb(211, 211, 211);

    }
</style>
