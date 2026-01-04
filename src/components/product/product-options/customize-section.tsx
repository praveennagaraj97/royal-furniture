'use client';

import { ViewOnce } from '@/components/shared/animations';
import { ChevronRight, Settings } from 'lucide-react';

export const CustomizeSection: React.FC = () => {
  return (
    <ViewOnce type="slideUp" distance={15} duration={0.4} delay={0.1} amount={0.01} margin="-100px">
      <button
        type="button"
        className="w-full flex items-center justify-between p-2 bg-deep-maroon/10 hover:bg-deep-maroon/20 rounded-lg transition-colors duration-200 group"
      >
        <div className="flex items-center gap-3">
          <div className="p-2 bg-deep-maroon/10 rounded-lg group-hover:bg-deep-maroon/20 transition-colors">
            <Settings className="w-5 h-5 text-deep-maroon" />
          </div>
          <div className="text-left">
            <div className="font-semibold text-gray-900">Customize Yours</div>
            <div className="text-sm text-gray-600">Any Color, Any Size!</div>
          </div>
        </div>
        <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-deep-maroon transition-colors" />
      </button>
    </ViewOnce>
  );
};
