import React from 'react';

import './tests.css';

import { NonsenseSyllogismsInstructions,
         NonsenseSyllogismsPartA,
         NonsenseSyllogismsPartB } from './nonsense-syllogisms.js';
import { TopicsTestInstructions,
         TopicsTestPartA,
         TopicsTestPartB } from './topics-test.js';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      screenNo: 0,
      secondsRemaining: 240,
      timeRunning: false,
      timesUp: false,
    }
    this.countDown = this.countDown.bind(this);
  }

  countDown() {
    let newSecondsRemaining = this.state.secondsRemaining - 1;
    this.setState({
      screenNo: this.state.screenNo,
      secondsRemaining: newSecondsRemaining,
      timesUp: this.state.timesUp,
    })
    if (newSecondsRemaining === 0) {
      clearInterval(this.timer);
      this.setState({
      screenNo: this.state.screenNo,
      secondsRemaining: newSecondsRemaining,
      timesUp: true,
      })
    }
  }

  goNext(startTimer) {
    clearInterval(this.timer);
    let newScreenNo = this.state.screenNo + 1
    let newSecondsRemaining = 240;
    let newTimeRunning = startTimer;
    let newTimesUp = false;
    this.setState({
      screenNo: newScreenNo,
      secondsRemaining: newSecondsRemaining,
      timeRunning: newTimeRunning,
      timesUp: newTimesUp,
    })
    if (startTimer) {
      this.timer = setInterval(this.countDown, 1000);
    }
  }

  render() {
    let minutes = Math.floor(this.state.secondsRemaining / 60).toString();
    let seconds = (this.state.secondsRemaining % 60).toString().padStart(2, '0');
    let content;
    if (this.state.screenNo === 0) {
      content = (
        <div className='main-div'>
          <p>In this last stage, you will complete two short timed tests. Click on Next to go to the instructions for the first test (this will not start the timer yet).</p>
          <button onClick={() => this.goNext(false)} className='go-next'>Next</button>
        </div>
      );
    }
    else if (this.state.screenNo === 1) { // instructions for Nonsense Syllogisms
      content = <NonsenseSyllogismsInstructions
                  goNext={() => this.goNext(true)}
                  minutes={minutes}
                  seconds={seconds}
                  timesUp={this.state.timesUp}
                />;
    }
    else if (this.state.screenNo === 2) { // Nonsense Syllogisms
      content = <NonsenseSyllogismsPartA
                  goNext={() => this.goNext(true)}
                  minutes={minutes}
                  seconds={seconds}
                  timesUp={this.state.timesUp}
                />;
    }
    else if (this.state.screenNo === 3) { // Nonsense Syllogisms
      content = <NonsenseSyllogismsPartB 
                  goNext={() => this.goNext(false)}
                  minutes={minutes}
                  seconds={seconds}
                  timesUp={this.state.timesUp}
                />;
    }
    else if (this.state.screenNo === 4) { // instructions for Topics Test
      content = <TopicsTestInstructions
                  goNext={() => this.goNext(false)}
                  minutes={minutes}
                  seconds={seconds}
                  timesUp={this.state.timesUp}
                />;
    }
    else if (this.state.screenNo === 5) { // Topics Test
      content = <TopicsTestPartA
                  goNext={() => this.goNext(true)}
                  minutes={minutes}
                  seconds={seconds}
                  timesUp={this.state.timesUp}
                />;
    }
    else if (this.state.screenNo === 6) { // Topics Test
      content = <TopicsTestPartB
                  goNext={() => this.goNext(false)}
                  minutes={minutes}
                  seconds={seconds}
                  timesUp={this.state.timesUp}
                />;
    }
    else {
      content = <p>You have now completed all stages of the experiment. You may now close this window.</p>;
    }

    return (
      <div>
        {content}
      </div>
    )
  }
}

export default App;
