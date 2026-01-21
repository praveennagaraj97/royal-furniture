import { FC } from 'react';
import { FiImage } from 'react-icons/fi';

interface NoImageProps {
  className?: string;
  label?: string;
}

const NoImage: FC<NoImageProps> = ({
  className = 'w-full h-full',
  label = 'No image',
}) => {
  return (
    <div
      aria-hidden
      role="img"
      className={`flex items-center justify-center bg-gray-100 text-gray-400 ${className}`}
    >
      <FiImage className="opacity-70" size={48} />
      <span className="sr-only">{label}</span>
    </div>
  );
};

export default NoImage;
