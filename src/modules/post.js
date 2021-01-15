const ADD = 'ADD';
const REMOVE = 'REMOVE';

export const add = (todo) => ({ type: ADD, payload: todo });
export const remove = (todo) => ({ type: REMOVE, payload: todo });

const initialState = [
  {
    events: ['나의 스케쥴'],
    yyyymm: '2021-1',
    date: 4,
  },
];

export default function post(state = initialState, action) {
  switch (action.type) {
    case ADD:
      let isNew = true;
      let events = [];
      const concatData = [];

      state.filter((todo) => {
        if (
          todo.yyyymm === action.payload.yyyymm &&
          todo.date === action.payload.date
        ) {
          isNew = false;
          events = todo.events;
        }

        return (
          todo.yyyymm !== action.payload.yyyymm ||
          todo.date !== action.payload.date
        );
      });

      if (isNew) {
        action.payload['events'] = [];
        action.payload.events.push(action.payload.addText);
        const info = {
          events: action.payload.events,
          yyyymm: action.payload.yyyymm,
          date: action.payload.date,
        };

        concatData.push(info);
      } else {
        events.push(action.payload.addText);

        const info = {
          events: events,
          yyyymm: action.payload.yyyymm,
          date: action.payload.date,
        };

        concatData.push(info);
      }

      return state.concat(concatData);

    case REMOVE:
      let temp = undefined;
      let events_rm = [];
      const concatData_rm = [];

      state.filter((todo) => {
        if (
          todo.yyyymm === action.payload.yyyymm &&
          todo.date === action.payload.date
        ) {
          temp = todo;
        }

        return (
          todo.yyyymm !== action.payload.yyyymm ||
          todo.date !== action.payload.date
        );
      });

      if (temp.events.length > 1) {
        temp.events.map((e) => {
          if (e !== action.payload.remove) {
            events_rm.push(e);
          }
        });

        temp.events = events_rm;
        concatData_rm.push(temp);
      } else {
        temp.events = [];
        concatData_rm.push(temp);
      }

      return state.concat(concatData_rm);

    default:
      return state;
  }
}
