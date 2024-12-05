import { default as NextLink } from 'next/link';

export interface LinkProps {
  href: string;
  icon?: string;
  label: string;
  variant?: 'primary' | 'secondary';
}

const Link: React.FC<LinkProps> = ({
  href,
  icon,
  label,
  variant = 'primary',
}) => {
  return (
    <NextLink
      className={`fr-btn ${icon ? 'fr-btn--icon-right' : ''} ${
        icon ?? ''
      } fr-text--lg ${variant === 'secondary' ? 'fr-btn--secondary' : ''}`}
      href={href}
    >
      {label}
    </NextLink>
  );
};

Link.displayName = 'Link';
export default Link;
