import React from 'react';

/*
import './login.css';

function CredentialBox(props) {
  let inputType = props.isPassword ? 'password' : 'text'
  return (
    <input className=className value={props.value} onChange={props.handleChange} />
  )
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: null,
      password: null,
    }
  }

  updateUsername(newUsername) {
    this.setState({
      username: newUsername,
      password: this.state.password,
    })
  }

  updatePassword(newPassword) {
    this.setState({
      username: this.state.username,
      password: newPassword,
    })
  }

  render() {
    return (
      <div>
        <h1>Login</h1>
        <CredentialBox
          value={this.state.username}
          isPassword={false}
          handleChange={(event) => this.updateUsername(event.target.value)}
        />
        <CredentialBox
          value={this.state.password}
          isPassword={true}
          handleChange{(event) => this.updatePassword(event.target.value)}
        />
      </div>
    )
  }
}
*/

class App extends React.Component {
  render() {
    return(
      <form action='/login' method='post' id='login'>
        <label for='username'>Username:</label><br />
        <input type='text' id='username' name='username' /><br />
        <label for='password'>Password:</label><br />
        <input type='password' id='password' name='password' /><br /><br />
        <input type='submit' value='Log in' />
      </form>
    )
  }
}

export default App;
