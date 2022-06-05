import { describe, expect, it } from 'vitest';
import Fake from './Fake';
import { render, screen } from '@/utils/test-utils';

describe('Fake', () => {
  it('should show all buttons', () => {
    const fn = (d: number): number => d;
    render(<Fake id={0} onClick={fn} />);

    const buttons = screen.getAllByRole('button');

    expect(buttons.length).toBe(3);
  });

  it('selected button should be the disabled', () => {
    const fn = (d: number): number => d;
    render(<Fake id={0} onClick={fn} />);

    expect(screen.getByText('Test 0').closest('button')).toBeDisabled();
  });
});
