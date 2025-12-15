'use client';

import { Globe } from 'lucide-react';
import { FC } from 'react';
import Dropdown from '../../shared/dropdown';

const LangSwitch: FC = () => {
  return (
    <Dropdown
      align="right"
      trigger={
        <div className="flex items-center gap-2 rounded-full px-3 py-1.5 text-sm text-gray-600 hover:text-[#7F1D1D] hover:bg-gray-100 transition-colors">
          <Globe className="h-5 w-5" />
          <span className="hidden sm:inline">EN</span>
        </div>
      }
    >
      <button
        type="button"
        className="flex w-full items-center justify-between px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
      >
        <span>English</span>
        <span className="text-xs text-gray-400">EN</span>
      </button>
      <button
        type="button"
        className="flex w-full items-center justify-between px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
      >
        <span>العربية</span>
        <span className="text-xs text-gray-400">AR</span>
      </button>
    </Dropdown>
  );
};

export default LangSwitch;
