import Link from 'next/link';

export interface ButtonProps {
  href: string;
  icon: string;
  label: string;
}

const Button: React.FC<ButtonProps> = ({ href, icon, label }) => {
  return (
    <Link
      className={`fr-btn fr-btn--icon-right ${icon} fr-text--lg`}
      href={href}
    >
      {label}
    </Link>
  );
};

export default Button;
