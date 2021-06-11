import { mount } from 'enzyme'
import React from 'React'
import renderer from 'react-test-renderer'
import PlayQuestion from './PlayQuestion'
import * as S from '../styles/Play.styles';

describe('PlayQuestion', () => {
  const noop = () => {};

  const questionData = {
    question: {
      question: 'Cats or dogs',
      id: 1,
      type: 'Single',
      answers: [
        { answer: 'cats', id: 1, isCorrect: true },
        { answer: 'dogs', id: 2, isCorrect: false },
      ],
      timeLimit: '60',
      points: 1,
      image: '',
      video: ''
    }
  }
  const emptyAnswersData = []
  const answersData = [1]

  it('displays the question passed in with the prop', () => {
    const question = mount(<PlayQuestion questionData={questionData} answersData={emptyAnswersData} showPopup={noop} />);
    expect(question.find(S.Question)).toHaveLength(1);
    expect(question.find(S.Question).text()).toBe('Cats or dogs');
    const answers = question.find(S.AnswerOption);
    expect(answers).toHaveLength(2);
    expect(answers.at(0).find('p').text()).toBe('cats');
    expect(answers.at(1).find('p').text()).toBe('dogs');
  });

  it('changes the display of the button when selected', () => {
    const question = mount(<PlayQuestion questionData={questionData} answersData={emptyAnswersData} showPopup={noop} />);
    expect(question.find(S.AnswerOption).at(0).find(S.NotSelectedAnswer)).toHaveLength(1);
    expect(question.find(S.AnswerOption).at(0).find(S.SelectedAnswer)).toHaveLength(0);
    question.find(S.AnswerOption).at(0).find(S.NotSelectedAnswer).simulate('click');
    expect(question.find(S.AnswerOption).at(0).find(S.NotSelectedAnswer)).toHaveLength(0);
    expect(question.find(S.AnswerOption).at(0).find(S.SelectedAnswer)).toHaveLength(1);
  });

  it('displays the correct answer to a question if given a non empty array data prop', () => {
    const question = mount(<PlayQuestion questionData={questionData} answersData={answersData} showPopup={noop} />);
    expect(question.find('div').at(5).find('p').text()).toBe('cats was correct.');
    expect(question.find('div').at(6).find('p').text()).toBe('dogs was not correct.');
  });

  // snapshots
  it('renders correctly with an empty answersData data prop', () => {
    const question = renderer.create(<PlayQuestion questionData={questionData} answersData={emptyAnswersData} showPopup={noop} />).toJSON();
    expect(question).toMatchSnapshot();
  });

  it('renders correctly with a non empty answersData data prop', () => {
    const question = renderer.create(<PlayQuestion questionData={questionData} answersData={answersData} showPopup={noop} />).toJSON();
    expect(question).toMatchSnapshot();
  });
});
