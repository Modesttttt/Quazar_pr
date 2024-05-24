<template>
  <div>
    <h2>Данные сотрудника</h2>
    <!-- Отображение информации о сотруднике, если не в режиме редактирования -->
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
    <!-- Форма редактирования, если в режиме редактирования -->
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
    <!-- Кнопка для возврата к списку сотрудников -->
    <button>
      <router-link :to="{ name: 'EmployeeList' }" class="back">Вернуться назад</router-link>
    </button>
  </div>
</template>

<script>


export default {
  // Прием идентификатора сотрудника и списка сотрудников от родительского компонента
  props: [],
  data() {
    return {
      // Хранилище для отредактированных данных сотрудника
      editedEmployee: null,
      isEditing: false,
      selectedEmployee: null,
    };
  },
  created() {
    this.fetchEmployeeData();
  },

  methods: {
    fetchEmployeeData() {
      const employeeId = this.$route.params.id
      const axios = require('axios')
      axios.get(`http://localhost:3000/employees/${employeeId}`)
      .then((response)=> {
        this.selectedEmployee = response.data;
      })
      .catch((error) => {
        console.error('Ошибка при получении данных:', error);
        this.loading = false;
      });
    },
    // Функция для форматирования даты
    date(_date) {
      if (!_date) return null;
      const date = new Date(_date * 1000);
      const day = ('0' + date.getDate()).slice(-2);
      const month = ('0' + (date.getMonth() + 1)).slice(-2);
      const year = date.getFullYear();
      return `${year}-${month}-${day}`;
    },
    // Функция для редактирования данных сотрудника
    editEmployee() {
      this.editedEmployee = { ...this.selectedEmployee };
      // Форматирование даты рождения
      this.editedEmployee = { ...this.selectedEmployee, birth_date: this.date(this.selectedEmployee.birth_date) };
      // Переключение в режим редактирования
      this.isEditing = true;
    },
    // Функция для сохранения изменений
    saveEmployee() {
        const axios = require('axios')
        axios.put(`http://localhost:3000/employees/${this.selectedEmployee.id}`, this.editedEmployee)
          .then((response) => {
            console.log('Данные успешно обновлены:', response.data);
            this.selectedEmployee = { ...this.editedEmployee };
            this.isEditing = false;
          })
          .catch((error) => {
            console.error('Ошибка при обновлении данных:', error);
          });
    },
    // Функция для отмены изменений
    cancelEdit() {
      this.editedEmployee = null;
      this.isEditing = false;
    },
    // Функция для обновления статуса увольнения
    updateFired() {
      // Создание обновленных данных сотрудника с установленным флагом увольнения
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