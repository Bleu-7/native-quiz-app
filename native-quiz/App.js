import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Question from './question';
import Summary from './summary'

const questions = [
  {
    question: 'React Native is a framework for building mobile apps.',
    answers: ['True', 'False'],
    correct: 0,
    type: 'trueFalse'
  },
  {
    question: 'Which company created React Native?',
    answers: ['Google', 'Facebook', 'Microsoft', 'Apple'],
    correct: 1,
    type: 'multipleChoice'
  },
  {
    question: 'Which platforms can React Native target? (Select all)',
    answers: ['iOS', 'Android', 'Web', 'Windows'],
    correct: [0, 1, 2],
    type: 'multipleAnswer'
  }
];

const Stack = createNativeStackNavigator();

export default function App() {
  const [userAnswers, setUserAnswers] = useState([]);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Question">
          {(props) => <Question {...props} questions={questions} userAnswers={userAnswers} setUserAnswers={setUserAnswers} />}
        </Stack.Screen>
        <Stack.Screen name="Summary">
          {(props) => <Summary {...props} questions={questions} userAnswers={userAnswers} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}