import Map from "../Map";
import PropTypes from "prop-types";

export default function Contact(props) {
  return (
    <div>
      <address>
        Contact {props.name} via{" "}
        <a data-testid="email" href={"mailto:" + props.email}>
          email
        </a>
        or on their{" "}
        <a data-testid="site" href={props.site}>
          website
        </a>
        .
      </address>
      <Map center={props.center} />
    </div>
  );
}

Contact.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  site: PropTypes.string.isRequired,
  center: PropTypes.shape({
    lat: PropTypes.number.isRequired,
    long: PropTypes.number.isRequired,
  }).isRequired,
};
