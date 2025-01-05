import React, { useState, useEffect } from "react";
import "./App.css";
import quizData from "./quizdata.json";

const TOTAL_QUESTIONS = 10;
const TIME_PER_QUESTION = 30; // seconds

function Quiz() {
    const [questions, setQuestions] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [currentPlayer, setCurrentPlayer] = useState(1);
    const [scores, setScores] = useState({ 1: 0, 2: 0 });
    const [timeLeft, setTimeLeft] = useState(TIME_PER_QUESTION);
    const [isGameOver, setIsGameOver] = useState(false);
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [showAnswer, setShowAnswer] = useState(false);
    const [isAnswered, setIsAnswered] = useState(false);

    useEffect(() => {
        loadQuestions();
    }, []);

    useEffect(() => {
        if (timeLeft > 0 && !isGameOver && !showAnswer) {
            const timer = setTimeout(() => setTimeLeft((prev) => prev - 1), 1000);
            return () => clearTimeout(timer);
        } else if (timeLeft === 0 && !isGameOver && !isAnswered) {
            handleAnswer();
        }
    }, [timeLeft, isGameOver, showAnswer, isAnswered]);

    const loadQuestions = () => {
        try {
            const shuffled = [...quizData].sort(() => 0.5 - Math.random());
            setQuestions(shuffled.slice(0, TOTAL_QUESTIONS));
        } catch (error) {
            console.error("Error loading questions:", error.message);
            alert("Error loading questions. Please try again later.");
        }
    };

    const handleAnswer = () => {
        setIsAnswered(true);
        setShowAnswer(true);
        const currentQuestion = questions[currentIndex];
        if (!currentQuestion) return;

        const correctAnswers = Array.isArray(currentQuestion.correct_answer)
            ? currentQuestion.correct_answer
            : [currentQuestion.correct_answer];

        const sortedSelected = [...selectedOptions].sort();
        const sortedCorrect = [...correctAnswers].sort();

        if (
            sortedSelected.length === sortedCorrect.length &&
            sortedSelected.every((option, idx) => option === sortedCorrect[idx])
        ) {
            setScores((prev) => ({ ...prev, [currentPlayer]: prev[currentPlayer] + 1 }));
        }
    };

    const moveToNextQuestion = () => {
        setSelectedOptions([]);
        setShowAnswer(false);
        setIsAnswered(false);

        if (currentIndex + 1 >= questions.length) {
            setIsGameOver(true);
        } else {
            setCurrentIndex((prev) => prev + 1);
            setCurrentPlayer((prev) => (prev === 1 ? 2 : 1));
            setTimeLeft(TIME_PER_QUESTION);
        }
    };

    const handleOptionChange = (option) => {
        if (isAnswered) return;

        const currentQuestion = questions[currentIndex];
        if (!currentQuestion) return;

        if (currentQuestion.type === "multiple") {
            setSelectedOptions(prev => {
                if (prev.includes(option)) {
                    return prev.filter(item => item !== option);
                }
                return [...prev, option];
            });
        } else {
            setSelectedOptions([option]);
        }
    };

    const endGame = () => {
        setIsGameOver(true);
    };

    const restartGame = () => {
        setQuestions([]);
        setCurrentIndex(0);
        setCurrentPlayer(1);
        setScores({ 1: 0, 2: 0 });
        setTimeLeft(TIME_PER_QUESTION);
        setIsGameOver(false);
        setSelectedOptions([]);
        setShowAnswer(false);
        setIsAnswered(false);
        loadQuestions();
    };

    if (isGameOver) {
        const winner =
            scores[1] > scores[2]
                ? "Player 1 Wins!"
                : scores[2] > scores[1]
                    ? "Player 2 Wins!"
                    : "It's a Tie!";
        return (
            <div id="result-screen">
                <h2>{winner}</h2>
                <p>Player 1: {scores[1]}</p>
                <p>Player 2: {scores[2]}</p>
                <button onClick={restartGame}>Play Again</button>
            </div>
        );
    }

    const currentQuestion = questions[currentIndex];

    return (
        <div id="game-screen" className="game-container">
            <div className="scoreboard">
                <div>Player 1: {scores[1]}</div>
                <div>Player 2: {scores[2]}</div>
            </div>
            <div className="turn-indicator">Current Player: Player {currentPlayer}</div>
            <div className="timer">Time Left: {timeLeft}s</div>
            <div className="question-container">
                <h2>
                    Q{currentIndex + 1}: {currentQuestion?.question}
                </h2>
                <p className="question-type">
                    {currentQuestion?.type === "multiple"
                        ? "(Select all that apply)"
                        : "(Select one answer)"}
                </p>
                <div className="options">
                    {currentQuestion?.options.map((option, index) => (
                        <div key={index} className="option-wrapper">
                            <button
                                className={`option-button 
                                    ${selectedOptions.includes(option) ? 'selected' : ''} 
                                    ${showAnswer ?
                                        (currentQuestion.correct_answer.includes(option) ? 'correct' :
                                            selectedOptions.includes(option) ? 'incorrect' : '')
                                        : ''}`}
                                onClick={() => handleOptionChange(option)}
                                disabled={isAnswered}
                            >
                                {option}
                            </button>
                        </div>
                    ))}
                </div>
            </div>
            <div className="button-container">
                {selectedOptions.length > 0 && (
                    <button
                        onClick={handleAnswer}
                        className="submit-button"
                    >
                        Submit Answer
                    </button>
                )}
                {showAnswer && (
                    <button
                        onClick={moveToNextQuestion}
                        className="next-button"
                    >
                        Next Question
                    </button>
                )}
                <button onClick={endGame} className="end-game-button">
                    End Game
                </button>
            </div>
        </div>
    );
}

export default Quiz;