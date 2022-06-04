import type { PlotValue, Point } from './type';

interface PlotType {
  data: PlotValue[];
  average?: [Point, Point];
}
const Plot = ({ data, average }: PlotType) => {
  console.log('Plot', { data, average });
  return (
    <div>
      {data.map((item, i) => {
        return (
          <div key={item.id || i}>
            <span>
              {item.label} - {item.x} - {item.y}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default Plot;
