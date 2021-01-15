import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

const HeaderRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  border-bottom: 2px solid #c4c4c4;
`;

const HeaderCell = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  width: 14%;
  height: 20px;
  color: ${({ color }) => (color ? color : 'black')};
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  border-bottom: 1px solid #c4c4c4;
`;

const Cell = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-end;
  border-right: 1px solid #c4c4c4;
  font-size: 0.7em;
  width: 14.28%;
  height: 80px;
  color: ${({ state, idx }) => {
    if (state !== 'this') {
      return '#e0e0e0';
    } else if (state === 'this' && (idx === 0 || idx === 6)) {
      return '#949494';
    } else {
      return 'black';
    }
  }};
  background-color: ${({ bg }) => (bg ? bg : 'white')};
  padding: 10px;
`;

const Date = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  width: 100%;
  height: 20px;
`;

const Schedule = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  width: 90%;
  height: 7px;
  font-size: 0.1em;
  background-color: ${({ todo }) => (todo ? '#b3e5fc' : '#fce4ec')};
  border-radius: 2px;
  padding: 5px;
  color: black;
  align-items: center;
  margin-top: 3px;
`;

const Circle = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 16px;
  height: 16px;
  border-radius: 10px;
  font-weight: bold;
  background-color: ${({ visible }) => (visible ? 'red' : 'none')};
  color: ${({ visible }) => (visible ? 'white' : 'none')};
`;

const Highlight = ({ date }) => {
  return <Circle visible> {date} </Circle>;
};

const Header = () => {
  return (
    <HeaderRow>
      <HeaderCell color="#949494"> 일 </HeaderCell>
      <HeaderCell> 월 </HeaderCell>
      <HeaderCell> 화 </HeaderCell>
      <HeaderCell> 수 </HeaderCell>
      <HeaderCell> 목 </HeaderCell>
      <HeaderCell> 금 </HeaderCell>
      <HeaderCell color="#949494"> 토 </HeaderCell>
    </HeaderRow>
  );
};

const Body = ({ date, props }) => {
  const { isToday, modalOpen, setSelected } = props;

  return (
    <Row>
      {date.map((d, idx) => (
        <Cell
          key={idx}
          bg={idx === 0 || idx === 6 ? '#F7F7F7' : 'white'}
          state={d.state}
          idx={idx}
          onClick={() => {
            setSelected(d);
            modalOpen();
          }}
        >
          <Date>
            {isToday.state && isToday.date === d.date ? (
              <Highlight date={d.date} />
            ) : (
              d.date
            )}
            일
          </Date>
          {d.state === 'this' && d.holiday.state ? (
            <Schedule> {d.holiday.name} </Schedule>
          ) : (
            <div></div>
          )}
          {d.state === 'this' && d.todo.state ? (
            d.todo.events.map((event, idx) => (
              <Schedule key={idx} todo>
                {event}
              </Schedule>
            ))
          ) : (
            <div></div>
          )}
        </Cell>
      ))}
    </Row>
  );
};

const DateBox = (props) => {
  const { dates } = props;

  return (
    <Container>
      <Header />
      {dates.map((el, idx) => (
        <Body key={idx} date={el} props={props} />
      ))}
    </Container>
  );
};

export default DateBox;
