import React from 'react';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      sessionName: null,
      sessionCompleted: 0,
    }
  }

  componentDidMount() {
    fetch('/api/getSessionUser')
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          loading: false,
          sessionName: data.name,
          sessionCompleted: data.stages.length,
        });
        console.log(this.state)
      });
  }

  render() {
    let toReturn;
    if (this.state.loading) {
      toReturn = <p>Page loading...</p>;
    } else {
      let stage1 = <p><a href='/stage1'>Stage 1</a> (30 minutes)</p>;
      if (this.state.sessionCompleted > 0) {
        stage1 = <p>Stage 1 (30 minutes) - COMPLETED</p>;
      }

      let stage2 = <p>Stage 2 (15 minutes)</p>;
      if (this.state.sessionCompleted === 1) {
        stage2 = <p><a href='/stage2'>Stage 2</a> (15 minutes)</p>;
      }
      if (this.state.sessionCompleted > 1) {
        stage2 = <p>Stage 2 (15 minutes) - COMPLETED</p>;
      }

      let stage3 = <p>Stage 3 (15 minutes)</p>;
      let concludingMessage;
      if (this.state.sessionCompleted === 2) {
        stage3 = <p><a href='/stage3'>Stage 3</a> (15 minutes)</p>;
      }
      if (this.state.sessionCompleted > 2) {
        stage3 = <p>Stage 3 (15 minutes) - COMPLETED</p>;
        concludingMessage = <p>You have completed all stages of the experiment. Thank you very much! You may now close this window.</p>;
      }

      toReturn = (
        <div>
          <p>Hello, {this.state.sessionName}.</p>
          <p>The experiment has three distinct stages. Please click on and complete each of the three following stages in the order shown.</p>
          <ol>
            <li>{stage1}</li>
            <li>{stage2}</li>
            <li>{stage3}</li>
          </ol>
          {concludingMessage}
        </div>
      );
    }
    return(
      toReturn
    )
  }
}

export default App;
