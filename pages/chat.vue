/* IMPLEMENT USERS */
<template>
  <div class="container pt-3">
    <div class="row">
      <div class="users-wrap col-3 m-3 d-none d-md-block bg-black rounded">
        <div class="col-12 mt-3 p-0">Users</div>
      </div>
      <div class="chat-wrap col-12 col-md-8 m-3 ml-auto bg-black rounded">
        <div ref="chat" class="chat col-12 mt-3 bg-black-accent-darker rounded">
          <div v-for="m in messages" :key="m.id" class="row">
            <div
              class="col-auto m-3 p-2"
              :class="{'msg-right ml-auto': m.sentByMe, 'msg-left': !m.sentByMe}"
            >{{ m.message }}</div>
          </div>
        </div>
        <form @submit.prevent="sendMsg()">
          <div class="chat-input row m-3 rounded">
            <div class="col-8 col-md-10 p-0 bg-black-accent">
              <input v-model="message" class="h-100 w-100" type="text" placeholder="...">
            </div>
            <div class="col-4 col-md-2 p-0 bg-green">
              <input class="h-100 w-100" type="submit" value="Send">
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import io from 'socket.io-client'
const uuidv4 = require('uuid/v4')

export default {
  data() {
    return {
      username: this.$store.state.username,
      message: null,
      messages: [],
      socket: io('localhost:3000')
    }
  },
  created() {
    if (this.username === null || this.username === '') {
      this.$router.push({
        path: '/'
      })
    }
  },
  mounted() {
    this.socket.on('MESSAGE', data => {
      data.sentByMe = data.username === this.username
      this.messages = [...this.messages, data]
    })
  },
  methods: {
    sendMsg() {
      if (this.message === null || this.message === '') {
        return
      } else {
        this.socket.emit('SEND_MESSAGE', {
          id: uuidv4(),
          user: this.username,
          message: this.message
        })
        this.message = null
      }
    }
  }
}
</script>
