const BackgroundPane = ({ children, className }) => {
  return (
    <div className={`glassmorphism  rounded-2xl ${className}`}>{children}</div>
  );
};

export default BackgroundPane;
