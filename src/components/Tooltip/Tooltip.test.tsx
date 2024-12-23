import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Tooltip from './Tooltip';

describe('Tooltip component', () => {
  test('renders the icon correctly', () => {
    const { container } = render(
      <Tooltip icon='fr-icon-information-fill' text='Tooltip text' />
    );

    const iconElement = container.querySelector('.fr-icon-information-fill');
    expect(iconElement).toBeInTheDocument();
    expect(iconElement).toHaveClass('fr-icon-information-fill');
  });

  test('shows the tooltip on hover', async () => {
    const { container } = render(
      <Tooltip icon='fr-icon-information-fill' text='Tooltip text' />
    );

    const iconElement = container.querySelector('.fr-icon-information-fill');
    expect(iconElement).toBeInTheDocument();

    await userEvent.hover(iconElement as Element);

    expect(screen.getByText('Tooltip text')).toBeInTheDocument();
  });

  test('hides the tooltip when mouse leaves', async () => {
    const { container } = render(
      <Tooltip icon='fr-icon-information-fill' text='Tooltip text' />
    );

    const iconElement = container.querySelector('.fr-icon-information-fill');
    expect(iconElement).toBeInTheDocument();

    await userEvent.hover(iconElement as Element);
    expect(screen.getByText('Tooltip text')).toBeInTheDocument();

    await userEvent.unhover(iconElement as Element);
    expect(screen.queryByText('Tooltip text')).not.toBeInTheDocument();
  });

  test('applies additional className to the tooltip', async () => {
    const { container } = render(
      <Tooltip
        className='custom-class'
        icon='fr-icon-information-fill'
        text='Tooltip text'
      />
    );

    const iconElement = container.querySelector('.fr-icon-information-fill');
    expect(iconElement).toBeInTheDocument();

    await userEvent.hover(iconElement as Element);

    const tooltipElement = screen.getByText('Tooltip text');
    expect(tooltipElement).toHaveClass('custom-class');
  });
});
