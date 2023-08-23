import { cva, VariantProps } from 'class-variance-authority';
import { FC } from 'react';

const btnClass = cva(
  [
    'rounded-3xl',
    'font-bold',
    'hover:scale-110',
    'active:scale-100',
    'transition',
    'duration-200',
    'ease-in-out',
  ],
  {
    variants: {
      intent: {
        primary: [
          'bg-violet-500',
          'text-white',
          'border-transparent',
          'hover:bg-green-600',
        ],

        secondary: [
          'bg-white',
          'text-black',
          'border-gray-400',
          'hover:bg-gray-100',
          'border-solid',
          'border-2',
          'border-gray-800',
        ],
        text: ['bg-transparent', 'text-black', 'hover:bg-gray-100'],
      },
      size: {
        small: ['text-md', 'py-1', 'px-1'],
        medium: ['text-lg', 'px-4', 'py-1'],
        large: ['text-xlg', 'px-8', 'py-2'],
      },
    },
    defaultVariants: {
      intent: 'primary',
      size: 'medium',
    },
  }
);

export interface ButtonProps
  extends React.HTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof btnClass> {}

const Button: FC<ButtonProps> = ({
  children,
  className,
  intent,
  size,
  ...props
}) => {
  return (
    <button className={btnClass({ className, intent, size })} {...props}>
      {children}
    </button>
  );
};

export default Button;
