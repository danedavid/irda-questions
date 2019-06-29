import React, { useState } from 'react';
import {
  Pane,
  Heading,
  Text,
  Button,
  Spinner,
} from 'evergreen-ui';
import db from './db.json';
import './App.css';

const shuffle = (array) => {
  let i = array.length, j, temp;
  if ( i === 0 ) return array;
  while ( --i ) {
     j = Math.floor( Math.random() * ( i + 1 ) );
     temp = array[i];
     array[i] = array[j];
     array[j] = temp;
  }
  return array;
};

const questions = shuffle(db);

function App() {
  const [index, setIndex] = useState(0);
  const [correctIndex, setCorrect] = useState(null);
  const [wrongIndex, setWrong] = useState(null);
  const [loader, setLoader] = useState(false);
  const question = questions[index];

  const handleSubmit = (response) => {
    if ( response === question.answer ) {
      setCorrect(question.answer);
    } else {
      setCorrect(question.answer);
      setWrong(response);
    }
    setTimeout(() => {
      setCorrect(null);
      setWrong(null);
      setIndex(index + 1);
      setLoader(true);
      setTimeout(() => {
        setLoader(false);
      }, 2000);
    }, 3000);
  };

  return (
    <Pane
      width='100vw'
      minHeight='100vh'
      backgroundColor='#FBE6A2'
      paddingTop={40}
      paddingLeft={10}
      paddingRight={10}
    >
      {
        loader
        ? <Spinner marginX="auto" marginY={160} size={48} />
        : <>
        <Heading size={800}>
          { question.text }
        </Heading>
        <Pane
          marginTop={40}
        >
          {
            question.choices.map((choice, index) => (
              <Button
                key={index}
                height={100}
                appearance='primary'
                intent={
                  index === correctIndex
                    ? 'success'
                    : index === wrongIndex
                    ? 'danger'
                    : 'warning'
                }
                className={index === correctIndex ? 'boomer' : ''}
                width='100%'
                marginBottom={5}
                textAlign='left'
                paddingLeft={16}
                paddingRight={8}
                onClick={() => handleSubmit(index)}
              >
                <Text
                  size={600}
                  color='#FEF8E7'
                >
                  { choice.trim() }
                </Text>
              </Button>
            ))
          }
        </Pane>
      </>
      }
    </Pane>
  );
}

export default App;
