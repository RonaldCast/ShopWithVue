<template>
    <section>
        <div class="section--layout--lg">
            <header>
                <h1 class="h1--title">Ordenes</h1>
            </header>
            <nav class="contianer--btnOrders">
                <button class="btn " @click="seleccionado = 'notdispatched'">Lista de pedidos</button>
                <button class="btn " @click="seleccionado = 'dispatched'">Pedidos despachados</button>
            </nav>
            <component :is="seleccionado"></component>
        </div>
        
    </section>
</template>
<script>
    import dispatched from '../Dispatched'
    import notdispatched from '../NotDispatched'
    export default {
        components:{dispatched, notdispatched},
        data(){
            return{
                seleccionado: notdispatched
            }
        }
    }
</script>
<style scoped>
    .contianer--btnOrders{
        padding: 20px 0px
    }
</style>
