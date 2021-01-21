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
    }
    else {
      toReturn = (
        <div>
          <p>Hello, {this.state.sessionName}.</p>
          <p>The experiment has three distinct stages. Please click on and complete each of the three following stages in the order shown.</p>
          <ol>
            <li><a href='/stage1'>Stage 1</a> (30 minutes)</li>
            <li><a href='/stage2'>Stage 2</a> (15 minutes)</li>
            <li><a href='/stage3'>Stage 3</a> (15 minutes)</li>
          </ol>
        </div>
      );
    }
    return(
      toReturn
    )
  }
}

export default App;
