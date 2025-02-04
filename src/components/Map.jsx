// import { LoadScript, GoogleMap } from "react-google-maps";
import PropTypes from "prop-types";

export default function Map(props) {
  return (
    // <LoadScript id="script-loader" googleMapsApiKey="YOUR_API_KEY">
    //   <GoogleMap id="example-map" center={props.center} />
    // </LoadScript>
    <div>
      <p data-testid="map">
        This is a map with center: {props.center.lat}:{props.center.long}
      </p>
    </div>
  );
}

Map.propTypes = {
  center: PropTypes.shape({
    lat: PropTypes.number.isRequired,
    long: PropTypes.number.isRequired,
  }).isRequired,
};
