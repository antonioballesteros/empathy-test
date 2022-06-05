import { describe, expect, it } from 'vitest';
import Fake, { BUTTONS } from './Fake';
import { render, screen } from '@/utils/test-utils';

describe('Fake', () => {
  it('should show all buttons', () => {
    const fn = (d: number): number => d;
    render(<Fake id={0} onClick={fn} />);

    const buttons = screen.getAllByRole('button');

    expect(buttons.length).toBe(BUTTONS.length);
  });

  it('selected button should be the disabled', () => {
    const fn = (d: number): number => d;
    render(<Fake id={0} onClick={fn} />);

    expect(screen.getByText(BUTTONS[0].label).closest('button')).toBeDisabled();
  });
});
