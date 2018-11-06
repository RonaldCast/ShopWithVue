<template>
    <section>
        <header>
            <h2 class="h2--title">Lista de pedidos</h2>
        </header>
        <template v-for="ped in pedidos"> 
            <article :key="ped.id" class="container--pedidos">
                    <header>
                        <div>
                            <button class="btn btn--add" @click="despachar(ped.datos.key)">Despachar</button>
                        </div>
                        <div class="pedidos--info">
                            <div>
                                <h3 class="h3--title">Datos del clientes</h3>
                                <div>
                                    <p><span>Nombre:</span> <span>{{ped.datos.nombre}} {{ped.datos.apellido}}</span></p>
                                    <p><span>Teléfono:</span> <span>{{ped.datos.telefono}}</span></p>
                                    <p><span>Email:</span> <span>{{ped.datos.email}}</span></p>
                                    <p><span>Cédula:</span> <span>{{ped.datos.cedula}}</span></p>
                                </div>
                            </div>
                            <div>
                                <h3 class="h3--title">Datos de la compra</h3>
                                <div>
                                    <p><span>Id:</span> <span>{{ped.datos.key}}</span></p>
                                    <p><span>Fecha pedido:</span> <span>{{ped.datos.fecha}}</span></p>
                                    <p><span>SubTotal:</span> <span>RD${{ped.datos.subTotal}}</span></p>
                                    <p><span>ITBIS:</span> <span>RD${{ped.datos.impuesto}}</span></p>
                                    <p><span>Total:</span> <span>RD${{ped.datos.total}}</span></p>
                                </div>
                            </div>
                        </div>
                    </header>
                    <div>
                        <h3 class="h3--title">Detalles Productos</h3>
                    </div>
                    <div class="contianer--table">
                        <table class="table--pedidos">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Modelo</th>
                                    <th>Tipo</th>
                                    <th>Candidad</th>
                                    <th>Precio Ud RD$</th>
                                    <th>Total RD$</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="prod in ped.datosProducto" :key="prod.key">
                                    <td>{{prod.id}}</td>
                                    <td>{{prod.modelo}}</td>
                                    <td>{{prod.tipo}}</td>
                                    <td>{{prod.cantidad}}</td>
                                    <td>{{prod.precioUd}}</td>
                                    <td>{{prod.precioTotal}}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                
            </article>
        </template>  
    </section>
</template>
<script>
    import firebase from 'firebase'
    export default {
        data(){
            return{
                pedidos: []
            }
        },
        created() {
             this.consultaPedidos()
        },
        methods:{
            consultaPedidos(){
                firebase
                    .database()
                    .ref('historialPedido/pendiente')
                    .on('value', (snap) =>{
                        this.recorrerPedidos(snap.val())
                    })
            },

            recorrerPedidos(ped){
                this.pedidos = []

                for (const key in ped) {
                    let datos = {}
                    datos = {
                        key:key,
                        nombre: ped[key].nombre,
                        apellido: ped[key].apellido,
                        telefono: ped[key].telefono,
                        email: ped[key].email,
                        cedula: ped[key].cedula,
                        fecha:ped[key].fecha,
                        impuesto:ped[key].totalCompra.impuestoPagar,
                        subTotal:ped[key].totalCompra.subTotal,
                        total:ped[key].totalCompra.total,
                    }

                    let productos = ped[key].datosProduct
                    let datosProducto = []
                    for (const prod in productos) {
                       datosProducto.push({
                           
                           id: productos[prod].key,
                           modelo: productos[prod].modelo,
                           tipo: productos[prod].tipo,
                           precioUd: productos[prod].precioUnidad,
                           precioTotal: productos[prod].precioTotal,
                           cantidad:productos[prod].cantidad,

                       })
                    } 
                    this.pedidos.push({
                        datos,
                        datosProducto
                    })
                }
            },
            despachar(key){
                let date = new Date()
                let fechaCompleta = `${date.getUTCDate()}/${date.getMonth() + 1}/${date.getUTCFullYear()}`
                let hora = `${date.getHours()}:${date.getMinutes()}`
                let datos = {}
                firebase
                    .database()
                    .ref(`historialPedido/pendiente/${key}`)
                    .once('value', (snap) => {
                        datos = snap.val()
                    })
                firebase
                    .database()
                    .ref(`historialPedido/despachado/`)
                    .push({
                        fechaCompleta,
                        hora,
                        key,
                        datos, 
                    }).then(() => {
                        //alerta
                         firebase
                            .database()
                            .ref(`historialPedido/pendiente/${key}`)
                            .remove()
                    })
            }
        }
    }
</script>
<style scoped>
    .container--pedidos{
        
        -webkit-box-shadow: var(--shodow--form);
        -moz-box-shadow: var(--shodow--form);
        box-shadow: var(--shodow--form);
        background:var(--color--gray-form);
        padding: 15px;
        margin-top:15px;
    }
    .container--pedidos > header > div:nth-child(1){
        text-align:end;
    }
    .pedidos--info p > span:nth-child(1){
       font-weight: 500;
    }
    .contianer--table{
        overflow-x: scroll;
    }
    .table--pedidos{
        border: 1px solid rgb(46, 45, 45);
        min-width: 700px;
        width: 100%;
        border-spacing: 0;
        
    }
    .table--pedidos td{
        border: 1px solid rgb(46, 45, 45);
        border: 1px solid #000;
        border-collapse: collapse;
        padding: 10px;
    }
    .table--pedidos > thead{
        background: var(--color--blue-dark);
    }
    .table--pedidos > thead > tr th{
        padding: 10px;
        font-weight: 450;
        color: var(--color-white)

    }

</style>
