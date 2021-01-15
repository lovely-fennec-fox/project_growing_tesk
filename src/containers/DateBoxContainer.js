import React, { useEffect, useState, useCallback } from 'react';
import dayjs from 'dayjs';
import _ from 'lodash';
import { getSpcdeInfo } from '../modules/spcdeInfo';
import { add, remove } from '../modules/post';
import { useSelector, useDispatch } from 'react-redux';
import DateBox from '../components/DateBox';
import Modal from '../components/Modal';
import Todo from '../components/Todo';

const DateBoxContainer = ({ date, isToday }) => {
  const makeDateArr = (date, data, myTodo) => {
    // 이번 달 월
    const thisMonthString = dayjs(date).format('M');

    // 전달의 마지막 날짜
    const lastMonthEndDate = dayjs(date).subtract(1, 'M').endOf('month').date();
    const thisMonthEndDate = dayjs(date).endOf('month').date();

    // 달의 첫 번째 요일
    const firstDay = dayjs(date).set('date', 1).day();
    // 달의 마지말 요일
    const endDay = dayjs(date).set('date', thisMonthEndDate).day();

    const lastMonth = _.range(
      lastMonthEndDate - firstDay + 1,
      lastMonthEndDate + 1,
    ).map((e) => ({ date: e, state: 'last', yyyymm: date }));

    // 이번달 정보 : holiday 정보 추가
    const thisMonth = _.range(1, thisMonthEndDate + 1).map((e) => {
      let holiday = { state: false, name: undefined };
      let todo = { state: false, todo: undefined };

      if (data && data.length > 0) {
        data.forEach((d) => {
          const holidayDate = Number(d.locdate.toString().substr(6, 2));
          if (holidayDate === e) {
            holiday.state = true;
            holiday.name = d.dateName === '1월1일' ? '새해' : d.dateName;
          }
        });
      }

      if (myTodo.length > 0) {
        myTodo.forEach((t) => {
          if (t.yyyymm === date && t.date === e) {
            todo.state = true;
            todo.events = t.events;
            todo.info = t;
          }
        });
      }

      if (e === 1) {
        e = `${thisMonthString}월 ${e}`;
      }

      return { date: e, state: 'this', holiday, todo, yyyymm: date };
    });

    const nextMonth = _.range(1, 7 - endDay).map((e) => ({
      date: e,
      state: 'next',
      yyyymm: date,
    }));
    const dateArr = lastMonth.concat(thisMonth, nextMonth);

    const divideDateArr = [];
    let bin = [];
    dateArr.map((d, idx) => {
      if ((idx + 1) % 7 === 0) {
        bin.push(d);
        divideDateArr.push(bin);
        bin = [];
      } else {
        bin.push(d);
      }

      return [];
    });
    return divideDateArr;
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      getSpcdeInfo({
        year: dayjs(date).format('YYYY'),
        month: dayjs(date).format('MM'),
      }),
    );
  }, [dispatch, date]);

  const { data } = useSelector((state) => state.spcdeInfo.info);
  const myTodo = useSelector((state) => state.post);
  const onAdd = useCallback(
    (el) => {
      dispatch(add(el));
    },
    [dispatch],
  );
  const onRemove = useCallback(
    (el) => {
      dispatch(remove(el));
    },
    [dispatch],
  );
  const [divideDateArr, setDivideDateArr] = useState([]);
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState({
    date: 1,
    state: 'this',
    yyyymm: '2021-1',
    addText: 'text',
    events: [],
  });

  useEffect(() => {
    setDivideDateArr(makeDateArr(date, data, myTodo));
  }, [date, data, myTodo]);

  useEffect(() => {
    myTodo.map((t) => {
      if (t.yyyymm === selected.yyyymm && t.date === selected.date) {
        t['todo'] = {};
        t.todo['events'] = t.events;
        setSelected(t);
      }
    });
  }, [myTodo]);

  return (
    <>
      <DateBox
        dates={divideDateArr}
        isToday={isToday}
        modalOpen={() => setOpen(true)}
        setSelected={setSelected}
      />
      <Modal open={open} setOpen={setOpen}>
        <Todo selected={selected} add={onAdd} remove={onRemove} />
      </Modal>
    </>
  );
};

export default DateBoxContainer;
