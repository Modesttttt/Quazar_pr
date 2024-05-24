<template>
  <tr>
    <!-- Клик по имени сотрудника открывает его подробности -->
    <td @click="viewEmployeeDetails">{{ employee.name }}</td>
    <td>{{ formatGender(employee.sex) }}</td>
    <!-- Отформатировать дату рождения -->
    <td>{{ formatDate(employee.birth_date) }}</td>
    <td>{{ employee.organisation }}</td>
    <td>{{ employee.job_title }}</td>
    <td>
      <!-- Отображение статуса увольнения -->
      <span v-if="employee.fired">уволен</span>
    </td>
  </tr>
</template>

<script>
import dayjs from 'dayjs';
export default {
  props: {
    id : Number,
    employee: Object
  },
  methods: {
    // Метод для форматирования даты
    formatDate(value) {
      return dayjs(value).format('DD.MM.YYYY');
    },
    // Метод для определения пола
    formatGender(gender) {
      return gender ? 'женский' : 'мужской';
    },
    // Метод для обновления статуса увольнения
    updateFired() {
      this.$emit('update-fired', this.employee);
    },
    // Метод для перехода к подробностям сотрудника
    viewEmployeeDetails() {
      this.$router.push({ name: 'employee-details', params: { id: this.employee.id } });
    },

  }
};
</script>


<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
