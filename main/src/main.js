import React from 'react';

import './main.css';

class App extends React.Component {
  render() {
    return(
      <div className='main-div'>
        <p className='main-instructions'>For the first stage of this experiment, you will be asked to solve a puzzle. The instructions for the puzzle will be on the left side of the screen, so you should begin there.</p>
        <p className='main-instructions-more'>Occasionally, you will be asked to report what observations you have been making, and what your thought process and approach to the puzzle have been so far. These requests will appear on the right side of the screen, and each time, you will have 60 seconds to complete them. Do not worry about responding in complete sentences, but please, do your best to give a comprehensive summary of what you have been thinking so that it would be possible for a reader to understand what you were thinking.</p>
        <p className='main-instructions-more'>Once you are ready to begin, click on “Next” below. This will take you to the puzzle and initiate a timer for seven minutes.</p>
      <button onClick={() => window.location = '/stage1'} className='go-next'>Next</button>
      </div>
    )
  }
}

export default App;
