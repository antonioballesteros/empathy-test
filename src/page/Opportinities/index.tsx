import { Plot } from '@/component';
import { PlotValue } from '@/component/Plot';
import { getOpportunities } from './data';

const Opportunities = () => {
  const data = getOpportunities();
  const opportunities: PlotValue[] = data.map(({ query_count, click_count, terms }) => {
    return {
      x: query_count,
      y: click_count,
      label: terms,
    };
  });
  return (
    <div>
      <div>Show Opportunities</div>
      <Plot data={opportunities} />
    </div>
  );
};

export default Opportunities;
