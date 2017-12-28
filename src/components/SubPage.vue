<template>
  <div class="sub-page">
    <h1>提交成功</h1>
    <h2>{{ msg }}</h2>
  </div>
</template>

<script>
export default {
  name: 'SubPage',
  data () {
    return {
      msg: '您已注册成功，请注意查收短信'
    }
  }
}
</script>

<style scoped>

</style>