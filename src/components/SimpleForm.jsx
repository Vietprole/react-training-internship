import { useState } from "react";
import PropTypes from "prop-types";

function Greeting({ name }) {
  return <p>Hello, {name}!</p>;
}

Greeting.propTypes = {
  name: PropTypes.string.isRequired,
};

function SimpleForm() {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  return (
    <>
      <label>
        Name{": "}
        <input value={name} onChange={(e) => setName(e.target.value)} />
      </label>
      <label>
        Address{": "}
        <input value={address} onChange={(e) => setAddress(e.target.value)} />
      </label>
      <Greeting name={name} />
    </>
  );
}

export default SimpleForm