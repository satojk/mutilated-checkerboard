import React from 'react';

import FormQuestion from './form-question.js';

import './tests.css';

export class NonsenseSyllogismsInstructions extends React.Component {
  constructor(props) {
    let responses = [];
    for (let i = 0; i < 7; i++) {
      if (i === 0) {
        responses.push(0);
      }
      else if (i === 1) {
        responses.push(1);
      }
      else {
        responses.push(null);
      }
    }
    super(props);
    this.state = {
      responses: responses,
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
    fetch('/api/postTestsNonsenseSyllogismsInstructions', requestOptions);
    this.props.goNext();
    window.scrollTo(0, 0)
  }

  render() {
    let maySubmit = true;
    const options = [
      'Good reasoning.',
      'Poor reasoning,',
      'Skip.'
    ];
    const prompts = [
      'All trees are fish. All fish are horses.\nTherefore all trees are horses.',
      'All trees are fish. All fish are horses.\nTherefore all horses are trees.',
      'Some swimming pools are mountains. All mountains like cats.\nTherefore all swimming pools like cats.',
      'All swimming pools are mountains. All mountains like cats.\nTherefore all swimming pools like cats.',
      'All elephants can fly. All giants are elephants.\nTherefore all giants can fly.',
      'Some carrots are sports cars. Some sports cars play the piano.\nTherefore some carrots play the piano.',
      'No two flowers look exactly the same. Roses and tulips look exactly the same.\nTherefore roses and tulips are not two flowers.',
    ];
    let questions = prompts.map((questionPrompt, ix) => (
      <FormQuestion
        key={'nonsense-instructions-' + ix.toString()}
        type={'radio'}
        ix={ix}
        questionPrompt={questionPrompt}
        options={options}
        value={this.state.responses[ix]}
        updateFunction={this.updateResponse}
        fixed={ix === 0 || ix === 1}
      />
    ));
    return (
      <div style={{display: 'flex'}}>
        <div className='test-instructions'>
          <h3>Nonsense Syllogisms Test - Instructions</h3>
          <p>This is a test of your ability to tell whether the conclusion drawn from certain statements is correct or incorrect. Although all of the statements are really nonsense, you are to assume that the first two statements in each problem are correct. the conclusion drawn from them may or may not show good reasoning. You are to think only about the <u>reasoning</u>.</p>
          <p>If the conclusion drawn from the statements shows <u>good reasoning</u>, select option "Good reasoning.". If the conclusion drawn from the statements shows <u>poor reasoning</u>, select option "Poor reasoning.". If you are not sure and would prefer not to guess, select option "Skip".</p>
          <p>Your score on this test will be the number marked correctly minus the number marked incorrectly. Therefore, it will not be to your advantage to guess unless you have some idea whether the reasoning is good or bad.</p>
          <p>Now try the practice problems given on the right. The first two syllogisms have been correctly marked.</p>

          <p>The answers to the other five problems are as follows: 3 is Poor reasoning; 4 is Good reasoning; 5 is Good reasoning; 6 is Poor reasoning; 7 is Good reasoning.</p>
          <p>You will have <u>4 minutes</u> for each of the two parts of this test. Each part consists of one page with 15 problems. Click on "Next" to go to the first part (this will start the timer).</p>
          <p className='timer'>Time remaining: {this.props.minutes}:{this.props.seconds} (stopped)</p>
          <button
            onClick={this.submitAndGoNext}
            className='go-next'
            disabled={!maySubmit}
          >
            Next
          </button>
        </div>

        <div className='test-work-area'>
          <h3>Sample Questions</h3>
          {questions}
        </div>

      </div>
    );
  }
}

export class NonsenseSyllogismsPartA extends React.Component {
  constructor(props) {
    let responses = [];
    for (let i = 0; i < 15; i++) {
      responses.push(null);
    }
    super(props);
    this.state = {
      responses: responses,
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
    fetch('/api/postTestsNonsenseSyllogismsPartA', requestOptions);
    this.props.goNext();
    window.scrollTo(0, 0)
  }

  render() {
    let maySubmit = this.props.minutes <= 0 && this.props.seconds <= 0;
    const options = [
      'Good reasoning.',
      'Poor reasoning,',
      'Skip.'
    ];
    const prompts = [
      'All birds have purple tails. All cats are birds.\nTherefore all cats have purple tails.',
      'No singer is a pogo stick. All pogo sticks are movie stars.\nTherefore no singer is a movie star.',
      'All cars have sails. Some swimming pools are cars.\nTherefore some swimming pools have sails.',
      'No chipmunks are clowns. Some mushrooms are chipmunks.\nTherefore some mushrooms are not clowns.',
      'No skunks have green toes. All skunks are pigs.\nTherefore no pig has green toes.',
      'All horses have wings. No turtle has wings.\nTherefore no turtle is a horse.',
      'No hummingbirds fly. Some tractors fly.\nTherefore some tractors are not hummingbirds.',
      'All apes are houseflies. Some houseflies are not snails.\nTherefore some apes are not snails.',
      'Some dogs like to sing. All dogs are snowdrifts.\nTherefore some snowdrifts like to sing.',
      'All doctors are sea horses. Some doctors are tornadoes.\nTherefore some tornadoes are sea horses.',
      'Some people who like Alice do not like Robert. Everyone who likes Sue likes Alice.\nTherefore some people who like Robert do not like Sue.',
      'All trains are coal mines. Nothing above 5,000 feet is a train.\nTherefore no coal mine is above 5,000 feet.',
      'Some men are purple. Everything which is purple is a horse..\nTherefore some horses are men.',
      'Some dogs are seals. Some seals bark.\nTherefore some dogs bark.',
      'All elephants are pink. This animal is pink.\nTherefore this animal is an elephant.',
    ];
    let questions = prompts.map((questionPrompt, ix) => (
      <FormQuestion
        key={'nonsense-partA-' + ix.toString()}
        type={'radio'}
        ix={ix}
        questionPrompt={questionPrompt}
        options={options}
        value={this.state.responses[ix]}
        updateFunction={this.updateResponse}
      />
    ));
    let content = (maySubmit ?
      <p>Time is up! Click on "Next" on the left. This will take you to the second part of this test, and restart the timer.</p> :
      questions);

    return (
      <div style={{display: 'flex'}}>
        <div className='test-instructions'>
          <h3>Nonsense Syllogisms Test - Part 1</h3>
          <p>This page contains questions 1 to 15 (notice the scrollbar on the right).</p>
          <p className='timer'>Time remaining: {this.props.minutes}:{this.props.seconds}</p>
          <button
            onClick={this.submitAndGoNext}
            className='go-next'
            disabled={!maySubmit}
          >
            Next
          </button>
          <p>(you may only proceed after the time is over)</p>
        </div>

        <div className='test-work-area'>
          {content}
        </div>

      </div>
    )
  }
}

export class NonsenseSyllogismsPartB extends React.Component {
  constructor(props) {
    let responses = [];
    for (let i = 0; i < 15; i++) {
      responses.push(null);
    }
    super(props);
    this.state = {
      responses: responses,
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
    fetch('/api/postTestsNonsenseSyllogismsPartB', requestOptions);
    this.props.goNext();
    window.scrollTo(0, 0)
  }

  render() {
    let maySubmit = this.props.minutes <= 0 && this.props.seconds <= 0;
    const options = [
      'Good reasoning.',
      'Poor reasoning,',
      'Skip.'
    ];
    const prompts = [
      'No one with a pink nose can be president. All men have pink noses.\nTherefore no man can be president.',
      'All alligators are art collectors. Some art collectors live in caves.\nTherefore some alligators live in caves.',
      'No cats are electrified. All ghosts are electrified.\nTherefore no ghost is a cat.',
      'All birds are snakes. No bird is left-handed.\nTherefore nothing that is left-handed is a snake.',
      'All lions are lavender. Some cowards are not lavender.\nTherefore some cowards are not lions.',
      'All ice skates are totem poles. No totem pole snores.\nTherefore nothing that snores is an ice skate.',
      'Some birds are pink. All hurricanes are pink.\nTherefore some birds are hurricanes.',
      'All monkeys are pineapples. All pineapples have wings and all birds have a tail and wings.\nTherefore all monkeys have a tail.',
      'No onions are parsnips. Some parsnips are tangerines.\nTherefore some tangerines are not onions.',
      'Some kettles are giraffes. All zebras are kettles.\nTherefore some giraffes are zebras.',
      'All dogs are ink bottles. Some ink bottles are squirrels.\nTherefore some squirrels are dogs.',
      'Some people in our town are not famous. Everyone in our town is rich.\nTherefore some rich people are not famous.',
      'No one who has green hair is a teenager. Some people who have green hair drink milk.\nTherefore some people who drink milk are not teenagers.',
      'Los Angeles has fewer people than Detroit. Detroit has more people than East Overshoe.\nTherefore East Overshoe has more people than Los Angeles.',
      'Some soldiers who were in the Civil War used green peaches for gunpowder. This soldier uses green peaches for gunpowder.\nTherefore he must have been in the Civil War.',
    ];
    let questions = prompts.map((questionPrompt, ix) => (
      <FormQuestion
        key={'nonsense-partB-' + (ix).toString()}
        type={'radio'}
        ix={ix}
        ixOffset={15}
        questionPrompt={questionPrompt}
        options={options}
        value={this.state.responses[ix]}
        updateFunction={this.updateResponse}
      />
    ));
    let content = (maySubmit ?
      <p>Time is up! Click on "Next" on the left. This will take you to the instructions for the second test.</p> :
      questions);

    return (
      <div style={{display: 'flex'}}>
        <div className='test-instructions'>
          <h3>Nonsense Syllogisms Test - Part 2</h3>
          <p>This page contains questions 16 to 30 (notice the scrollbar on the right).</p>
          <p className='timer'>Time remaining: {this.props.minutes}:{this.props.seconds}</p>
          <button
            onClick={this.submitAndGoNext}
            className='go-next'
            disabled={!maySubmit}
          >
            Next
          </button>
          <p>(you may only proceed after the time is over)</p>
        </div>

        <div className='test-work-area'>
          {content}
        </div>

      </div>
    )
  }
}
