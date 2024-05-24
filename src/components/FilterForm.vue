<template>
    <form @submit.prevent="applyFilter" class="filter-form">
      <!-- Поле для ввода ФИО -->
      <div>
        <label>ФИО</label>
        <input v-model="filter.name" type="text" />
      </div>
      <!-- Поле для выбора пола -->
      <div>
        <label>Пол</label>
        <input v-model="filter.gender" type="checkbox" value="0" /> Мужской
        <input v-model="filter.gender" type="checkbox" value="1" /> Женский
      </div>
      <!-- Поле для ввода названия организации -->
      <div>
        <label>Организация</label>
        <input v-model="filter.organisation" type="text" />
      </div>
      <!-- Поле для выбора должности -->
      <div>
        <label>Должность</label>
        <select v-model="filter.job_title" class="select-menu">
          <!-- Варианты выбора должности -->
            <option value="Водитель">Водитель</option>
            <option value="Грузчик">Грузчик</option>
            <option value="Врач">Врач</option>
            <option value="Инженер-Химик">Инженер-Химик</option>
            <option value="Бухгалтер">Бухгалтер</option>
            <option value="Механик">Механик</option>
        </select>
      </div>
      <div>
        <input v-model="filter.isFired" type="checkbox" />
        <label>Уволенные сотрудники</label>
      </div>
  
      <button type="submit">Применить</button>
    </form>
  </template>
  
  <script>
  export default {
    data() {
      return {
        // Объект фильтра с начальными значениями
        filter: {
          name: '',
          gender: [],
          organisation: '',
          job_title: '',
          isFired: false,
        },
      };
    },
    methods: {
      applyFilter() {
       this.$emit('apply-filter', this.filter);
     },
    },
  };
  </script>
  
<style scoped>
.filter-form input {
  margin-top: 30px;
  background: transparent;
  border: 0;
  border-bottom: 2px solid #165a5f;
  color: #fcfcfc;
  font-size: 14px;
  padding: 5px 8px;
  outline: none;
}
label input[type=checkbox] {
	opacity: 0;
	height: 0;
  margin: auto;
}

.filter-form {
  display: flex;
  width: 1500px;
  height: 80px;
  flex-wrap: wrap;
  margin: auto auto;
  justify-content: space-around;
}

.form-row {
  margin-bottom: 0px;
}

.checkbox-group {
  display: flex;
  align-items: center;
}

.checkbox-group input[type='checkbox'] {
  margin-right: 5px;
}

.select-menu {
  display: inline-block;
}
label{
  margin-left: 10px;
  margin-right: 8px;
}
</style>
  
  