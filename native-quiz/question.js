import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ButtonGroup, Button } from '@rneui/themed';

export default function Question({ navigation, route, questions, userAnswers, setUserAnswers }) {
  const currentIndex = route.params?.currentIndex || 0;
  const question = questions[currentIndex];

  const [selectedIndex, setSelectedIndex] = useState(null);
  const [selectedIndices, setSelectedIndices] = useState([]);

  const handleNext = () => {
    const newAnswers = [...userAnswers];
    if (question.type === 'multipleAnswer') {
      newAnswers[currentIndex] = selectedIndices;
    } else {
      newAnswers[currentIndex] = selectedIndex;
    }
    setUserAnswers(newAnswers);

    if (currentIndex < questions.length - 1) {
      navigation.push('Question', {
        currentIndex: currentIndex + 1
      });
    } else {
      navigation.navigate('Summary');
    }
  };

  const handleMultipleSelect = (index) => {
    const newIndices = [...selectedIndices];
    if (newIndices.includes(index)) {
      newIndices.splice(newIndices.indexOf(index), 1);
    } else {
      newIndices.push(index);
    }
    setSelectedIndices(newIndices.sort());
  };

  return (
    <View style={styles.container}>
      <Text style={styles.question}>{question.question}</Text>

      {question.type === 'multipleAnswer' ? (
        <View>
          {question.answers.map((answer, index) => (
            <Button
              key={index}
              title={answer}
              onPress={() => handleMultipleSelect(index)}
              type={selectedIndices.includes(index) ? 'solid' : 'outline'}
              testID="choices"
              buttonStyle={styles.choiceButton}
            />
          ))}
        </View>
      ) : (
        <ButtonGroup
          buttons={question.answers}
          selectedIndex={selectedIndex}
          onPress={setSelectedIndex}
          testID="choices"
          vertical
        />
      )}

      <Button
        title={currentIndex < questions.length - 1 ? 'Next Question' : 'See Results'}
        onPress={handleNext}
        disabled={
          question.type === 'multipleAnswer'
            ? selectedIndices.length === 0
            : selectedIndex === null
        }
        testID="next-question"
        containerStyle={styles.nextButton}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center'
  },
  question: {
    fontSize: 20,
    marginBottom: 30,
    textAlign: 'center'
  },
  choiceButton: {
    marginBottom: 10
  },
  nextButton: {
    marginTop: 20
  }
});