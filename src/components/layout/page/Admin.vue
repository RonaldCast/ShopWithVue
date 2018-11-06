<template>
    <section>
       <nav class="contianer--nav--admin">
           <ul class="section--layout">
               <router-link :to="{name:'productos'}" active-class="" exact tag="li">
                  <a>Productos</a> 
               </router-link>
               <router-link :to="{name:'registrar'}" active-class="" exact tag="li">
                   <a>Registrar productos</a>
               </router-link>
               <router-link :to="{name:'ordenes'}" active-class="" exact tag="li">
                   <a>Ordenes</a>
               </router-link>
           </ul>
       </nav>
       <router-view></router-view>
   </section>
</template>
<script>
    
</script>
<style scoped>
    .contianer--nav--admin{
        background: var(--color--gray-form)
    }
    .contianer--nav--admin > ul{
        display: flex;
        justify-content: space-around;
        color: var(--color--pink);
    }
    .contianer--nav--admin > ul > li > a{
        color: var(--color--pink);
    }
</style>