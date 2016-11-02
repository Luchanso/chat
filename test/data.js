const should = require('should')
const Data = require('../src/Data.js')

describe('Check Data class', () => {
  describe('#validateNickname', () => {
    it('correct nickname', () => {
      const nick = 'Oleg'

      let result = Data.validateNickname(nick)
      result.should.be.Boolean()
      result.should.be.eql(true)
    })

    it('bad type', () => {
      const nick = []

      let result = Data.validateNickname(nick)
      result.should.be.Boolean()
      result.should.be.eql(false)
    })

    it('bad length', () => {
      const nick = 'Sh3'

      let result = Data.validateNickname(nick)
      result.should.be.Boolean()
      result.should.be.eql(false)
    })
  })

  describe('#existFields', () => {
    it('correct fields', () => {
      const data = {
          nickname: 'Oleg',
          msg: 'Hello World',
          time: (new Date()).toString()
      }

      let result = Data.existFields(data)
      result.should.be.Boolean()
      result.should.be.eql(true)
    })

    it('bad fields', () => {
      const data = {
        nickname: 'Oleg'
      }

      let result = Data.existFields(data)
      result.should.be.Boolean()
      result.should.be.eql(false)
    })
  })

  describe('#validateMessage', () => {
    it('Empty message', () => {
      const msg = ""

      let result = Data.validateMessage(msg)
      result.should.be.Boolean()
      result.should.be.eql(false)
    })

    it('So big message', () => {
      let msg = "Hello"

      for (let i = 0; i < 128; i++) {
        msg += "12345678"
      }

      let result = Data.validateMessage(msg)

      result.should.be.Boolean()
      result.should.be.eql(false)
    })

    it('Correct message', () => {
      const msg = "Hello world"

      let result = Data.validateMessage(msg)
      result.should.be.Boolean()
      result.should.be.eql(true)
    })
  })
})
