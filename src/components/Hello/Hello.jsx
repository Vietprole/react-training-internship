import PropTypes from 'prop-types';

export default function Hello(props) {
  if (props.name) {
    return <h1 id="hello">Hello, {props.name}!</h1>;
  } else {
    return <span id="hello">Hey, stranger</span>;
  }
}

Hello.propTypes = {
  name: PropTypes.string
};