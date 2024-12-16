export enum BadgeVariant {
  BLUE_DARK = 'blue-dark',
  BLUE_LIGHT = 'blue-light',
  GREEN = 'green',
  GREY = 'grey',
}

export interface BadgeProps {
  label: string;
  variant: BadgeVariant;
}

const Badge: React.FC<BadgeProps> = ({ label, variant }) => {
  const baseClasses = 'rounded font-bold px-1.5 py-0.5 uppercase h-fit w-fit';

  const variantClasses = {
    [BadgeVariant.BLUE_LIGHT]:
      '!bg-[var(--background-alt-green-archipel)] !text-[var(--text-default-info)]',
    [BadgeVariant.BLUE_DARK]:
      '!bg-[var(--background-action-high-blue-france)] !text-[var(--text-inverted-grey)]',
    [BadgeVariant.GREEN]:
      '!bg-[var(--background-alt-green-emeraude)] !text-[var(--text-default-success)]',
    [BadgeVariant.GREY]:
      '!bg-[var(--background-alt-grey-hover)] !text-[var(--text-default-grey)]',
  };

  return (
    <span className={`${baseClasses} ${variantClasses[variant]}`}>{label}</span>
  );
};

export default Badge;
