import { describe, expect, it } from 'vitest';
import Opportunities from './Opportunities';
import { render, screen } from '@/utils/test-utils';

describe('Opportunities', () => {
  it('the Opportunities title is visible', () => {
    render(<Opportunities id={0} />);
    expect(screen.queryByText(/Show Opportunities/i)).toBeInTheDocument();
  });

  it('should show error when bad fake values are selected', async () => {
    render(<Opportunities id={1000} />);
    expect(await screen.findByText(/Some error found/i)).toBeInTheDocument();
    expect(screen.queryByText(/Show Opportunities/i)).not.toBeInTheDocument();
  });
});
