import axios from 'axios';

export const getData = async ({ year, month }) => {
  const data = await axios.get(
    `/B090041/openapi/service/SpcdeInfoService/getRestDeInfo?solYear=${year}&solMonth=${month}&_type=json&ServiceKey=IafxOsK1QXBccQ5WrTnYg43oZWGRxOUZ8wfb%2BPYt8vdo%2BWT77Lg3qqXW6xCEVlYzY%2BPzP7HiE2%2FlWU3Whpv4HQ%3D%3D`,
  );

  let cleanData = [];
  if (data.data.response) {
    const el = data.data.response.body.items.item;
    if (!el.length) {
      cleanData.push(el);
    } else {
      cleanData = el;
    }
  }

  return cleanData;
};
