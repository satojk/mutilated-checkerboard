import React from 'react';

import './mutilated-checkerboard.css';
import FormQuestion from './form-question.js';

const HINTS = [
  'the colors of the squares might help you solve the problem.',
  'count the number of dark squares and light squares.',
];

const QUESTIONNAIRE_TIMES = [
  420,
  1240,
  600,
]

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

function QuestionnaireOverlay(props) {
  return (
    <div className='questionnaire-overlay'>
      <div className='hint-overlay-background' />
      <div className='questionnaire-box'>
        <p>Please take a moment to respond to the following prompt.</p>
        <FormQuestion
          type={'text-long'}
          ix={props.responseIx}
          questionPrompt={'Briefly summarize all observations you have made about the puzzle in the past few minutes, as well as your thought process, and the strategies you have been using.'}
          value={props.responses[props.responseIx]}
          updateFunction={props.updateResponse}
        />
        <p>Your answer to the above will be automatically submitted in {props.secondsRemaining - props.deadline} seconds.</p>
      </div>
    </div>
  )
}

class AnswerSubmission extends React.Component {
  render() {
    let toRender;
    if (this.props.phase === 1) {
      toRender = (
        <div className='answer-div'>
          <p className='hint'>When you are ready, submit your answer below. You may only submit once, and you must do so before the timer above reaches 0:00.</p><br />
          <FormQuestion
            type={'radio'}
            ix={0}
            questionPrompt={'Do you think it is possible to perfectly cover the 62 remaining squares using 31 dominos?'}
            options={['I am very confident that such a covering is possible.', 'I think such a covering is possible, but I am not sure.', 'I have no idea.', 'I think such a covering is impossible, but I am not sure.', 'I am very confident that such a covering is impossible.']}
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
      toRender = (
        <div className='answer-div'>
          <p className='hint'>It is, in fact, impossible to perfectly cover the 62 remaining squares using 31 dominos. You now have 22 minutes to figure out why this is the case. That is: <b>can you find a convincing argument why it is impossible to cover the 62 remaining squares using 31 dominos?</b> This argument should not be a formal proof. It should be a plain English argument that, once explained to someone, should convince them that such a covering is impossible.</p>
          <p className='hint'>When you are ready, submit your answer below. You may only submit once, and you must do so before the timer above reaches 0:00.</p><br />
          <FormQuestion
            type={'text-long'}
            ix={2}
            questionPrompt={''}
            value={this.props.responses[2]}
            updateFunction={this.props.updateResponse}
          />
          <button
            className='submit-answer'
            onClick={this.props.goNext}
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
            onClick={this.props.goNext}
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
    let questionnaireOverlay = null;
    if (this.props.phase === 1 && this.props.secondsRemaining <= QUESTIONNAIRE_TIMES[0] && this.props.secondsRemaining > (QUESTIONNAIRE_TIMES[0] - 90)) {
      questionnaireOverlay = <QuestionnaireOverlay
        secondsRemaining={this.props.secondsRemaining}
        responseIx={3}
        responses={this.props.responses}
        deadline={QUESTIONNAIRE_TIMES[0] - 90}
        updateResponse={this.props.updateResponse}
      />
    }
    if (this.props.phase === 2 && this.props.secondsRemaining <= QUESTIONNAIRE_TIMES[1] && this.props.secondsRemaining > (QUESTIONNAIRE_TIMES[1] - 90)) {
      questionnaireOverlay = <QuestionnaireOverlay
        secondsRemaining={this.props.secondsRemaining}
        responseIx={4}
        responses={this.props.responses}
        deadline={QUESTIONNAIRE_TIMES[1] - 90}
        updateResponse={this.props.updateResponse}
      />
    }
    if (this.props.phase === 2 && this.props.secondsRemaining <= QUESTIONNAIRE_TIMES[2] && this.props.secondsRemaining > (QUESTIONNAIRE_TIMES[2] - 90)) {
      questionnaireOverlay = <QuestionnaireOverlay
        secondsRemaining={this.props.secondsRemaining}
        responseIx={5}
        responses={this.props.responses}
        deadline={QUESTIONNAIRE_TIMES[2] - 90}
        updateResponse={this.props.updateResponse}
      />
    }
    return (
      <div className='work-area'>
        <p className='timer'>Time remaining: {minutes}:{seconds}</p>
        {hintOverlay}
        {questionnaireOverlay}
        <AnswerSubmission
          toggleWaitingForFeedback={() => this.toggleWaitingForFeedback()}
          waitingForFeedback={this.state.waitingForFeedback}
          timesUp={timesUp}
          responses={this.props.responses}
          updateResponse={this.props.updateResponse}
          phase={this.props.phase}
          incrementPhase={this.props.incrementPhase}
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
