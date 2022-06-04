const data0 = {
  data: [
    {
      terms: 'mom jeans',
      query_count: 2327,
      click_count: 70,
    },
    {
      terms: 'women sale',
      query_count: 2140,
      click_count: 63,
    },
    {
      terms: 'bodysuit',
      query_count: 1803,
      click_count: 50,
    },
    {
      terms: 'graphic t shirt',
      query_count: 1470,
      click_count: 59,
    },
    {
      terms: 'crop top',
      query_count: 1413,
      click_count: 56,
    },
    {
      terms: 'slouchy jeans',
      query_count: 1411,
      click_count: 55,
    },
    {
      terms: 'oversized sweatshirt',
      query_count: 1359,
      click_count: 41,
    },
    {
      terms: 'teddy coat',
      query_count: 1292,
      click_count: 39,
    },
    {
      terms: 'long sleeve top',
      query_count: 1230,
      click_count: 37,
    },
    {
      terms: 'face mask',
      query_count: 1161,
      click_count: 29,
    },
    {
      terms: 'flip flop',
      query_count: 982,
      click_count: 49,
    },
    {
      terms: 'cargo trousers',
      query_count: 789,
      click_count: 32,
    },
    {
      terms: 'trench coat',
      query_count: 751,
      click_count: 30,
    },
    {
      terms: 'overall',
      query_count: 677,
      click_count: 20,
    },
    {
      terms: '90s jeans',
      query_count: 523,
      click_count: 21,
    },
    {
      terms: 'face cover',
      query_count: 521,
      click_count: 20,
    },
  ],
  total_query_count: 120351,
  total_click_count: 30147,
};

const data1 = {
  data: [
    {
      terms: 'Term 1',
      query_count: 50000,
      click_count: 10,
    },
    {
      terms: 'Term 2',
      query_count: 100,
      click_count: 50,
    },
  ],
  total_query_count: 120351,
  total_click_count: 30147,
};

const data = [data0, data1];

const getOpportunities = (setOfValues = 0) => {
  return data[setOfValues]
    ? data[setOfValues]
    : {
        data: [],
        total_query_count: 0,
        total_click_count: 0,
      };
};

export default getOpportunities;
