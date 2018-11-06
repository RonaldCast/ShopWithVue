<template>
   <section>
       <div class="container--model">
           <div class="container--model--img">
               <img :src="producto.img" alt="">
           </div>
           <div class="container--model--info">
               <p>{{producto.modelo}}</p>
               <p class="price">RD${{evaluarPrecio(producto.precioEspecial, producto.precioVenta, producto.especial)}}</p>
           </div>
           <div class="container--model--btn"> 
               <button class="btn btn--add" @click="addCarro(producto.tipo, producto.key)">Añadir</button>
               <button class="btn btn--details" @click="detalleProd(producto.tipo, producto.key)">Detalle</button>
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
                precioTotal: 0
            }
        },
        methods:{
            addCarro(tipo, key){
                 firebase.auth().onAuthStateChanged((user) =>{
                     
                     if(user)
                     {
                         firebase
                            .database()
                            .ref('user/')
                            .child(`${user.uid}/datos/carrito/`).push({
                                key: key,
                                tipo: tipo,
                                cantidad: 1, 
                                precioTotal: this.precioTotal
                            }).then(() =>{
                                //Alert Producto agregado
                                alert("El producto sea añadido a su carrito")
                                // console.log("Producto agregado")
                            })

                     }
                     else{
                      alert("Debe de iniciar sesión para poder añadir productos a su carrito")
                        this.$router.push('/iniciarsesion')
                     }
                 }) 
                
            },
            detalleProd(tipo, key){
                this.$router.push(`/detalle/${tipo}/${key}`)
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
             }

        }
    }
</script>
<style scoped>
    .container--model{
        width: 250px;
        -webkit-box-shadow: 0px 0px 10px -2px rgba(0,0,0,0.5);
        -moz-box-shadow: 0px 0px 10px -2px rgba(0,0,0,0.5);
        box-shadow: 0px 0px 10px -2px rgba(0,0,0,0.5);
        padding: 20px 15px;
        margin: 20px 25px;
    }
    .container--model--img{
       width: calc(250px - 30px - 20px);
       height: calc(250px - 50px);
       padding-bottom: 10px;
       margin: 0 auto;
    }
    .container--model--info{
        text-align: center;
        border-bottom: 5px solid var(--color--pink);
        padding-bottom: 5px;

    }
    .container--model--info p:nth-child(1){
        font-size: 1rem;
    }

    .container--model--img > img{
        width:100%;
        height: 100%;
        object-fit:fill
    }
    .container--model--btn{
        padding-top:5px;
        text-align: center;
    }
</style>
