import IconBackground, {
  IconBackgroundVariant,
} from '../IconBackground/IconBackground';

export interface BlockIconProps {
  description: string;
  icon: string;
  title: string;
}

const BlockIcon: React.FC<BlockIconProps> = ({ description, icon, title }) => {
  return (
    <div className='fr-col-md flex flex-col items-center'>
      <div>
        <IconBackground
          icon={icon}
          variant={IconBackgroundVariant.BLUE_LIGHT}
        />
      </div>
      <h5 className='fr-mt-2w text-center'>{title}</h5>
      <p className='text-center'>{description}</p>
    </div>
  );
};

export default BlockIcon;
