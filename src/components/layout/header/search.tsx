import { Search } from 'lucide-react';
import { FC } from 'react';

const SearchBar: FC = () => {
  return (
    <div className="relative grow">
      <Search className="text-[#9CA3AF] absolute left-3 top-3 w-5" />
      <input
        type="text"
        placeholder="What you are looking for?"
        className="bg-[#F9FAFB] py-3 w-full rounded-xl placeholder:text-[#9CA3AF] pl-9 border
        hover:border-gray-400/60 focus:border-gray-400/60 focus:outline-none
        transition-colors duration-150 delay-75 border-gray-100"
        suppressHydrationWarning
      />
    </div>
  );
};

export default SearchBar;
