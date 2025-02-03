'use client';

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
  legacyBehavior?: boolean;
  onClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void;
  onSubmit?: (event: React.FormEvent<HTMLFormElement>) => void;
  size?: LinkSize;
  variant?: LinkVariant;
}

const Link: React.FC<LinkProps> = ({
  href,
  icon,
  label,
  legacyBehavior = false,
  onClick,
  onSubmit,
  size = LinkSize.MEDIUM,
  variant = LinkVariant.PRIMARY,
}) => {
  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (variant === LinkVariant.DISABLED) {
      event.preventDefault();
      return;
    }

    if (onSubmit) {
      event.preventDefault();
      onSubmit(event as unknown as React.FormEvent<HTMLFormElement>);
    }

    if (onClick) {
      event.preventDefault();
      onClick(event);
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
      'bg-(--background-disabled-grey)! text-(--text-disabled-grey)! cursor-not-allowed!',
    variant === LinkVariant.SECONDARY &&
      'fr-btn--secondary bg-var(--color-white)!',
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
      legacyBehavior={legacyBehavior}
    >
      {legacyBehavior ? (
        <a className={classNames} rel='noopener noreferrer' target='_blank'>
          {label}
        </a>
      ) : (
        <span className={textClassNames}>{label}</span>
      )}
    </NextLink>
  );
};

Link.displayName = 'Link';
export default Link;
