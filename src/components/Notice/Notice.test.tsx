import { render, screen, fireEvent } from '@testing-library/react';

import Notice, { NoticeType } from './Notice';

describe('Notice', () => {
  it('renders with default props', () => {
    render(<Notice description='Test description' />);
    expect(screen.getByText('Test description')).toBeInTheDocument();
  });

  it('renders with title', () => {
    render(<Notice description='Test description' title='Test title' />);
    expect(screen.getByText('Test title')).toBeInTheDocument();
    expect(screen.getByText('Test description')).toBeInTheDocument();
  });

  it('renders with alert type', () => {
    const { container } = render(
      <Notice description='Test description' type={NoticeType.ALERT} />
    );
    expect(container.querySelector('.fr-notice--alert')).toBeInTheDocument();
  });

  it('renders with info type', () => {
    const { container } = render(
      <Notice description='Test description' type={NoticeType.INFO} />
    );
    expect(container.querySelector('.fr-notice--info')).toBeInTheDocument();
  });

  it('renders with custom className when no type is provided', () => {
    const { container } = render(
      <Notice description='Test description' className='custom-class' />
    );
    expect(container.querySelector('.custom-class')).toBeInTheDocument();
  });

  it('renders close button and removes notice when clicked', () => {
    const { container } = render(
      <div>
        <Notice description='Test description' buttonClose={true} />
      </div>
    );

    const closeButton = screen.getByTitle('Masquer le message');
    expect(closeButton).toBeInTheDocument();

    fireEvent.click(closeButton);
    expect(container.querySelector('.fr-notice')).not.toBeInTheDocument();
  });

  it('adds padding when buttonClose is true', () => {
    const { container } = render(
      <Notice description='Test description' buttonClose={true} />
    );
    expect(container.querySelector('.py-3')).toBeInTheDocument();
  });
});
