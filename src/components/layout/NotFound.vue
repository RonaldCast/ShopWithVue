<template>
    <section class="section--layout--lg error--found">
        
        <h1>Error 404, página no encontrada</h1>
      
    </section>
</template>
<script>
    
 import navegation from './Menu.vue'
 import headerTitle from './HeaderTitle.vue'
 import footerpage from './Footer.vue'
    export default {
        components:{navegation, headerTitle, footerpage},
        data(){
          return{

          }
        }
    }
</script>
<style scoped>
    .error--found{
        height: 50vh;
    }
</style>

