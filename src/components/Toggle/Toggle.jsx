import { useState } from "react";
import PropTypes from "prop-types";

export default function Toggle(props) {
  const [state, setState] = useState(false);
  return (
    <button
      onClick={() => {
        setState((previousState) => !previousState);
        props.onChange(!state);
      }}
      data-testid="toggle"
    >
      {state === true ? "Turn off" : "Turn on"}
    </button>
  );
}

Toggle.propTypes = {
  onChange: PropTypes.func,
};
