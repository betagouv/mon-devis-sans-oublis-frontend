import Image from 'next/image';

export interface TileProps {
  description: string;
  href: string;
  image?: string;
  title: string;
}

const Tile: React.FC<TileProps> = ({ description, href, image, title }) => {
  return (
    <div
      className='fr-tile fr-tile--sm fr-tile--vertical fr-enlarge-link'
      id='tile-6661'
    >
      <div className='fr-tile__body'>
        {image && <Image alt={title} height={80} src={image} width={80} />}
        <div
          className={`fr-tile__content !flex !flex-col ${
            image ? '!items-center p-2' : '!items-start'
          }`}
        >
          <h3
            className={`fr-tile__title fr-text--lg ${
              image ? '!text-center' : '!text-left'
            }`}
          >
            <a
              href={href}
              className={`${image && '!text-[var(--text-title-grey)]'}`}
            >
              {title}
            </a>
          </h3>
          <p
            className={`fr-tile__detail fr-text--md ${
              image ? '!text-center' : '!text-left'
            }`}
          >
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Tile;
