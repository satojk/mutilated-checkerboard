import React from 'react';

import './mutilated-checkerboard.css';

const HINTS = [
  'finding a covering is, in fact, impossible. So you should look for a proof of why this is the case.',
  'the colors of the squares might help you solve the problem.',
  'count the number of dark squares and light squares.',
];

function TimerAndHints(props) {
  let minutes = Math.floor(props.secondsRemaining / 60).toString();
  let seconds = (props.secondsRemaining % 60).toString().padStart(2, '0');
  let hint1 = <p className='hint'><b>Hint:</b> {HINTS[0]}</p>
  let hint2 = <p className='hint'><b>Hint:</b> {HINTS[1]}</p>
  let hint3 = <p className='hint'><b>Hint:</b> {HINTS[2]}</p>
  return (
    <div>
      <p className='timer'>Time remaining: {minutes}:{seconds}</p>
      {props.hintsToShow > 0 ? hint1 : <p></p>}
      {props.hintsToShow > 1 ? hint2 : <p></p>}
      {props.hintsToShow > 2 ? hint3 : <p></p>}
    </div>
  )
}

function Notepad(props) {
  if (props.timesUp) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: '{}',
    };
    return (
      <div className='answer-div'>
        <p className='hint'>Time is up! Click on "Next" below to move to the next stage of the experiment.</p><br />
        <button
          className='submit-answer'
          onClick={() => {
            fetch('/api/postStage1EndTimestamp', requestOptions)
              .then(() => window.location = '/stage2');
          }}
        >
          Next
        </button>
      </div>
    )
  }
  else {
    return (
      <textarea className='notepad' value={props.notes} onChange={props.handleChange} />
    )
  }
}

function HintOverlay(props) {
  return (
    <div className='hint-overlay'>
      <div className='hint-overlay-background' />
      <div className='hint-box'>
        <p><b>Hint:</b> {HINTS[props.hintsToShow]}</p>
        <button
          onClick={props.incrementHintsToShow}
          className='dismiss-hint'
        >
          Dismiss
        </button>
      </div>
    </div>
  )
}

class AnswerSubmission extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      answerStage: 0,
      isPositiveAnswer: false,
      answerText: 'Type out your answer in this box.',
      answerFeedbacks: [],
      originalAnswerFeedbacks: [],
    }
    this.checkFeedback = this.checkFeedback.bind(this);
    this.salvageAnswerAndPostEndTimestamp = this.salvageAnswerAndPostEndTimestamp.bind(this);
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
      answerText: 'Type out your answer in this box.',
    })
  }

  attemptNegativeAnswer() {
    this.setState({
      answerStage: 1,
      isPositiveAnswer: false,
      answerText: 'Type out your answer in this box.',
    })
  }

  submitCovering() {
    this.setState({
      answerStage: 2,
      isPositiveAnswer: true,
      answerText: 'Type out your answer in this box.',
    })
  }

  submitAnswer() {
    let response = JSON.parse(JSON.stringify(this.state.answerText));
    let postBody = {
      submissionTime: Date.now(),
      response: response,
    }
    let requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(postBody),
    };
    fetch('/api/postCheckerboardResponse', requestOptions);
    fetch('/api/getCheckerboardAnswerFeedbacks')
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          answerStage: 2,
          isPositiveAnswer: false,
          answerText: 'Type out your answer in this box.',
          originalAnswerFeedbacks: data,
        });
      });
    this.feedbackChecker = setInterval(this.checkFeedback, 3000);
    this.props.toggleWaitingForFeedback();
  }

  salvageAnswerAndPostEndTimestamp() {
    let response = JSON.parse(JSON.stringify(this.state.answerText));
    let postBody = {
      submissionTime: Date.now(),
      response: response,
    }
    let requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(postBody),
    };
    fetch('/api/postCheckerboardResponse', requestOptions);
    requestOptions.body = '{}';
    fetch('/api/postStage1EndTimestamp', requestOptions)
      .then(() => window.location = '/stage2');
  }

  checkFeedback() {
    fetch('/api/getCheckerboardAnswerFeedbacks')
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          answerFeedbacks: data,
        });
      });
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
            I can logically show that no covering exists
          </button>
        </div>
      )
    }
    if (this.state.answerStage === 1) {
      if (this.state.isPositiveAnswer) {
        toRender = (
        <div className='answer-div'>
          <p className='hint'>Set up the covering you have found on the left with the virtual dominos, and once that is ready, click the button below to submit the covering as answer.</p>
          <button onClick={() => {this.submitCovering()}} className='submit-answer' >
            Submit covering as answer
          </button>
        </div>
        )
      }
      else {
        toRender = (
          <div className='answer-div'>
            <p className='hint'>Use the text box below to type the reason why you believe no valid covering exists. When you are done, click on the button below to submit your answer.</p>
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
        if (this.state.answerFeedbacks.length > this.state.originalAnswerFeedbacks.length) {
          let lastFeedback = this.state.answerFeedbacks.slice(-1)[0];
          if (this.props.waitingForFeedback) {
            clearInterval(this.feedbackChecker);
            // If the answer is correct, we keep "waitingForFeedback" as true
            // because that will disallow moving out of submission mode, and
            // the user will only be able to go "Next". So we only
            // toggleWaitingForFeedback if the answer is not correct.
            if (lastFeedback !== 'correct') {
              this.props.toggleWaitingForFeedback();
            }
          }
          if (lastFeedback === 'correct') {
            let requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: '{}',
            };
            toRender = (
              <div className='answer-div'>
                <p className='hint'>Your answer is correct! Click on "Next" below to move to the next stage of the experiment.</p><br />
                <button
                  className='submit-answer'
                  onClick={() => {
                    fetch('/api/postStage1EndTimestamp', requestOptions)
                      .then(() => window.location = '/stage2');
                  }}
                >
                  Next
                </button>
              </div>
            )
          }
          else {
            toRender = (
              <div className='answer-div'>
                <p className='hint'>Your answer is incorrect. {lastFeedback}.</p>
                <p className='hint'>Click on "Go back to notepad" above, and continue trying to solve the problem</p>
              </div>
            )
          }
        }
        else {
          toRender = (
            <div className='answer-div'>
              <p className='hint'>Your answer is being checked, and you will receive feedback here shortly.</p>
            </div>
          )
        }
      }
    }
    if (this.props.timesUp) {
      toRender = (
        <div className='answer-div'>
          <p className='hint'>Time is up! Click on "Next" below to move to the next stage of the experiment.</p><br />
          <button
            className='submit-answer'
            onClick={this.salvageAnswerAndPostEndTimestamp}
          >
            Next
          </button>
        </div>
      )
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
      hintsToShow: 0,
      waitingForFeedback: false,
    }
    this.toggleIsSubmission = this.toggleIsSubmission.bind(this);
    this.incrementHintsToShow = this.incrementHintsToShow.bind(this);
    this.toggleWaitingForFeedback = this.toggleWaitingForFeedback.bind(this);
  }

  toggleIsSubmission() {
    let newIsSubmission = !(this.state.isSubmission);
    this.setState({
      isSubmission: newIsSubmission,
      hintsToShow: this.state.hintsToShow,
    })
  }

  toggleWaitingForFeedback() {
    this.setState({
      waitingForFeedback: !this.state.waitingForFeedback,
    });
  }

  incrementHintsToShow () {
    let newHintsToShow = this.state.hintsToShow + 1;
    this.setState({
      isSubmission: this.state.isSubmission,
      hintsToShow: newHintsToShow,
      showHintOverlay: false,
    })
  }

  render() {
    let timesUp = this.props.secondsRemaining <= 0;
    let buttonText = this.state.isSubmission ? 'Go back to notepad' : 'I am ready to submit an answer';
    let notepad = <Notepad notes={this.props.notes}
                           handleChange={this.props.handleNotepadChange}
                           timesUp={timesUp}
                  />
    return (
      <div className='work-area'>
        {this.props.hintsUnlocked > this.state.hintsToShow ?
         <HintOverlay
           hintsToShow={this.state.hintsToShow}
           incrementHintsToShow={this.incrementHintsToShow}
         /> :
         null}
        <button
          onClick={this.toggleIsSubmission}
          className='submit-answer'
          disabled={this.state.waitingForFeedback || timesUp}
        >
          {buttonText}
        </button>
        {this.state.isSubmission ?
          <AnswerSubmission
            toggleWaitingForFeedback={() => this.toggleWaitingForFeedback()}
            waitingForFeedback={this.state.waitingForFeedback}
            timesUp={timesUp}
          /> :
          notepad
        }
        <TimerAndHints
          secondsRemaining={this.props.secondsRemaining}
          hintsToShow={this.state.hintsToShow}
        />
      </div>
    )
  }
}

export default WorkArea;
