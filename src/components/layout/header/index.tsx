import { LogIn } from 'lucide-react';
import { FC } from 'react';
import Logo from '../../shared/icon';
import SearchBar from './search';
import Utilities from './utilities';

const Header: FC = () => {
  return (
    <header className="container mx-auto py-3 flex items-center space-x-6">
      <Logo className="h-10" />
      <SearchBar />
      <Utilities />
      <button className="flex items-center gap-2 rounded-full p-1.5 pr-3 text-sm font-medium text-gray-600 hover:text-[#7F1D1D] hover:bg-gray-100 transition-colors">
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#7F1D1D] text-white">
          <LogIn className="h-4 w-4" />
        </span>
        <span className="hidden md:inline">Sign in or sign up</span>
      </button>
    </header>
  );
};

export default Header;
