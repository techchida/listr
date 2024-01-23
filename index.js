exports.MyComponent = (props) => {
  const { label } = props;
  return (
    <div>
      <button>{label}</button>
    </div>
  );
};
