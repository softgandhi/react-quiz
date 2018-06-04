import React, { Component } from 'react';

class Questions extends Component {
    state = {};

    move = (e) => {
        let id = e.target.id;
        let index = 0;
        if (id === 'first')
            index = 0;
        else if (id === 'prev')
            index = this.props.pager.index - 1;
        else if (id === 'next')
            index = this.props.pager.index + 1;
        else if (id === 'last')
            index = this.props.pager.count - 1;
        this.props.goTo(index);
    }

    onAnswer(question, option) {
        let quiz = this.props.quiz;
        let q = quiz.questions.find(x => x.id === question.id);
        q.options.forEach((x) => { x.selected = false; });
        q.options.find(x => x.id === option.id).selected = true;

        this.props.updateQuiz(quiz);
    }

    render() {
        return (
            <div id="quiz">
                <h2 className="text-center font-weight-normal">{this.props.quiz.name}</h2>
                <hr />
                {this.props.questions.map(q =>
                    <div key={q.id}>
                        <div className="badge badge-info">Question {this.props.pager.index + 1} of {this.props.pager.count}.</div>
                        <h3 className="font-weight-normal">{this.props.pager.index + 1}. <span>{q.name}</span></h3>
                        <div className="row text-left options">
                            {
                                q.options.map(option =>
                                    <div key={option.id} className="col-6">
                                        <div className="option">
                                            <label className="font-weight-normal" htmlFor={option.id}>
                                                <input id={option.id} checked={option.selected} type="checkbox" onChange={() => this.onAnswer(q, option)} />
                                                {option.name}
                                            </label>
                                        </div>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                )}
                <hr />
                <div className="text-center">
                    {this.props.quiz.config.allowBack && <button id="first" className="btn btn-default" onClick={this.move}>First</button>}
                    {this.props.quiz.config.allowBack && <button id="prev" className="btn btn-default" onClick={this.move}>Prev</button>}
                    <button id="next" className="btn btn-primary" onClick={this.move}>Next</button>
                    <button id="last" className="btn btn-default" onClick={this.move}>Last</button>
                </div>
                <hr />
                <div>
                    <button id="review" className="btn btn-info" onClick={this.props.setMode}>Review</button>
                    <button id="submit" className="btn btn-primary" onClick={this.props.setMode}> Submit Quiz</button >
                </div >
            </div >
        )
    }
}

export default Questions;