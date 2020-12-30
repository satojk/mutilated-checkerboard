import React from 'react';
import ReactDOM from 'react-dom';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import './index.css';
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

class Notepad extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      value: 'Use this text input area to take notes as you try to solve the puzzle.'
    };
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  render() {
    return (
      <textarea className='notepad' value={this.state.value} onChange={this.handleChange} />
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
    }
  }

  addDomino(i, j, item) {
    let newDominoes = JSON.parse(JSON.stringify(this.state.dominoes));
    if (item.type === ItemTypes.VERTICALDOMINO) {
      newDominoes.vertical.push([i, j]);
    } else {
      newDominoes.horizontal.push([i, j]);
    }
    this.setState({
      dominoes: newDominoes,
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
    this.setState({
      dominoes: newDominoes,
    })
  }

  clearDominoes() {
    this.setState({
      dominoes: {
        vertical: [],
        horizontal: [],
      },
    })
  }


  render() {
    return (
      <DndProvider backend={HTML5Backend}>
        <div style={{display: 'flex'}}>
          <div>
            <p className='explanation-p'>
              Placeholder explanation:
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer iaculis felis a facilisis vehicula. Donec in cursus eros. Nunc sed sodales felis, sit amet viverra justo. Vestibulum ullamcorper odio in fermentum molestie. Donec accumsan leo est, et posuere enim finibus vel. Quisque a elit et sem lobortis aliquet non non urna. Donec scelerisque scelerisque orci pulvinar laoreet. Donec tempor nulla arcu, at ultricies erat pharetra elementum. Suspendisse et mauris rutrum, suscipit magna sed, auctor arcu. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse libero ipsum, interdum egestas nibh sed, viverra volutpat neque.
            </p>
            <DominoReservoir onClick={() => {this.clearDominoes()}} />
          </div>
          <Board
            dominoes={this.state.dominoes}
            addDomino={(i, j, item) => {this.addDomino(i, j, item)}}
            removeDomino={(i, j)=>{this.removeDomino(i, j)}}
          />
          <Notepad />
        </div>
      </DndProvider>
    )
  }
}

// ========================================

ReactDOM.render(
  <App />,
  document.getElementById('root')
);

