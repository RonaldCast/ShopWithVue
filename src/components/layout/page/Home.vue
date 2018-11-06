<template>
  <section>
    <section class="banner-home " >
      <div class="container--banner cover--black">

        <div>
          <div class="contianer--img">
            <img src="src/assets/collageInicio1.jpg" alt="banner">
          </div>
        </div>

        <div>
          <div class="contianer--img">
            <img src="src/assets/collageInicio8.jpg" alt="banner">
          </div>
        </div>

        <div>
          <div class="contianer--img">
            <img src="src/assets/collageInicio3.jpg" alt="banner">
          </div>
        </div>

        <div>
          <div class="contianer--img">
            <img src="src/assets/collageInicio4.jpg" alt="banner">
          </div>
        </div>

        <div>
          <div class="contianer--img">
            <img src="src/assets/collageInicio5.jpg" alt="banner">
          </div>
        </div>

        <div>
          <div class="contianer--img">
            <img src="src/assets/collageInicio6.jpg" alt="banner">
          </div>
        </div>

        <div>
          <div class="contianer--img">
            <img src="src/assets/collageInicio7.jpg" alt="banner">
          </div>
        </div>

      </div>
      <div class="notice">
          <h2>Technoser</h2>
          <p>El lugar donde puedes encontrar la computadora ideal</p>
      </div>
    </section>

   <offerproduct></offerproduct>

  </section>
</template>
<script>
  import offerproduct from '../OfferProduct.vue'

  export default {
    components:{offerproduct}
  }
</script>

<style scoped>
  section{
    position: relative;
  }
  div.container--banner{
    height: 60vh;
    background:red;
    display:grid;
    grid-template-columns: repeat(9,.5fr);
    grid-template-rows: repeat(2, minmax(200px,max-content));
  }
  div.contianer--img{
    width: 100%;
    height: 100%;
  }
  div.container--banner > div > div > img{
    width:100%;
     height: 100%;
    object-fit:cover; 
  }

  div.notice{
    display:flex;
    flex-direction: column;
    justify-content: center;
    align-content: center;
    position:absolute;
    top:0;
    bottom:0;
    text-align: center;
    width: 100%;
    height:100%;
    color:var(--color-white);
    font-size: var(--font--title)
  }
  .notice > h2{
    font-size: 2.3rem;
    
  }


  .container--banner >div:nth-child(1){
    background: rgb(94, 0, 128);
    grid-column: 1/3;
  }
  .container--banner >div:nth-child(2){
    background:yellow;
    grid-column: 3/6;
  }

   .container--banner >div:nth-child(3){
    background: gold;
    grid-column: 6/8;
  }
  .container--banner >div:nth-child(4){
    background: purple;
    grid-column: 8/10;
  }
  .container--banner >div:nth-child(5){
    background: purple;
    grid-column: 1/4;
  }
  .container--banner >div:nth-child(6){
    background: rgb(0, 128, 102);
    grid-column: 4/6;
  }
  .container--banner >div:nth-child(7){
    background: gray;
    grid-column: 6/10;
  }


</style>
