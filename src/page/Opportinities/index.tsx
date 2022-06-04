import { Plot } from '@/component';
import { PlotValue } from '@/component/Plot';
import { getOpportunities } from './data';
import type { Point } from '@/component/Plot';

const Opportunities = () => {
  const result = getOpportunities();
  const opportunities: PlotValue[] = result.data.map(({ query_count, click_count, terms }) => {
    return {
      x: query_count,
      y: click_count,
      label: terms,
    };
  });
  const average: [Point, Point] = [
    {
      x: 0,
      y: 0,
    },
    {
      x: result.total_query_count,
      y: result.total_click_count,
    },
  ];

  return (
    <div>
      <h2>Show Opportunities</h2>
      <Plot data={opportunities} average={average} />
    </div>
  );
};

export default Opportunities;
