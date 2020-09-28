<template>
  <div>
    <input v-model="message" v-if="checkbox">
    <input v-model="checkbox" type="checkbox">
    {{message}}{{xx}}
    <Test v-bind:todos="todos"></Test>
  </div>

</template>

<script>

  import Test from "./Test";
  export default {
    name: 'HelloWorld',
    components: {Test},
    data() {
      return {
        checkbox: false,
        message: 'dww',
        xx: 12,
        todos: [
          { text: '学习 JavaScript' },
          { text: '学习 Vue' },
          { text: '整个牛项目' }
        ]
      }
    }
  }
</script>
