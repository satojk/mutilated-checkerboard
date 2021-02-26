import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import './mutilated-checkerboard.css';
import FormQuestion from './form-question.js';

import WorkArea from './work-area.js';
import { ItemTypes, Board, DominoReservoir } from './domino-area.js';

//const FIRST_HINT_TIME = 1780; // 1380
//const SECOND_HINT_TIME = 1770; // 900
//const THIRD_HINT_TIME = 1760; // 300

const FIRST_HINT_TIME = 1280; //900
const SECOND_HINT_TIME = 1260;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dominoes: {
        vertical: [],
        horizontal: [],
      },
      responses: ['', null, '', ''], // protocol, phase 1 radio, phase 1 text, phase 2
      secondsRemaining: 480,
      hintsUnlocked: 0,
      phase: 1,
      lastProtocolSeconds: 480,
      protocol: {1: [], 2: []}, // keys 1 and 2 denote the phases
      demandProtocol: false,
    }
    this.countDown = this.countDown.bind(this);
    this.updateResponse = this.updateResponse.bind(this);
    this.updateProtocol = this.updateProtocol.bind(this);
    this.incrementPhase = this.incrementPhase.bind(this);
    this.timer = setInterval(this.countDown, 1000);
  }

  updateResponse(questionNo, newResponse) {
    let newResponses = JSON.parse(JSON.stringify(this.state.responses));
    newResponses[questionNo] = newResponse;
    this.setState({
      responses: newResponses,
    });
  }

  updateProtocol() {
    let newProtocol = JSON.parse(JSON.stringify(this.state.protocol));
    newProtocol[this.state.phase].push((this.state.secondsRemaining, this.state.responses[0]));
    let newLastProtocolSeconds = this.state.secondsRemaining;
    let newResponses = JSON.parse(JSON.stringify(this.state.responses));
    newResponses[0] = '';
    this.setState({
      protocol: newProtocol,
      lastProtocolSeconds: newLastProtocolSeconds,
      responses: newResponses,
      demandProtocol: false,
    });
  }

  incrementPhase() {
    let newPhase = this.state.phase + 1;
    this.setState({
      phase: newPhase,
      secondsRemaining: 1320,
    });
  }

  countDown() {
    let newSecondsRemaining = this.state.secondsRemaining - 1;
    let newHintsUnlocked = this.state.hintsUnlocked;
    let newDemandProtocol = (this.state.demandProtocol ||
                            (((this.state.lastProtocolSeconds - newSecondsRemaining) >= 45) &&
                              newSecondsRemaining > 60));
    if (newSecondsRemaining === FIRST_HINT_TIME) {
      newHintsUnlocked = 1;
    }
    if (newSecondsRemaining === SECOND_HINT_TIME) {
      newHintsUnlocked = 2;
    }
    this.setState({
      secondsRemaining: newSecondsRemaining,
      hintsUnlocked: newHintsUnlocked,
      demandProtocol: newDemandProtocol,
    });
    if (newSecondsRemaining % 5 === 0) {
      let state = JSON.parse(JSON.stringify(this.state));
      let postBody = {
        submissionTime: Date.now(),
        state: state,
      }
      const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(postBody),
      };
      fetch('/api/postCheckerboardState', requestOptions);
    }
    if (newSecondsRemaining === 0) {
      clearInterval(this.timer);
    }
  }

  addDomino(i, j, item) {
    let newDominoes = JSON.parse(JSON.stringify(this.state.dominoes));
    if (item.type === ItemTypes.VERTICALDOMINO) {
      newDominoes.vertical.push([i, j]);
    } else {
      newDominoes.horizontal.push([i, j]);
    }
    let newNotes = this.state.notes;
    let newSecondsRemaining = this.state.secondsRemaining;
    this.setState({
      dominoes: newDominoes,
      notes: newNotes,
      secondsRemaining: newSecondsRemaining,
    })
  }

  removeDomino(i, j) {
    let newDominoes = JSON.parse(JSON.stringify(this.state.dominoes));
    let totalVerticals = newDominoes.vertical.length;
    for (let k = 0; k < totalVerticals; k++) {
      if (newDominoes.vertical[k][0] === i && newDominoes.vertical[k][1] === j) {
        newDominoes.vertical.splice(k, 1);
        break;
      }
    }
    let totalHorizontals = newDominoes.horizontal.length;
    for (let k = 0; k < totalHorizontals; k++) {
      if (newDominoes.horizontal[k][0] === i && newDominoes.horizontal[k][1] === j) {
        newDominoes.horizontal.splice(k, 1);
        break;
      }
    }
    let newNotes = this.state.notes;
    let newSecondsRemaining = this.state.secondsRemaining;
    this.setState({
      dominoes: newDominoes,
      notes: newNotes,
      secondsRemaining: newSecondsRemaining,
    })
  }

  clearDominoes() {
    let newNotes = this.state.notes;
    let newSecondsRemaining = this.state.secondsRemaining;
    this.setState({
      dominoes: {
        vertical: [],
        horizontal: [],
      },
      notes: newNotes,
      SecondsRemaining: newSecondsRemaining,
    })
  }

  render() {
    return (
      <DndProvider backend={HTML5Backend}>
        <div style={{display: 'flex'}}>
          <div className='explanation-div'>
            <p className='explanation-p'>
              In the grid on the right, two of the squares have been crossed out. You can place dominos on the remaining squares, such that each domino covers two horizontally or vertically adjacent squares. Consider the following question: <b>Is it possible to  perfectly cover the 62 remaining squares using 31 dominos?</b>
            </p>
            <p className='explanation-p'>
              You can drag the domino below and place it onto the squares. You can also drag placed dominos to move them to different squares, or drag them away from the squares to remove them. You can also click on the circular arrow below to change the orientation of your next domino.
            </p>
            <DominoReservoir onClick={() => {this.clearDominoes()}} />
            <p className='explanation-p'>
            </p>
            <FormQuestion
              type={'text-short'}
              ix={0}
              questionPrompt={'Use the input box and button below to record your thoughts and observations as you attempt to solve the puzzle.'}
              value={this.state.responses[0]}
              updateFunction={this.updateResponse}
            />
            <button
              className='submit-answer'
              onClick={this.updateProtocol}
            >
              Record thought
            </button>
          </div>
          <div>
            <Board
              dominoes={this.state.dominoes}
              addDomino={(i, j, item) => {this.addDomino(i, j, item)}}
              removeDomino={(i, j)=>{this.removeDomino(i, j)}}
              demandProtocol={this.state.demandProtocol}
            />
            {
              this.state.demandProtocol ?
              <p className='protocol-reminder'>You have not recorded your thoughts in a while. Please do so now on the left, and remember to regularly do so throughout your attempt at the puzzle.</p> :
              null
            }
          </div>
          <WorkArea
            notes={this.state.notes}
            handleNotepadChange={(event) => this.updateNotes(event.target.value)}
            secondsRemaining={this.state.secondsRemaining}
            hintsUnlocked={this.state.hintsUnlocked}
            phase={this.state.phase}
            responses={this.state.responses}
            updateResponse={this.updateResponse}
            incrementPhase={this.incrementPhase}
            protocol={this.state.protocol}
            demandProtocol={this.state.demandProtocol}
          />
        </div>
      </DndProvider>
    )
  }
}

export default App;
