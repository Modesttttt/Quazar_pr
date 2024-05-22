<template>
    <form @submit.prevent="applyFilter" class="filter-form">
      <div>
        <label>ФИО</label>
        <input v-model="filter.name" type="text" />
      </div>
      <div>
        <label>Пол</label>
        <input v-model="filter.gender" type="checkbox" value="0" /> Мужской
        <input v-model="filter.gender" type="checkbox" value="1" /> Женский
      </div>
      <div>
        <label>Организация</label>
        <input v-model="filter.organisation" type="text" />
      </div>
      <div>
        <label>Должность</label>
        <select v-model="filter.job_title">
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
label input[type=checkbox] {
	opacity: 0;
	height: 0;
  margin: auto;
}
input[type=text] {
  width: 100%;
  margin: 0 0;
  box-sizing: border-box;
  border-radius: 15%;
}
.filter-form {
  display: flex;
  width: 1400px;
  flex-wrap: wrap;
  margin: auto auto;
  justify-content: space-around;
}

.form-row {
  margin-bottom: 10px;
}

.checkbox-group {
  display: flex;
  align-items: center;
}

.checkbox-group input[type='checkbox'] {
  margin-right: 5px;
}
</style>
  
  