<template>
  <div id="app">
    <header-title></header-title>
    <navegation></navegation>
    <router-view></router-view>
    <footerpage></footerpage>
  </div>
</template>

<script>


 import navegation from './components/layout/Menu.vue'
 import headerTitle from './components/layout/HeaderTitle.vue'
 import footerpage from './components/layout/Footer.vue'
    export default {
        components:{navegation, headerTitle, footerpage},
        data(){
          return{

          }
        }
    }

</script>

<style>
 html{
   font-family: 'Open Sans'
 }
  :root{
    /*color generales */

    --color-gray:#37414C;
    --color-white: #fff;
    --color--blue: #4283C4;
    --color--pink: #EC6161;
    --color--pink--dark: rgb(216, 85, 85);
    --color--price:#607D8B;
    --color--blue-dark: rgb(64, 124, 184);
    --color--gray--details: #6D7175;
    --color--gray--details--dark: rgb(96, 100, 103);
    --color--green--add: #4CAF50;
    --color--green--add--dark: rgb(60, 154, 63);
    --color--instagram:#E4405F;
    --color--facebook:#3B5999;
    --color--twitter:#55ACEE;
    --color--gray--clear:#838689;
    --color--gray-form:#F1F1F1;
    --color--gray--placeholder:rgba(208, 208, 208, 0.5);
    --color--blue--dark--label: #37414C;
    --color--gray-priceTotal:#C2C0C0;
    

    /*Mediadas*/
    --section--padding: 10px 15px;
    --section--padding--lg: 20px 20px;
    --section--width--lg: 80%;
    --section--width--ms: 100%;
    --section--max-width: 1000px;
    --btn--padding: 10px 10px; 
    --font--text--md: 0.94rem;
    --font--title:1.2rem;
    --font--title--h2:1.17rem;
    --font--title--h3:1.1rem;
    --font--title--padding: 15px 15px;
    --btn--padding-md:7px 10px;
    --btn--padding-lg:10px 20px;
   
     /* shodow */
     --shodow--form:  0px 0px 10px -2px rgba(0,0,0,0.5);
  }
 
   *, *::before, *::after{
    margin:0;
    padding:0;
    box-sizing: border-box;
  }

  a{
    text-decoration: none;
  }
  li{
    list-style: none;
  }
   p{
    font-size: var(--font--text--md)
  }

  .error{
    font-size: 0.9rem;
    color:var(--color--pink);
  }
   .btn{
     text-decoration:none;
     border:none;
     padding: var(--btn--padding-md);
     cursor: pointer;
     border-radius:5px;
     color:var(--color-white);
     background:var(--color--blue);
     outline: none;
     font-size:0.85rem;

   }
  .price{
        font-size: 0.9em;
        color: var(--color--price);
        font-weight: bold;
    }
   .container--shadow{
      -webkit-box-shadow: var(--shodow--form);
      -moz-box-shadow: var(--shodow--form);
      box-shadow: var(--shodow--form);
   }
   .btn-lg{
     padding: var(--btn--padding-lg);
   }
   .btn:hover{
     transition: all 0.2s ease;
     background: var(--color--blue-dark);
   }
   .btn--details{
     background: var(--color--gray--details);
   }
    .btn--details:hover{
     background: var(--color--gray--details--dark);
   }

     .btn--add{
     background: var(--color--green--add);
   }
    .btn--add:hover{
     background: var(--color--green--add--dark);
   }
   .btn--delete{
     background: var(--color--pink);
   }
    .btn--delete:hover{
     background: var(--color--pink--dark);
   }


  .h1--title, 
  .h1--title--pink{
    font-family: 'Open Sans regular';
    position: relative;
    font-size: var(--font--title);
    padding: 15px 15px 10px 0px;
    font-weight: 500;
    
  }
  .h1--title::after, 
  .h1--title--pink::after{
    content: '';
    position: absolute;
    bottom:0;
    left: 0;
    right: 0;
    width: 100%;
    height: 5px;
    background:var(--color--blue);
  }
  .h1--title--pink::after{
     background:var(--color--pink);
  }

  .h2--title{
    font-size: var(--font--title--h2);
    color: var(--color-gray);
    font-weight: 500;
    padding: 10px 0px;
  }

  .h3--title, .h3--title--gray{
    font-size: var(--font--title--h3);
    color: var(--color--blue);
    font-weight: 500;
    padding: 10px 0px;
  }

  .h3--title--gray{
    color: var(--color--gray--details);
  }
  

  .cover--black::before{
    content: "";
    position: absolute;
    width:100%;
    height:100%;
    background:rgba(0, 0, 0,0.4)
  }
  .section--layout--lg{
      padding: var(--section--padding--lg);
      width: var(--section--width--lg);
      max-width: var(--section--max-width);
      margin: 0 auto;
  }
  .section--layout{
    padding: var(--section--padding);
    width: var(--section--width--lg);
    max-width: var(--section--max-width);
    margin: 0 auto;
  }
  .section--layout--padding--topOut{
    padding: 0 15px;
    width: var(--section--width--lg);
    max-width: var(--section--max-width);
    margin: 0 auto;
  }
  .form--style{
    -webkit-box-shadow: var(--shodow--form);
    -moz-box-shadow: var(--shodow--form);
    box-shadow: var(--shodow--form);
    background:var(--color--gray-form);
    margin-top: 40px;
    margin-bottom:40px; 
  }
  .input--text{
    padding:10px 5px 10px 0px;
    width:100%;
  }
  .input--text > label{
    font-size: var(--font--text--md) ;
    color:var(--color--blue--dark--label);
    
  }
  .input--text > input[type="text"],
  .input--text > input[type="number"],
  .input--text > input[type="search"],
  .input--text > input[type="email"],
  .input--text > input[type="password"]{
    margin-left:5px;
    padding:10px 5px;
    border: 1px solid var(--color--gray-form);
    border-radius: 5px;
    width:100%;

    
  }
  .input--text > input[type="text"]::-webkit-input-placeholder,
  .input--text > input[type="email"]::-webkit-input-placeholder,
  .input--text > input[type="password"]::-webkit-input-placeholder,
  .input--text > input[type="search"]::-webkit-input-placeholder,
  textarea::-webkit-input-placeholder,{
    color:var(--color--gray--placeholder);
    font-weight: bold;
  }
  .link{
    font-size: 0.72rem;
    text-decoration:underline;
    padding:2px;
    cursor: pointer;
    font-weight: 500;
    color: var(--color--blue--dark--label);
    transition: all 0.2s ease-in-out;
  }
  .link:hover{
    color:var(--color--pink);
  }

  .amount--input{
    border:none;
    border-radius: 5px;
    width:60px;
    height: 20px;
    padding: 10px;
    border:1px solid var(--color--gray-form);
        
  }

   .contianer--product{
        display:flex;
        flex-wrap: wrap;
        justify-content:center;
    }
   .header--search{
       background: var(--color--gray-form);
       padding: 20px;
       margin-top:20px;
       margin-bottom:15px;

    }
    .header--search > span{
        font-size: 1rem;
    }
    .header--search > input[type="search"]{
        margin-left:5px;
        padding:7px;
        border: 1px solid var(--color--gray-form);
        border-radius: 5px;
        width: 70%;
    } 
    .header--search > input[type="search"]::-webkit-input-placeholder{
        color:#83868992;
    }
    .not--found{
        margin:50px;
        height: 500px;
    }
   .not--found > h1{
       color:rgb(211, 211, 211);

       
   }

</style>
