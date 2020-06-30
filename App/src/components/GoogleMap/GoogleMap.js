import React from "react";
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";

function GoogleMap() {
  const mapStyles = {
    width: "100%",
    height: "100%",
  };

  return (
    <div>
      {console.log("called google api")}
      <Map
        google={this.props.google}
        zoom={8}
        style={mapStyles}
        initialCenter={{ lat: 47.444, lng: -122.176 }}
      >
        <Marker position={{ lat: 48.0, lng: -122.0 }} />
      </Map>
      );
    </div>
  );
}

export default GoogleApiWrapper(GoogleMap);

// export default GoogleMap
