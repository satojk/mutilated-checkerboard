import React from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import './mutilated-checkerboard.css';

import verticalDominoImg from './vertical-domino.png';
import horizontalDominoImg from './horizontal-domino.png';
import rotator from './rotator.png';

export const ItemTypes = {
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

export function Board(props) {
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
