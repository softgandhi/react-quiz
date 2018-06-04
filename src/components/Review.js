import React, { Component } from 'react';

class Review extends Component {
    state = {};

    move = (e) => {
        let index = parseInt(e.target.id, 10);
        this.props.goTo(index);
    }

    isAnswered(question) {
        return question.options.find(x => x.selected) ? 'Answered' : 'Not Answered';
    }

    render() {
        return (
            <div>
                <h2 className="text-center font-weight-normal">Review Quiz: {this.props.quiz.name}</h2>
                <hr />
                <div className="row text-center">
                    {this.props.questions.map((q, index) =>
                        <div key={q.id} className="col-4 cursor-pointer">
                            <div id={index} onClick={this.move} className={`p-3 mb-2 ${this.isAnswered(q) === 'Answered' ? 'bg-info' : 'bg-warning'}`}>{index + 1}. {this.isAnswered(q)}</div>
                        </div>
                    )}
                </div>
                <hr />
                <div>
                    <button id="quiz" className="btn btn-info" onClick={this.props.setMode}>Quiz</button>
                    <button id="submit" className="btn btn-primary" onClick={this.props.setMode}>Submit Quiz</button >
                </div >
            </div>
        )
    }
}

export default Review;