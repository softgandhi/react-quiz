import React, { Component } from 'react';
import Review from './Review';
import Questions from './Questions';
import Result from './Result';

class Quiz extends Component {
    state = {
        quiz: {
            config: {}
        },
        mode: 'quiz',
        pager: {
            index: 0,
            size: 1,
            count: 1
        },
        questions: []
    }

    pager = {
        index: 0,
        size: 1,
        count: 1
    }

    config = {
        'allowBack': true,
        'allowReview': true,
        'autoMove': false,  // if true, it will move to next question automatically when answered.
        'duration': 0,  // indicates the time in which quiz needs to be completed. 0 means unlimited.
        'pageSize': 1,
        'requiredAll': false,  // indicates if you must answer all the questions before submitting.
        'richText': false,
        'shuffleQuestions': false,
        'shuffleOptions': false,
        'showClock': false,
        'showPager': true,
        'theme': 'none'
    };

    filteredQuestions() {
        return (this.state && this.state.quiz.questions) ?
            this.state.quiz.questions.slice(this.state.pager.index, this.state.pager.index + this.state.pager.size) : [];
    }

    componentDidMount() {
        this.load(this.props.quizId);
    }

    load(quizId) {
        let url = quizId || this.props.quizId;
        fetch(`../${url}`).then(res => res.json()).then(res => {
            let quiz = res;
            quiz.questions.forEach(q => {
                q.options.forEach(o => o.selected = false);
            });
            quiz.config = Object.assign(quiz.config || {}, this.config);
            this.pager.count = quiz.questions.length / this.pager.size;
            this.setState({ mode: 'quiz', quiz: quiz, pager: this.pager });
            this.setState({ questions: this.filteredQuestions() });
        });
    }

    updateQuiz = (quiz) => {
        this.setState({ quiz: quiz });
        this.setState({ questions: this.filteredQuestions() });

        if (this.config.autoMove) {
            this.goTo(this.state.pager.index + 1);
        }
    }

    isAnswered = (question) => {
        return question.options.find(x => x.selected) ? 'Answered' : 'Not Answered';
    }

    goTo = (index) => {
        if (index >= 0 && index < this.state.pager.count) {
            this.pager.index = index;
            this.setState({ pager: this.pager });
            this.setState({ mode: 'quiz', questions: this.filteredQuestions() });
        }
    }

    move = (e) => {
        let index = parseInt(e.target.id, 10);
        this.goTo(index);
    }

    setMode = (e) => {
        let mode = e.target.id;
        if (mode === 'submit') {
            this.state.quiz.questions.forEach(q => {
                q.isCorrect = q.options.every(x => x.selected === x.isAnswer);
            });
        }
        this.setState({ mode: mode });
    }

    render() {
        if (this.state.mode === 'quiz') {
            return (<Questions quiz={this.state.quiz} questions={this.state.questions} goTo={this.goTo}
                pager={this.state.pager} move={this.move} updateQuiz={this.updateQuiz} setMode={this.setMode} />)
        } else if (this.state.mode === 'review') {
            return (<Review quiz={this.state.quiz} questions={this.state.quiz.questions || []}
                goTo={this.goTo} setMode={this.setMode} move={this.move} isAnswered={this.isAnswered} />)
        } else {
            return (<Result questions={this.state.quiz.questions || []} />)
        }
    }
}

export default Quiz;