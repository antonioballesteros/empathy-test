import type { PlotValue } from './type';

interface PlotType {
  data: PlotValue[];
}
const Plot = ({ data }: PlotType) => {
  console.log('Plot: data', data);
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
