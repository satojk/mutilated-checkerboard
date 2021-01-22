import React from 'react';

import './tests.css';

export class NonsenseSyllogismsInstructions extends React.Component {
  render() {
    return (
      <div style={{display: 'flex'}}>
        <div className='test-instructions'>
          <h3>Nonsense Syllogisms Test - Instructions</h3>
          <p>This is a test of your ability to tell whether the conclusion drawn from certain statements is correct or incorrect. Although all of the statements are really nonsense, you are to assume that the first two statements in each problem are correct. the conclusion drawn from them may or may not show good reasoning. You are to think only about the <u>reasoning</u>.</p>
          <p>If the conclusion drawn from the statements shows <u>good reasoning</u>, select option "Good reasoning.". If the conclusion drawn from the statements shows <u>poor reasoning</u>, select option "Poor reasoning.".</p>
          <p>Your score on this test will be the number marked correctly minus the number marked incorrectly. Therefore, it will not be to your advantage to guess unless you have some idea whether the reasoning is good or bad.</p>
          <p>Now try the practice problems given on the right. The first two syllogisms have been correctly marked.</p>

          <p>The answers to the other five problems are as follows: 3 is Poor reasoning; 4 is Good reasoning; 5 is Good reasoning; 6 is Poor reasoning; 7 is Good reasoning.</p>
          <p>You will have <u>4 minutes</u> for each of the two parts of this test. Each part has 1 page. Click on "Next" to go to the first part (this will start the timer).</p>
          <p className='timer'>Time remaining: {this.props.minutes}:{this.props.seconds} (stopped)</p>
          <button onClick={this.props.goNext} className='go-next'>Next</button>
        </div>

        <div className='syllogisms'>
          <h3>Sample Questions</h3>
          <form>
            <label for='1'><b>1.</b> All trees are fish. All fish are horses.<br />Therefore all trees are horses.</label><br />
            <input type='radio' id='1g' name='1' value='1g' checked/>
            <label for='1g'>Good reasoning.</label><br />
            <input type='radio' id='1p' name='1' value='1p' disabled/>
            <label for='1p'>Poor reasoning.</label><br />

            <br />

            <label for='2'><b>2.</b> All trees are fish. All fish are horses.<br />Therefore all horses are trees.</label><br />
            <input type='radio' id='2g' name='2' value='2g' disabled/>
            <label for='2g'>Good reasoning.</label><br />
            <input type='radio' id='2p' name='2' value='2p' checked/>
            <label for='2p'>Poor reasoning.</label><br />

            <br />

            <label for='3'><b>3.</b> Some swimming pools are mountains. All mountains like cats.<br />Therefore all swimming pools like cats.</label><br />
            <input type='radio' id='3g' name='3' value='3g' />
            <label for='3g'>Good reasoning.</label><br />
            <input type='radio' id='3p' name='3' value='3p' />
            <label for='3p'>Poor reasoning.</label><br />

            <br />

            <label for='4'><b>4.</b> All swimming pools are mountains. All mountains like cats.<br />Therefore all swimming pools like cats.</label><br />
            <input type='radio' id='4g' name='4' value='4g' />
            <label for='4g'>Good reasoning.</label><br />
            <input type='radio' id='4p' name='4' value='4p' />
            <label for='4p'>Poor reasoning.</label><br />

            <br />

            <label for='5'><b>5.</b> All elephants can fly. All giants are elephants.<br />Therefore all giants can fly.</label><br />
            <input type='radio' id='5g' name='5' value='5g' />
            <label for='5g'>Good reasoning.</label><br />
            <input type='radio' id='5p' name='5' value='5p' />
            <label for='5p'>Poor reasoning.</label><br />

            <br />

            <label for='6'><b>6.</b> Some carrots are sports cars. Some sports cars play the piano.<br />Therefore some carrots play the piano.</label><br />
            <input type='radio' id='6g' name='6' value='6g' />
            <label for='6g'>Good reasoning.</label><br />
            <input type='radio' id='6p' name='6' value='6p' />
            <label for='6p'>Poor reasoning.</label><br />

            <br />

            <label for='7'><b>7.</b> No two flowers look exactly the same. Roses and tulips look exactly the same.<br />Therefore roses and tulips are not two flowers.</label><br />
            <input type='radio' id='7g' name='7' value='7g' />
            <label for='7g'>Good reasoning.</label><br />
            <input type='radio' id='7p' name='7' value='7p' />
            <label for='7p'>Poor reasoning.</label><br />
          </form>
        </div>

      </div>
    )
  }
}

export class NonsenseSyllogismsPartA extends React.Component {
  render() {
    return (
      <div>
        <div className='test-part'>
          <h3>Nonsense Syllogisms Test - Part 1</h3>
          <p>Select "Good reasoning" if the conclusion shows good reasoning. Select "Poor reasoning" if it is poor reasoning.</p>
          <p className='timer'>Time remaining: {this.props.minutes}:{this.props.seconds}</p>
          <button onClick={this.props.goNext} className='go-next'>Next</button>
        </div>

        <div>
          <form className='syllogisms'>
            <div className='syllogism-box'>
              <label for='1'><b>1.</b> All birds have purple tails. All cats are birds.<br />Therefore all cats have purple tails.</label><br />
              <input type='radio' id='1g' name='1' value='1g' />
              <label for='1g'>Good reasoning.</label><br />
              <input type='radio' id='1p' name='1' value='1p' />
              <label for='1p'>Poor reasoning.</label><br />
            </div>

            <br />

            <div className='syllogism-box'>
              <label for='2'><b>2.</b> No singer is a pogo stick. All pogo sticks are movie starts.<br />Therefore no singer is a movie star.</label><br />
              <input type='radio' id='2g' name='2' value='2g' />
              <label for='2g'>Good reasoning.</label><br />
              <input type='radio' id='2p' name='2' value='2p' />
              <label for='2p'>Poor reasoning.</label><br />
            </div>

            <br />

            <div className='syllogism-box'>
              <label for='3'><b>3.</b> All cars have sails. Some swimming pools are cars.<br />Therefore some swimming pools have sails.</label><br />
              <input type='radio' id='3g' name='3' value='3g' />
              <label for='3g'>Good reasoning.</label><br />
              <input type='radio' id='3p' name='3' value='3p' />
              <label for='3p'>Poor reasoning.</label><br />
            </div>

            <br />

            <div className='syllogism-box'>
              <label for='4'><b>4.</b> No chipmunks are clowns. Some mushrooms are chipmunks.<br />Therefore some mushrooms are not clowns.</label><br />
              <input type='radio' id='4g' name='4' value='4g' />
              <label for='4g'>Good reasoning.</label><br />
              <input type='radio' id='4p' name='4' value='4p' />
              <label for='4p'>Poor reasoning.</label><br />
            </div>

            <br />

            <div className='syllogism-box'>
              <label for='5'><b>5.</b> No skunks have green toes. All skunks are pigs.<br />Therefore no pig has green toes.</label><br />
              <input type='radio' id='5g' name='5' value='5g' />
              <label for='5g'>Good reasoning.</label><br />
              <input type='radio' id='5p' name='5' value='5p' />
              <label for='5p'>Poor reasoning.</label><br />
            </div>

            <br />

            <div className='syllogism-box'>
              <label for='6'><b>6.</b> All horses have wings. No turtle has wings.<br />Therefore no turtle is a horse.</label><br />
              <input type='radio' id='6g' name='6' value='6g' />
              <label for='6g'>Good reasoning.</label><br />
              <input type='radio' id='6p' name='6' value='6p' />
              <label for='6p'>Poor reasoning.</label><br />
            </div>

            <br />

            <div className='syllogism-box'>
              <label for='7'><b>7.</b> No hummingbirds fly. Some tractors fly.<br />Therefore some tractors are not hummingbirds.</label><br />
              <input type='radio' id='7g' name='7' value='7g' />
              <label for='7g'>Good reasoning.</label><br />
              <input type='radio' id='7p' name='7' value='7p' />
              <label for='7p'>Poor reasoning.</label><br />
            </div>

            <br />

            <div className='syllogism-box'>
              <label for='8'><b>8.</b> All apes are houseflies. Some houseflies are not snails.<br />Therefore some apes are not snails.</label><br />
              <input type='radio' id='8g' name='8' value='8g' />
              <label for='8g'>Good reasoning.</label><br />
              <input type='radio' id='8p' name='8' value='8p' />
              <label for='8p'>Poor reasoning.</label><br />
            </div>

            <br />

            <div className='syllogism-box'>
              <label for='9'><b>9.</b> Some dogs like to sing. All dogs are snowdrifts.<br />Therefore some snowdrifts like to sing.</label><br />
              <input type='radio' id='9g' name='9' value='9g' />
              <label for='9g'>Good reasoning.</label><br />
              <input type='radio' id='9p' name='9' value='9p' />
              <label for='9p'>Poor reasoning.</label><br />
            </div>

            <br />

            <div className='syllogism-box'>
              <label for='10'><b>10.</b> All doctors are sea horses. Some doctors are tornadoes.<br />Therefore some tornadoes are sea horses.</label><br />
              <input type='radio' id='10g' name='10' value='10g' />
              <label for='10g'>Good reasoning.</label><br />
              <input type='radio' id='10p' name='10' value='10p' />
              <label for='10p'>Poor reasoning.</label><br />
            </div>

            <br />

            <div className='syllogism-box'>
              <label for='11'><b>11.</b> Some people who like Alice do not like Robert. Everyone who likes Sue likes Alice.<br />Therefore some people who like Robert do not like Sue.</label><br />
              <input type='radio' id='11g' name='11' value='11g' />
              <label for='11g'>Good reasoning.</label><br />
              <input type='radio' id='11p' name='11' value='11p' />
              <label for='11p'>Poor reasoning.</label><br />
            </div>

            <br />

            <div className='syllogism-box'>
              <label for='12'><b>12.</b> All trains are coal mines. Nothing above 5,000 feet is a train.<br />Therefore no coal mine is above 5,000 feet.</label><br />
              <input type='radio' id='12g' name='12' value='12g' />
              <label for='12g'>Good reasoning.</label><br />
              <input type='radio' id='12p' name='12' value='12p' />
              <label for='12p'>Poor reasoning.</label><br />
            </div>

            <br />

            <div className='syllogism-box'>
              <label for='13'><b>13.</b> Some men are purple. Everything which is purple is a horse..<br />Therefore some horses are men.</label><br />
              <input type='radio' id='13g' name='13' value='13g' />
              <label for='13g'>Good reasoning.</label><br />
              <input type='radio' id='13p' name='13' value='13p' />
              <label for='13p'>Poor reasoning.</label><br />
            </div>

            <br />

            <div className='syllogism-box'>
              <label for='14'><b>14.</b> Some dogs are seals. Some seals bark.<br />Therefore some dogs bark.</label><br />
              <input type='radio' id='14g' name='14' value='14g' />
              <label for='14g'>Good reasoning.</label><br />
              <input type='radio' id='14p' name='14' value='14p' />
              <label for='14p'>Poor reasoning.</label><br />
            </div>

            <br />

            <div className='syllogism-box'>
              <label for='15'><b>15.</b> All elephants are pink. This animal is pink.<br />Therefore this animal is an elephant.</label><br />
              <input type='radio' id='15g' name='15' value='15g' />
              <label for='15g'>Good reasoning.</label><br />
              <input type='radio' id='15p' name='15' value='15p' />
              <label for='15p'>Poor reasoning.</label><br />
            </div>
          </form>
        </div>

      </div>
    )
  }
}

export class NonsenseSyllogismsPartB extends React.Component {
  render() {
    return (
      <div>
        <div className='test-part'>
          <h3>Nonsense Syllogisms Test - Part 2</h3>
          <p>Select "Good reasoning" if the conclusion shows good reasoning. Select "Poor reasoning" if it is poor reasoning.</p>
          <p className='timer'>Time remaining: {this.props.minutes}:{this.props.seconds}</p>
          <button onClick={this.props.goNext} className='go-next'>Next</button>
        </div>

        <div>
          <form className='syllogisms'>
            <div className='syllogism-box'>
              <label for='16'><b>16.</b> No one with a pink nose can be president. All men have pink noses.<br />Therefore no man can be president.</label><br />
              <input type='radio' id='16g' name='16' value='16g' />
              <label for='16g'>Good reasoning.</label><br />
              <input type='radio' id='16p' name='16' value='16p' />
              <label for='16p'>Poor reasoning.</label><br />
            </div>

            <br />

            <div className='syllogism-box'>
              <label for='17'><b>17.</b> All alligators are art collectors. Some art collectors live in caves.<br />Therefore some alligators live in caves.</label><br />
              <input type='radio' id='17g' name='17' value='17g' />
              <label for='17g'>Good reasoning.</label><br />
              <input type='radio' id='17p' name='17' value='17p' />
              <label for='17p'>Poor reasoning.</label><br />
            </div>

            <br />

            <div className='syllogism-box'>
              <label for='18'><b>18.</b> No cats are electrified. All ghosts are electrified.<br />Therefore no ghost is a cat.</label><br />
              <input type='radio' id='18g' name='18' value='18g' />
              <label for='18g'>Good reasoning.</label><br />
              <input type='radio' id='18p' name='18' value='18p' />
              <label for='18p'>Poor reasoning.</label><br />
            </div>

            <br />

            <div className='syllogism-box'>
              <label for='19'><b>19.</b> All birds are snakes. No bird is left-handed.<br />Therefore nothing that is left-handed is a snake.</label><br />
              <input type='radio' id='19g' name='19' value='19g' />
              <label for='19g'>Good reasoning.</label><br />
              <input type='radio' id='19p' name='19' value='19p' />
              <label for='19p'>Poor reasoning.</label><br />
            </div>

            <br />

            <div className='syllogism-box'>
              <label for='20'><b>20.</b> All lions are lavender. Some cowards are not lavender.<br />Therefore some cowards are not lions.</label><br />
              <input type='radio' id='20g' name='20' value='20g' />
              <label for='20g'>Good reasoning.</label><br />
              <input type='radio' id='20p' name='20' value='20p' />
              <label for='20p'>Poor reasoning.</label><br />
            </div>

            <br />

            <div className='syllogism-box'>
              <label for='21'><b>21.</b> All ice skates are totem poles. No totem pole snores.<br />Therefore nothing that snores is an ice skate.</label><br />
              <input type='radio' id='21g' name='21' value='21g' />
              <label for='21g'>Good reasoning.</label><br />
              <input type='radio' id='21p' name='21' value='21p' />
              <label for='21p'>Poor reasoning.</label><br />
            </div>

            <br />

            <div className='syllogism-box'>
              <label for='22'><b>22.</b> Some birds are pink. All hurricanes are pink.<br />Therefore some birds are hurricanes.</label><br />
              <input type='radio' id='22g' name='22' value='22g' />
              <label for='22g'>Good reasoning.</label><br />
              <input type='radio' id='22p' name='22' value='22p' />
              <label for='22p'>Poor reasoning.</label><br />
            </div>

            <br />

            <div className='syllogism-box'>
              <label for='23'><b>23.</b> All monkeys are pineapples. All pineapples have wings and all birds have a tail and wings.<br />Therefore all monkeys have a tail.</label><br />
              <input type='radio' id='23g' name='23' value='23g' />
              <label for='23g'>Good reasoning.</label><br />
              <input type='radio' id='23p' name='23' value='23p' />
              <label for='23p'>Poor reasoning.</label><br />
            </div>

            <br />

            <div className='syllogism-box'>
              <label for='24'><b>24.</b> No onions are parsnips. Some parsnips are tangerines.<br />Therefore some tangerines are not onions.</label><br />
              <input type='radio' id='24g' name='24' value='24g' />
              <label for='24g'>Good reasoning.</label><br />
              <input type='radio' id='24p' name='24' value='24p' />
              <label for='24p'>Poor reasoning.</label><br />
            </div>

            <br />

            <div className='syllogism-box'>
              <label for='25'><b>25.</b> Some kettles are giraffes. All zebras are kettles.<br />Therefore some giraffes are zebras.</label><br />
              <input type='radio' id='25g' name='25' value='25g' />
              <label for='25g'>Good reasoning.</label><br />
              <input type='radio' id='25p' name='25' value='25p' />
              <label for='25p'>Poor reasoning.</label><br />
            </div>

            <br />

            <div className='syllogism-box'>
              <label for='26'><b>26.</b> All dogs are ink bottles. Some ink bottles are squirrels.<br />Therefore some squirrels are dogs.</label><br />
              <input type='radio' id='26g' name='26' value='26g' />
              <label for='26g'>Good reasoning.</label><br />
              <input type='radio' id='26p' name='26' value='26p' />
              <label for='26p'>Poor reasoning.</label><br />
            </div>

            <br />

            <div className='syllogism-box'>
              <label for='27'><b>27.</b> Some people in our town are not famous. Everyone in our town is rich.<br />Therefore some rich people are not famous.</label><br />
              <input type='radio' id='27g' name='27' value='27g' />
              <label for='27g'>Good reasoning.</label><br />
              <input type='radio' id='27p' name='27' value='27p' />
              <label for='27p'>Poor reasoning.</label><br />
            </div>

            <br />

            <div className='syllogism-box'>
              <label for='28'><b>28.</b> No one who has green hair is a teenager. Some people who have green hair drink milk.<br />Therefore some people who drink milk are not teenagers.</label><br />
              <input type='radio' id='28g' name='28' value='28g' />
              <label for='28g'>Good reasoning.</label><br />
              <input type='radio' id='28p' name='28' value='28p' />
              <label for='28p'>Poor reasoning.</label><br />
            </div>

            <br />

            <div className='syllogism-box'>
              <label for='29'><b>29.</b> Los Angeles has fewer people than Detroit. Detroit has more people than East Overshoe.<br />Therefore East Overshoe has more people than Los Angeles.</label><br />
              <input type='radio' id='29g' name='29' value='29g' />
              <label for='29g'>Good reasoning.</label><br />
              <input type='radio' id='29p' name='29' value='29p' />
              <label for='29p'>Poor reasoning.</label><br />
            </div>

            <br />

            <div className='syllogism-box'>
              <label for='30'><b>30.</b> Some soldiers who were in the Civil War used green peaches for gunpowder. This soldier uses green peaches for gunpowder.<br />Therefore he must have been in the Civil War.</label><br />
              <input type='radio' id='30g' name='30' value='30g' />
              <label for='30g'>Good reasoning.</label><br />
              <input type='radio' id='30p' name='30' value='30p' />
              <label for='30p'>Poor reasoning.</label><br />
            </div>
          </form>
        </div>

      </div>
    )
  }
}
