import React, { Component } from 'react';

class Result extends Component {
    state = {};

    isCorrect(question) {
        return question.options.every(x => x.selected === x.isAnswer) ? 'correct' : 'wrong';
    };

    render() {
        return (
            <div className="result">
                <h2 className="text-center font-weight-normal">Quiz Result</h2>
                {this.props.questions.map((q, index) =>
                    <div key={q.id}>
                        <div className="result-question">
                            <h4>{index + 1}. {q.name}</h4>
                            <div className="row">
                                {
                                    q.options.map(option =>
                                        <div key={option.id} className="col-6">
                                            <input id={option.id} type="checkbox" disabled="disabled" checked={option.selected} /> {option.name}
                                        </div>
                                    )
                                }
                            </div>
                            <div className={`alert ${this.isCorrect(q) === 'correct'? 'alert-success': 'alert-danger'}`}>Your answer is {this.isCorrect(q)}.</div>
                        </div>
                    </div>
                )}
                <h4 className="alert alert-info text-center">You may close this window now.</h4>
            </div>
        )
    }
}

export default Result;