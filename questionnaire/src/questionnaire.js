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
            <p>Before we move on to the second part of the experiment, please fill out this questionnaire regarding your experience. There are three pages in the questionnaire (not including this one), and you should aim to spend about 4 minutes on each. You cannot go back to a previous page after moving forward.</p>

            <p>Some of the later questions might feel very similar to earlier questions. This is expected. Please answer each question anew and in earnest, independently of answers given previously.</p>
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
      content = (
        <div className='main-div'>
          <p className='main-instructions'>You have now completed the first stage of the experiment. Thank you very much! If you wish, you may take a brief break now before proceeding. When you are ready, <a href='/stage3'>click here to go to the second and final stage of the experiment</a>.</p>
        </div>
      );
    }

    return (
      <div className='main-div'>
        {content}
      </div>
    )
  }
}

export default App;
