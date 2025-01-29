import { render, screen, fireEvent } from '@testing-library/react';

import Notice, { NoticeType } from './Notice';

describe('Notice', () => {
  it('renders with default props', () => {
    render(<Notice description='Test description' />);
    expect(screen.getByText('Test description')).toBeInTheDocument();
  });

  it('renders with title', () => {
    render(<Notice title='Test title' description='Test description' />);
    expect(screen.getByText('Test title')).toBeInTheDocument();
    expect(screen.getByText('Test description')).toBeInTheDocument();
  });

  it('renders with alert type', () => {
    render(<Notice type={NoticeType.ALERT} description='Test description' />);
    const notice = screen.getByText('Test description').closest('.fr-notice');
    expect(notice).toHaveClass('fr-notice--alert');
  });

  it('renders with info type', () => {
    render(<Notice type={NoticeType.INFO} description='Test description' />);
    const notice = screen.getByText('Test description').closest('.fr-notice');
    expect(notice).toHaveClass('fr-notice--info');
  });

  it('renders with custom className when no type is provided', () => {
    render(<Notice className='custom-class' description='Test description' />);
    const notice = screen.getByText('Test description').closest('.fr-notice');
    expect(notice).toHaveClass('custom-class');
  });

  it('renders with close button and can be closed', () => {
    render(<Notice buttonClose={true} description='Test description' />);

    const closeButton = screen.getByRole('button');
    expect(closeButton).toBeInTheDocument();

    fireEvent.click(closeButton);

    expect(screen.queryByText('Test description')).not.toBeInTheDocument();
  });

  it('applies padding class when buttonClose is true', () => {
    render(<Notice buttonClose={true} description='Test description' />);
    const notice = screen.getByText('Test description').closest('.fr-notice');
    expect(notice).toHaveClass('fr-py-1w');
  });

  it('does not apply padding class when buttonClose is false', () => {
    render(<Notice buttonClose={false} description='Test description' />);
    const notice = screen.getByText('Test description').closest('.fr-notice');
    expect(notice).not.toHaveClass('fr-py-1w');
  });
});
