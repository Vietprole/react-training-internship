import { useContext } from "react";
import { LevelContext } from "../../contexts/LevelContext";
import PropTypes from "prop-types";

function Heading() {
  const level = useContext(LevelContext);
  switch (level) {
    case 1:
      return <h1>This is a h1 tag</h1>;
    case 2:
      return <h2>This is a h2 tag</h2>;
    case 3:
      return <h3>This is a h3 tag</h3>;
    case 4:
      return <h4>This is a h4 tag</h4>;
    case 5:
      return <h5>This is a h5 tag</h5>;
    case 6:
      return <h6>This is a h6 tag</h6>;
    default:
      throw Error("Unknown level: " + level);
  }
}

Heading.propTypes = {
  children: PropTypes.node,
};

export default Heading;