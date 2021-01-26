import React from 'react';

import './tests.css';

export class TopicsTestInstructions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      answerText: 'number of miles\ncatching the train',
    }
  }

  updateAnswerText(newAnswerText) {
    this.setState({
      answerText: newAnswerText,
    })
  }

  render() {
    return (
      <div style={{display: 'flex'}}>
        <div className='test-instructions'>
          <h3>Topics Test - Instructions</h3>
          <p>This is a test to see how many ideas you can think of about a topic. Be sure to list all the ideas you can about a topic whether or not they seem important to you. You are not limited to one word. Instead you may use a word or a phrase to express each idea.</p>
          <p>Here is a sample topic, "A train journey." Two examples are given on the right of ideas about the topic. Look at these examples. Now go ahead and enter some more ideas about this topic in the text box, <b>one in each line</b>.</p>
          <p>Your score will be the number of appropriate ideas that you write.</p>
          <p>You will have <u>4 minutes</u> for each of the two parts of this test. Each part has one page with one topic. Click on "Next" to go to the first part (this will start the timer).</p>
          <p className='timer'>Time remaining: {this.props.minutes}:{this.props.seconds} (stopped)</p>
          <button onClick={this.props.goNext} className='go-next'>Next</button>
        </div>

        <div className='topics'>
          <h3>Sample Topic: "A train journey":</h3>
          <textarea className='topics-text-box' value={this.state.answerText} onChange={(event) => this.updateAnswerText(event.target.value)} />
        </div>
      </div>
    )
  }
}

export class TopicsTestPartA extends React.Component {
  render() {
    return (
      <div />
    )
  }
}

export class TopicsTestPartB extends React.Component {
  render() {
    return (
      <div />
    )
  }
}
