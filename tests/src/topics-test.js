import React from 'react';

import './tests.css';

class TopicsList extends React.Component {
  render() {
    let topics = this.props.topics.map((topic, ix) => {
      return <li key={ix}>{topic + '\t'}<button onClick={() => this.props.removeTopic(ix)}>Remove</button></li>
    });
    return (
      <ul>{topics}</ul>
    );
  }
}

export class TopicsTestInstructions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      topics: ['number of miles', 'catching the train'],
      topicInProgress: '',
    }
    this.addTopic = this.addTopic.bind(this);
    this.removeTopic = this.removeTopic.bind(this);
  }

  updateTopicInProgress(newTopicInProgress) {
    this.setState({
      topics: this.state.topics,
      topicInProgress: newTopicInProgress,
    })
  }


  addTopic() {
    if (this.state.topicInProgress === '') {
      return
    }
    let newTopics = JSON.parse(JSON.stringify(this.state.topics));
    newTopics.push(this.state.topicInProgress);
    this.setState({
      topics: newTopics,
      topicInProgress: '',
    })
  }

  removeTopic(i) {
    let newTopics = JSON.parse(JSON.stringify(this.state.topics));
    newTopics.splice(i, 1);
    this.setState({
      topics: newTopics,
      topicInProgress: this.state.topicInProgress,
    })
  }

  render() {
    return (
      <div style={{display: 'flex'}}>
        <div className='test-instructions'>
          <h3>Topics Test - Instructions</h3>
          <p>This is a test to see how many ideas you can think of about a topic. Be sure to list all the ideas you can about a topic whether or not they seem important to you. You are not limited to one word. Instead you may use a word or a phrase to express each idea.</p>
          <p>Here is a sample topic, "A train journey." Two examples are given on the right of ideas about the topic. Look at these examples. Now go ahead and enter some more ideas about this topic on the right, <b>one at a time</b>.</p>
          <p>Your score will be the number of appropriate ideas that you write.</p>
          <p>You will have <u>4 minutes</u> for each of the two parts of this test. Each part has one page with one topic. Click on "Next" to go to the first part (this will start the timer).</p>
          <p className='timer'>Time remaining: {this.props.minutes}:{this.props.seconds} (stopped)</p>
          <button onClick={this.props.goNext} className='go-next'>Next</button>
        </div>

        <div className='test-work-area'>
          <h3>Sample Topic: "A train journey":</h3>
          <div style={{display: 'flex'}}>
            <textarea className='topic-in-progress-box' value={this.state.topicInProgress} onChange={(event) => this.updateTopicInProgress(event.target.value)} />
            <button onClick={() => this.addTopic()}>Add topic</button>
          </div>
          <TopicsList
            topics={this.state.topics}
            removeTopic={this.removeTopic}
          />
        </div>
      </div>
    )
  }
}

export class TopicsTestPartA extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      topics: [],
      topicInProgress: '',
    }
    this.addTopic = this.addTopic.bind(this);
    this.removeTopic = this.removeTopic.bind(this);
  }

  updateTopicInProgress(newTopicInProgress) {
    this.setState({
      topics: this.state.topics,
      topicInProgress: newTopicInProgress,
    })
  }


  addTopic() {
    if (this.state.topicInProgress === '') {
      return
    }
    let newTopics = JSON.parse(JSON.stringify(this.state.topics));
    newTopics.push(this.state.topicInProgress);
    this.setState({
      topics: newTopics,
      topicInProgress: '',
    })
  }

  removeTopic(i) {
    let newTopics = JSON.parse(JSON.stringify(this.state.topics));
    newTopics.splice(i, 1);
    this.setState({
      topics: newTopics,
      topicInProgress: this.state.topicInProgress,
    })
  }

  render() {
    return (
      <div style={{display: 'flex'}}>
        <div className='test-instructions'>
          <h3>Topics Test - Part 1</h3>
          <p>The first topic is: "A man is going up a ladder."</p>
          <p>List all the ideas you can about <u>a man going up a ladder</u>.</p>
          <p className='timer'>Time remaining: {this.props.minutes}:{this.props.seconds}</p>
          <button onClick={this.props.goNext} className='go-next'>Next</button>
          <p>(you may only proceed after the time is over)</p>
        </div>

        <div className='test-work-area'>
          <h3>Topic: "A man is going up a ladder"</h3>
          <div style={{display: 'flex'}}>
            <textarea className='topic-in-progress-box' value={this.state.topicInProgress} onChange={(event) => this.updateTopicInProgress(event.target.value)} />
            <button onClick={() => this.addTopic()}>Add topic</button>
          </div>
          <TopicsList
            topics={this.state.topics}
            removeTopic={this.removeTopic}
          />
        </div>
      </div>
    )
  }
}

export class TopicsTestPartB extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      topics: [],
      topicInProgress: '',
    }
    this.addTopic = this.addTopic.bind(this);
    this.removeTopic = this.removeTopic.bind(this);
  }

  updateTopicInProgress(newTopicInProgress) {
    this.setState({
      topics: this.state.topics,
      topicInProgress: newTopicInProgress,
    })
  }


  addTopic() {
    if (this.state.topicInProgress === '') {
      return
    }
    let newTopics = JSON.parse(JSON.stringify(this.state.topics));
    newTopics.push(this.state.topicInProgress);
    this.setState({
      topics: newTopics,
      topicInProgress: '',
    })
  }

  removeTopic(i) {
    let newTopics = JSON.parse(JSON.stringify(this.state.topics));
    newTopics.splice(i, 1);
    this.setState({
      topics: newTopics,
      topicInProgress: this.state.topicInProgress,
    })
  }

  render() {
    return (
      <div style={{display: 'flex'}}>
        <div className='test-instructions'>
          <h3>Topics Test - Part 2</h3>
          <p>The second topic is: "Crossing a stream"</p>
          <p>List all the ideas you can about <u>crossing a stream</u>.</p>
          <p className='timer'>Time remaining: {this.props.minutes}:{this.props.seconds}</p>
          <button onClick={this.props.goNext} className='go-next'>Next</button>
          <p>(you may only proceed after the time is over)</p>
        </div>

        <div className='test-work-area'>
          <h3>Topic: "Crossing a stream"</h3>
          <div style={{display: 'flex'}}>
            <textarea className='topic-in-progress-box' value={this.state.topicInProgress} onChange={(event) => this.updateTopicInProgress(event.target.value)} />
            <button onClick={() => this.addTopic()}>Add topic</button>
          </div>
          <TopicsList
            topics={this.state.topics}
            removeTopic={this.removeTopic}
          />
        </div>
      </div>
    )
  }
}
