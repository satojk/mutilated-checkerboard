import React from 'react';

import './main.css';

import FormQuestion from './form-question.js';

function Chat(props) {
  let lastRecorded = 'You have not recorded any thoughts yet.'
  if (props.chatHistory.length) {
    lastRecorded = props.chatHistory.slice(-1)[0];
  }
  return (
    <div>
      <p className='hint'>Last recorded thought: {lastRecorded}</p>
      <textarea
        className='chat-box'
        value={props.currentChat}
        onChange={(event) => props.updateChat(event.target.value)}
        onKeyPress={(event) => {if (event.key === 'Enter') {props.updateChatHistory()}}}
      />
      <div className='chat-buttons'>
        <button
            className='submit-answer'
            onClick={() => props.updateChatHistory()}>Record thought
        </button>
        <button
            disabled={!props.canProceed}
            className='submit-answer'
            onClick={() => props.goNext()}>Next
        </button>
      </div>
    </div>
  )
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 0,
      currentChat: '',
      chatHistory: [],
      responses: [null, null, null],
    }
    this.goNext = this.goNext.bind(this);
    this.updateChat = this.updateChat.bind(this);
    this.updateChatHistory= this.updateChatHistory.bind(this);
    this.updateResponse= this.updateResponse.bind(this);
  }

  updateResponse(questionNo, newResponse) {
    let newResponses = JSON.parse(JSON.stringify(this.state.responses));
    newResponses[questionNo] = newResponse;
    this.setState({
      responses: newResponses,
    });
  }

  updateChat(newChat) {
    let newCurrentChat = newChat.replace(/(\r\n|\n|\r)/, '');
    this.setState({
      currentChat: newCurrentChat,
    });
  }

  updateChatHistory() {
    if (this.currentChat === '') {
      return;
    }
    let newChatHistory = JSON.parse(JSON.stringify(this.state.chatHistory));
    newChatHistory.push(this.state.currentChat);
    let newCurrentChat = '';
    this.setState({
      chatHistory: newChatHistory,
      currentChat: newCurrentChat,
    });
  }

  goNext() {
    let newPage = this.state.page + 1;
    if (newPage === 1) { // submit questionnaire
      let responses = JSON.parse(JSON.stringify(this.state.responses));
      let postBody = {
        submissionTime: Date.now(),
        responses: responses,
      }
      const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(postBody),
      };
      fetch('/api/postMainQuestionnaire', requestOptions);
    }
    if (newPage === 5) {
      window.location = '/stage1';
      return;
    }
    this.setState({
      page: newPage,
    })
  }

  render() {
    const rangeOptions = ['1', '2', '3', '4', '5']
    const rangeEndpoints = ['Strongly disagree', 'Strongly agree']
    const prompts = ['I enjoy solving puzzles.', 'Usually, when presented with a puzzle, I genuinely attempt to solve it.', 'I have previous experience with puzzles involving checkerboards and dominos.']
    let content = null;
    let questions = prompts.map((questionPrompt, ix) => (
      <FormQuestion
        key={'question-' + ix.toString()}
        type={'range'}
        ix={ix}
        questionPrompt={questionPrompt}
        options={rangeOptions}
        endpoints={rangeEndpoints}
        value={this.state.responses[ix]}
        updateFunction={this.updateResponse}
      />
    ));
    if (this.state.page === 0) {
      let canProceed = (this.state.responses[0] !== null &&
                        this.state.responses[1] !== null &&
                        this.state.responses[2] !== null);
      content = <div className='main-div'>
        <p className='main-instructions'>Thank you for participating in our experiment! Before proceeding to it, please answer the following brief questions so we may better understand your background. Each of them gives you a statement in quotes. Please indicate, on a scale of 1 to 5, how much you agree to the given statement.</p>
        <div className='questionnaire-div'>
          {questions}
        </div>
        <p className='main-instructions-more'>When you are ready, click on "Next" below to proceed to the experiment.</p>
        <button
          onClick={this.goNext}
          className='go-next'
          disabled={!canProceed}
        >
          Next
        </button>
      </div>;
    }
    if (this.state.page === 1) {
      content = <div className='main-div'>
        <p className='main-instructions'>We are interested in understanding the thoughts that people have as they think and reason while they try to solve puzzles and reasoning problems.  To study this, we will give you a puzzle to try to solve, and as you go through it, we will ask you to ‘think aloud’.  </p>
        <p className='main-instructions-more'>What is thinking aloud?  It is a process of expressing words that track where you are in solving a problem.  For example, you could think aloud while you carry out a multiplication problem like this one ‘What is 13 x 99’?  One person might say, ‘ok, 3 times 99 – that’s 297, and then I have to add 990 to that, lets see that’s 7, 8, 10,12, 1287’.  Another might say ’99 is 1 less than 100.  1300 minus 13 is 1287’.  these two ‘think aloud’ sequences reveal different ways two people solved the same problem.</p>
        <p className='main-instructions-more'>Thinking aloud isn’t a matter of unpacking all of your thoughts in detail – it is a matter of giving clues to what is in you head.  for example, the first person did not tell us how they got 990, or that they added the 1’s first, then the twos, then added a carry to the 9 in the hundred’s column.  But with these clues we can figure much more than if they had said nothing.</p>
        <p className='main-instructions-more'>Scientists studied thinking aloud in the 1980’s and 1990’s, and they learned a lot, but we have a lot left to learn.  One problem is that they recorded actual speech and then had to transcribe it.  Instead of that, we are looking to see if we can learn more by asking you to type quick phrases about what your are thinking.   some of us can ‘talk’ through our fingers better than others but for all of us nowadays we often share our thoughts this way, so we would like to ask you to give it a try.</p>
        <button onClick={this.goNext} className='go-next'>Next</button>
      </div>;
    }
    if (this.state.page === 2) {
      let canProceed = this.state.chatHistory.length > 2;
      content = <div className='main-div'>
        <p className='main-instructions'>So, remember: Please try to share high points of what you are thinking.  Each time you hit ‘enter’, we will record the time when you did, so please hit enter every time you think you’ve expressed something that entered your mind.  We won’t define what a ‘something’ is, but this could be the sequence of lines for the first ‘think aloud’ on the previous screen, for multiplying 13 by 99:  To keep it to the actual content, we’ve deleted extra words to show a minimal version of the same sequence:</p>
        <p className='main-instructions-more'>3 times 99<br />that’s 297<br />add 990 to that<br />7<br />8<br />10<br />12<br />1287</p>
        <p className='main-instructions-more'>You try it now with this problem: What is 19 times 40?</p>
        <Chat
          chatHistory={this.state.chatHistory}
          currentChat={this.state.currentChat}
          updateChat={this.updateChat}
          updateChatHistory={this.updateChatHistory}
          canProceed={canProceed}
          goNext={this.goNext}
        />
      </div>;
    }
    if (this.state.page === 3) {
      content = <div className='main-div'>
        <p className='main-instructions-more'>OK, you will proceed to the experiment now. Remember, please give us hints to what you are thinking so we can know more about how you go about solving the puzzle you are about to see!</p>
        <button onClick={this.goNext} className='go-next'>Next</button>
      </div>
    }
    if (this.state.page === 4) {
      content = <div className='main-div'>
        <p className='main-instructions'>For the first stage of this experiment, you will be asked to solve a puzzle. The instructions for the puzzle will be on the left side of the screen, so you should begin there.</p>
        <p className='main-instructions-more'>On the top right corner of the screen, you will find a text entry box for you to "think aloud" with, much as you did in the previous screen. Please use it similarly as described in the previous screen, giving clues to what is on your mind throughout the whole process of thinking through and solving the puzzle. If you spend a prolonged amount of time without recording a thought, a pop-up will appear on the center of the screen reminding you to record your thoughts.</p>
        <p className='main-instructions-more'>Once you are ready to begin, click on “Next” below. This will take you to the puzzle. Once you begin, please dedicate your continued attention to the experiment for its entire duration (between 1 hour and 1 hour 15 minutes).</p>
        <button onClick={this.goNext} className='go-next'>Next</button>
      </div>;
    }
    return (
      content
    )
  }
}

export default App;
