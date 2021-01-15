import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import styled from 'styled-components';
import dayjs from 'dayjs';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

const Box = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  margin-top: 20px;
  min-height: 50px;
`;

const TodoBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  margin-top: 20px;
  min-height: 150px;
  border: 2px solid #b3e5fc;
  border-radius: 10px;
`;

const Event = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  width: 90%;
  height: 20px;
  margin-top: 10px;
  border-bottom: 2px solid #b3e5fc;
`;

const Button = styled.button`
  width: 60px;
  height: 30px;
  background-color: #b3e5fc;
  margin-left: 5px;
  border: none;
  border-radius: 10px;
  align-self: flex-end;
`;

const EventButton = styled.button`
  width: 20px;
  height: 20px;
  background-color: #b3e5fc;
  margin-left: auto;
  border: none;
  border-radius: 3px;
`;

const useStyles = makeStyles((theme) => ({
  field: {
    '& > *': {
      width: '340px',
    },
  },
}));

const Todo = ({ selected, add, remove }) => {
  const classes = useStyles();
  const [year, setYear] = useState(dayjs(selected.yyyymm).format('YYYY'));
  const [month, setMonth] = useState(dayjs(selected.yyyymm).format('M'));
  const [date, setDate] = useState(selected.date.toString());
  const [events, setEvents] = useState(selected.todo.events);
  const [event, setEvent] = useState('');

  useEffect(() => {
    setYear(dayjs(selected.yyyymm).format('YYYY'));
    setMonth(dayjs(selected.yyyymm).format('M'));
    setEvents(selected.todo.events || []);

    if (selected.date.toString().includes('월')) {
      setDate('1');
    } else {
      setDate(selected.date.toString());
    }
  }, [selected, selected.todo.events]);

  const handleChange = (e) => {
    const { value } = e.target;
    setEvent(value);
  };

  const handleClick = () => {
    selected.addText = event;
    setEvent('');
    add(selected);
  };

  const removeHandleClick = (e) => {
    const { value } = e.target;

    selected['remove'] = value;
    remove(selected);
  };

  return (
    <Container>
      <Box>
        <h1>
          {year}년 {month}월 {date}일
        </h1>
      </Box>
      <Box>
        <TextField
          className={classes.field}
          label="Todo"
          value={event}
          onChange={handleChange}
        />
        <Button onClick={handleClick}>추가</Button>
      </Box>
      <TodoBox>
        {events ? (
          events.map((el, idx) => (
            <Event key={el}>
              {el}
              <EventButton key={idx} value={el} onClick={removeHandleClick}>
                x
              </EventButton>
            </Event>
          ))
        ) : (
          <div></div>
        )}
      </TodoBox>
    </Container>
  );
};

export default Todo;
