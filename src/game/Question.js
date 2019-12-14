import React from 'react';
import propTypes from 'prop-types';
import styled from '@emotion/styled';
import '../question.scss';

export default class Question extends React.Component {
    constructor(props) {
        super(props);

        const { correct_answer, incorrect_answers } = this.props.question;
        const answerList = this.shuffle(incorrect_answers.concat([correct_answer]));

        this.state = {
            hasAnswered: false,
            isCorrect: false,
            answerSelected: '',
            answerList
        };
    }

    static propTypes = {
        question: propTypes.object.isRequired,
        answerSelected: propTypes.func.isRequired
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.question !== nextProps.question) {
            const { correct_answer, incorrect_answers } = nextProps.question;
            const answerList = this.shuffle(incorrect_answers.concat([correct_answer]));

            this.setState({
                hasAnswered: false,
                isCorrect: false,
                answerSelected: '',
                answerList
            });
        }
    }

    render() {
        const { question } = this.props.question;

        return (
            <Questions className='question'>
                <h3 dangerouslySetInnerHTML={{__html: question}} />
                <List type = "a" className = "option-list">
                    {this.state.answerList.map(this.renderAnswer)}
                </List>
            </Questions>
        );
    }

    renderAnswer = answer => {
        const { hasAnswered, isCorrect, answerSelected } = this.state;

        if (!hasAnswered) {
            return <Selected key={answer} onClick={() => this.selectAnswer(answer)} dangerouslySetInnerHTML={{__html: answer}} />
        }

        let className = 'option';
        if (isCorrect && answer === answerSelected) {
            className = 'correct';
        } else if (!isCorrect && answer === answerSelected) {
            className = 'incorrect';
        }

        return <li key={answer} className={className} dangerouslySetInnerHTML={{__html: answer}} />
    }

    selectAnswer = selected => {
        let isCorrect = true;
        if (selected === this.props.question.correct_answer) {
            this.setState({hasAnswered: true, isCorrect: true, answerSelected: selected});
        } else {
            isCorrect = false;
            this.setState({hasAnswered: true, isCorrect: false, answerSelected: selected});
        }

        this.props.answerSelected(isCorrect);
    }

    //shuffle algorithm
    shuffle = array => {
        for (var i = array.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
        return array;
    }
}

const Questions = styled.div({

})

const List = styled.ol({
    width: '400px',
    background: 'white',
})

const Selected = styled.li({
    width: '400px',
    cursor: 'pointer',
})