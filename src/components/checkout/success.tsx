'use client';

import Link from 'next/link';
import { FiShoppingBag } from 'react-icons/fi';
import { ViewOnce } from '../shared/animations';

export default function CheckoutSuccess() {
  return (
    <div className="w-full max-w-md text-center mx-auto">
      <ViewOnce type="scaleUp" distance={8} duration={0.5}>
        <div className="rounded-full bg-deep-maroon/10  p-10 w-fit mx-auto">
          <FiShoppingBag size={48} />
        </div>

        <h2 className="mt-8 text-2xl font-semibold text-black">
          Payment Successful!
        </h2>
        <p className="mt-2 font-medium text-indigo-slate">
          Your Order is Booked
        </p>
      </ViewOnce>

      <div className="mt-8 flex flex-col items-center font-medium">
        <Link
          href="#"
          className="sm:w-80 w-full mb-4 text-deep-maroon border border-deep-maroon rounded-lg px-6 py-3 text-center hover:bg-[rgba(126,0,0,0.04)] transition"
        >
          Track my order
        </Link>

        <Link
          href="#"
          className="sm:w-80 w-full bg-deep-maroon text-white rounded-lg px-6 py-3 text-center shadow-md hover:opacity-95 transition"
        >
          View my order
        </Link>
      </div>
    </div>
  );
}
