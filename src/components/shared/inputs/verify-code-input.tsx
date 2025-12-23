'use client';

import {
  type ChangeEvent,
  type FC,
  type KeyboardEvent,
  useRef,
  useState,
  useEffect,
} from 'react';

interface VerifyCodeInputProps {
  maxLength?: 5 | 6;
  inputType?: 'number' | 'text';
  value?: string;
  onChange?: (value: string) => void;
  onComplete?: (value: string) => void;
  error?: string;
  showError?: boolean;
  containerClassName?: string;
  inputClassName?: string;
  autoFocus?: boolean;
  disabled?: boolean;
}

export const VerifyCodeInput: FC<VerifyCodeInputProps> = ({
  maxLength = 6,
  inputType = 'number',
  value = '',
  onChange,
  onComplete,
  error,
  showError = false,
  containerClassName = '',
  inputClassName = '',
  autoFocus = true,
  disabled = false,
}) => {
  const [codes, setCodes] = useState<string[]>(
    Array(maxLength).fill('').map((_, i) => (value[i] || ''))
  );
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Sync external value prop with internal state
  useEffect(() => {
    const currentValue = codes.join('');
    if (value !== currentValue) {
      const newCodes = Array(maxLength).fill('').map((_, i) => (value[i] || ''));
      setCodes(newCodes);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, maxLength]);

  // Auto-focus first input on mount
  useEffect(() => {
    if (autoFocus && inputRefs.current[0] && !disabled) {
      inputRefs.current[0]?.focus();
    }
  }, [autoFocus, disabled]);

  const handleChange = (index: number, newValue: string) => {
    // Filter input based on type
    let filteredValue = newValue;
    if (inputType === 'number') {
      // Only allow digits
      filteredValue = newValue.replace(/[^0-9]/g, '');
    }

    // Limit to single character per input
    if (filteredValue.length > 1) {
      filteredValue = filteredValue.slice(-1);
    }

    const newCodes = [...codes];
    newCodes[index] = filteredValue;
    setCodes(newCodes);

    const codeString = newCodes.join('');
    onChange?.(codeString);

    // Auto-focus next input if value entered
    if (filteredValue && index < maxLength - 1) {
      inputRefs.current[index + 1]?.focus();
    }

    // Call onComplete if all inputs are filled
    if (codeString.length === maxLength && !codeString.includes('')) {
      onComplete?.(codeString);
    }
  };

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    // Handle backspace
    if (e.key === 'Backspace') {
      if (codes[index]) {
        // If current input has value, clear it
        const newCodes = [...codes];
        newCodes[index] = '';
        setCodes(newCodes);
        const codeString = newCodes.join('');
        onChange?.(codeString);
      } else if (index > 0) {
        // If current input is empty, move to previous and clear it
        inputRefs.current[index - 1]?.focus();
        const newCodes = [...codes];
        newCodes[index - 1] = '';
        setCodes(newCodes);
        const codeString = newCodes.join('');
        onChange?.(codeString);
      }
    }
    // Handle arrow keys
    else if (e.key === 'ArrowLeft' && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === 'ArrowRight' && index < maxLength - 1) {
      inputRefs.current[index + 1]?.focus();
    }
    // Handle delete
    else if (e.key === 'Delete') {
      const newCodes = [...codes];
      newCodes[index] = '';
      setCodes(newCodes);
      const codeString = newCodes.join('');
      onChange?.(codeString);
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').trim();
    
    // Filter based on input type
    let filteredData = pastedData;
    if (inputType === 'number') {
      filteredData = pastedData.replace(/[^0-9]/g, '');
    }

    // Take only the first maxLength characters
    const chars = filteredData.slice(0, maxLength).split('');

    // Find the first empty input or start from the first
    let startIndex = 0;
    for (let i = 0; i < maxLength; i++) {
      if (!codes[i]) {
        startIndex = i;
        break;
      }
    }

    const newCodes = [...codes];
    chars.forEach((char, i) => {
      if (startIndex + i < maxLength) {
        newCodes[startIndex + i] = char;
      }
    });

    setCodes(newCodes);
    const codeString = newCodes.join('');
    onChange?.(codeString);

    // Focus the next empty input or the last input
    const nextEmptyIndex = newCodes.findIndex((code, i) => i >= startIndex && !code);
    const focusIndex = nextEmptyIndex === -1 ? maxLength - 1 : nextEmptyIndex;
    inputRefs.current[focusIndex]?.focus();

    // Call onComplete if all inputs are filled
    if (codeString.length === maxLength && !codeString.includes('')) {
      onComplete?.(codeString);
    }
  };

  const handleFocus = (index: number) => {
    // Select all text when input is focused
    inputRefs.current[index]?.select();
  };

  const borderClasses = showError && error
    ? 'form-input-border-error'
    : 'form-input-border-default';

  return (
    <div className={containerClassName}>
      <div className="flex gap-2 justify-center">
        {codes.map((code, index) => (
          <input
            key={index}
            ref={(el) => {
              inputRefs.current[index] = el;
            }}
            type={inputType === 'number' ? 'text' : 'text'}
            inputMode={inputType === 'number' ? 'numeric' : 'text'}
            maxLength={1}
            value={code}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              handleChange(index, e.target.value)
            }
            onKeyDown={(e) => handleKeyDown(index, e)}
            onPaste={handlePaste}
            onFocus={() => handleFocus(index)}
            disabled={disabled}
            className={`form-input-base ${borderClasses} text-center text-lg font-semibold w-12 h-12 p-0 ${inputClassName}`}
            aria-label={`Code digit ${index + 1} of ${maxLength}`}
          />
        ))}
      </div>
      {showError && error && (
        <p className="text-red-500 text-sm mt-2 text-center">{error}</p>
      )}
    </div>
  );
};

