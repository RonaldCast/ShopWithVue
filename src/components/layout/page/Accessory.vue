<template>
    <section class="section--layout--lg">
        <h1 class="h1--title">Accesorios</h1>
        <header class="header--search">          
            <span>Buscar por modelo</span>
            <input type="search" v-model="buscar" placeholder="Ej: Lenovo 3000">         
        </header>
        <section class="contianer--product">
            <template v-if="filterProducto.length != 0">
                <template  v-for="prod in filterProducto">
                    <modelproduct :producto="prod" :key="prod.key"></modelproduct>
                </template>
            </template>
            <template  v-else>
                <div class="not--found">
                    <h1>Resultado no encontrado ({{buscar}})</h1>
                </div>
            </template>
        </section>
    </section>
</template>
<script>
    import firebase from 'firebase'
    import modelproduct from '../ModelProduct.vue' 
    import ProductosVue from './Productos.vue';
    export default {
        components:{modelproduct},
        data(){
            return{
                buscar: "",
                precioMinimo: 0,
                precioMaximo: 0,
                productos: [],
            }
        },
        created(){
            this.consultarComp()
        },
        methods:{
            consultarComp(){
                firebase
                    .database()
                    .ref('producto/accesorio')
                    .on('value', (snap) =>{
                        this.almacenarComp(snap.val())
                    })
            },
            almacenarComp(comp){
                this.productos = []
                for (const key in comp) {
                    if (comp[key].data.cantidad > 0) {  
                        this.productos.push({
                            key: key,
                            modelo: comp[key].data.modelo,
                            img: comp[key].data.img,
                            precioVenta: comp[key].data.precioVenta,
                            precioEspecial: comp[key].data.precioEspecial,
                            cantidad: comp[key].data.cantidad,
                            tipo: comp[key].data.tipo,
                            especial: comp[key].data.especial
                        })   
                    } 

                }
            }, 
           

        },
        computed:{
            filterProducto(){
                return this.productos.filter( prod => prod.modelo.toUpperCase().includes(this.buscar.toUpperCase()))
            }
        }
        


    }
</script>
<style scoped>
  

 
</style>
