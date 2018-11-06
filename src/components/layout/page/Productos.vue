<template>
   <section class="section--layout--lg">
       <header>
           <h1 class="h1--title--pink">Todo los productos</h1>
       </header>
       <nav >
           <ul class="menu--tipo">
               <li>
                   <span @click="selectTipo('impresora')">Impresora</span>
               </li>
               <li>
                   <span @click="selectTipo('computadora')">Computadora</span>
               </li>
               <li>
                   <span  @click="selectTipo('accesorio')">Accesorio</span>
               </li>
           </ul>
       </nav>

       <div>
           <div class="input--text container--shadow contianer--buscar">
               <input type="search" name="" id="" placeholder="Buscar por modelo" v-model="buscar">
           </div> 
       </div>
       <div>
           <header>
               <h2 class="firtLetteCapital h2--title">{{tipo + "s"}}</h2>
           </header>
           <div class="items--product">
               <div   v-for="producto in fiterProducto " :key="producto.key">
                   <ul>
                       <li><span>Modelo:</span> {{producto.modelo}}</li>
                       <!-- <li><img :src="producto.img" alt=""></li> -->
                       <li :class="[producto.cantidad <= 5 ? 'dangerProduct' : 'succesProduct']"><span>Cantidad:</span > {{producto.cantidad}}</li>
                       <li><span>Precio:</span> {{producto.precio}}</li>
                       <li><button class="btn" @click="editar(producto)">Editar</button></li>
                       <li><button class="btn btn--delete" @click="eliminar(producto)">Eliminar</button></li>
                   </ul>
               </div>
           </div>
       </div>
       <template v-if="editarProducto!= null">
        <div class="edit--product">
            <editarproducto :producto="editarProducto" @ocultar="finalizarAccion"></editarproducto>
        </div>  
       </template>
       
   </section>
</template>
<script>
    import editarproducto from  '../EditProduct.vue'
    import firebase,{ functions } from 'firebase'
    export default {
        components:{editarproducto},
        data(){
            return{
                editarProducto: null,
                productos:[],
                tipo: 'impresora',
                buscar:''
                
            }
        },
        created(){
           this.consultaProducto()

        },
        methods:{
            selectTipo(tipo){
                this.tipo = tipo
                this.consultaProducto()
                
            },
            selectTodos(producto){
                this.productos = []
                for(let key in producto){
                   this.productos.push({
                       key: key,
                       modelo: producto[key].data.modelo,
                       img: producto[key].data.img,
                       precio: producto[key].data.precioVenta,
                       cantidad: producto[key].data.cantidad,
                       tipo: producto[key].data.tipo
                   })

                }
                
            },
            consultaProducto(){
                 firebase
                .database()
                .ref(`/producto/${this.tipo}`)
                .on('value',snapshot => this.selectTodos(snapshot.val()))
            },
            finalizarAccion(valor){
                this.editarProducto = valor
            },
            editar(producto){
                this.editarProducto = producto
                document.getElementsByTagName("html")[0].style.overflow = "hidden";
                window.scrollTo(0,0)
            },
            eliminar(producto){
                if(confirm(`Seguro que quiere eliminar: ${producto.tipo} ${producto.modelo} ${producto.key}`)){
                   firebase 
                    .database()
                    .ref(`/producto/${producto.tipo}/${producto.key}`)
                    .remove()
                   // alert producto eliminado
                   alert("El producto hacido eliminado")
                }
            }

        },
        computed:{
            fiterProducto(){
                return this.productos.filter((prod) => prod.modelo.toUpperCase().includes(this.buscar.toUpperCase()))
                
            }
        }
    }
</script>
<style scoped>
    .edit--product{
        display: flex;
        justify-content: center;
        background:rgba(0,0,0,0.7);
        z-index: 1000;
        position: absolute;
        top:0;
        bottom: 0;
        left:0;
        height: 100%;
        width: 100%;

    }


    .firtLetteCapital{
        text-transform: capitalize
    }
    .contianer--buscar{
        padding:10px;
        border-radius:5px;
    }
    .succesProduct{
        color:green
    }
    .dangerProduct{
        color:red
    }
    .items--product{
        display:flex;
        flex-wrap:wrap;
        justify-content: center;
    }
    .items--product > div{
        background:var(--color--gray-form);
        padding: 15px;
        margin-bottom: 20px;
        width: 90%;

    }.items--product > div > ul{
        display: flex;
        justify-content: space-around;

    }
    .menu--tipo > li {
        display: inline-block;
        cursor: pointer;
        padding: 10px;
        color:var(--color--price);
    }
</style> 