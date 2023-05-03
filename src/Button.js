import { useState, forwardRef, useImperativeHandle } from "react";
const Button = forwardRef((props, ref) => {
  const [toggle, setToggle] = useState(false);

  useImperativeHandle(ref, () => ({
    switchToggle() {
      setToggle(!toggle);
    }
  }));
  return (
    <div>
      <button>Button From Child</button>
      {toggle ? <span>Toggle</span> : null}
    </div>
  );
});

export default Button;
