import React from 'react';

import './mutilated-checkerboard.css';
import FormQuestion from './form-question.js';

const HINTS = [
  'the colors of the squares might help you solve the problem.',
  'count the number of dark squares and light squares.',
  'notice that any domino always covers one square of each color.',
];

function Hints(props) {
  let hint1 = <p className='hint'><b>Hint:</b> {HINTS[0]}</p>
  let hint2 = <p className='hint'><b>Hint:</b> {HINTS[1]}</p>
  let hint3 = <p className='hint'><b>Hint:</b> {HINTS[2]}</p>
  return (
    <div>
      {props.hintsToShow > 0 ? hint1 : <p></p>}
      {props.hintsToShow > 1 ? hint2 : <p></p>}
      {props.hintsToShow > 2 ? hint3 : <p></p>}
    </div>
  )
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

function Chat(props) {
  let lastRecorded = 'You have not recorded any thoughts yet.'
  if (props.responses[3].length) {
    lastRecorded = props.responses[3].slice(-1)[0];
  }
  return (
    <div className='chat-div'>
      <p className='hint'>Last recorded thought: {lastRecorded}</p>
      <textarea
        className='chat-box'
        value={props.responses[4]}
        onChange={(event) => props.updateChat(event.target.value)}
        onKeyPress={(event) => {if (event.key === 'Enter') {props.updateChatHistory()}}}
      />
      <button
          className='submit-answer'
          onClick={() => props.updateChatHistory()}>Record thought
      </button>
    </div>
  )
}

class AnswerSubmission extends React.Component {
  render() {
    let toRender;
    if (this.props.phase === 1) {
      let submissionNotice = <p className='hint'>Use the small text box below to record your thoughts as you solve the problem. When you are ready, submit your answer to the question above on the box further below.</p>;
      let chat = <Chat
        responses={this.props.responses}
        updateChat={this.props.updateChat}
        updateChatHistory={this.props.updateChatHistory}
      />;
      toRender = (
        <div className='answer-div'>
          {submissionNotice}
          {chat}
          <FormQuestion
            type={'radio'}
            ix={0}
            questionPrompt={'Do you think it is possible to perfectly cover the 62 remaining squares using 31 dominos?'}
            options={['I am very confident that such a covering is possible.', 'I am very confident that such a covering is impossible.']}
            value={this.props.responses[0]}
            updateFunction={this.props.updateResponse}
            hideIx={true}
          />
          <FormQuestion
            type={'text-long'}
            ix={1}
            questionPrompt={'Briefly explain your answer to the above.'}
            value={this.props.responses[1]}
            updateFunction={this.props.updateResponse}
          />
          <button
            className='submit-answer'
            onClick={this.props.incrementPhase}
          >
            Submit
          </button>
        </div>
      )
    }
    if (this.props.phase === 2) {
      let submissionNotice = <p className='hint'>As you think about this problem, continue to record your thoughts in the small text entry box as you have been doing so far. When you have reached a high level of confidence regarding your answer to the problem, proceed further below to make a submission. Only submit an answer when confident. We will not end your opportunity to submit an answer without giving you a timely prior warning beforehand.</p>;
      let chat = <Chat
        responses={this.props.responses}
        updateChat={this.props.updateChat}
        updateChatHistory={this.props.updateChatHistory}
      />;
      toRender = (
        <div className='answer-div'>
          <p className='hint'><span style={{color:'red', fontWeight:'bold'}}>It is, in fact, impossible to perfectly cover the 62 remaining squares using 31 dominos.</span> Try to figure out why this is the case. That is: <b>can you find a convincing argument why it is impossible to cover the 62 remaining squares using 31 dominos?</b> This argument need not be a formal proof. It can be a plain English argument that, once explained to someone, should convince them that such a covering is impossible.</p>
          {submissionNotice}
          {chat}
          <FormQuestion
            type={'text-long'}
            ix={2}
            questionPrompt={'Can you find a convincing argument why it is impossible to cover the 62 remaining squares using 31 dominos?'}
            value={this.props.responses[2]}
            updateFunction={this.props.updateResponse}
          />
          <button
            className='submit-answer'
            onClick={this.props.incrementPhase}
          >
            Submit
          </button>
        </div>
      )
    }
    if (this.props.timesUp) {
      toRender = (
        <div className='answer-div'>
          <p className='hint'>Time is up! Click on "Next" below to move to the next stage of the experiment.</p><br />
          <button
            className='submit-answer'
            onClick={this.props.incrementPhase}
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
      hintsToShow: 0,
    }
    this.incrementHintsToShow = this.incrementHintsToShow.bind(this);
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
    let minutes = Math.floor(this.props.secondsRemaining / 60).toString();
    let seconds = (this.props.secondsRemaining % 60).toString().padStart(2, '0');

    let timesUp = this.props.secondsRemaining <= 0;
    let hintOverlay = (this.props.hintsUnlocked > this.state.hintsToShow ?
         <HintOverlay
           hintsToShow={this.state.hintsToShow}
           incrementHintsToShow={this.incrementHintsToShow}
         /> :
         null
    )
    let timer = null;
    if (this.props.phase === 2 &&
        this.props.secondsRemaining <= 120 &&
        this.props.secondsRemaining > 0) {
      timer = <div>
        <p className='timer'>Please submit a response before the timer below reaches 0:00</p>
        <p className='timer'>{minutes}:{seconds}</p>
      </div>
    }
    let hints = <Hints
          secondsRemaining={this.props.secondsRemaining}
          hintsToShow={this.state.hintsToShow}
        />;
    if (timesUp) {
      hints = null;
    }
    let explanation = <p className='hint'>
      Once you have carefully read and understood the text on the left, please click once on each of the two red crosses on the board to proceed.
    </p>;
    if (this.props.ready) {
      explanation = <p className='hint'>
        Consider the following question: <span style={{fontWeight:'bold'}}>Is it possible to perfectly cover the 62 remaining squares using 31 dominos?</span>
      </p>;
    }
    let answerSubmission = <AnswerSubmission
      toggleWaitingForFeedback={() => this.toggleWaitingForFeedback()}
      waitingForFeedback={this.state.waitingForFeedback}
      timesUp={timesUp}
      responses={this.props.responses}
      updateResponse={this.props.updateResponse}
      phase={this.props.phase}
      incrementPhase={this.props.incrementPhase}
      secondsRemaining={this.props.secondsRemaining}
      updateChat={this.props.updateChat}
      updateChatHistory={this.props.updateChatHistory}
    />;
    return (
      <div className='work-area'>
        {timer}
        {hintOverlay}
        {this.props.phase === 1 ? explanation : null}
        {this.props.ready ? answerSubmission : null}
        {hints}
      </div>
    )
  }
}

export default WorkArea;
