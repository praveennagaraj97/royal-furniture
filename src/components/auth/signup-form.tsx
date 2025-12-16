'use client';

import { FormInput } from '@/components/shared/inputs/form-input';
import { signupFormValidators } from '@/validators';
import { motion, type Variants } from 'framer-motion';
import { useState, type FC, type FormEvent } from 'react';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: 'easeOut',
    },
  },
};

interface SignupFormProps {
  onSocialLogin?: (provider: 'facebook' | 'google' | 'apple') => void;
}

const SignupForm: FC<SignupFormProps> = ({ onSocialLogin }) => {
  const [signupData, setSignupData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    mobileNumber: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState<{
    firstName?: string;
    lastName?: string;
    email?: string;
    mobileNumber?: string;
    password?: string;
    confirmPassword?: string;
  }>({});
  const [touched, setTouched] = useState<{
    firstName?: boolean;
    lastName?: boolean;
    email?: boolean;
    mobileNumber?: boolean;
    password?: boolean;
    confirmPassword?: boolean;
  }>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleFieldChange =
    (field: keyof typeof signupData) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setSignupData((prev) => ({ ...prev, [field]: value }));

      // Clear error when user starts typing
      if (errors[field]) {
        setErrors((prev) => ({ ...prev, [field]: undefined }));
      }

      // Mark as touched if form was submitted
      if (isSubmitted) {
        setTouched((prev) => ({ ...prev, [field]: true }));
      }
    };

  const handleBlur = (field: keyof typeof signupData) => () => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const validateForm = () => {
    const newErrors: typeof errors = {};
    const firstNameError = signupFormValidators.firstName(signupData.firstName);
    const lastNameError = signupFormValidators.lastName(signupData.lastName);
    const emailError = signupFormValidators.email(signupData.email);
    const mobileNumberError = signupFormValidators.mobileNumber(
      signupData.mobileNumber
    );
    const passwordError = signupFormValidators.password(signupData.password);
    const confirmPasswordError = signupFormValidators.confirmPassword(
      signupData.confirmPassword,
      signupData.password
    );

    if (firstNameError) newErrors.firstName = firstNameError;
    if (lastNameError) newErrors.lastName = lastNameError;
    if (emailError) newErrors.email = emailError;
    if (mobileNumberError) newErrors.mobileNumber = mobileNumberError;
    if (passwordError) newErrors.password = passwordError;
    if (confirmPasswordError) newErrors.confirmPassword = confirmPasswordError;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignupSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitted(true);

    // Mark all fields as touched on submit
    setTouched({
      firstName: true,
      lastName: true,
      email: true,
      mobileNumber: true,
      password: true,
      confirmPassword: true,
    });

    // Validate before submitting
    if (!validateForm()) {
      return;
    }

    // Handle successful signup
    console.log('Signup data:', signupData);
  };

  const handleSocialLogin = (provider: 'facebook' | 'google' | 'apple') => {
    if (onSocialLogin) {
      onSocialLogin(provider);
    } else {
      console.log(`Social login with ${provider}`);
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="flex flex-col gap-4"
    >
      <form onSubmit={handleSignupSubmit} className="flex flex-col gap-4">
        <motion.div variants={itemVariants}>
          <FormInput
            id="firstName"
            type="text"
            placeholder="First name"
            value={signupData.firstName}
            onChange={handleFieldChange('firstName')}
            onBlur={handleBlur('firstName')}
            validator={signupFormValidators.firstName}
            error={errors.firstName}
            showError={!!touched.firstName || isSubmitted}
            containerClassName="w-full"
            className="bg-[#f8f8f8] border-0 rounded-lg text-gray-900 placeholder:text-gray-400"
          />
        </motion.div>
        <motion.div variants={itemVariants}>
          <FormInput
            id="lastName"
            type="text"
            placeholder="Last name"
            value={signupData.lastName}
            onChange={handleFieldChange('lastName')}
            onBlur={handleBlur('lastName')}
            validator={signupFormValidators.lastName}
            error={errors.lastName}
            showError={!!touched.lastName || isSubmitted}
            containerClassName="w-full"
            className="bg-[#f8f8f8] border-0 rounded-lg text-gray-900 placeholder:text-gray-400"
          />
        </motion.div>
        <motion.div variants={itemVariants}>
          <FormInput
            id="email"
            type="email"
            placeholder="Email ID"
            value={signupData.email}
            onChange={handleFieldChange('email')}
            onBlur={handleBlur('email')}
            validator={signupFormValidators.email}
            error={errors.email}
            showError={!!touched.email || isSubmitted}
            containerClassName="w-full"
            className="bg-[#f8f8f8] border-0 rounded-lg text-gray-900 placeholder:text-gray-400"
          />
        </motion.div>
        <motion.div variants={itemVariants}>
          <FormInput
            id="mobileNumber"
            type="tel"
            inputMode="numeric"
            placeholder="Mobile Number"
            value={signupData.mobileNumber}
            onChange={handleFieldChange('mobileNumber')}
            onBlur={handleBlur('mobileNumber')}
            validator={signupFormValidators.mobileNumber}
            error={errors.mobileNumber}
            showError={!!touched.mobileNumber || isSubmitted}
            containerClassName="w-full"
            className="bg-[#f8f8f8] border-0 rounded-lg text-gray-900 placeholder:text-gray-400"
          />
        </motion.div>
        <motion.div variants={itemVariants}>
          <FormInput
            id="password"
            type="password"
            placeholder="Password"
            value={signupData.password}
            onChange={handleFieldChange('password')}
            onBlur={handleBlur('password')}
            validator={signupFormValidators.password}
            error={errors.password}
            showError={!!touched.password || isSubmitted}
            containerClassName="w-full"
            className="bg-[#f8f8f8] border-0 rounded-lg text-gray-900 placeholder:text-gray-400"
          />
        </motion.div>
        <motion.div variants={itemVariants}>
          <FormInput
            id="confirmPassword"
            type="password"
            placeholder="Re-enter Password"
            value={signupData.confirmPassword}
            onChange={handleFieldChange('confirmPassword')}
            onBlur={handleBlur('confirmPassword')}
            validator={(value) =>
              signupFormValidators.confirmPassword(value, signupData.password)
            }
            error={errors.confirmPassword}
            showError={!!touched.confirmPassword || isSubmitted}
            containerClassName="w-full"
            className="bg-[#f8f8f8] border-0 rounded-lg text-gray-900 placeholder:text-gray-400"
          />
        </motion.div>

        <motion.div variants={itemVariants}>
          <button
            type="submit"
            className="w-full bg-deep-maroon text-white py-3 rounded-lg font-semibold text-base hover:bg-[#6b0000] transition-colors duration-200 mt-2"
          >
            Sign Up
          </button>
        </motion.div>
      </form>
    </motion.div>
  );
};

export default SignupForm;
