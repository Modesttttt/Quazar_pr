<template>
    <div v-if="showForm" class="wrapper">
      <h2>Добавление нового сотрудника</h2>
      <form @submit.prevent="addEmployee">

        <input v-model="newEmployee.name" type="text" placeholder="Имя" required>
        <select v-model="newEmployee.sex" required>
            <option value="" disabled selected hidden>Выберите пол</option>
            <option value="0">Мужской</option>
            <option value="1">Женский</option>
        </select>
        <input v-model="newEmployee.birth_date" type="date" required>
        <input v-model="newEmployee.organisation" type="text" placeholder="Организация" required>
        <input v-model="newEmployee.job_title" type="text" placeholder="Должность" required>
        <select v-model="newEmployee.fired" required>
            <option value="" disabled selected hidden>Статус</option>
            <option value="true">Уволен</option>
            <option value="false">Нет</option>
        </select>

   
        <button type="submit">Добавить</button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      showForm: Boolean, 
    },
    data() {
      return {
        newEmployee: {
          name: '',
          sex: 0,
          birth_date: '',
          organisation: '',
          job_title:'',
          fired:false

        },
      }
    },
    methods: {
      addEmployee() {
        this.$emit('employee-added', this.newEmployee); 
        this.newEmployee = {}; 
      }
    }
  };
  </script>
  
<style scoped>
.err{
  color: #d03939;
}
.wrapper{
  margin-bottom: 20px;
  margin-top: 20px;
  margin-left: auto;
  margin-right: auto;
  width: 950px;
  height: 200px;
  border-radius: 50px;
  padding: 20px;
  background-color: #1f0f24;
  text-align: center;
  color: #fff;
}
.wrapper h1{
  margin-top: 50px;
}

.wrapper p {
  margin-top: 20px;
}

.wrapper input {
  margin-top: 30px;
  background: transparent;
  border: 0;
  border-bottom: 2px solid #110813;
  color: #fcfcfc;
  font-size: 14px;
  padding: 5px 8px;
  outline: none;
}

.wrapper input:focus {
  border-bottom-color: #6e2d7d;
}

.wrapper button {
  margin-top: 30px;
  background: #e3bc4b;
  color: #fff;
  border-radius: 10px;
  border: 2px solid #b99935;
  padding: 10px 15px;
  margin-left: 20px;
  cursor: pointer;
  transition: transform 500ms ease;
}

.wrapper button:hover {
  transform: scale(1.1) translateY(-5px);
}
</style>
  