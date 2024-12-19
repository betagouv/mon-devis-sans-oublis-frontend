import { default as NextLink } from 'next/link';

export enum LinkSize {
  MEDIUM = 'medium',
  LARGE = 'large',
  SMALL = 'small',
}

export enum LinkVariant {
  DISABLED = 'disabled',
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
}

export interface LinkProps {
  href: string;
  icon?: string;
  label: string;
  onSubmit?: (event: React.FormEvent<HTMLFormElement>) => void;
  size?: LinkSize;
  variant?: LinkVariant;
}

const Link: React.FC<LinkProps> = ({
  href,
  icon,
  label,
  onSubmit,
  size = LinkSize.MEDIUM,
  variant = LinkVariant.PRIMARY,
}) => {
  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (onSubmit) {
      event.preventDefault();
      const formEvent = new Event('submit', { bubbles: true });
      onSubmit(formEvent as unknown as React.FormEvent<HTMLFormElement>);
    }
  };

  const classNames = [
    'fr-btn',
    icon && 'fr-btn--icon-right',
    icon,
    `fr-btn--${variant}`,
    size === LinkSize.LARGE && 'fr-btn--lg',
    size === LinkSize.SMALL && 'fr-btn--sm',
    variant === LinkVariant.DISABLED &&
      'bg-[var(--background-disabled-grey)] text-[var(--text-disabled-grey)] pointer-events-none',
    variant === LinkVariant.SECONDARY && 'fr-btn--secondary',
  ]
    .filter(Boolean)
    .join(' ');

  const textClassNames =
    size === LinkSize.SMALL ? 'fr-text--sm' : 'fr-text--lg';

  return (
    <NextLink
      className={classNames}
      href={variant === LinkVariant.DISABLED ? '' : href}
      onClick={handleClick}
    >
      <span className={textClassNames}>{label}</span>
    </NextLink>
  );
};

Link.displayName = 'Link';
export default Link;
