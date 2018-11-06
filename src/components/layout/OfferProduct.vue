<template>
   <section>

    <section class="section--layout--lg">
      <h1 class="h1--title">Especiales</h1>
    </section>

    <section class="list--product-offer section--layout--lg">
         <template v-for=" producto in productos">
            <modelproduct :producto="producto" :key="producto.key"></modelproduct>
        </template>
    </section>

    <!-- <pre>{{$data}}</pre> -->
   </section>
</template>
<script>
    import firebase from 'firebase'
    import modelproduct from './ModelProduct.vue'
    export default {
        components:{modelproduct},
        data(){
            return{
                productos:[]
            }
        },
        created(){
            this.consultaProducto()
        },
        methods:{
            consultaProducto(){
                firebase
                    .database()
                    .ref('/producto')
                    .on('value', snapshot => { this.productosOfertas(snapshot.val())})
            },
            productosOfertas(producto){

                let productos = ["accesorio", "computadora", "impresora "]
                productos.forEach(element => {
                    let objeto = producto[element]
                      for (const key in objeto) {
                           if( (objeto[key].data.especial == true) && (objeto[key].data.cantidad > 0))
                           {
                               this.productos.push({
                                key: key,
                                modelo: objeto[key].data.modelo,
                                img: objeto[key].data.img,
                                precioVenta: objeto[key].data.precioVenta,
                                precioEspecial: objeto[key].data.precioEspecial,
                                cantidad: objeto[key].data.cantidad,
                                tipo: objeto[key].data.tipo,
                                especial: objeto[key].data.especial
                                
                            })
                        
                           }
                            
                        }
                });
              
            }
            
        }

    }
</script>
<style scoped>
    .list--product-offer{
        display:flex;
        justify-content: center;
        flex-wrap: wrap;
    }
</style>
