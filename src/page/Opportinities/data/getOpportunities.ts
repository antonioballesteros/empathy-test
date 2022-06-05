import data0 from './fake/data0.json';
import data1 from './fake/data1.json';
import data2 from './fake/data2.json';

const data = [data0, data1, data2];

const getOpportunities = (setOfValues: number) => {
  return data[setOfValues]
    ? data[setOfValues]
    : {
        data: [],
        total_query_count: 0,
        total_click_count: 0,
      };
};

export default getOpportunities;
