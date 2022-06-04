import type { PlotValue } from './type';

interface PlotType {
  data: PlotValue[];
}
const Plot = ({ data }: PlotType) => {
  console.log('Plot: data', data);
  return <span>Show Plot</span>;
};

export default Plot;
