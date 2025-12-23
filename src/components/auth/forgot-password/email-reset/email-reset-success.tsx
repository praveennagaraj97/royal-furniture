'use client';

import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import type { FC } from 'react';

interface EmailResetSuccessProps {
  email: string;
}

const EmailResetSuccess: FC<EmailResetSuccessProps> = ({ email }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="flex flex-col items-center gap-4 py-6"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', duration: 0.5 }}
      >
        <CheckCircle2 className="w-16 h-16 text-green-500" />
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
        className="text-lg font-semibold text-gray-900 text-center"
      >
        Check your email
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.15 }}
        className="text-sm text-gray-600 text-center max-w-sm"
      >
        We&apos;ve sent a password reset link to <strong>{email}</strong>.
        Please check your email and follow the instructions to reset your
        password.
      </motion.p>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
        className="text-xs text-gray-500 text-center max-w-sm"
      >
        Didn&apos;t receive the email? Check your spam folder or try again.
      </motion.p>
    </motion.div>
  );
};

export default EmailResetSuccess;
