import { describe, expect, it } from 'vitest';
import Plot, { getAverageYfromX, isAboveAverage } from './Plot';
import { render, userEvent } from '@/utils/test-utils';

import type { PlotValue, Point } from './type';

describe('Plot', () => {
  describe('Plot', () => {
    it('should render path with proper d attribute', () => {
      const data = [
        { x: 200, y: 190, label: 'bad' },
        { x: 50, y: 45, label: 'really bad' },
        { x: 50, y: 10, label: 'good' },
        { x: 250, y: 10, label: 'best' },
      ];
      const { container } = render(<Plot data={data} />);
      const circles = container.querySelectorAll('circle');

      expect(circles.length).toBe(4);

      const circle = circles[0];
      const d = JSON.parse(circle.getAttribute('data-d') || '');

      expect(d.x).toBe(200);
      expect(d.y).toBe(190);
      expect(d.label).toBe('bad');
    });

    it('should show label when hover and hide when blur', () => {
      const data = [
        { x: 200, y: 190, label: 'bad' },
        { x: 50, y: 45, label: 'really bad' },
        { x: 50, y: 10, label: 'good' },
        { x: 250, y: 10, label: 'best' },
      ];
      const { container } = render(<Plot data={data} />);
      const circle = container.querySelector('circle');
      const tooltip = container.querySelector('#tooltip');
      expect(tooltip).not.toBeVisible();

      userEvent.hover(circle);
      expect(tooltip).toBeVisible();

      userEvent.unhover(circle);
      expect(tooltip).not.toBeVisible();
    });

    it('should show average line', () => {
      const data: PlotValue[] = [
        { x: 200, y: 190, label: 'bad' },
        { x: 50, y: 45, label: 'really bad' },
        { x: 50, y: 10, label: 'good' },
        { x: 250, y: 10, label: 'best' },
      ];

      const average: [Point, Point] = [
        { x: 0, y: 0 },
        { x: 1000, y: 100 },
      ];

      const { container } = render(<Plot data={data} average={average} />);
      const line = container.querySelector('#average');
      expect(line).toBeVisible();
    });
  });

  describe('getAverageYfromX', () => {
    it('should be 200 when there is a horizontal line at 200', () => {
      const y = getAverageYfromX(60, [
        { x: 50, y: 200 },
        { x: 100, y: 200 },
      ]);
      expect(y).toBe(200);
    });

    it('should be 200 when requesting out of range values and there is a horizontal line at 200', () => {
      const y = getAverageYfromX(20, [
        { x: 50, y: 200 },
        { x: 100, y: 200 },
      ]);
      expect(y).toBe(200);

      const y2 = getAverageYfromX(220, [
        { x: 50, y: 200 },
        { x: 100, y: 200 },
      ]);
      expect(y2).toBe(200);
    });

    it('should be 20 when there is an inclined line starting at 20', () => {
      const y = getAverageYfromX(20, [
        { x: 20, y: 20 },
        { x: 100, y: 200 },
      ]);
      expect(y).toBe(20);
    });

    it('should be 200 when there is an inclined line ending at 200', () => {
      const y = getAverageYfromX(100, [
        { x: 20, y: 20 },
        { x: 100, y: 200 },
      ]);
      expect(y).toBe(200);
    });

    it('should be correct when requesting out of range values and there is an inclined line starting at 20', () => {
      const y = getAverageYfromX(10, [
        { x: 20, y: 40 },
        { x: 100, y: 200 },
      ]);
      expect(y).toBe(20);

      const y2 = getAverageYfromX(150, [
        { x: 20, y: 40 },
        { x: 100, y: 200 },
      ]);
      expect(y2).toBe(300);
    });

    it('should be null when there is an vertical line', () => {
      const y = getAverageYfromX(20, [
        { x: 20, y: 20 },
        { x: 20, y: 100 },
      ]);
      expect(y).toBe(null);
    });

    it('should be null when information from average is not provided', () => {
      const y = getAverageYfromX(20);
      expect(y).toBe(null);
    });
  });

  describe('isAboveAverage', () => {
    it('should be true when there is point above 300 and a horizontal line at 200', () => {
      const y = isAboveAverage({ x: 80, y: 300 }, [
        { x: 50, y: 200 },
        { x: 100, y: 200 },
      ]);
      expect(y).toBe(true);
    });

    it('should be true when there is point above a inclined line', () => {
      const y = isAboveAverage({ x: 40, y: 80 }, [
        { x: 20, y: 20 },
        { x: 100, y: 200 },
      ]);
      expect(y).toBe(true);
    });

    it('should be false when there is point under a inclined line', () => {
      const y = isAboveAverage({ x: 40, y: 40 }, [
        { x: 20, y: 20 },
        { x: 100, y: 200 },
      ]);
      expect(y).toBe(false);
    });

    it('should be true when information from average is not provided', () => {
      const y = isAboveAverage({ x: 0, y: 0 });
      expect(y).toBe(true);

      const y2 = isAboveAverage({ x: 10, y: 10 });
      expect(y2).toBe(true);
    });
  });
});
