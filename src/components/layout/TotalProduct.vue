<template>
    <section>
        <div class="container--total--product">
            <div>
                <p><span>Sub-total: </span><span>RD${{calcularSubtotal}}</span></p>
            </div>
            <div>
                <p><span>ITBIS: </span><span>RD${{calcularImpuesto}}</span></p>
            </div>
            <div>
                <p><span>Total: </span><span>RD${{calcularTotal}}</span></p>
            </div>
        </div>
        <template v-if="productoInfo.length != 0">
            <div class="container--btnBuy">
                <button class="btn btn--add" @click="realizarComp">Realizar Compra</button>
            </div>
        </template>
    </section>
</template>

<script>
    import firebase from 'firebase'
    export default {
        data(){
            return{
                subTotal:0,
                ITBIS: 0.18,
                total: 0,
                impuestoPagar: 0,
                productoInfo: [],
                userUid: null,
                userInfo: null

            }
        }, 
        created() {
            this.consultaProducto()
        },
        methods:{
            consultaProducto(){
                firebase
                    .auth()
                    .onAuthStateChanged((user) => {
                        if(user){
                            this.userUid = user.uid
                            this.userInfo = user
                            console.log(user.uid)
                            firebase
                                .database()
                                .ref(`user/${user.uid}/datos/carrito`)
                                .on('value', snapshot => {
                                    this.guadarInfoProduct(snapshot.val())
                                })
                        }
                    })
            },
            guadarInfoProduct(producto){
                this.productoInfo = []
                for (const key in producto) {
                   this.productoInfo.push({ 
                       precioTotal: parseFloat(producto[key].precioTotal)
                   })
                }
            },
            disminuirInventario(listaProducto){
                for (let key in listaProducto) {
                    let cantidadInv = 0;
                    let id = listaProducto[key].key
                    let tipo = listaProducto[key].tipo
                    firebase
                        .database()
                        .ref(`producto/${tipo}/${id}/data`)
                        .on('value', snap =>{
                            cantidadInv = snap.val().cantidad
                        })
                    let calcular = parseInt(cantidadInv) - parseInt(listaProducto[key].cantidad)
                    firebase
                    .database()
                    .ref(`producto/${tipo}/${id}/data`)
                    .update({
                        cantidad: calcular
                    })
                }
                 
            },
            realizarComp(){
               let date = new Date()
               let fechaCompleta = `${date.getUTCDate()}/${date.getMonth() + 1}/${date.getUTCFullYear()}`
               let hora = `${date.getHours()}:${date.getMinutes()}`
               let datosProduct = {}
               let db = firebase.database
               let datosUser = {} 
                let that = this 
                    db().ref(`user/${this.userUid}/datos/carrito`)
                    .on('value', (snapshot) => {
                        datosProduct = snapshot.val()
                    })
                    
                   

                     db().ref(`user/${this.userUid}/datos/historiaCompra`)
                        .push({
                            
                            datosProduct,
                            fecha: fechaCompleta,
                            hora: hora,
                            totalCompra:{
                                subTotal:this.subTotal,
                                total: this.total,
                                impuestoPagar: this.impuestoPagar,
                            }

                    }).then(function() {
                        //alert: producto pedin
                        db().ref(`user/${that.userUid}/datos/`)
                            .on('value', (snap) => {
                                datosUser = {
                                    
                                    nombre: snap.val().nombre,
                                    apellido: snap.val().apellido,
                                    email: that.userInfo.email,
                                    cedula: snap.val().cedula,
                                    telefono: snap.val().telefono,
                                }
                            })
                        
                        db().ref(`historialPedido/pendiente/`).push({
                                datosProduct,
                                nombre: datosUser.nombre,
                                apellido: datosUser.apellido,
                                email: datosUser.email,
                                cedula: datosUser.cedula,
                                telefono: datosUser.telefono,
                                fecha: fechaCompleta,
                                hora: hora,
                                totalCompra:{
                                    subTotal:that.subTotal,
                                    total: that.total,
                                    impuestoPagar: that.impuestoPagar,
                                    
                                }
                        })
                        db().ref(`user/${that.userUid}/datos/carrito`).remove()
                    })
                
                 this.disminuirInventario(datosProduct)

                 alert("La compra hacido realizada, nos comunicaremos con usted para más información")  
                 window.location.reload()
               
            },
       
        },
        computed:{
            calcularSubtotal(){
                let count = 0 
                for (const key in this.productoInfo) {
                    count += this.productoInfo[key].precioTotal
                }
                this.subTotal = count
                return count
            },
            calcularImpuesto(){
                let calcular = this.subTotal * this.ITBIS
                calcular = calcular.toFixed(2)
                this.impuestoPagar = calcular
                return calcular
            },
            calcularTotal(){
                let calcular = parseFloat(this.subTotal) + parseFloat(this.impuestoPagar)
                calcular = calcular.toFixed(2)
                this.total = calcular
                return calcular
            }
        }
    }
</script>
<style scoped>
    .container--total--product{
        display:flex;
        justify-content: space-between;
        align-content: center;
        padding: 15px;
        margin-top:20px; 
         margin-bottom:20px;
        -webkit-box-shadow: var(--shodow--form);
        -moz-box-shadow: var(--shodow--form);
        box-shadow: var(--shodow--form);
       
        
    }

    .container--total--product > div > p > span:nth-child(1){
        font-weight: 400;
    }
    .container--total--product > div > p > span:nth-child(2){
        color: var(--color--gray-priceTotal)
    }

    .container--btnBuy{
       text-align: end;
    }
</style>
