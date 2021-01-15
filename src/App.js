import React, { useEffect, useState, useMemo } from 'react';
import styled from 'styled-components';
import DateBoxContainer from './containers/DateBoxContainer';
import dayjs from 'dayjs';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  min-width: 500px;
  min-height: 800px;
`;

const Header = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  width: 95%;
  height: 50px;
  padding: 15px;
`;

const ButtonBox = styled.div`
  margin-left: auto;
`;

const Button = styled.button`
  width: ${({ width }) => (width ? width : '20px')};
  padding: 6px;
  font-size: ${({ fontSize }) => (fontSize ? fontSize : '0.5em')};
  border: 1px solid #9e9e9e;
  border-radius: 4px;
  margin: ${({ margin }) => (margin ? margin : '0px')};
  cursor: pointer;
  background-color: 'white';
  &:focus {
    cursor: pointer;
    border: none;
  }
  &:active {
    cursor: pointer;
    border: none;
  }
  &:disabled {
    cursor: not-allowed;
    pointer-events: none;
  }
`;

function App() {
  const [date, setDate] = useState(dayjs().format('YYYY-M'));
  const [isToday, setIsToday] = useState({ state: true, date: dayjs().date() });

  const splitDate = (date) => {
    const arr = date.split('-');
    const year = arr[0];
    const month = arr[1];

    return { year, month };
  };

  const handleClick = (e) => {
    const { id } = e.target;

    if (id === 'btn_increase') {
      setDate(dayjs(date).subtract(1, 'M').format('YYYY-M'));
    } else if (id === 'btn_decrease') {
      setDate(dayjs(date).add(1, 'M').format('YYYY-M'));
    } else {
      setDate(dayjs().format('YYYY-M'));
      setIsToday({ state: true, date: dayjs().date() });
    }
  };

  useEffect(() => {
    if (date === dayjs().format('YYYY-M')) {
      setIsToday({ state: true, date: dayjs().date() });
    } else {
      setIsToday((isToday) => ({ ...isToday, state: false }));
    }
  }, [date]);

  const reqDate = useMemo(() => splitDate(date), [date]);

  return (
    <Container>
      <Header>
        <h1>
          {reqDate.year}년 {reqDate.month}월{' '}
        </h1>
        <ButtonBox>
          <Button id="btn_increase" onClick={handleClick}>
            {'<'}
          </Button>
          <Button
            id="btn_today"
            width="60px"
            margin="1px"
            onClick={handleClick}
          >
            오늘
          </Button>
          <Button id="btn_decrease" onClick={handleClick}>
            {'>'}
          </Button>
        </ButtonBox>
      </Header>
      <DateBoxContainer date={date} isToday={isToday} />
    </Container>
  );
}

export default App;
