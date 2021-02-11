import React from 'react';

import './questionnaire.css';

import { QuestionnairePage1,
         QuestionnairePage2,
         QuestionnairePage3 } from './questionnaire-pages.js';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      screenNo: 0,
    };
  }

  goNext() {
    let newScreenNo = this.state.screenNo + 1;
    this.setState({
      screenNo: newScreenNo,
    });
  }

  render() {
    let content;
    if (this.state.screenNo === 0) {
      content = (
        <div className='main-div'>
          <div className='main-instructions'>
            <p>Thank you for completing the puzzle portion of the experiment. Please fill out this questionnaire regarding your experience. There are three pages in the questionnaire (not including this one), and you should aim to spend about 4 minutes on each. You cannot go back to a previous page after moving forward.</p>

            <p>Some of the later questions might feel very similar to earlier questions. This is expected. Answer each question anew and in earnest, independently of answers given previously.</p>

            <p>Note: up to three hints were given throughout the 30 minute duration of the puzzle. If you solved it quickly, you might not have received any hints. If this is the case, you may ignore any mention of hints in this questionnaire.</p>
          </div>
          <button onClick={() => this.goNext()} className='go-next'>Next</button>
        </div>
      );
    }
    else if (this.state.screenNo === 1) {
      content = <QuestionnairePage1 goNext={() => this.goNext()} />;
    }
    else if (this.state.screenNo === 2) {
      content = <QuestionnairePage2 goNext={() => this.goNext()} />;
    }
    else if (this.state.screenNo === 3) {
      content = <QuestionnairePage3 goNext={() => this.goNext()} />;
    }
    else {
      content = <p className='main-instructions'>You have now completed the second stage of the experiment. Thank you very much! <a href='/stage3'>Click here to go to the final stage of the experiment</a>.</p>;
    }

    return (
      <div>
        {content}
      </div>
    )
  }
}

export default App;
