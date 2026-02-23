'use client';

import { AppLink } from '@/hooks/use-navigation';
import { FiInfo } from 'react-icons/fi';

const RefundRequestedPage = () => {
  return (
    <main className="max-w-3xl mx-auto px-4 py-10 space-y-6">
      <section className="rounded-lg border border-blue-100 bg-[#F4F8FF] px-6 py-8 flex flex-col items-center text-center gap-4">
        <div className="rounded-full bg-[#E3EDFF] p-3 text-[#274C77]">
          <FiInfo className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <h1 className="text-xl font-semibold text-gray-900">
            Refund request submitted
          </h1>
          <p className="text-sm text-gray-600 max-w-md mx-auto">
            We&apos;ve received your refund request. Our team will review it and
            share an update with you shortly via email or SMS.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 mt-2">
          <AppLink
            href="/user/orders"
            className="inline-flex items-center justify-center px-5 py-2.5 rounded-lg border border-gray-300 text-sm font-medium text-gray-800 bg-white hover:border-deep-maroon hover:text-deep-maroon transition-colors duration-200"
          >
            Back to My Orders
          </AppLink>
        </div>
      </section>
    </main>
  );
};

export default RefundRequestedPage;
