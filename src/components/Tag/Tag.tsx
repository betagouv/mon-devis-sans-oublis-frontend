export enum TagVariant {
  BLUE = 'blue',
  GREEN = 'green',
}

export interface TagProps {
  label: string;
  variant?: TagVariant;
}

const Tag: React.FC<TagProps> = ({ label, variant = TagVariant.BLUE }) => {
  return (
    <span
      className={`rounded ${
        variant === TagVariant.GREEN
          ? '!bg-[var(--background-alt-green-emeraude)] !text-[var(--text-default-success)]'
          : '!bg-[var(--background-alt-green-archipel)] !text-[var(--text-default-info)]'
      } font-bold px-1.5 py-0.5 uppercase w-fit fr-badge--green-archipel`}
    >
      {label}
    </span>
  );
};

export default Tag;
