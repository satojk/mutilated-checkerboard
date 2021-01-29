import React from 'react';

import './questionnaire.css';

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
      content = <div>
        <form>
          <label for='1'>Think back to the first few minutes after you were introduced to the puzzle. What did you first notice about the puzzle and its components? List all observations you recall making initially.</label><br />
          <textarea className='long-answer' id='1' name='1' />
          <br /> <br />

          <label for='2'>What strategy did you initially pursue, and why? For approximately how long did you persist in this strategy? When and why did you decide to switch strategies?</label><br />
          <textarea className='long-answer' id='2' name='2' />
          <br /> <br />

          <label for='3'>After giving up on your initial strategy, what else did you attempt? List all lines of thought that you recall pursuing, roughly in chronological order. Include observations which may have prompted these lines of thought, as well as observations made as you pursued these lines of thought.</label><br />
          <input className='long-answer' type='text' id='3' name='3' />
          <br />
        </form>
        <div className='main-div'>
          <button onClick={() => this.goNext()} className='go-next left-margin'>Next</button>
        </div>
      </div>
    }
    else if (this.state.screenNo === 2) {
      content = <div className='main-div'>
        <form className='narrow'>
          <label for='1'>How much do you agree with the following statement? "Initially, I spent some time attempting to cover the entire board with dominos."</label><br /><br />
          <div className='range-input-wrapper'>
            <span>Strongly disagree</span>
            <input className='range-input' type='range' id='1' name='1' min='1' max='5' step='1'/>
            <span>Strongly agree</span>
          </div>

          <br /><br /><br /><br /><br />

          <label for='2'>How much do you agree with the following statement? "Initially, I immediately tried thinking of reasons why it would be *impossible* to cover the board with dominos."</label><br /><br />
          <div className='range-input-wrapper'>
            <span>Strongly disagree</span>
            <input className='range-input' type='range' id='2' name='2' min='1' max='5' step='1'/>
            <span>Strongly agree</span>
          </div>

          <br /><br /><br /><br /><br />

          <label for='3'>How much do you agree with the following statement? "Initially, I immediately tried thinking of reasons why it would be *possible* to cover the board with dominos."</label><br /><br />
          <div className='range-input-wrapper'>
            <span>Strongly disagree</span>
            <input className='range-input' type='range' id='3' name='3' min='1' max='5' step='1'/>
            <span>Strongly agree</span>
          </div>

          <br /><br /><br /><br /><br />

          <label for='4'>How much do you agree with the following statement? "Initially, I was unsure whether it was possible or not to cover the board with dominos, and so I tried to explore by thinking more about the board and the dominos."</label><br /><br />
          <div className='range-input-wrapper'>
            <span>Strongly disagree</span>
            <input className='range-input' type='range' id='4' name='4' min='1' max='5' step='1'/>
            <span>Strongly agree</span>
          </div>

          <br /><br /><br /><br /><br />

          <label for='5'>How much do you agree with the following statement? "By the time the first hint was given, I had already stopped trying to find a valid covering." (Note: the first hint stated that a board covering was, indeed, impossible. Skip this question if you did not receive this hint.)</label><br /><br />
          <div className='range-input-wrapper'>
            <span>Strongly disagree</span>
            <input className='range-input' type='range' id='5' name='5' min='1' max='5' step='1'/>
            <span>Strongly agree</span>
          </div>

          <br /><br /><br /><br /><br />

          <label for='6'>How much do you agree with the following statement? "By the time the second hint was given, I had already thought about the colors of the squares." (Note: the second hint suggested that you pay attention to the colors of the squares. Skip this question if you did not receive this hint.)</label><br /><br />
          <div className='range-input-wrapper'>
            <span>Strongly disagree</span>
            <input className='range-input' type='range' id='6' name='6' min='1' max='5' step='1'/>
            <span>Strongly agree</span>
          </div>

          <br /><br /><br /><br /><br />

          <label for='7'>How much do you agree with the following statement? "By the time the third hint was given, I had already noticed that there were more light squares than dark squares." (Note: the third hint suggested that you count how many squares there were of each color. Skip this question if you did not receive this hint.)</label><br /><br />
          <div className='range-input-wrapper'>
            <span>Strongly disagree</span>
            <input className='range-input' type='range' id='7' name='7' min='1' max='5' step='1'/>
            <span>Strongly agree</span>
          </div>

          <br /><br /><br /><br /><br />

          <label for='8'>How much do you agree with the following statement? "By the time the third hint was given, I had already noticed that each domino covered exactly one square of each color" (Note: the third hint suggested that you count how many squares there were of each color. Skip this question if you did not receive this hint.)</label><br /><br />
          <div className='range-input-wrapper'>
            <span>Strongly disagree</span>
            <input className='range-input' type='range' id='8' name='8' min='1' max='5' step='1'/>
            <span>Strongly agree</span>
          </div>

          <br /><br /><br /><br /><br />

          <label for='9'>How much do you agree with the following statement? "I persisted for too long in wrong approaches."</label><br /><br />
          <div className='range-input-wrapper'>
            <span>Strongly disagree</span>
            <input className='range-input' type='range' id='9' name='9' min='1' max='5' step='1'/>
            <span>Strongly agree</span>
          </div>

          <br /><br /><br /><br /><br />

          <label for='9x'>Briefly explain your answer to the above.</label><br />
          <textarea className='short-answer' id='9x' name='9x' />

          <br /> <br /><br /><br /><br />

          <label for='10'>How much do you agree with the following statement? "I felt stuck many times and/or for long periods of time."</label><br /><br />
          <div className='range-input-wrapper'>
            <span>Strongly disagree</span>
            <input className='range-input' type='range' id='10' name='10' min='1' max='5' step='1'/>
            <span>Strongly agree</span>
          </div>

          <br /><br /><br /><br /><br />

          <label for='10x'>Briefly explain your answer to the above.</label><br />
          <textarea className='short-answer' id='10x' name='10x' />

          <br /> <br /><br /><br /><br />

          <label for='11'>How much do you agree with the following statement? "I felt stuck many times and/or for long periods of time."</label><br /><br />
          <div className='range-input-wrapper'>
            <span>Strongly disagree</span>
            <input className='range-input' type='range' id='11' name='11' min='1' max='5' step='1'/>
            <span>Strongly agree</span>
          </div>

          <br /><br /><br /><br /><br />

          <label for='11x'>Briefly explain your answer to the above.</label><br />
          <textarea className='short-answer' id='11x' name='11x' />
        </form>
        <div className='main-div'>
          <button onClick={() => this.goNext()} className='go-next left-margin'>Next</button>
        </div>
      </div>;
    }
    else if (this.state.screenNo === 3) {
      content = <div className='main-div'>
        <form className='narrow'>
          <p>Each item contains some possible observation about the puzzle. Check all observations which you made and were aware of at some point during solving the puzzle (<b>not</b> while reading these now).</p><br /><br />
          <input type='checkbox' id='1' name='1' value='1' />
          <label for='1'>It would be possible and easy to cover the board if the two removed squares were of non-diagonally-opposite corners (e.g. top right and bottom right).</label><br /><br />
          <input type='checkbox' id='2' name='2' value='2' />
          <label for='2'>A domino must cover, specifically, two adjacent squares.</label><br /><br />
          <input type='checkbox' id='3' name='3' value='3' />
          <label for='3'>There were 62 squares to cover, so you would need exactly 31 dominos.</label><br /><br />
          <input type='checkbox' id='4' name='4' value='4' />
          <label for='4'>Adjacent squares are always of opposite colors.</label><br /><br />
          <input type='checkbox' id='5' name='5' value='5' />
          <label for='5'>If you could cover two diagonally-adjacent blocks, the problem would be easy.</label><br /><br />
          <input type='checkbox' id='6' name='6' value='6' />
          <label for='6'>You could, in principle, try every covering possible and find the answer, but that would take too long.</label><br /><br />
          <input type='checkbox' id='7' name='7' value='7' />
          <label for='7'>It would be possible and easy to cover the board if the two removed squares were of non-diagonally-opposite corners (e.g. top right and bottom right).</label><br /><br />
          <input type='checkbox' id='8' name='8' value='8' />
          <label for='8'>Both removed squares were light-colored squares.</label><br /><br />
          <input type='checkbox' id='9' name='9' value='9' />
          <label for='9'>31 is an odd number.</label><br /><br />
          <input type='checkbox' id='10' name='10' value='10' />
          <label for='10'>It would be possible and easy to cover the board if the two removed squares were adjacent to each other.</label><br /><br />
          <input type='checkbox' id='11' name='11' value='11' />
          <label for='11'>The solution to the problem must not depend on the colors used. That is, even if all squares were of the same color, the solution would have to be the same.</label><br /><br />
          <input type='checkbox' id='12' name='12' value='12' />
          <label for='12'>If the board were some specific different shape, the problem would be easy.</label><br /><br />
          <input type='checkbox' id='13' name='13' value='13' />
          <label for='13'>Whenever you attempt to cover the 62 squares, there are always 2 remaining squares of the same color.</label><br /><br />
          <input type='checkbox' id='14' name='14' value='14' />
          <label for='14'>The full board would have had 64 squares, and 64 is 2 to the power of 6.</label><br /><br /><br /><br />
          <label for='15'>Are there other facts about the problem which you attended to and thought about during the process of solving the problem? What were they? Did you actively search for aspects of the problem such as these? How long did you spend thinking of them?</label><br />
          <textarea className='long-answer' id='15' name='15' />
          <br /> <br />
        </form>
        <div className='main-div'>
          <button onClick={() => this.goNext()} className='go-next left-margin'>Next</button>
        </div>
      </div>
    }
    else {
      content = <p className='main-instructions'>You have now completed the second stage of the experiment. Thank you very much! <a href='/main'>Click here to go to the final stage of the experiment</a>.</p>;
    }

    return (
      <div>
        {content}
      </div>
    )
  }
}

export default App;
