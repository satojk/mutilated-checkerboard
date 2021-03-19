import React from 'react';

import './mutilated-checkerboard.css';
import FormQuestion from './form-question.js';

const HINTS = [
  'the colors of the squares might help you solve the problem.',
  'count the number of dark squares and light squares.',
];

function Hints(props) {
  let hint1 = <p className='hint'><b>Hint:</b> {HINTS[0]}</p>
  let hint2 = <p className='hint'><b>Hint:</b> {HINTS[1]}</p>
  return (
    <div>
      {props.hintsToShow > 0 ? hint1 : <p></p>}
      {props.hintsToShow > 1 ? hint2 : <p></p>}
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
  let lastSubmitted = 'You have not submitted any thoughts yet.'
  if (props.responses[3].length) {
    lastSubmitted = props.responses[3].slice(-1)[0];
  }
  return (
    <div>
      <p className='hint'>Last submitted thought: {lastSubmitted}</p>
      <textarea
        className='chat-box'
        value={props.responses[4]}
        onChange={(event) => props.updateChat(event.target.value)}
        onKeyPress={(event) => {if (event.key === 'Enter') {props.updateChatHistory()}}}
      />
      <button
          className='submit-answer'
          onClick={() => props.updateChatHistory()}>Submit thought
      </button>
    </div>
  )
}

class AnswerSubmission extends React.Component {
  render() {
    let extensionNotice = null;
    let toRender;
    if (this.props.phase === 1) {
      let submissionNotice = <p className='hint'>When you are ready, submit your answer below. You may only submit once, and you must do so before the timer above reaches 0:00.</p>;
      submissionNotice = <p className='hint'>Use the small text box below to submit your thoughts as you solve the problem. When you are ready, submit your answer to the puzzle further below.</p>;
      let chat = <Chat
        responses={this.props.responses}
        updateChat={this.props.updateChat}
        updateChatHistory={this.props.updateChatHistory}
      />;
      toRender = (
        <div className='answer-div'>
          {extensionNotice}
          {submissionNotice}
          {chat}
          <FormQuestion
            type={'radio'}
            ix={0}
            questionPrompt={'Do you think it is possible to perfectly cover the 62 remaining squares using 31 dominos?'}
            options={this.props.answerOptions}
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
      let submissionNotice = <p className='hint'>When you are ready, submit your answer below. You may only submit once, and you must do so before the timer above reaches 0:00.</p>;
      submissionNotice = <p className='hint'>Use the small text box below to submit your thoughts as you solve the problem. When you are ready, submit your answer to the puzzle further below.</p>;
      let chat = <Chat
        responses={this.props.responses}
        updateChat={this.props.updateChat}
        updateChatHistory={this.props.updateChatHistory}
      />;
      toRender = (
        <div className='answer-div'>
          <p className='hint'>It is, in fact, impossible to perfectly cover the 62 remaining squares using 31 dominos. You now have 19 minutes to figure out why this is the case. That is: <b>can you find a convincing argument why it is impossible to cover the 62 remaining squares using 31 dominos?</b> This argument should not be a formal proof. It should be a plain English argument that, once explained to someone, should convince them that such a covering is impossible.</p>
          {extensionNotice}
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
            onClick={() => {
              let requestOptions = {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: '{}',
              }
              fetch('/api/postStage1EndTimestamp', requestOptions)
                .then(() => window.location = '/stage2');
            }}
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
    let timer = <p className='timer'>Time remaining: {minutes}:{seconds}</p>;
    timer = null;
    return (
      <div className='work-area'>
        {timer}
        {hintOverlay}
        <AnswerSubmission
          toggleWaitingForFeedback={() => this.toggleWaitingForFeedback()}
          waitingForFeedback={this.state.waitingForFeedback}
          timesUp={timesUp}
          responses={this.props.responses}
          updateResponse={this.props.updateResponse}
          phase={this.props.phase}
          incrementPhase={this.props.incrementPhase}
          answerOptions={this.props.answerOptions}
          extendedPhase={this.props.extendedPhase}
          increaseSeconds={this.props.increaseSeconds}
          secondsRemaining={this.props.secondsRemaining}
          updateChat={this.props.updateChat}
          updateChatHistory={this.props.updateChatHistory}
        />
        <Hints
          secondsRemaining={this.props.secondsRemaining}
          hintsToShow={this.state.hintsToShow}
        />
      </div>
    )
  }
}

export default WorkArea;
