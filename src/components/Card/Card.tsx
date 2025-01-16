import Image from 'next/image';

export interface CardProps {
  children: React.ReactNode;
  image?: string;
  title: string;
}

const Card: React.FC<CardProps> = ({ children, image, title }) => {
  return (
    <div className='border-grey rounded-lg px-6 pt-8 pb-6 bg-white'>
      <h5>{title}</h5>
      {children}
      {image && (
        <Image
          alt={title}
          className='w-auto h-[102px] object-contain mt-4'
          height={102}
          sizes='100vw'
          src={image}
          width={0}
        />
      )}
    </div>
  );
};

export default Card;
