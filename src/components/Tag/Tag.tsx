export interface TagProps {
  label: string;
}

const Tag: React.FC<TagProps> = ({ label }) => {
  return (
    <span className='rounded !text-[var(--text-default-info)] !bg-[var(--background-alt-green-archipel)] font-bold px-1.5 py-0.5 uppercase w-fit fr-badge--green-archipel'>
      {label}
    </span>
  );
};

export default Tag;
