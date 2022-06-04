import { Plot } from '@/component';
import { PlotValue } from '@/component/Plot';
import { getOpportunities } from './data';

const Opportunities = () => {
  const data = getOpportunities();
  const opportunities: PlotValue[] = data.map(({ id, x, y, title }) => {
    return {
      id,
      x,
      y,
      label: title,
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
