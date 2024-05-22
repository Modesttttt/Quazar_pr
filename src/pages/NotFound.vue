<template>
    <div class="not-found">
      <h2>404 - Страница не найдена</h2>
      <img src="../cat.gif" alt="   ">
      <p>К сожалению, запрашиваемая вами страница не существует.</p>
      <router-link to="/" class="back">Вернуться на главную</router-link>
    </div>
  </template>
  
  <script>
  export default {
    name: 'NotFound'
  }
  </script>
  
  <style scoped>
  .not-found {
    text-align: center;
    margin-top: 50px;
  }
  .not-found h2 {
    font-size: 32px;
    color: #f00;
  }
  .not-found p {
    font-size: 18px;
    color: #333;
    margin-bottom: 20px;
  }
  .back {
    text-decoration: none;
  }
  </style>