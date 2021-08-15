export const isAnswerCorrect = (selectedAnswers: any, correctAnswers: any): boolean => {
    const intersection = selectedAnswers.filter((x: string) => !correctAnswers.includes(x));

    return selectedAnswers.length !== correctAnswers.length || intersection.length != 0;
};

export const getCurrentAnsweredQuestionCount = (): number => {
    const answeredQuestionCount = localStorage.getItem('answeredQuestionCount');
    if (!answeredQuestionCount) {
        return 0;
    }

    return parseInt(answeredQuestionCount);
};

export const incrementAnsweredQuestionCount = (): number => {
    const currentAnsweredQuestionCount = getCurrentAnsweredQuestionCount();
    const answeredQuestionCount = currentAnsweredQuestionCount + 1;
    localStorage.setItem('answeredQuestionCount', answeredQuestionCount.toString());

    return answeredQuestionCount;
};

export const getCorrectAnswersCount = (): number => {
    const correctAnswersCount = localStorage.getItem('correctAnswersCount');
    if (!correctAnswersCount) {
        return 0;
    }

    return parseInt(correctAnswersCount);
};

export const incrementCorrectAnswersCount = (): number => {
    const currentCorrectAnswersCount = getCorrectAnswersCount();
    const correctAnswersCount = currentCorrectAnswersCount + 1;
    localStorage.setItem('correctAnswersCount', correctAnswersCount.toString());

    return correctAnswersCount;
};