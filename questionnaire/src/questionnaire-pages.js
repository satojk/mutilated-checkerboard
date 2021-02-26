import React from 'react';

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
      'Think back to the first few minutes after you were introduced to the puzzle. What did you first notice about the puzzle and its components? List all observations you recall making initially.',
      'What strategy did you initially pursue, and why? For approximately how long did you persist in this strategy? When and why did you decide to switch strategies?',
      'After giving up on your initial strategy, what else did you attempt? List all lines of thought that you recall pursuing, roughly in chronological order. Include observations which may have prompted these lines of thought, as well as observations made as you pursued these lines of thought.',
    ];
    let maySubmit = this.state.responses.reduce(
      (acc, curVal) => (acc && curVal !== ''),
      true
    );
    return (
      <div className='questionnaire-page'>
        <FormQuestion
          type={'text-long'}
          ix={0}
          questionPrompt={prompts[0]}
          value={this.state.responses[0]}
          updateFunction={this.updateResponse}
        />

        <FormQuestion
          type={'text-long'}
          ix={1}
          questionPrompt={prompts[1]}
          value={this.state.responses[1]}
          updateFunction={this.updateResponse}
        />

        <FormQuestion
          type={'text-long'}
          ix={2}
          questionPrompt={prompts[2]}
          value={this.state.responses[2]}
          updateFunction={this.updateResponse}
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

export class QuestionnairePage2 extends React.Component {
  constructor(props) {
    super(props);
    let responses = [];
    for (let i = 0; i < 14; i++) {
      responses.push(null)
    }
    this.state = {
      loading: false,
      hintsReceived: 2,
      responses: responses,
    }
    this.updateResponse = this.updateResponse.bind(this);
    this.submitAndGoNext = this.submitAndGoNext.bind(this);
  }

  /*
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
  */

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
    if (ixToAdd === 2) {
      ixToAdd = 3;
    }
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
      '"Initially, I was unsure whether it was possible or not to cover the board with dominos, and so I tried to explore by thinking more about the board and the dominos."',
    ];
    if (ixToAdd > 0) {
      prompts.push('"By the time the first hint was given, I had already thought about the colors of the squares." (Note: the first hint suggested that you pay attention to the colors of the squares)');
    }
    if (ixToAdd > 1) {
      prompts.push('"By the time the second hint was given, I had already noticed that there were more light squares than dark squares." (Note: the second hint suggested that you count how many squares there were of each color)');
      prompts.push('"By the time the second hint was given, I had already noticed that each domino covered exactly one square of each color" (Note: the second hint suggested that you count how many squares there were of each color)');
    }
    prompts = prompts.concat(
      '"I persisted for too long in wrong approaches."',
      'Briefly explain your answer to question ' + (5+ixToAdd).toString() + ' above.',
      '"I felt stuck many times and/or for long periods of time."',
      'Briefly explain your answer to question ' + (7+ixToAdd).toString() + ' above',
      '"The main difficulty of the puzzle was formulating the logical argument, rather than exploring new ways to see the problem."',
      'Briefly explain your answer to question ' + (9+ixToAdd).toString() + ' above.'
    )
    let questions = prompts.map((questionPrompt, ix) => (
      ix === (5+ixToAdd) || ix === (7+ixToAdd) || ix === (9+ixToAdd) ?
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

    return (
      <div className='questionnaire-page'>
      <p>Each of the questions in this page gives you a statement in quotes. For each question, please mark the answer corresponding to how much you agree with the given statement.</p>
      {questions}

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
    this.state = {
      responses: [[], ''],
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
    const prompts = [
      'Each item contains some possible observation about the puzzle. Check all observations which you made and were aware of at some point during solving the puzzle (NOT while reading these now).',
      'Are there other observations about the problem which you attended to and thought about during the process of solving the problem? What were they? Did you actively search for aspects of the problem such as these? How long did you spend thinking of them?',
    ];
    const firstQuestionOptions = [
      'It would be possible and easy to cover the board if the two removed squares were of non-diagonally-opposite corners (e.g. top right and bottom right).',
      'A domino must cover, specifically, two adjacent squares.',
      'There were 62 squares to cover, so you would need exactly 31 dominos.',
      'Adjacent squares are always of opposite colors.',
      'If you could cover two diagonally-adjacent blocks, the problem would be easy.',
      'You could, in principle, try every covering possible and find the answer, but that would take too long.',
      'Both removed squares were light-colored squares.',
      '31 is an odd number.',
      'It would be possible and easy to cover the board if the two removed squares were adjacent to each other.',
      'The solution to the problem must not depend on the colors used. That is, even if all squares were of the same color, the solution would have to be the same.',
      'If the board were some specific different shape, the problem would be easy.',
      'Whenever you attempt to cover the 62 squares, there are always 2 remaining squares of the same color.',
      'The full board would have had 64 squares, and 64 is 2 to the power of 6.',
    ];
    let maySubmit = this.state.responses.reduce(
      (acc, curVal) => (acc && (curVal !== '' && curVal !== null)),
      true
    );
    return (
      <div className='questionnaire-page'>
        <FormQuestion
          type={'checkbox'}
          ix={0}
          questionPrompt={prompts[0]}
          value={this.state.responses[0]}
          options={firstQuestionOptions}
          updateFunction={this.updateResponse}
        />

        <FormQuestion
          type={'text-long'}
          ix={1}
          questionPrompt={prompts[1]}
          value={this.state.responses[1]}
          updateFunction={this.updateResponse}
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
