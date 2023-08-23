const Input = ({ className, ...props }) => {
  return (
    <input
      className={`transition-all border-none outline-none px-6 py-2 text-lg rounded-lg bg-black/70 text-white w-full placeholder-green-600 placeholder-opacity-25 focus:outline-green-600 ${className}`}
      {...props}
    />
  );
};

export default Input;
