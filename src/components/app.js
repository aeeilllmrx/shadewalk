import React, { useState } from "react";
import { Map } from "./map";
import { Search } from "./search";

import "bootstrap/dist/css/bootstrap.min.css";

export function App() {
  const [origin, setOrigin] = useState({});
  const [destination, setDestination] = useState({});

  const [a, setA] = useState({
    lat: 40.68603,
    lng: -73.977822,
  });
  const [b, setB] = useState({
    lat: 40.674011,
    lng: -73.9701182,
  });

  function handleSubmitOrigin(data) {
    setOrigin(data);
  }

  function handleSubmitDestination(data) {
    setDestination(data);
  }

  function handleGetRoute() {
    setA(origin);
    setB(destination);
  }

  return (
    <div>
      <div>
        <Search callback={handleSubmitOrigin} name={"Start"}></Search>
      </div>
      <br></br>
      <div>
        <Search
          callback={handleSubmitDestination}
          name={"Destination"}
        ></Search>
      </div>
      <br></br>
      <div className="d-flex justify-content-center">
        <button className="btn btn btn-primary" onClick={handleGetRoute}>
          Get Route
        </button>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div>
          <Map origin={a} destination={b} />
        </div>
      </div>
    </div>
  );
}
