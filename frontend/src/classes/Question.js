import Answer from './Answer';

export default class Question {
  constructor (id) {
    this.question = 'New Question';
    this.id = Number(id);
    this.type = 'Single';
    this.answers = [
      new Answer('Placeholder answer.', 1, true),
      new Answer('Placeholder answer.', 2, false)
    ];
    this.timeLimit = 60;
    this.points = 1;
    this.image = '';
    this.video = '';
  }

  getAnswers () {
    return this.answers;
  }

  getDataObject () {
    return {
      question: this.question,
      id: this.id,
      type: this.type,
      answers: [...this.answers],
      timeLimit: this.timeLimit,
      points: this.points,
      image: this.image,
      video: this.video
    }
  }

  getId () {
    return this.id;
  }

  getImage () {
    return this.image;
  }

  getQuestion () {
    return this.question;
  }

  getPoints () {
    return this.points;
  }

  getTimeLimit () {
    return this.timeLimit;
  }

  getType () {
    return this.type;
  }

  getVideo () {
    return this.video;
  }

  setAnswers (answers) {
    this.answers = [...answers];
  }

  setImage (image) {
    this.image = image;
  }

  setQuestion (question) {
    this.question = question;
  }

  setPoints (points) {
    this.points = points;
  }

  setTimeLimit (timeLimit) {
    this.timeLimit = timeLimit;
  }

  setType (type) {
    this.type = type;
  }

  setVideo (video) {
    this.video = video;
  }
}
