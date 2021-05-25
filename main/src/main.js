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
      responses: [null, null, null, '', '', '', '', '', '', '', ''],
      consent: false,
    }
    this.goNext = this.goNext.bind(this);
    this.updateChat = this.updateChat.bind(this);
    this.updateChatHistory= this.updateChatHistory.bind(this);
    this.updateResponse= this.updateResponse.bind(this);
    this.toggleConsent= this.toggleConsent.bind(this);
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

  toggleConsent() {
    let newConsent = !this.state.consent;
    this.setState({
      consent: newConsent,
    });
  }

  goNext() {
    let newPage = this.state.page + 1;
    if (newPage === 2) { // submit questionnaire
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
    if (newPage === 6) {
      window.location = '/stage1';
      return;
    }
    this.setState({
      page: newPage,
    })
    window.scrollTo(0, 0);
  }

  render() {
    let content = null;
    if (this.state.page === 0) {
      content = <div className='main-div'>
        <p className='main-instructions'>Thank you for participating in our experiment. There are two parts to this experiment. The first part takes around 45 minutes, and the second part takes around 30 minutes. Please complete each part in a single sitting, uninterrupted. You will be notified once the first part is over, so that you may take a break if needed before proceeding to the second part.</p>
        <p className='main-instructions-more'>The experiment requires you to engage fully and to respond to questions about your thought processes throughout the study.  It contains elements resembling difficult standardized tests.  The expected duration of the study is 75 minutes and you will receive $12.50 for completing the study. If you provide conscientious responses throughout the experiment you will receive an additional bonus of $7.50, making your total earnings equal $20. We have asked you to set aside 90 minutes to allow for the break and to allow for a few extra minutes if needed. If you withdraw from the study prior to completion you will receive payment at the rate of $10 per hour for the time you spent actively participating in the study.</p>
        <p className='main-instructions-more'>All data collected for this experiment will be anonymized prior to analysis, and no personally identifiable information collected will be disclosed at any point.</p>
        <p className='main-instructions-more'>This experiment poses no risk over and above the ordinary risks posed by reasoning and using a computer. By checking the checkbox below, you are consenting to being part of this experiment and having your responses collected by the experimenters. Your participation is entirely voluntary, and you may withdraw your consent and terminate your participation in the experiment at any point. In this event, you will still receive the compensation for the time you spent in the experiment at the rate stated above, but will not receive the $7.50 bonus.</p>
        <p className='main-instructions-more'>Once you have carefully read and understood all of the above, please proceed below if you wish to participate in the experiment.</p>
        <div className='main-instructions-consent-div'>
          <input className='main-instructions-consent-checkbox' type='checkbox' value={this.state.consent} label='consent' onClick={this.toggleConsent}/>
          <p>"I have read and understood all of the above, and consent to participating in the experiment as described."</p>
        </div>
          <button onClick={this.goNext} className='go-next' disabled={!this.state.consent}>Next</button>
      </div>;
    }
    if (this.state.page === 1) {
      let canProceed = true;
      for (let i = 0; i < 11; i++) {
        if (this.state.responses[i] === '') {
          canProceed = false;
        }
      }
      content = <div className='main-div'>
        <p className='main-instructions'>Before proceeding to the experiment, please answer the following brief questions so we may better understand your background.</p>
        <div className='questionnaire-div'>
          <FormQuestion
            key={'question-0'}
            type={'range'}
            ix={0}
            questionPrompt={'Which of the following best describes your experience and proficiency with word puzzles like anagrams and crossword puzzles, relative to the average Stanford undergraduate student?' }
            options={['Very little', 'Less than average', 'Average', 'More than average', 'Very extensive']}
            endpoints={['', '']}
            value={this.state.responses[0]}
            updateFunction={this.updateResponse}
          />
          <FormQuestion
            key={'question-1'}
            type={'range'}
            ix={1}
            questionPrompt={'Which of the following best describes your experience and proficiency with puzzles involving numbers like sudoku, relative to the average Stanford undergraduate student?' }
            options={['Very little', 'Less than average', 'Average', 'More than average', 'Very extensive']}
            endpoints={['', '']}
            value={this.state.responses[1]}
            updateFunction={this.updateResponse}
          />
          <FormQuestion
            key={'question-2'}
            type={'range'}
            ix={2}
            questionPrompt={'Which of the following best describes your experience and proficiency with logical reasoning puzzles, relative to the average Stanford undergraduate student?' }
            options={['Very little', 'Less than average', 'Average', 'More than average', 'Very extensive']}
            endpoints={['', '']}
            value={this.state.responses[2]}
            updateFunction={this.updateResponse}
          />
          <FormQuestion
            key={'question-3'}
            type={'dropdown'}
            ix={3}
            questionPrompt={'Do you have prior experience with reasoning problems involving checkerboards and dominos?'}
            options={['', 'Yes', 'No']}
            value={this.state.responses[3]}
            updateFunction={this.updateResponse}
          />
          <FormQuestion
            key={'question-4'}
            type={'dropdown'}
            ix={4}
            questionPrompt={'How many year-long courses of high school mathematics did you take prior to attending college?'}
            options={['', '0', '1', '2', '3', '4', '5', '6', '7 or more']}
            value={this.state.responses[4]}
            updateFunction={this.updateResponse}
          />
          <FormQuestion
            key={'question-5'}
            type={'dropdown'}
            ix={5}
            questionPrompt={'How many of your high school mathematics courses involved mathematical or logical proof?'}
            options={['', '0', '1', '2', '3', '4', '5', '6', '7 or more']}
            value={this.state.responses[5]}
            updateFunction={this.updateResponse}
          />
          <FormQuestion
            key={'question-6'}
            type={'dropdown'}
            ix={6}
            questionPrompt={'Have you ever taken a logic course at any point during your studies?'}
            options={['', 'Yes', 'No']}
            value={this.state.responses[6]}
            updateFunction={this.updateResponse}
          />
          <FormQuestion
            key={'question-7'}
            type={'dropdown'}
            ix={7}
            questionPrompt={'How many college-level courses have you taken requiring extensive use of mathematics?'}
            options={['', '0', '1-3', '4-6', '7-9', '10 or more']}
            value={this.state.responses[7]}
            updateFunction={this.updateResponse}
          />
          <FormQuestion
            key={'question-8'}
            type={'dropdown'}
            ix={8}
            questionPrompt={'How many college-level courses have you taken involving mathematical or logical proof?'}
            options={['', '0', '1', '2', '3', '4', '5', '6 or more']}
            value={this.state.responses[8]}
            updateFunction={this.updateResponse}
          />
          <FormQuestion
            key={'question-9'}
            type={'text-short'}
            ix={9}
            questionPrompt={'What is your major? Write “undeclared” if you have not yet declared a major. If you will be obtaining a double major, indicate both majors.'}
            value={this.state.responses[9]}
            updateFunction={this.updateResponse}
          />
          <FormQuestion
            key={'question-10'}
            type={'text-short'}
            ix={10}
            questionPrompt={'When do you expect to complete your current degree program?'}
            value={this.state.responses[10]}
            updateFunction={this.updateResponse}
          />
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
    if (this.state.page === 2) {
      content = <div className='main-div'>
        <p className='main-instructions'>We are interested in understanding the thoughts that people have as they think and reason while they try to solve puzzles and reasoning problems.  To study this, we will give you a puzzle to try to solve, and as you go through it, we will ask you to ‘think aloud’.  </p>
        <p className='main-instructions-more'>What is thinking aloud?  It is a process of expressing words that track where you are in solving a problem.  For example, you could think aloud while you carry out a multiplication problem like this one ‘What is 13 x 99’?  One person might say, ‘ok, 3 times 99 – that’s 297, and then I have to add 990 to that, lets see that’s 7, 8, 10,12, 1287’.  Another might say ’99 is 1 less than 100.  1300 minus 13 is 1287’.  these two ‘think aloud’ sequences reveal different ways two people solved the same problem.</p>
        <p className='main-instructions-more'>Thinking aloud isn’t a matter of unpacking all of your thoughts in detail – it is a matter of giving clues to what is in you head.  for example, the first person did not tell us how they got 990, or that they added the 1’s first, then the twos, then added a carry to the 9 in the hundred’s column.  But with these clues we can learn much more about their thought process than if they had said nothing.</p>
        <p className='main-instructions-more'>Scientists studied thinking aloud in the 1980’s and 1990’s, and they learned a lot, but we have a lot left to learn.  One problem is that they recorded actual speech and then had to transcribe it.  Instead of that, we are looking to see if we can learn more by asking you to type quick phrases about what you are thinking. Some of us can ‘talk’ through our fingers better than others but for all of us nowadays we often share our thoughts this way, so we would like to ask you to give it a try.</p>
        <button onClick={this.goNext} className='go-next'>Next</button>
      </div>;
      if (this.state.responses[3] === 'Yes') {
      content = <div className='main-div'>
        <p className='main-instructions'>Unfortunately, you are not eligible for participation in this study, since you reported having prior experience with reasoning problems involving checkerboards and dominos.</p>
        <p className='main-instructions-more'>If you think this is a mistake, contact satojk@stanford.edu. Otherwise, please exit the study's website and do not make a second attempt at participating in it.</p>
      </div>
      }
    }
    if (this.state.page === 3) {
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
    if (this.state.page === 4) {
      content = <div className='main-div'>
        <p className='main-instructions-more'>Now, we will proceed to some final instructions before we present the puzzle we would like you to try to solve. Remember, please give us hints to what you are thinking so we can know more about how you go about solving the puzzle you are about to see!</p>
        <button onClick={this.goNext} className='go-next'>Next</button>
      </div>
    }
    if (this.state.page === 5) {
      content = <div className='main-div'>
        <p className='main-instructions'>For the first stage of this experiment, you will be asked to solve a puzzle. The instructions will first be displayed on the right side of the screen, so you should begin there.</p>
        <p className='main-instructions-more'>After you finish reading the instructions, you will find a text entry box for you to "think aloud" with on the bottom right corner of the screen, much as you did in the previous screen. Please use it similarly as described in the previous screen, giving clues to what is on your mind throughout the whole process of thinking through and solving the puzzle. If you spend a prolonged amount of time without recording a thought, a pop-up will appear on the center of the screen reminding you to record your thoughts. Please record anything that has entered your mind about the problem since the last prompt.</p>
        <p className='main-instructions-more'>Once you are ready to begin, click on “Next” below. This will take you to the puzzle. Once you begin, please dedicate your continued attention to the experiment until the end of the first part, which should take around 40 minutes more. You will be notified when the first part is over so that you may take a break if needed before proceeding to the second part of the experiment.</p>
        <button onClick={this.goNext} className='go-next'>Next</button>
      </div>;
    }
    return (
      content
    )
  }
}

export default App;
