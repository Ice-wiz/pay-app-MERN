const Button = ({ text, onClick }) => {
  return (
    <button
      style={{ width: "100%", borderRadius: "30px" }}
      onClick={onClick}
      type="button"
      className="w-full text-white bg-gray-800"
    >
      {text}
    </button>
  );
};

export default Button;
