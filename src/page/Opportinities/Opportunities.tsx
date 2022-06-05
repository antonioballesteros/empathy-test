import { Plot } from '@/component';
import { PlotValue } from '@/component/Plot';
import { useGetOpportunities } from './data';
import type { Point } from '@/component/Plot';

interface OpportunitiesType {
  id: number;
}
const Opportunities = ({ id = 0 }: OpportunitiesType) => {
  const { data, loading, error } = useGetOpportunities(id);

  if (error) {
    return <div>Some error found, try later {error}</div>;
  }

  const opportunities: PlotValue[] = !loading
    ? data.data.map(({ query_count, click_count, terms }) => {
        return {
          x: query_count,
          y: click_count,
          label: terms,
        };
      })
    : [];

  const average: [Point, Point] = [
    {
      x: 0,
      y: 0,
    },
    {
      x: data.total_query_count,
      y: data.total_click_count,
    },
  ];

  return (
    <div>
      <h2>Show Opportunities</h2>
      {loading ? <div>Nice loading spinner</div> : <Plot data={opportunities} average={average} />}
    </div>
  );
};

export default Opportunities;
