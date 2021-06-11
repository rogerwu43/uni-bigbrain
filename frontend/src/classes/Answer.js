export default class Answer {
  constructor (answer, id, isCorrect) {
    this.answer = answer;
    this.id = Number(id);
    this.isCorrect = isCorrect;
  }

  getAnswer () {
    return this.answer;
  }

  getId () {
    return this.id;
  }

  getIsCorrect () {
    return this.isCorrect;
  }

  setAnswer (answer) {
    this.answer = answer;
  }

  setIsCorrect (isCorrect) {
    this.isCorrect = isCorrect;
  }
}
