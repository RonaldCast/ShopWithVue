<template>
   <section>
        <div class="footer--network">
            <div class="section--layout--padding--topOut">
                <ul>
                  <li><a href="#" target="_blank">F</a></li>
                  <li><a href="#" target="_blank">I</a></li>
                  <li><a href="#" target="_blank">T</a></li>
                </ul>
            </div>
              
        </div>
        <div class="footer--navegation">
             <div class="section--layout">
                <div>
                    <navegation></navegation>
                </div>
                <div>
                    <p>Technoser | Copyright 2018</p>
                </div>
            </div>
        </div>
   </section>
</template>
<script>
import navegation from "./Menu.vue";
export default {
  components: { navegation }
};
</script>
<style scoped>
    .footer--network > div.section--layout--padding--topOut > ul li{
        height:27px;
        width: 27px;
        display:flex;
        justify-content: center;
        align-items: center;
        margin: 10px;
        border-radius: 100%;
        background:var(--color-white);   

    }
    .footer--network > div.section--layout--padding--topOut > ul li:nth-child(1){
        background:var(--color--facebook);  
    }
    .footer--network > div.section--layout--padding--topOut > ul li:nth-child(2){
        background:var(--color--instagram);  
    }
    .footer--network > div.section--layout--padding--topOut > ul li:nth-child(3){
        background:var(--color--twitter);  
    }
    .footer--network > div.section--layout--padding--topOut > ul li a{
        padding: 5px;
        color: var(--color-white);
         
    }
    .footer--network > div.section--layout--padding--topOut > ul {
        display:flex;
        justify-content: center;
    }


    .footer--network{
        background: var(--color--price);
    }
    .footer--navegation{
        background: var(--color-gray);
    }
    .footer--navegation > div.section--layout div:nth-child(1){
        padding-top:30px;
        padding-bottom:30px;
        border-bottom: 2px solid var(--color--gray--clear);
    }
    .footer--navegation > div.section--layout div:nth-child(2){
        text-align-last: center;
        color:var(--color--gray--clear);
        padding: 15px 0px; 
    }

</style>
