export interface IconBackgroundProps {
  icon: string;
}

const IconBackground: React.FC<IconBackgroundProps> = ({ icon }) => {
  return (
    <div
      className={`${icon} bg-[var(--background-contrast-info)] rounded-lg text-[var(--background-action-high-blue-france)] h-12 w-12 flex items-center justify-center`}
    />
  );
};

export default IconBackground;
