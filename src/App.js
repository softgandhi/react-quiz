import React, { Component } from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Quiz from './components/Quiz';

class App extends Component {
  constructor(props) {
    super(props)
    this.quizComponent = React.createRef();
  }
  state = {
    quizes: [
      { id: 'data/aspnet.json', name: 'Asp.Net' },
      { id: 'data/csharp.json', name: 'C Sharp' },
      { id: 'data/designPatterns.json', name: 'Design Patterns' }
    ],
    quiz: 'data/aspnet.json'
  };

  onChange = (e) => {
    this.setState({ quiz: e.target.value });
    this.quizComponent.load(e.target.value);
  }

  render() {
    return (
      <div className="container">
        <header className="p-2">
          <div className="row">
            <div className="col-6">
              <h3>Quiz Application</h3>
            </div>
            <div className="col-6 text-right">
              <label className="mr-1">Select Quiz:</label>
              <select onChange={this.onChange}>
                {this.state.quizes.map(q => <option key={q.id} value={q.id}>{q.name}</option>)}
              </select>
            </div>
          </div>
        </header>
        <Quiz quizId={this.state.quiz} ref={instance => { this.quizComponent = instance; }} />
      </div>
    );
  }
}

export default App;
