import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import './mutilated-checkerboard.css';

import WorkArea from './work-area.js';
import { ItemTypes, Board, DominoReservoir } from './domino-area.js';

//const FIRST_HINT_TIME = 1780; // 1380
//const SECOND_HINT_TIME = 1770; // 900
//const THIRD_HINT_TIME = 1760; // 300

const FIRST_HINT_TIME = 1380
const SECOND_HINT_TIME = 900
const THIRD_HINT_TIME = 300

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dominoes: {
        vertical: [],
        horizontal: [],
      },
      notes: 'Use this text input area to take notes as you try to solve the puzzle.',
      secondsRemaining: 1800,
      hintsUnlocked: 0,
    }
    this.countDown = this.countDown.bind(this);
    this.timer = setInterval(this.countDown, 1000);
  }

  countDown() {
    let newSecondsRemaining = this.state.secondsRemaining - 1;
    let newNotes = this.state.notes;
    let newDominoes = this.state.dominoes;
    let newHintsUnlocked = this.state.hintsUnlocked;
    if (newSecondsRemaining === FIRST_HINT_TIME) {
      newHintsUnlocked = 1;
    }
    if (newSecondsRemaining === SECOND_HINT_TIME) {
      newHintsUnlocked = 2;
    }
    if (newSecondsRemaining === THIRD_HINT_TIME) {
      newHintsUnlocked = 3;
    }
    this.setState({
      dominoes: newDominoes,
      notes: newNotes,
      secondsRemaining: newSecondsRemaining,
      hintsUnlocked: newHintsUnlocked,
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

  updateNotes(newNotes) {
    let newDominoes = this.state.dominoes;
    let newSecondsRemaining = this.state.secondsRemaining;
    this.setState({
      dominoes: newDominoes,
      notes: newNotes,
      secondsRemaining: newSecondsRemaining,
    })
  }

  render() {
    return (
      <DndProvider backend={HTML5Backend}>
        <div style={{display: 'flex'}}>
          <div>
            <p className='explanation-p'>
              On the right, two of the 64 squares have been crossed out. You can place dominos on the remaining squares, such that each domino covers two adjacent squares. <b>Is it possible to  perfectly cover the 62 remaining squares using 31 dominos? If so, provide one such covering. If not, give a logical argument why such a covering is impossible.</b>
            </p>
            <p className='explanation-p'>
              You can drag the domino below and place it onto the squares. You can also drag placed dominos to move them to different squares, or drag them away from the squares to remove them. You can also click on the circular arrow below to change the orientation of your next domino.
            </p>
            <p className='explanation-p'>
              You have a total of 30 minutes for your attempt. When you think you are ready to provide an answer, click on "I am ready to submit an answer" on the top right, and you will be given the option to either submit your current domino covering, or provide a typed explanation of why such a covering is impossible. There is no limit on how many times you may attempt to submit answers, but you should only do so when you believe you have solved the problem.
            </p>
            <DominoReservoir onClick={() => {this.clearDominoes()}} />
          </div>
          <div>
            <Board
              dominoes={this.state.dominoes}
              addDomino={(i, j, item) => {this.addDomino(i, j, item)}}
              removeDomino={(i, j)=>{this.removeDomino(i, j)}}
            />
            <p className='protocol-reminder'>Please, remember to "think aloud" and talk through whatever you are thinking.</p>
          </div>
          <WorkArea
            notes={this.state.notes}
            handleNotepadChange={(event) => this.updateNotes(event.target.value)}
            secondsRemaining={this.state.secondsRemaining}
            hintsUnlocked={this.state.hintsUnlocked}
          />
        </div>
      </DndProvider>
    )
  }
}

export default App;
