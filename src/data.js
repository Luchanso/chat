class Data {
  static existFields(data) {
    return !!data.nickname && !!data.msg
  }

  static validateNickname(nickname) {
    return nickname
      && typeof nickname === 'string'
      && nickname.length > 3
  }

  static validateMessage(msg) {
    return typeof msg === 'string'
      && msg.length !== 0
      && msg.length < 1024
  }

  static escapeHtml(unsafe) {
      return unsafe
           .replace(/&/g, "&amp;")
           .replace(/</g, "&lt;")
           .replace(/>/g, "&gt;")
           .replace(/"/g, "&quot;")
           .replace(/'/g, "&#039;");
   }
}

module.exports = Data
