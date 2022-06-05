import { Plot, Loading, Error } from '@/component';
import { PlotValue } from '@/component/Plot';
import { useGetOpportunities } from './data';
import type { Point } from '@/component/Plot';
import classes from './Opportunities.module.css';

interface OpportunitiesType {
  id: number;
}
const Opportunities = ({ id = 0 }: OpportunitiesType) => {
  const { data, loading, error } = useGetOpportunities(id);

  if (error) {
    return <Error error={error} />;
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
    <div className={classes.root}>
      <h2 className={classes.h2}>Show Opportunities</h2>
      <div className={classes.body}>
        {loading ? <Loading /> : <Plot data={opportunities} average={average} />}
      </div>
    </div>
  );
};

export default Opportunities;
