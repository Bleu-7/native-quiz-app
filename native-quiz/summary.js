import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Summary({ questions, userAnswers }) {
let score = 0;
questions.forEach((q, index) => {
  const userAnswer = userAnswers[index];
  if (userAnswer === undefined || userAnswer === null) return;

  if (q.type === 'multipleAnswer') {
    const userAnswerStr = JSON.stringify(userAnswer.sort());
    const correctAnswerStr = JSON.stringify(q.correct.sort());
    if (userAnswerStr === correctAnswerStr) {
      score++;
    }
  } else {
    if (userAnswer === q.correct) {
      score++;
    }
  }
});

const renderAnswer = (qIndex, aIndex) => {
    const question = questions[qIndex];
    const userAnswer = userAnswers[qIndex];
    let style = {};

    if (userAnswer === undefined || userAnswer === null) {
      if (question.correct.includes?.(aIndex) || question.correct === aIndex) {
        style = { fontWeight: 'bold' };
      }
      return <Text style={style}>{question.answers[aIndex]}</Text>;
    }

    if (question.type === 'multipleAnswer') {
      const isSelected = userAnswer.includes(aIndex);
      const isCorrect = question.correct.includes(aIndex);

      if (isSelected && isCorrect) {
        style = { fontWeight: 'bold' };
      } else if (isSelected && !isCorrect) {
        style = { textDecorationLine: 'line-through' };
      } else if (!isSelected && isCorrect) {
        style = { fontWeight: 'bold' };
      }
    } else {
      if (userAnswer === aIndex) {
        style = userAnswer === question.correct
          ? { fontWeight: 'bold' }
          : { textDecorationLine: 'line-through' };
      } else if (aIndex === question.correct) {
        style = { fontWeight: 'bold' };
      }
    }

    return <Text style={style}>{question.answers[aIndex]}</Text>;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.score} testID="total">
        Score: {score}/{questions.length}
      </Text>

      {questions.map((q, qIndex) => (
        <View key={qIndex} style={styles.questionBox}>
          <Text style={styles.questionText}>{q.question}</Text>

          <View style={styles.answers}>
            {q.answers.map((_, aIndex) => (
              <View key={aIndex}>
                {renderAnswer(qIndex, aIndex)}
              </View>
            ))}
          </View>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20
  },
  score: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center'
  },
  questionBox: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5
  },
  questionText: {
    fontWeight: 'bold',
    marginBottom: 10
  },
  answers: {
    marginLeft: 10
  },
  answer: {
    marginBottom: 5
  }
});