<template>
    <div class="sidebar">
      <ul>
        <li><router-link to="/">Главная</router-link></li>
        <li><router-link :to="{name:'EmployeeList'}">Список сотрудников</router-link></li>
        <li><router-link :to="{name:'AddEmployee'}">Добавить сотрудника</router-link></li>
        <li><router-link :to="{name:'FiredEmployees'}">Уволенные сотрудники</router-link></li>
        <li><router-link :to="{name:'404'}">404</router-link></li>
      </ul>
    </div>
  </template>
  
  <script>
  export default {
    name: 'SidebarMenu',
  };
  </script>
  
  <style scoped>
  .sidebar {
    width: 100%;
    background-color: #2d9c9c;
    margin-bottom: 0px;
    margin-top: 0;
    border-radius: 10px;
  }
  
  ul {
    list-style-type: none;
    padding: 0;
    display: flex; 
    flex-direction:row; 
  }
  
  li {
    padding: 10px;
  }
  
  a {
    text-decoration: none;
    color: #ffffff;
  }
  
  a:hover {
    color: #555;
  }
  </style>