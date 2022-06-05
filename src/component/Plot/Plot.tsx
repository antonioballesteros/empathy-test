import { useRef, useEffect, useState } from 'react';
import * as d3 from 'd3';

import type { PlotValue, Point } from './type';

import classes from './Plot.module.css';

interface PlotType {
  data: PlotValue[];
  average?: [Point, Point];
  dimensions?: {
    margin: {
      top: number;
      right: number;
      bottom: number;
      left: number;
    };
  };
}

const defaultDimensions = {
  margin: { top: 30, right: 30, bottom: 30, left: 30 },
};

export const getAverageYfromX = (x: number, average?: [Point, Point]): number | null => {
  if (!average) {
    return null;
  }
  const [p1, p2] = average;

  const difX = p2.x - p1.x;
  const difY = p2.y - p1.y;

  if (!difX) {
    return null;
  }

  const delta = difY / difX;

  const y = delta * (x - p1.x) + p1.y;

  return y;
};

export const isAboveAverage = (d: Point, average?: [Point, Point]): boolean => {
  const y = getAverageYfromX(d.x, average);

  if (y === null) {
    return true;
  }

  return d.y > y;
};

const setColor = (d: Point, average?: [Point, Point]) => {
  return isAboveAverage(d, average) ? 'red' : 'green';
};

const showLabel = (
  event: any,
  tooltip: d3.Selection<SVGTextElement, unknown, null, undefined>,
): void => {
  const x = parseInt(d3.select(event.target).attr('cx')) + 10;
  const y = parseInt(d3.select(event.target).attr('cy')) + 10;

  const d = JSON.parse(d3.select(event.target).attr('data-d'));
  const label = d.label;

  tooltip.style('visibility', 'visible').attr('x', x).attr('y', y).text(label);
};

const hideLabel = (tooltip: d3.Selection<SVGTextElement, unknown, null, undefined>): void => {
  tooltip.style('visibility', 'hidden');
};

const Plot = ({ data = [], average, dimensions = defaultDimensions }: PlotType) => {
  const rootRef = useRef(null);
  const svgRef = useRef(null);

  const [rootWidth, setRootWidth] = useState(0);
  const [rootHeight, setRootHeight] = useState(0);

  useEffect(() => {
    setRootWidth(rootRef.current?.clientWidth);
    setRootHeight(rootRef.current?.clientHeight);
  }, [rootRef]);

  const { margin } = dimensions;

  const svgWidth = rootWidth - margin.left - margin.right;
  const svgHeight = rootHeight - margin.top - margin.bottom;

  useEffect(() => {
    const minX = average
      ? average[0].x
      : data.reduce((prevX, item) => {
          return Math.max(prevX, item.x);
        }, Infinity);

    const averageYfromMinX = getAverageYfromX(minX, average);

    const maxX = data.reduce((prevX, item) => {
      return Math.max(prevX, item.x);
    }, -Infinity);
    const averageYfromMaxX = getAverageYfromX(maxX, average);

    const xScale = d3
      .scaleLinear()
      .domain([
        Math.min(Math.max(d3.min(data, (d) => d.x) - 50, 0), minX),
        d3.max(data, (d) => d.x) + 50,
      ])
      .range([0, svgWidth]);

    const yScale = d3
      .scaleLinear()
      .domain([
        Math.max(d3.min(data, (d) => d.y) - 50, 0),
        Math.max(
          d3.max(data, (d) => d.y),
          averageYfromMaxX || 0,
        ) + 50,
      ])
      .range([svgHeight, 0]);

    // Create root container where we will append all other chart elements
    const svgEl = d3.select(svgRef.current);
    svgEl.selectAll('*').remove(); // Clear svg content before adding new elements
    const svg = svgEl.append('g').attr('transform', `translate(${margin.left},${margin.top})`);

    // Add X grid lines with labels
    const xAxis = d3.axisBottom(xScale).ticks(5).tickSize(-svgHeight);
    const xAxisGroup = svg.append('g').attr('transform', `translate(0, ${svgHeight})`).call(xAxis);
    xAxisGroup.select('.domain').remove();
    xAxisGroup.selectAll('line').attr('stroke', 'rgba(255, 255, 255, 0.2)');
    xAxisGroup
      .selectAll('text')
      .attr('opacity', 0.5)
      .attr('color', 'white')
      .attr('font-size', '0.75rem');

    // Add Y grid lines with labels
    const yAxis = d3.axisLeft(yScale).ticks(5).tickSize(-svgWidth);
    const yAxisGroup = svg.append('g').call(yAxis);
    yAxisGroup.select('.domain').remove();
    yAxisGroup.selectAll('line').attr('stroke', 'rgba(255, 255, 255, 0.2)');
    yAxisGroup
      .selectAll('text')
      .attr('opacity', 0.5)
      .attr('color', 'white')
      .attr('font-size', '0.75rem');

    // Add average if available
    if (average) {
      svg
        .append('line')
        .attr('id', 'average')
        .attr('class', 'average')
        .attr('x1', xScale(average[0].x))
        .attr('y1', yScale(averageYfromMinX || 0))
        .attr('x2', xScale(maxX))
        .attr('y2', yScale(averageYfromMaxX || 0))
        .attr('stroke', 'blue');
    }

    // Add circles with values from data
    svg
      .selectAll('.circle')
      .data(data)
      .enter()
      .append('circle')
      .attr('class', 'circle')
      .attr('fill', (d) => setColor(d, average))
      .attr('r', 5)
      .attr('cx', (d) => xScale(d.x))
      .attr('cy', (d) => yScale(d.y))
      .attr('data-label', (d): string => d.label || '')
      .attr('data-d', (d) => JSON.stringify(d))
      .on('mouseover', (event: any) => {
        showLabel(event, tooltip);
      })
      .on('mouseout', () => hideLabel(tooltip));

    const tooltip = svg
      .append('text')
      .attr('id', 'tooltip')
      .attr('class', 'tooltip')
      .style('font-size', 19)
      .attr('fill', 'white')
      .style('visibility', 'hidden');
  }, [data, svgWidth, svgHeight, margin, average]); // Redraw chart if data changes

  return (
    <div
      ref={rootRef}
      style={{
        width: '100%',
        height: '100%',
      }}
    >
      <svg className={classes.svg} ref={svgRef} width={rootWidth} height={rootHeight} />
    </div>
  );
};

export default Plot;
