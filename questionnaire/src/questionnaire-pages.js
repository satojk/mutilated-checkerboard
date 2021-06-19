import React from 'react';
import shuffle from 'shuffle-array';

import './questionnaire.css';

import FormQuestion from './form-question.js';

export class QuestionnairePage1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      responses: ['', '', ''],
    }
    this.updateResponse = this.updateResponse.bind(this);
    this.submitAndGoNext = this.submitAndGoNext.bind(this);
  }

  updateResponse(questionNo, newResponse) {
    let newResponses = JSON.parse(JSON.stringify(this.state.responses));
    newResponses[questionNo] = newResponse;
    this.setState({
      responses: newResponses,
    });
  }

  submitAndGoNext() {
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
    fetch('/api/postQuestionnairePage1', requestOptions);
    this.props.goNext();
    window.scrollTo(0, 0)
  }

  render() {
    const prompts = [
      'Think back to the very beginning when you were first introduced to the puzzle. What did you think and do in the first few minutes?',
      'In the first few minutes of the puzzle, what were the things you initially noticed about the puzzle and its components? List all observations you recall making initially.',
      'What approaches did you take initially, and why? List all lines of thought that you recall pursuing (in chronological order), alongside how long you pursued each of them, to the best of your recollection. Include observations which may have prompted these lines of thought, as well as observations made as you pursued these lines of thought.',
    ];
    let maySubmit = this.state.responses.reduce(
      (acc, curVal) => (acc && (curVal !== '')),
      true
    );
    let qs = prompts.map((qPrompt, ix) => <FormQuestion
      type={'text-long'}
      ix={ix}
      questionPrompt={qPrompt}
      value={this.state.responses[ix]}
      updateFunction={this.updateResponse}
    />);
    return (
      <div className='questionnaire-page'>
        <p>For these first three questions, consider solely the first stage of the puzzle, <b>before</b> you were told that it was impossible to perfectly cover all squares.</p>
        {qs}
        <button
          onClick={this.submitAndGoNext}
          className='go-next left-margin'
          disabled={!maySubmit}
        >
          Submit and go to next page
        </button>
      </div>
    )
  }
}

export class QuestionnairePage2 extends React.Component {
  constructor(props) {
    super(props);
    let responses = [];
    for (let i = 0; i < 15; i++) {
      responses.push(null)
    }
    this.state = {
      loading: true,
      hintsReceived: 0,
      responses: responses,
    }
    this.updateResponse = this.updateResponse.bind(this);
    this.submitAndGoNext = this.submitAndGoNext.bind(this);
  }

  componentDidMount() {
    fetch('/api/getCheckerboardLastState')
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          loading: false,
          hintsReceived: data.state.hintsUnlocked,
        })
      });
  }

  updateResponse(questionNo, newResponse) {
    let newResponses = JSON.parse(JSON.stringify(this.state.responses));
    newResponses[questionNo] = newResponse;
    this.setState({
      responses: newResponses,
    });
  }

  submitAndGoNext() {
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
    fetch('/api/postQuestionnairePage2', requestOptions);
    this.props.goNext();
    window.scrollTo(0, 0)
  }

  render() {
    if (this.state.loading) {
      return <p>Loading...</p>;
    }
    let ixToAdd = this.state.hintsReceived;
    let maySubmit = this.state.responses.slice(0, 10+ixToAdd).reduce(
      (acc, curVal) => (acc && (curVal !== '' && curVal !== null)),
      true
    );
    const rangeOptions = ['1', '2', '3', '4', '5']
    const rangeEndpoints = ['Strongly disagree', 'Strongly agree']
    let prompts = [
      '"Initially, I spent some time attempting to cover the entire board with dominos."',
      '"Initially, I immediately tried thinking of reasons why it would be *impossible* to cover the board with dominos."',
      '"Initially, I immediately tried thinking of reasons why it would be *possible* to cover the board with dominos."',
      '"Initially, I was unsure whether it was possible or not to cover the board with dominos."',
      '"Initially, to help me understand whether it would be possible to cover the board or not, I tried to make as many observations as I could about the problem"',
      '"In the end, I was very confident that I gave a convincing reason why the board could not be covered."',
      '"By the time I was told it was impossible to perfectly cover the board, I was already convinced that it was impossible to perfectly cover the board.',
    ];
    if (ixToAdd > 0) {
      prompts.push('"By the time the first hint was given, I had already thought about the colors of the squares." (Note: the first hint suggested that you pay attention to the colors of the squares)');
    }
    if (ixToAdd > 1) {
      prompts.push('"By the time the second hint was given, I had already noticed that there were more light squares than dark squares." (Note: the second hint suggested that you count how many squares there were of each color)');
    }
    if (ixToAdd > 2) {
      prompts.push('"By the time the third hint was given, I had already noticed that each domino covered exactly one square of each color" (Note: the third hint called attention to the fact that any domino must cover exactly one square of each color)');
    }
    prompts = prompts.concat(
      '"I persisted for too long in wrong approaches."',
      'Briefly explain your answer to question ' + (8+ixToAdd).toString() + ' above.',
      '"I felt stuck many times and/or for long periods of time."',
      'Briefly explain your answer to question ' + (10+ixToAdd).toString() + ' above',
      '"The main problem I had was realizing why it was not possible to cover the board with 31 dominoes. Once I realized why it was impossible, I was able to easily explain the reason why I knew it was impossible."',
      'Briefly explain your answer to question ' + (12+ixToAdd).toString() + ' above.',
      '"The main difficulty of the puzzle was phrasing the argument, rather than discovering the right way to see the problem."',
      'Briefly explain your answer to question ' + (14+ixToAdd).toString() + ' above.'
    )
    let questions = prompts.map((questionPrompt, ix) => (
      ix === (8+ixToAdd) || ix === (10+ixToAdd) || ix === (12+ixToAdd) || ix === (14+ixToAdd) ?
      <FormQuestion
        key={'2-' + ix.toString()}
        type={'text-short'}
        ix={ix}
        questionPrompt={questionPrompt}
        value={this.state.responses[ix]}
        updateFunction={this.updateResponse}
      /> :
      <FormQuestion
        key={'2-' + ix.toString()}
        type={'range'}
        ix={ix}
        questionPrompt={questionPrompt}
        options={rangeOptions}
        endpoints={rangeEndpoints}
        value={this.state.responses[ix]}
        updateFunction={this.updateResponse}
      />
    ));

    let timeSpecificQuestions = 2 + ixToAdd;

    return (
      <div className='questionnaire-page'>
      <p>Each of the questions in this page gives you a statement in quotes. For each question, please mark the answer corresponding to how much you agree with the given statement.</p>
      <p>The first 5 questions refer to the beginning of the first stage of the puzzle, <b>before</b> you were told that it was impossible to perfectly cover all squares.</p>
      {questions.slice(0, 5)}
      <p className='questionnaire-intermission-p'>For the next {timeSpecificQuestions} questions, consider the moment specified in each question.</p>
      {questions.slice(5, 7+ixToAdd)}
      <p className='questionnaire-intermission-p'>For the remaining questions, consider the entirety of your experience solving the puzzle.</p>
      {questions.slice(7+ixToAdd)}

        <button
          onClick={this.submitAndGoNext}
          className='go-next left-margin'
          disabled={!maySubmit}
        >
          Submit and go to next page
        </button>
      </div>
    )
  }
}

export class QuestionnairePage3 extends React.Component {
  constructor(props) {
    super(props);
    let q1Options = [
      '"It would be possible and easy to cover the board if the two removed squares were of non-diagonally-opposite corners (e.g. top right and bottom right)."',
      '"A domino must cover, specifically, two abutting squares."',
      '"There were 62 squares to cover, so you would need exactly 31 dominos."',
      '"Adjacent squares are always of opposite colors."',
      '"If you could cover two diagonally-adjacent blocks, the problem would be easy."',
      '"You could, in principle, try every covering possible and find the answer, but that would take too long."',
      '"Both removed squares were light-colored squares."',
      '"31 is an odd number."',
      '"It would be possible and easy to cover the board if the two removed squares were abutting squares"',
      '"The solution to the problem must not depend on the colors used. That is, the colors of the squares should have no influence on whether it is possible or impossible to cover them."',
      '"It is possible to arrange the 62 squares such that one could cover them with 31 dominos (for example, if they were all in a single long row, it would be easy to cover them with dominos)."',
      '"Whenever you attempt to cover the 62 squares, the last 2 remaining squares are always of the same color."',
      '"The full board would have had 64 squares, and 64 is 2 to the power of 6."',
    ];
    shuffle(q1Options);
    this.state = {
      responses: [null, null, null, null, null, null, null, null, null, null, null, null, null, '', null],
      q1Options: q1Options,
      nextQ1Option: 0,
    }
    this.updateResponse = this.updateResponse.bind(this);
    this.submitAndGoNext = this.submitAndGoNext.bind(this);
  }

  updateResponse(questionNo, newResponse) {
    let newResponses = JSON.parse(JSON.stringify(this.state.responses));
    newResponses[questionNo] = newResponse;
    this.setState({
      responses: newResponses,
    });
  }

  submitAndGoNext() {
    let responses = JSON.parse(JSON.stringify(this.state));
    let postBody = {
      submissionTime: Date.now(),
      responses: responses,
    }
    let requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(postBody),
    };
    fetch('/api/postQuestionnairePage3', requestOptions);
    requestOptions.body = '{}';
    fetch('/api/postStage2EndTimestamp', requestOptions);
    this.props.goNext();
    window.scrollTo(0, 0)
  }

  render() {
    const rangeOptions = ['1', '2', '3', '4', '5']
    const rangeEndpoints = ['Strongly disagree', 'Strongly agree']
    const prompts = [
      'Below we will present 13 possible observations about the puzzle in quotes, one at a time. For each observation, click "Yes" if you were aware of it and thought about it at some point during solving the puzzle (NOT while reading these now), or "No" if you did not think about it during solving the puzzle.',
      'Please list any other observations which you attended to and thought about during the process of solving the problem. Please try to think of as many as you can and be as thorough as possible.',
      'How strongly do you agree with the following statement in quotes? "I actively attempted to make general observations about the problem like those in the list above."',
    ];
    let maySubmit = this.state.responses.reduce(
      (acc, curVal) => (acc && (curVal !== '' && curVal !== null)),
      true
    );
    let observationQuestions = this.state.q1Options.map((observation, ix) => <FormQuestion
      key={'observation-question' + ix.toString()}
      questionPrompt={observation}
      options={['Yes', 'No']}
      value={this.state.responses[ix]}
      updateFunction={this.updateResponse}
      type={'radio'}
      ix={ix}
      prefix={'1.'}
      dummy={ix > 0 && this.state.responses[ix-1] === null}
    />);

    return (
      <div className='questionnaire-page'>
        <p>Recall that two squares are said to be “abutting” if they share a common side.</p>
        <p>For the questions on this page, consider the entirety of your experience solving the puzzle.</p>
        <FormQuestion
          type={'prompt'}
          ix={0}
          questionPrompt={prompts[0]}
        />
        {observationQuestions}

        <FormQuestion
          type={'text-long'}
          ix={13}
          displayIx={2}
          questionPrompt={prompts[1]}
          value={this.state.responses[13]}
          updateFunction={this.updateResponse}
          dummy={this.state.responses[12] === null}
        />
        <FormQuestion
          key={'3-3'}
          type={'range'}
          ix={14}
          displayIx={3}
          questionPrompt={prompts[2]}
          options={rangeOptions}
          endpoints={rangeEndpoints}
          value={this.state.responses[14]}
          updateFunction={this.updateResponse}
          dummy={this.state.responses[12] === null}
        />
        <button
          onClick={this.submitAndGoNext}
          className='go-next left-margin'
          disabled={!maySubmit}
        >
          Submit and go to next page
        </button>
      </div>
    )
  }
}
