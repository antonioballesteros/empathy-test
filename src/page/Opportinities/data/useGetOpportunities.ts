import { useState, useEffect } from 'react';
import data0 from './fake/data0.json';
import data1 from './fake/data1.json';
import data2 from './fake/data2.json';

import type { DataType } from './type';

const datas = [data0 as DataType, data1 as DataType, data2 as DataType];

const FAKED_LATENCY = 750;
const useGetOpportunities = (setOfValues: number) => {
  const [data, setData] = useState({} as DataType);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false as boolean | string);

  useEffect(() => {
    setLoading(true);
    setError(false);
    setData({} as DataType);
  }, [setOfValues]);
  setTimeout(() => {
    setLoading(false);
    if (!datas[setOfValues]) {
      setError(`Incorrect set of data ${setOfValues}`);
    }
    setData(datas[setOfValues]);
  }, FAKED_LATENCY);

  return {
    data,
    error,
    loading,
  };
};

export default useGetOpportunities;
