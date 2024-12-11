import Image from 'next/image';

export interface CardImageProps {
  image: string;
  title: string;
}

const CardImage: React.FC<CardImageProps> = ({ image, title }) => {
  return (
    <div className='min-h-full w-[136px] border-grey p-2'>
      <Image alt={title} height={120} src={`/images/${image}`} width={120} />
      <h6 className='text-center'>{title}</h6>
    </div>
  );
};

export default CardImage;
