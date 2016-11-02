const should = require('should')
const app = require('../src/app.js')
const io = require('socket.io-client')

let socket

describe('app.js', () => {
  describe('#newMessage', () => {
    it('Try to send message', () => {
      const data = {
        nickname: "Luchanso",
        msg: "Hello World"
      }

      let result = app.newMessage(data)

      result.should.be.have.property('nickname')
        .which.is.a.String()
      result.nickname.should.be.eql(data.nickname)

      result.should.be.have.property('msg')
        .which.is.a.String()
      result.msg.should.be.eql(data.msg)

      app.msgs.length.should.be.eql(1)
      app.msgs = []
    })
  })

  describe('#getChatHistory', () => {
    it('Check last message', () => {
      for (let i = 0; i < app.historyLength + 1; i++) {
        let data = {
          nickname: 'Luchanso',
          msg: i.toString()
        }

        app.newMessage(data)
      }

      let result = app.getChatHistory()

      result.should.be.Array()
      result.length.should.be.eql(app.historyLength)
      result[app.historyLength - 1].msg.should.be.eql('1')
    })
  })
})
