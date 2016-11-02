'use strict'

const express = require('express')
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)

const Data = require('./data')
const historyLength = 10

let msgs = []

app.set('port', process.env.PORT || 8080)
app.use(express.static(__dirname + '/../public'))

io.on('connection', (socket) => {
  socket.on('NewMsg', (data) => {
    let result = newMessage(data)

    if (result instanceof Error) {
      socket.emit('Error', result)
    } else {
      io.emit('NewMsg', result)
    }
  })

  socket.on('GetChatHistory', () => {
    let msgs = getChatHistory()
    socket.emit('GetChatHistory', msgs)
  })
})

function getChatHistory() {
  return msgs
}

function newMessage(data) {
  if (!Data.existFields(data))                return new Error('Broken data')
  if (!Data.validateMessage(data.msg))        return new Error('Message not correct')
  if (!Data.validateNickname(data.nickname))  return new Error('Nickname not correct')

  data.msg = Data.escapeHtml(data.msg)
  data.nickname = Data.escapeHtml(data.nickname)

  data = {
    msg: data.msg,
    nickname: data.nickname,
    date: Date.now(),
  }
  msgs.unshift(data)

  if (msgs.length > historyLength) {
    const index = historyLength
    const count = 1

    msgs.splice(index, count)
  }

  return data
}

server.listen(app.get('port'), () => {
  console.log(`Run on 0.0.0.0:${app.get('port')}`)
})

module.exports = {
  msgs,
  newMessage,
  historyLength,
  getChatHistory,
}
