<template>
    <ol>
        <li v-for="todo in todos" v-bind:key="todo.text">
            {{ todo.text }}
        </li>
    </ol>
</template>

<script>
    export default {
        name: "test",
        props: {
            todos:{
                type: Array,
                required: true
            }
        }
    }
</script>

<style scoped>

</style>
