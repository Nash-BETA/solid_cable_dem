import consumer from 'channels/consumer'

const chatChannel = consumer.subscriptions.create('ChatChannel', {
  received(data) {
    const messages = document.getElementById('messages')
    const div = document.createElement('div')
    div.textContent = data.message
    messages.appendChild(div)
    messages.scrollTop = messages.scrollHeight
  }
})

document.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('send-btn')
  const input = document.getElementById('message-input')
  btn.addEventListener('click', () => {
    if (input.value.trim()) {
      chatChannel.send({ message: input.value })
      input.value = ''
    }
  })
  input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') btn.click()
  })
})
