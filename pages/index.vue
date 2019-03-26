<template>
  <div class="container pt-3">
    <div class="row">
      <div class="users-wrap col-3 m-3 d-none d-md-block bg-black rounded">
        <div class="col-12 mt-3 p-0">Users</div>
      </div>
      <div class="chat-wrap col-12 col-md-8 m-3 ml-auto bg-black rounded">
        <div ref="chat" class="chat col-12 mt-3 bg-black-accent-darker rounded">
          <div v-for="message in messages" :key="message.id" class="row">
            <div
              class="col-auto m-3 p-2"
              :class="{'msg-right ml-auto': message.me, 'msg-left': !message.me}"
            >{{ message.text }}</div>
          </div>
        </div>
        <form @submit.prevent="sendMsg()">
          <div class="chat-input row m-3 rounded">
            <div class="col-8 col-md-10 p-0 bg-black-accent">
              <input v-model="myMessageText" class="h-100 w-100" type="text" placeholder="...">
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

export default {
  data() {
    return {
      myId: null,
      myMessageText: null,
      messages: [],
      socket: io('localhost:3000')
    }
  },
  methods: {
    sendMsg() {
      const message = {
        id: this.myId,
        text: this.myMessageText,
        me: true
      }
      if (this.myMessageText === null || this.myMessageText === '') {
        return
      } else {
        this.messages.push(message)
        this.myMessageText = null
        this.$refs.chat.scrollTop = this.$refs.chat.clientHeight
      }
    }
  },
  created() {
    this.myId = Math.random()
  }
}
</script>

<style>
</style>
