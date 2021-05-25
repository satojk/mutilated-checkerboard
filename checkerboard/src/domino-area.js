import React from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import './mutilated-checkerboard.css';

import xImg from './images/x-image.png';
import verticalDominoImg from './images/vertical-domino.png';
import horizontalDominoImg from './images/horizontal-domino.png';
import rotator from './images/rotator.png';

export const ItemTypes = {
  VERTICALDOMINO: 'verticalDominoType',
  HORIZONTALDOMINO: 'horizontalDominoType',
}

function getAcceptedDominoes(i, j, dominoes) {
  /*
  Takes in i, j of square, and all currently placed dominoes (same as
  props.dominoes for the Square), returns a list of which ItemTypes (which
  dominoes) may be placed on the given square.
  */

  let acceptsVertical = true; // whether a vertical domino may be placed here
  let acceptsHorizontal = true; // whether a horizontal domino may be placed here

  if (i === 0 && j === 0) {
    acceptsVertical = false;
    acceptsHorizontal = false;
  }
  if (i === 7 || (i === 6 && j === 7)) {
    acceptsVertical = false;
  }
  if (j === 7 || (j === 6 && i === 7)) {
    acceptsHorizontal = false;
  }

  for (let [di, dj] of dominoes.vertical) {
    if (di === i && dj === j) {
      acceptsHorizontal = false;
    }
    if (di === (i - 1) && dj === j) {
      acceptsVertical = false;
      acceptsHorizontal = false;
    }
    if ((di === i || di === (i - 1)) && dj === (j + 1)) {
      acceptsHorizontal = false;
    }
    if (di === (i + 1) && dj === j) {
      acceptsVertical = false;
    }
  }

  for (let [di, dj] of dominoes.horizontal) {
    if (di === i && dj === j) {
      acceptsVertical = false;
    }
    if (di === i && dj === (j - 1)) {
      acceptsVertical = false;
      acceptsHorizontal = false;
    }
    if (di === i + 1 && (dj === j || dj === (j - 1))) {
      acceptsVertical = false;
    }
    if (di === i && dj === (j + 1)) {
      acceptsHorizontal = false;
    }
  }

  let acceptedDominoes = [];
  if (acceptsVertical) {
    acceptedDominoes.push(ItemTypes.VERTICALDOMINO);
  }
  if (acceptsHorizontal) {
    acceptedDominoes.push(ItemTypes.HORIZONTALDOMINO);
  }

  return acceptedDominoes;
}

function isEqual(obj1, obj2) {
  return JSON.stringify(obj1) === JSON.stringify(obj2);
}

function Square(props) {
  let className = 'square';
  if ((props.i+props.j) % 2 === 0) {
    className += ' wh-square';
  } else {
    className += ' bl-square';
  }

  let child;
  if ((props.i+props.j) % 14 === 0) {
    child = <img
              src={xImg}
              className='blocking-x'
              alt='blocking X'
              onClick= {() => {props.updateClick(props.i === 7)}}
            />
  }

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
  let [{ isOver, itemType }, drop] = useDrop({
    accept: props.acceptedDominoes,
    drop: ((item) => props.onDrop(item)),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
      itemType: monitor.getItemType()
    })
  })

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
    <div className={className} ref={drop}>
      {highlight}
      {child}
    </div>
  );
}

export function Board(props) {
  if (props.dummy) {
    return <div className='board-outline' />;
  }
  let squares = [];
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      // acceptedDominoes has to be in the Square key, otherwise it won't
      // remount and update once acceptedDominoes changes.
      let acceptedDominoes = getAcceptedDominoes(i, j, props.dominoes);
      squares.push(<Square key={[i*8 + j] + acceptedDominoes}
                           i={i}
                           j={j}
                           dominoes={props.dominoes}
                           acceptedDominoes={acceptedDominoes}
                           onDrop={(item) => props.addDomino(i, j, item)}
                           removeDomino={(item)=>props.removeDomino(item.props.i, item.props.j)}
                           updateClick={props.updateClick}
                   />
      );
    }
  }
  let overlay = null;
  if (props.chatBlock) {
    overlay = <div className='hint-overlay'>
      <div className='hint-overlay-background' />
      <div className='hint-box'>
        <p>You have not recorded a thought in a while. Please do so now, on the upper right of the screen.</p>
      </div>
    </div>;
  }
  return (
    <div className='board-outline'>
      {overlay}
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

export class DominoReservoir extends React.Component {
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
