const Card = ({ children, className }) => {
  return (
    <div
      className={`rounded-3xl px-10 py-4 drop-shadow-xl bg-gray-300 ${className}`}
    >
      {children}
    </div>
  );
};

export default Card;
