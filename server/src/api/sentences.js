import { getRandomNumber } from '../utils'
const sentences = [
  'Sentence 1',
  'Sentence 2',
  'Sentence 3',
  'Sentence 4',
  'Sentence 5',
]

export const getRandomSentence = socket => {
  try {
    let len = sentences.length
    let index = getRandomNumber(len)
    socket.emit('sentence', sentences[index])
  } catch (e) {
    socket.emit('sentence', sentences[0])
  }
}
