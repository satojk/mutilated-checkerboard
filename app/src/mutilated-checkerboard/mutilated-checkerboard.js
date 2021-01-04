import React from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import './mutilated-checkerboard.css';

import WorkArea from './work-area.js'
import verticalDominoImg from './vertical-domino.png';
import horizontalDominoImg from './horizontal-domino.png';
import rotator from './rotator.png';

const ItemTypes = {
  VERTICALDOMINO: 'verticalDominoType',
  HORIZONTALDOMINO: 'horizontalDominoType',
}

function isEqual(obj1, obj2) {
  return JSON.stringify(obj1) === JSON.stringify(obj2);
}

function Square(props) {
  const [{ isOver, itemType }, verticalDrop] = useDrop({
    accept: [ItemTypes.VERTICALDOMINO, ItemTypes.HORIZONTALDOMINO],
    drop: ((item) => props.onDrop(item)),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
      itemType: monitor.getItemType()
    })
  })

  let className = 'square';
  if ((props.i+props.j) % 2 === 0) {
    className += ' wh-square';
  } else {
    className += ' bl-square';
  }

  if ((props.i+props.j) % 14 === 0) {
    className = 'ghost-square';
  }

  let child;
  for (let domino of props.dominoes.vertical) {
    if (isEqual(domino, [props.i, props.j])) {
      className += ' with-domino';
      child = <VerticalDomino
                i={props.i}
                j={props.j}
                onDrag={props.onDrag}
                removeDomino={(item) => props.removeDomino(item)}
              />;
      break;
    }
  }
  for (let domino of props.dominoes.horizontal) {
    if (isEqual(domino, [props.i, props.j])) {
      className += ' with-domino';
      child = <HorizontalDomino
                i={props.i}
                j={props.j}
                onDrag={props.onDrag}
                removeDomino={(item) => props.removeDomino(item)}
              />;
      break;
    }
  }

  let highlight;
  if (isOver) {
    if (itemType === ItemTypes.VERTICALDOMINO) {
      className += ' with-domino';
      highlight = <div className='vertical-highlight' />
    } else {
      className += ' with-domino';
      highlight = <div className='horizontal-highlight' />
    }
  }

  return (
    <div className={className} ref={verticalDrop}>
      {highlight}
      {child}
    </div>
  );
}

function Board(props) {
  let squares = [];
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      squares.push(<Square key={i*8 + j}
                           i={i}
                           j={j}
                           dominoes={props.dominoes}
                           onDrop={(item) => props.addDomino(i, j, item)}
                           removeDomino={(item)=>props.removeDomino(item.props.i, item.props.j)}
                   />
      );
    }
  }
  return (
    <div className='board-outline'>
      {squares}
    </div>
  );
}

function Rotator(props) {
  return (
    <img
      className='rotator' 
      src={rotator}
      alt='rotator'
      onClick={props.onClick}
    />
  );
}

function VerticalDomino(props) {
  const [{ isDragging }, drag] = useDrag({
    item: { 
      type: ItemTypes.VERTICALDOMINO,
      props: props,
    },
    end: (item, monitor) => (props.removeDomino(item)),
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging()
    })
  })

  let className = 'vertical-domino';

  return (
    <div ref={drag}>
      <img
        className={className}
        src={verticalDominoImg} 
        alt='vertical domino'
      />
    </div>
  )
}

function HorizontalDomino(props) {
  const [{ isDragging }, drag] = useDrag({
    item: {
      type: ItemTypes.HORIZONTALDOMINO,
      props: props
    },
    end: (item, monitor) => (props.removeDomino(item)),
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging()
    })
  })

  let className = 'horizontal-domino';

  return (
  <div ref={drag}>
    <img
      className={className}
      src={horizontalDominoImg} 
      alt='horizontal domino'
    />
  </div>
  )
}

class DominoReservoir extends React.Component {
  constructor(props) {
    super(props);
    this.rotateDomino = this.rotateDomino.bind(this);
    this.state = {
      horizontal: false,
    }
  }

  rotateDomino() {
    this.setState({
      horizontal: !this.state.horizontal,
    });
  }

  render() {
    let domino = this.state.horizontal ? <HorizontalDomino onDrag={()=>{}} removeDomino={()=>{}} /> : <VerticalDomino onDrag={()=>{}} removeDomino={()=>{}} />;
    return (
      <div>
        <div className='domino-reservoir'>
          <Rotator onClick={this.rotateDomino}/>
          {domino}
        </div>
        <div>
          <button onClick={this.props.onClick} className='clear-board' >
            Clear board
          </button>
        </div>
      </div>
    )
  }
}

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
    }
    this.countDown = this.countDown.bind(this);
    this.timer = setInterval(this.countDown, 1000);
  }

  countDown() {
    let newSecondsRemaining = this.state.secondsRemaining - 1;
    let newNotes = this.state.notes;
    let newDominoes = this.state.dominoes;
    this.setState({
      dominoes: newDominoes,
      notes: newNotes,
      secondsRemaining: newSecondsRemaining,
    })
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
              On the right, two of the 64 squares have been crossed out. You can place dominos on the remaining squares, such that each domino covers two adjacent squares. <b>Is it possible to  perfectly cover the 62 remaining squares using 31 dominos? If so, provide one such covering. If not, prove logically why such a covering is impossible.</b>
            </p>
            <p className='explanation-p'>
              You can click and drag the domino below in order to place it onto the squares. You can also click and drag placed dominos to move them to different squares, or drag them away from the squares to remove them. You can also click on the circular arrow symbol below to change the orientation of your next domino before placing it onto the squares.
            </p>
            <p className='explanation-p'>
              You have a total of 30 minutes for your attempt. When you think you are ready to provide an answer, click on "I am ready to submit an answer" on the top right, and you will be given the option to either submit your current domino covering, or provide a typed explanation of why such a covering is impossible. There is no limit on how many times you may attempt to submit answers, but you should only do so when you suspect you have solved the problem.
            </p>
            <DominoReservoir onClick={() => {this.clearDominoes()}} />
          </div>
          <Board
            dominoes={this.state.dominoes}
            addDomino={(i, j, item) => {this.addDomino(i, j, item)}}
            removeDomino={(i, j)=>{this.removeDomino(i, j)}}
          />
          <WorkArea
            notes={this.state.notes}
            handleNotepadChange={(event) => this.updateNotes(event.target.value)}
            secondsRemaining={this.state.secondsRemaining}
          />
        </div>
      </DndProvider>
    )
  }
}

export default App;
