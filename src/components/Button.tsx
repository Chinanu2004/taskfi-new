'use client';

import React from 'react';
import clsx from 'clsx';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'ghost';
};

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  className,
  children,
  ...props
}) => {
  const baseClasses =
    'rounded-lg font-semibold transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2';

  const variants = {
    primary:
      'bg-primary text-white hover:bg-primary-dark focus:ring-primary',
    secondary:
      'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600 focus:ring-gray-500',
    ghost:
      'bg-transparent text-primary hover:bg-primary hover:text-white focus:ring-primary',
  };

  return (
    <button className={clsx(baseClasses, variants[variant], className)} {...props}>
      {children}
    </button>
  );
};