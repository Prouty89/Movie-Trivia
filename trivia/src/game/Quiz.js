import React from 'react';
import { connect } from 'react-redux';
import { getQuestions } from '../actions/quizActions';
import Question from './Question';

class Quiz extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
            isError: false,
            questions: [],
            currentQuestion: 0,
            score: 0,
            canProceed: false
        };
    }

    componentDidMount() {
        this.props.getQuestions();
    }

    render() {
        const { questions, isLoading, isError } = this.props;
        const { currentQuestion, canProceed } = this.state;

        return (
            <div>
                { isLoading && <h3>Please wait while your quiz loads...</h3> }
                { isError && <h3>ERROR :(</h3> }
                
                { !isLoading && this._renderHeader() }
                { questions.length > 0 &&
                    <Question question={questions[currentQuestion]} answerSelected={this._answerSelected.bind(this)} />
                }
                { canProceed && <button className='next-button' onClick={this._nextQuestion}>Next Question</button> }
            </div>
        );
    }

    _renderHeader = () => {
        const { questions } = this.props;
        const { currentQuestion, score } = this.state;

        return (
            <div className='quiz-header'>
                <p>Score: { score }</p>
                <p className='right'>Question {currentQuestion + 1} of {questions.length}</p>
            </div>
        )
    }

    _answerSelected = (isCorrect) => {
        const { currentQuestion } = this.state;
        const { questions } = this.props;

        const score = this.state.score + (isCorrect ? 1 : 0);
        this.setState({
            score,
            canProceed: currentQuestion < questions.length - 1
        });
    }

    _nextQuestion = () => {
        this.setState({
            currentQuestion: this.state.currentQuestion + 1,
            canProceed: false
        })
    }
}

function mapStateToProps(state) {
    return {
        isLoading: state.isLoading,
        isError: state.isError,
        questions: state.questions,
        answers: state.answers
    };
};


export default connect(
    mapStateToProps,
    { getQuestions }
)(Quiz);