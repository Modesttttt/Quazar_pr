<template>
    <div class="app-wrapper">
        <img src="../load.gif" v-if="loading" class="loader-image">
    </div>
</template>
<script>

export default{
    name : "LoaderComponent",
    props : ['loading'],
}
</script>
<style>

</style>