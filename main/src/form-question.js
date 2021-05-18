import React from 'react';

import './main.css';

export default function FormQuestion(props) {
  let updateFunction = (
    props.fixed === true ?
    () => {} :
    props.updateFunction
  );
  let ixOffset = props.ixOffset ? props.ixOffset : 0;
  const questionPrompt = <p><b>{(props.ix+1+ixOffset).toString()}.</b> {props.questionPrompt}</p>
  if (props.type === 'text-long') {
    return (
      <div className='form-question'>
        {questionPrompt}
        <textarea
          className='long-answer'
          value={props.value}
          onChange={(event) => updateFunction(props.ix, event.target.value)}
        />
      </div>
    );
  }
  if (props.type === 'text-short') {
    return (
      <div className='form-question'>
        {questionPrompt}
        <textarea
          className='short-answer'
          value={props.value}
          onChange={(event) => updateFunction(props.ix, event.target.value)}
        />
      </div>
    );
  }
  if (props.type === 'radio') {
    let options = props.options.map((option, ix) =>
      <div
        key={props.ix.toString() + '-' + ix.toString()}
      >
        <input
          id={props.ix.toString() + '-' + ix.toString()}
          type='radio'
          onClick={() => updateFunction(props.ix, ix)}
          checked={props.value === ix}
          readOnly={true}
        />
        <label for={props.ix.toString() + '-' + ix.toString()}>{option}</label>
      </div>
    );
    return (
      <div className='form-question'>
        {questionPrompt}
        {options}
      </div>
    )
  }
  if (props.type === 'dropdown') {
    let options = props.options.map((option, ix) =>
      <option
        key={props.ix.toString() + '-' + ix.toString()}
        value={option}
      >
        {option}
      </option>
    );
    return (
      <div className='form-question'>
        {questionPrompt}
        <select className='form-dropdown' value={props.value} onChange={(event) => updateFunction(props.ix, event.target.value)}>
          {options}
        </select>
      </div>
    )
  }
  if (props.type === 'range') {
    let options = props.options.map((option, ix) =>
      <div
        key={props.ix.toString() + '-' + ix.toString()}
        className='range-element'
      >
        <label for={props.ix.toString() + '-' + ix.toString()}>{option}</label>
        <input
          id={props.ix.toString() + '-' + ix.toString()}
          type='radio'
          onClick={() => updateFunction(props.ix, ix)}
          checked={props.value === ix}
          readOnly={true}
        />
      </div>
    );
    options.unshift(
      <div
        key={props.ix.toString() + '-endpoint-start'}
        className='range-element'
      >
        <p>{props.endpoints[0]}</p>
      </div>
    )
    options.push(
      <div
        key={props.ix.toString() + '-endpoint-end'}
        className='range-element'
      >
        <p>{props.endpoints[1]}</p>
      </div>
    )
    return (
      <div className='form-question'>
        {questionPrompt}
        <div className='range-wrapper'>
          {options}
        </div>
      </div>
    )
  }
  if (props.type === 'checkbox') {
    let options = props.options.map((option, ix) =>
      <div
        key={props.ix.toString() + '-' + ix.toString()}
      >
        <input
          id={props.ix.toString() + '-' + ix.toString()}
          type='checkbox'
          onClick={() => {
            let valuesArray = props.value;
            valuesArray[ix] = !valuesArray[ix];
            updateFunction(props.ix, valuesArray);
          }}
          checked={props.value[ix]}
          readOnly={true}
        />
        <label for={props.ix.toString() + '-' + ix.toString()}>{option}</label>
      </div>
    );
    return (
      <div className='form-question'>
        {questionPrompt}
        {options}
      </div>
    )
  }
}
