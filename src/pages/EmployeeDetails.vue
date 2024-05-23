<template>
  <div>
    <h2>Данные сотрудника</h2>
    <div v-if="!isEditing">
      <p><strong>Имя: </strong> {{ selectedEmployee.name }}</p>
      <p><strong>Дата рождения: </strong> {{ formatDate(selectedEmployee.birth_date) }}</p>
      <p><strong>Должность: </strong>{{ selectedEmployee.job_title }}</p>
      <p><strong>Организация: </strong>{{ selectedEmployee.organisation }}</p>
      <p><strong>Статус: </strong>
        <span v-if="selectedEmployee.fired">уволен</span>
        <span v-else>работает</span>
      </p>
      <img src="../cat3.gif">
      <p></p>
      <button @click="editEmployee">Редактировать</button>
      <button @click="updateFired" v-if="!selectedEmployee.fired">Уволить</button>
    </div>
    <div v-else>
      <p><strong>Имя: </strong> <input v-model="editedEmployee.name" type="text"></p>
      <p><strong>Дата рождения: </strong> <input v-model="editedEmployee.birth_date" type="date"></p>
      <p><strong>Должность: </strong> <input v-model="editedEmployee.job_title" type="text"></p>
      <p><strong>Организация: </strong> <input v-model="editedEmployee.organisation" type="text"></p>
      <p><strong>Статус: </strong> 
        <select v-model="editedEmployee.fired" required>
            <option value="" disabled selected hidden>Статус</option>
            <option value="true">Уволен</option>
            <option value="false">Нет</option>
        </select>
      </p>
      
      <button @click="saveEmployee">Сохранить</button>
      <button @click="cancelEdit">Отмена</button>
    </div>
    <button>
      <router-link :to="{ name: 'EmployeeList' }" class="back">Вернуться назад</router-link>
    </button>
  </div>
</template>

<script>


export default {
  props: ['id', 'employees'],
  data() {
    return {
      editedEmployee: null,
      isEditing: false,
    };
  },
  computed: {
    selectedEmployee() {
      return this.employees.find(employee => employee.id === parseInt(this.id)) || {};
    }
  },
  methods: {
    date(_date) {
      if (!_date) return null;
      const date = new Date(_date * 1000);
      const day = ('0' + date.getDate()).slice(-2);
      const month = ('0' + (date.getMonth() + 1)).slice(-2);
      const year = date.getFullYear();
      return `${year}-${month}-${day}`;
    },
    editEmployee() {
      this.editedEmployee = { ...this.selectedEmployee };
      this.editedEmployee = { ...this.selectedEmployee, birth_date: this.date(this.selectedEmployee.birth_date) };
      this.isEditing = true;
    },
    saveEmployee() {
      const index = this.employees.findIndex(employee => employee.id === this.selectedEmployee.id);
      this.$set(this.employees, index, { ...this.editedEmployee });
      this.isEditing = false;
    },
    cancelEdit() {
      this.editedEmployee = null;
      this.isEditing = false;
    },
    updateFired() {
      const updatedEmployee = { ...this.selectedEmployee, fired: true };
      const index = this.employees.findIndex(employee => employee.id === this.selectedEmployee.id);
      this.$set(this.employees, index, updatedEmployee);
      this.$router.push({ name: 'FiredEmployees' });
    },
    formatDate(timestamp) {
      const date = new Date(timestamp * 1000);
      const day = ('0' + date.getDate()).slice(-2);
      const month = ('0' + (date.getMonth() + 1)).slice(-2);
      const year = date.getFullYear();
      return `${day}.${month}.${year}`;
    },
    
  },
};
</script>

<style>
.back {
  text-decoration: none;
  color: white;
}
button {
  margin: auto auto;
}
.detail {
  font-size: 25px;
  display: flexbox;
}
</style>