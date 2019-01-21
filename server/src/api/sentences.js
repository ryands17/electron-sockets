const sentences = [
  'Sentence 1',
  'Sentence 2',
  'Sentence 3',
  'Sentence 4',
  'Sentence 5',
]

exports.getRandomSentence = socket => {
  try {
    let len = sentences.length
    let index = Math.floor(Math.random() * len)
    socket.emit('sentence', sentences[index])
  } catch (e) {
    socket.emit('sentence', sentences[0])
  }
}
