import React, { Component } from 'react';

function Review(props) {
    return (
        <div>
            <h2 className="text-center font-weight-normal">Review Quiz: {props.quiz.name}</h2>
            <hr />
            <div className="row text-center">
                {props.questions.map((q, index) =>
                    <div key={q.id} className="col-4 cursor-pointer">
                        <div id={index} onClick={props.move} className={`p-3 mb-2 ${props.isAnswered(q) === 'Answered' ? 'bg-info' : 'bg-warning'}`}>{index + 1}. {props.isAnswered(q)}</div>
                    </div>
                )}
            </div>
            <hr />
            <div>
                <button id="quiz" className="btn btn-info" onClick={props.setMode}>Quiz</button>
                <button id="submit" className="btn btn-primary" onClick={props.setMode}>Submit Quiz</button >
            </div >
        </div>
    )
}

export default Review;