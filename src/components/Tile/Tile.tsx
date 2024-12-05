import styles from './Tile.module.css';

export interface TileProps {
  description: string;
  href: string;
  title: string;
}

const Tile: React.FC<TileProps> = ({ description, href, title }) => {
  return (
    <div
      className='fr-tile fr-tile--sm fr-tile--vertical fr-enlarge-link'
      id='tile-6661'
    >
      <div className='fr-tile__body'>
        <div className={`fr-tile__content ${styles['fr-tile__content']}`}>
          <h3 className='fr-tile__title fr-text--lg'>
            <a href={href}>{title}</a>
          </h3>
          <p className='fr-tile__detail fr-text--md text-left'>{description}</p>
        </div>
      </div>
    </div>
  );
};

export default Tile;
