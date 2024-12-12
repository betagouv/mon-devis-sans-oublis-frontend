import { default as NextLink } from 'next/link';

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
  variant?: LinkVariant;
}

const Link: React.FC<LinkProps> = ({
  href,
  icon,
  label,
  onSubmit,
  variant = 'primary',
}) => {
  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (onSubmit) {
      event.preventDefault();
      const formEvent = new Event('submit', { bubbles: true });
      onSubmit(formEvent as unknown as React.FormEvent<HTMLFormElement>);
    }
  };

  return (
    <NextLink
      className={`fr-btn ${icon && 'fr-btn--icon-right'} ${icon} fr-text--lg 
      ${variant === LinkVariant.SECONDARY && 'fr-btn--secondary'} 
      ${
        variant === LinkVariant.DISABLED &&
        'bg-[var(--background-disabled-grey)] text-[var(--text-disabled-grey)] pointer-events-none'
      }`}
      href={variant === LinkVariant.DISABLED ? '' : href}
      onClick={handleClick}
    >
      {label}
    </NextLink>
  );
};

Link.displayName = 'Link';
export default Link;
