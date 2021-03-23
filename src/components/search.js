import React, { useEffect, useState } from "react"
import usePlacesAutocomplete, {
  getGeocode
} from "use-places-autocomplete";

import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption
} from "@reach/combobox"

import "@reach/combobox/styles.css"

export const Search = ({ callback, name }) => {  
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue
  } = usePlacesAutocomplete()

  const [latLng, setLatLng] = useState({})

  useEffect(() => {
    callback(latLng)
  }, [latLng])

  const handleInput = (e) => {
    setValue(e.target.value)
  }

  const handleSelect = (description) => {
    setValue(description, false)

    getGeocode({address: description})
      .then((results) => {
        const lat = results[0].geometry.location.lat()
        const lng = results[0].geometry.location.lng()
        setLatLng({lat: lat, lng: lng})
      })
      .catch((error) => {
        console.log("Error: ", error);
      });
  }

  return (
    <div className="container">
      <div className="d-flex justify-content-center">
        <Combobox onSelect={handleSelect} aria-labelledby="origin">
          <ComboboxInput
            placeholder={name}
            style={{ width: 300 }}
            value={value}
            onChange={handleInput}
            disabled={!ready}
          />
          <ComboboxPopover>
            <ComboboxList>
              {status === "OK" &&
                data.map(({ place_id, description }) => (
                  <ComboboxOption key={place_id} value={description} />
                ))}
            </ComboboxList>
          </ComboboxPopover>
        </Combobox>
      </div>
    </div>
  )
}
