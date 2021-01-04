import React from 'react';

import './mutilated-checkerboard.css';

const FIRST_HINT_TIME = 1380; // 1380
const SECOND_HINT_TIME = 900; // 900
const THIRD_HINT_TIME = 300; // 300

function TimerAndHints(props) {
  if (props.secondsRemaining === FIRST_HINT_TIME) {
    alert('Hint: finding a covering is, in fact, impossible. So you should look for a proof of why this is the case.');
  }
  if (props.secondsRemaining === SECOND_HINT_TIME) {
    alert('Hint: the colors of the squares might help you solve the problem.');
  }
  if (props.secondsRemaining === THIRD_HINT_TIME) {
    alert('Hint: count the number of dark squares and light squares.');
  }
  let minutes = Math.floor(props.secondsRemaining / 60).toString();
  let seconds = (props.secondsRemaining % 60).toString().padStart(2, '0');
  let hint1 = <p className='hint'><b>Hint:</b> finding a covering is, in fact, impossible. So you should look for a proof of why this is the case.</p>
  let hint2 = <p className='hint'><b>Hint:</b> the colors of the squares might help you solve the problem.</p>
  let hint3 = <p className='hint'><b>Hint:</b> count the number of dark squares and light squares.</p>
  return (
    <div>
      <p className='timer'>Time remaining: {minutes}:{seconds}</p>
      {props.secondsRemaining > FIRST_HINT_TIME ? <p></p> : hint1}
      {props.secondsRemaining > SECOND_HINT_TIME ? <p></p> : hint2}
      {props.secondsRemaining > THIRD_HINT_TIME ? <p></p> : hint3}
    </div>
  )
}

function Notepad(props) {
  return (
    <textarea className='notepad' value={props.notes} onChange={props.handleChange} />
  )
}

class AnswerSubmission extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      answerStage: 0,
      isPositiveAnswer: false,
      answerText: 'Type out your answer in this box',
    }
  }

  incrementAnswerStage() {
    let newAnswerStage = this.state.answerStage + 1;
    let newIsPositiveAnswer = this.state.isPositiveAnswer;
    this.setState({
      answerStage: newAnswerStage,
      isPositiveAnswer: newIsPositiveAnswer,
    })
  }

  attemptPositiveAnswer() {
    this.setState({
      answerStage: 1,
      isPositiveAnswer: true,
      answerText: 'Type out your answer in this box',
    })
  }

  attemptNegativeAnswer() {
    this.setState({
      answerStage: 1,
      isPositiveAnswer: false,
      answerText: 'Type out your answer in this box',
    })
  }

  submitCovering() {
    this.setState({
      answerStage: 2,
      isPositiveAnswer: true,
      answerText: 'Type out your answer in this box',
    })
  }

  submitAnswer() {
    this.setState({
      answerStage: 2,
      isPositiveAnswer: false,
      answerText: 'Type out your answer in this box',
    })
  }

  updateAnswerText(newAnswerText) {
    this.setState({
      answerStage: 1,
      isPositiveAnswer: false,
      answerText: newAnswerText,
    })
  }

  render() {
    let toRender;
    if (this.state.answerStage === 0) {
      toRender = (
        <div className='answer-div'>
          <p className='hint'>What kind of answer do you want to give? Click on one of the two buttons below:</p>
          <button onClick={() => {this.attemptPositiveAnswer()}} className='submit-answer' >
            I have found a covering that works
          </button>
          <br />
          <button onClick={() => {this.attemptNegativeAnswer()}} className='submit-answer' >
            I can prove that no covering exists
          </button>
        </div>
      )
    }
    if (this.state.answerStage === 1) {
      if (this.state.isPositiveAnswer) {
        toRender = (
        <div className='answer-div'>
          <p className='hint'>Ok. Set up the covering you have found on the left with the virtual dominos, and once that is ready, click the button below to submit the covering as answer.</p>
          <button onClick={() => {this.submitCovering()}} className='submit-answer' >
            Submit covering as answer
          </button>
        </div>
        )
      }
      else {
        toRender = (
          <div className='answer-div'>
            <p className='hint'>Ok, use the text box below to type the reason why you believe no valid covering exists. When you are done, click on the button below to submit your answer.</p>
            <textarea className='answer-text' value={this.state.answerText} onChange={(event) => this.updateAnswerText(event.target.value)} />
            <button onClick={() => {this.submitAnswer()}} className='submit-answer' >
              Submit answer
            </button>
          </div>
        )
      }
    }
    if (this.state.answerStage === 2) {
      if (this.state.isPositiveAnswer) {
        toRender = (
          <div className='answer-div'>
            <p className='hint'>Sorry, the covering you have found does not work. A valid covering must cover all 62 valid squares, without overlapping dominos, and without any domino sticking out of the 62 valid squares.</p>
            <p className='hint'>Click on "Go back to notepad" above, and continue trying to solve the problem</p>
          </div>
        )
      }
      else {
        toRender = (
          <div className='answer-div'>
            <p className='hint'>Your answer is being checked, and you will be contacted by the experimenter shortly.</p>
          </div>
        )
      }
    }
    return (
      toRender
    )
  }
}

class WorkArea extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isSubmission: false,
    }
    this.toggleIsSubmission = this.toggleIsSubmission.bind(this)
  }

  toggleIsSubmission() {
    let newIsSubmission = !(this.state.isSubmission);
    this.setState({
      isSubmission: newIsSubmission,
    })
  }

  render() {
    let buttonText = this.state.isSubmission ? 'Go back to notepad' : 'I am ready to submit an answer';
    let notepad = <Notepad notes={this.props.notes}
                           handleChange={this.props.handleNotepadChange}
                  />
    return (
      <div className='work-area'>
          <button onClick={this.toggleIsSubmission} className='submit-answer' >
            {buttonText}
          </button>
          {this.state.isSubmission ? 
            <AnswerSubmission /> :
            notepad
          }
          <TimerAndHints secondsRemaining={this.props.secondsRemaining} />
      </div>
    )
  }
}

export default WorkArea;
