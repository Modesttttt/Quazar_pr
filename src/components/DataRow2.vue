<template>
    <tr :id="`employee-${medexam.employeeID}`">
      <td>{{ getDoctorName(medexam.doctor_name) }}</td>
      <td @click="viewEmployeeDetails">{{ getEmployeeName(medexam.employeeID) }}</td>
      <td>{{ medexam.temperature }}</td>
      <td>{{ medexam.pressure_systolic }}</td>
      <td>{{ medexam.pressure_diastolic }}</td>
    </tr>
  </template>
  
  <script>
  export default {
    props: {
      medexam: Object,
    },
    methods: {
      getDoctorName(name) {
        return name;
      },
      getEmployeeName(id) {
        return this.$parent.employees.find(employee => employee.id === id).name;
      },
      viewEmployeeDetails() {
      this.$router.push({ name: 'employee-details', params: { id: this.medexam.id } });
      }
    }
  }
  </script>
  