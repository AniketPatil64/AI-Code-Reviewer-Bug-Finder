'use client';

import { useRouter } from 'next/navigation';

interface ButtonProps {
  label: string;
  action?: () => void;
  route?: string;
  variant?: 'primary' | 'secondary' | 'danger';
}

interface CommonModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  message: string;
  buttons: ButtonProps[];
}

export default function CommonModal({
  open,
  onClose,
  title,
  message,
  buttons,
}: CommonModalProps) {
  const router = useRouter();

  if (!open) return null;

  const handleButtonClick = (button: ButtonProps) => {
    if (button.action) button.action();
    if (button.route) router.push(button.route);
    onClose();
  };

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4'>
      <div className='bg-white dark:bg-gray-900 rounded-xl shadow-xl max-w-md w-full p-6 relative'>
        {/* Header */}
        <div className='flex justify-between items-center mb-4'>
          <h3 className='text-lg font-semibold text-gray-900 dark:text-white'>
            {title}
          </h3>
          <button
            onClick={onClose}
            className='text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 rounded-full p-1 transition'
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div className='mb-6 text-gray-700 dark:text-gray-300'>
          <p>{message}</p>
        </div>

        {/* Footer Buttons */}
        <div className='flex justify-end gap-3'>
          {buttons.map((btn, idx) => (
            <button
              key={idx}
              onClick={() => handleButtonClick(btn)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition ${
                btn.variant === 'primary'
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : btn.variant === 'secondary'
                  ? 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600'
                  : 'bg-red-600 text-white hover:bg-red-700'
              }`}
            >
              {btn.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
