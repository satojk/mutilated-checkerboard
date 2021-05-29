import React from 'react';

import './login.css';

class App extends React.Component {
  render() {
    return(
      <div className='login-div'>
        <p className='instructions'>Please log into the experiment using the credentials given to you. You may only log in once, so once logged in, do not quit or close the window until finished. If you believe something is wrong, or if there are any issues, contact <a href='mailto:satojk@stanford.edu'>satojk@stanford.edu</a></p>
        <p className='instructions-more'><b>Note:</b> the experiment interface is designed to make use of the entire width of the screen. Before logging in, please ensure that your browser window is maximized to occupy your entire screen.</p>
        <form className='login-form' action='/login' method='post' id='login'>
          <label for='username'>Username:</label><br />
          <input type='text' id='username' name='username' /><br />
          <label for='password'>Password:</label><br />
          <input type='password' id='password' name='password' /><br /><br />
          <input type='submit' value='Log in' />
        </form>
      </div>
    )
  }
}

export default App;
