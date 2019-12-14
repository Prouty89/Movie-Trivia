import React from 'react';
import { connect } from 'react-redux';
import { getQuestions } from '../actions/quizActions';
import Question from './Question';
import styled from '@emotion/styled';

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
            <Dashboard className="game-dash">
                { isLoading && <h3>Please wait while your quiz loads...</h3> }
                { isError && <h3>ERROR :(</h3> }
                
                { !isLoading && this._renderHeader() }
                { questions.length > 0 &&
                    <Question question={questions[currentQuestion]} answerSelected={this._answerSelected.bind(this)} />
                }
                { canProceed && <Next className='next-button' onClick={this._nextQuestion}>Next Question</Next> }
            </Dashboard>
        );
    }

    _renderHeader = () => {
        const { questions } = this.props;
        const { currentQuestion, score } = this.state;

        return (
            <QuizHeader className='quiz-header'>
                <p>Score: { score }</p>
                <p className='right'>Question {currentQuestion + 1} of {questions.length}</p>
            </QuizHeader>
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

const Dashboard = styled.div({
    fontFamily: 'cursive',
    background: 'white',
    width: '50%',
    padding: '2%',
    fontSize: '1.5rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    borderRadius: '8px',
    position: 'relative',
})

const Next = styled.div({
    position: 'absolute',
    bottom: '60px',
    right: '70px',
    zIndex: '1',
    width: '150px',
    background: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '8px',
    border: '1px solid black',
    fontSize: '1rem',
    height: '30px',
    cursor: 'pointer'
})

const QuizHeader = styled.div({
    TextAlign: 'center'
})

