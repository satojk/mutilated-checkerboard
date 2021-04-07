import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import './mutilated-checkerboard.css';

import WorkArea from './work-area.js';
import { ItemTypes, Board, DominoReservoir } from './domino-area.js';

//const FIRST_HINT_TIME = 1780; // 1380
//const SECOND_HINT_TIME = 1770; // 900
//const THIRD_HINT_TIME = 1760; // 300

const FIRST_HINT_TIME = 840; // 660
const SECOND_HINT_TIME = 360; // 180
const THIRD_HINT_TIME = 180; // 180

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dominoes: {
        vertical: [],
        horizontal: [],
      },
      responses: [null, '', '', [], ''], // 1a, 1b, 2, chat history, curr chat
      secondsRemaining: 480, // 480
      lastChatSeconds: 480,
      chatBlock: false,
      hintsUnlocked: 0,
      phase: 1,
    }
    this.countDown = this.countDown.bind(this);
    this.updateResponse = this.updateResponse.bind(this);
    this.incrementPhase = this.incrementPhase.bind(this);
    this.updateChat = this.updateChat.bind(this);
    this.updateChatHistory= this.updateChatHistory.bind(this);
    this.timer = setInterval(this.countDown, 1000);
  }

  updateResponse(questionNo, newResponse) {
    let newResponses = JSON.parse(JSON.stringify(this.state.responses));
    newResponses[questionNo] = newResponse;
    this.setState({
      responses: newResponses,
    });
  }

  updateChat(newChat) {
    let newResponses = JSON.parse(JSON.stringify(this.state.responses));
    newResponses[4] = newChat.replace(/(\r\n|\n|\r)/, '');
    this.setState({
      responses: newResponses,
    })
  }

  updateChatHistory() {
    if (this.state.responses[4] === '') {
      return
    }
    let newLastChatSeconds = this.state.secondsRemaining;
    let newResponses = JSON.parse(JSON.stringify(this.state.responses));
    newResponses[3].push(this.state.responses[4]);
    newResponses[4] = '';
    this.setState({
      responses: newResponses,
      lastChatSeconds: newLastChatSeconds,
      chatBlock: false,
    })
  }

  incrementPhase() {
    let newPhase = this.state.phase + 1;
    let newSecondsRemaining;
    let newLastChatSeconds = this.state.lastChatSeconds;
    if (newPhase === 2) {
      newSecondsRemaining = 1320;
      newLastChatSeconds = (1320 + (newLastChatSeconds - this.state.secondsRemaining));
    }
    this.setState({
      phase: newPhase,
      secondsRemaining: newSecondsRemaining,
      lastChatSeconds: newLastChatSeconds,
    });
  }

  countDown() {
    let newSecondsRemaining = this.state.secondsRemaining - 1;
    let newNotes = this.state.notes;
    let newDominoes = this.state.dominoes;
    let newHintsUnlocked = this.state.hintsUnlocked;
    let newResponses = JSON.parse(JSON.stringify(this.state.responses));
    let newChatBlock = this.state.lastChatSeconds >= (newSecondsRemaining + 60);
    if (this.state.phase === 2) {
      if (newSecondsRemaining === FIRST_HINT_TIME) {
        newHintsUnlocked = 1;
      }
      if (newSecondsRemaining === SECOND_HINT_TIME) {
        newHintsUnlocked = 2;
      }
      if (newSecondsRemaining === THIRD_HINT_TIME) {
        newHintsUnlocked = 3;
      }
      if (newSecondsRemaining <= 120) {
        // Don't bother subject in the last two minutes.
        newChatBlock = false;
      }
    }
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
    this.setState({
      dominoes: newDominoes,
      notes: newNotes,
      secondsRemaining: newSecondsRemaining,
      hintsUnlocked: newHintsUnlocked,
      responses: newResponses,
      chatBlock: newChatBlock,
    });
    if (newSecondsRemaining === 0) {
      if (this.state.phase === 2) {
        clearInterval(this.timer);
      }
      else {
        this.incrementPhase();
      }
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
          <div>
            <p className='explanation-p'>
              In the grid on the right, two of the squares have been crossed out. You can place dominos on the remaining squares, such that each domino covers two abutting squares. (We call two squares "abutting" if they share a common side.  This occurs if they are horizontally or vertically adjacent to one another.)
            </p>
            <p className='explanation-p'>
              Consider the following question: Is it possible to perfectly cover the 62 remaining squares using 31 dominos?
            </p>
            <p className='explanation-p'>
              You can drag the domino below and place it onto the squares. You can also drag placed dominos to move them to different squares, or drag them away from the squares to remove them. You can also click on the circular arrow below to change the orientation of your next domino.
            </p>
            <DominoReservoir onClick={() => {this.clearDominoes()}} />
          </div>
          <Board
            dominoes={this.state.dominoes}
            addDomino={(i, j, item) => {this.addDomino(i, j, item)}}
            removeDomino={(i, j)=>{this.removeDomino(i, j)}}
            chatBlock={this.state.chatBlock}
          />
          <WorkArea
            notes={this.state.notes}
            handleNotepadChange={(event) => this.updateNotes(event.target.value)}
            secondsRemaining={this.state.secondsRemaining}
            hintsUnlocked={this.state.hintsUnlocked}
            phase={this.state.phase}
            responses={this.state.responses}
            updateResponse={this.updateResponse}
            incrementPhase={this.incrementPhase}
            updateChat={this.updateChat}
            updateChatHistory={this.updateChatHistory}
            chatBlock={this.state.chatBlock}
          />
        </div>
      </DndProvider>
    )
  }
}

export default App;
