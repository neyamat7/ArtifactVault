const SliderButton = ({ classes, children }) => {
  return (
    <button
      className={`hidden md:block  absolute top-1/2 z-30 -translate-y-1/2 rounded-full bg-white/20 backdrop-blur-sm p-3 text-white transition-all duration-300 hover:bg-white/30 ${classes}`}
    >
      {children}
    </button>
  );
};

export default SliderButton;
