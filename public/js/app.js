var socket = io('/', {transports: ['websocket']});

socket.on('GetChatHistory', function(data) {
  data.forEach(function(item) {
    $('.msgs').prepend(format(item));
  });
});

socket.on('NewMsg', function(data) {
  $('.msgs').append(format(data, data.nickname === $('#nickname').val()));
});

$('#send').click(sendMsg);
$('#msg').on('keyup', function(e) {
  if (e.keyCode === 13) {
    sendMsg()
  }
});

function sendMsg() {
  let nickname = $('#nickname').val();
  let msg = $('#msg').val();

  if (msg.length === 0)     return Materialize.toast('You try to send empty message', 4000);
  if (msg.length >= 1024)   return Materialize.toast('Message too long, maximal length: 1024', 4000);
  if (nickname.length <= 3)  return Materialize.toast('Nickname too short', 4000);

  socket.emit('NewMsg', {
    nickname: nickname,
    msg: msg
  });

  $('#msg').val('')
}

function format(item, isColored) {
  var str = "";

  if (!isColored) str ='<p> [';
  else            str = '<p style="color: blue"> [';

  return str + new Date(item.date).toLocaleTimeString() + '] ' + item.nickname + ' ' + ' > ' + item.msg + '</p>';
}

 socket.emit('GetChatHistory');
