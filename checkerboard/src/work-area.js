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

class AnswerSubmission extends React.Component {
  render() {
    let toRender;
    if (this.props.phase === 1) {
      let submissionNotice = <p className='hint'>Use the small text box underneath the squares to record your thoughts as you solve the problem. If you achieve confidence in an answer to the question above, respond to the questions below.</p>;
      toRender = (
        <div className='answer-div'>
          {submissionNotice}
          <FormQuestion
            type={'radio'}
            ix={0}
            questionPrompt={'Do you think it is possible to perfectly cover the 62 remaining squares using 31 dominos?'}
            options={['I am confident that such a covering is possible.', 'I am confident that such a covering is impossible.']}
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
            disabled={this.props.responses[0] === null || this.props.responses[1] === ''}
            className='submit-answer'
            onClick={this.props.incrementPhase}
          >
            Submit
          </button>
        </div>
      )
    }
    if (this.props.phase === 2) {
      let submissionNotice = <p className='hint'>As you think about this problem, continue to record your thoughts in the small text entry box at the bottom as you have been doing so far. As before, be thorough in recording your thoughts, including hunches, ideas, plans, and anything else which you might think. When you feel that the thoughts you have recorded include a convincing argument for why it is impossible to cover the 62 remaining squares, check the box below and click on "Next" to proceed.</p>;
      toRender = (
        <div className='answer-div'>
          <p className='hint'><span style={{color:'red', fontWeight:'bold'}}>It is, in fact, impossible to perfectly cover the 62 remaining squares using 31 dominos.</span> Try to figure out why this is the case. That is: <b>can you find a convincing argument why it is impossible to cover the 62 remaining squares using 31 dominos?</b> This argument need not be a formal proof. It can be a plain English argument that, once explained to someone, should convince them that such a covering is impossible.</p>
          {submissionNotice}
          <div className='checkerboard-checkbox-div'>
            <input className='checkerboard-checkbox' type='checkbox' checked={this.props.responses[2]} label='consent' onClick={() => this.props.updateResponse(2, !this.props.responses[2])}/>
            <p>"In recording my thoughts, I believe I have provided a convincing argument for why it is impossible to cover the 62 remaining squares using 31 dominos."</p>
          </div>
          <button
            disabled={this.props.responses[2] === false}
            className='submit-answer'
            onClick={this.props.incrementPhase}
          >
            Next
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
    if (this.props.instructionPhase === 0) {
      return <div className='work-area'>
        <p className='hint'>On this side of the screen, we will display prompts and an interface for you to respond to our questions.</p>
        <button
          className='submit-answer'
          onClick={this.props.incrementInstructionPhase}
        >
          Next
        </button>
      </div>;
    }
    if (this.props.instructionPhase === 1) {
      return <div className='work-area'>
        <p className='hint'>You are about to see an important visual workspace for the puzzle. Once you click on "Next" below, the workspace will become visible, alongside instructions on how to use it on the far left. Once you have read those, return here for further instructions.</p>
        <button
          className='submit-answer'
          onClick={this.props.incrementInstructionPhase}
        >
          Next
        </button>
      </div>;
    }
    if (this.props.instructionPhase === 2) {
      return <div className='work-area'>
        <p className='hint'>Read the material on the left, and experiment briefly with placing dominos on the grid, then return here and click on "Next" below.</p>
        <p className='hint'>You might find that using the interface is slow and clunky. Later on, as you build better intuition for the puzzle, we encourage you to carry out most of the work in your imagination (recording your thoughts throughout once you are given the opportunity), using the interface only to facilitate your imagining.</p>
        <button
          className='submit-answer'
          onClick={this.props.incrementInstructionPhase}
        >
          Next
        </button>
      </div>;
    }
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
