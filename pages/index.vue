<template>
  <div class="container pt-3">
    <div class="row">
      <div class="col-10 col-md-6 mx-auto text-center">
        <form @submit.prevent="submit()">
          <input v-model="username" type="text" maxlength="16" placeholder="Type your username">
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: null
    }
  },
  methods: {
    submit() {
      if (this.username === null || this.username === '') {
        return
      } else {
        this.$router.push({
          path: '/chat'
        })
        this.$store.commit('setUsername', this.username)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
input {
  border-bottom: 1px solid white;
  text-align: center;
}
</style>
