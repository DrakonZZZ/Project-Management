const Card = ({ children, className }) => {
  return (
    <div className={`  px-10 py-4 md:w-2/5 sm:w-auto ${className}`}>
      {children}
    </div>
  );
};

export default Card;
