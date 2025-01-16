import Image from 'next/image';

export interface CardImageProps {
  description: string;
  image: string;
  title: string;
}

const CardImage: React.FC<CardImageProps> = ({ description, image, title }) => {
  return (
    <>
      <div
        className='h-[216px] bg-[#FCFCFD] border-grey rounded-t-lg flex justify-center items-center'
        style={{ borderBottom: 'none' }}
      >
        <Image
          alt={title}
          className='w-auto h-[180px] object-contain'
          height={180}
          sizes='100vw'
          src={image}
          width={0}
        />
      </div>
      <div
        className='p-8 border-grey rounded-b-lg'
        style={{ borderTop: 'none' }}
      >
        <h5>{title}</h5>
        <p className='fr-text--sm'>{description}</p>
      </div>
    </>
  );
};

export default CardImage;
