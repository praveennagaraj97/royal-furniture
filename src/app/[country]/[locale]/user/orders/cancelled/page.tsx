'use client';

import { AppLink } from '@/hooks/use-navigation';
import { FiCheckCircle } from 'react-icons/fi';

const OrderCancelledPage = () => {
  return (
    <main className="max-w-3xl mx-auto px-4 py-10 space-y-6">
      <section className="rounded-lg border border-green-100 bg-[#F3FBF6] px-6 py-8 flex flex-col items-center text-center gap-4">
        <div className="rounded-full bg-[#E7F7EE] p-3 text-[#00AF3B]">
          <FiCheckCircle className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <h1 className="text-xl font-semibold text-gray-900">
            Your order has been cancelled
          </h1>
          <p className="text-sm text-gray-600 max-w-md mx-auto">
            We&apos;ve received your cancellation request. If payment was
            already captured, any eligible refunds will be processed as per our
            refund policy.
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

export default OrderCancelledPage;
