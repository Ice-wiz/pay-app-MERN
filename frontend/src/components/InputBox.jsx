const InputBox = ({ text, placeholder }) => {
  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <div style={{ padding: "0px 60px", textAlign: "center" }}>{text}</div>
      <input
        placeholder={placeholder}
        className="px-2 py-1 border rounded border-black-500"
      />
    </div>
  );
};

export default InputBox;
