//Types installed for google maps 
import axios from "axios";
//Create custom type to tell axios what the api returs
type GoogleGeocodingResponse = {
  results: { geometry: { location: { lat: number; lng: number } } }[];
  status: "OK" | "ZERO_RESULTS";
};

// declare var google: any;

const form = document.querySelector("form")!;
const addressInput = document.getElementById("address") as HTMLInputElement;
const GOOGLE_API_KEY = "";

function searchAddressHandler(event: Event) {
  event.preventDefault();

  const address = addressInput.value;
  axios
    .get<GoogleGeocodingResponse>(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURI(
        address
      )}&key=${GOOGLE_API_KEY}
  `
    )
    .then(res => {
      if (res.data.status !== "OK") {
        throw new Error("Could not find the location");
      }
      console.log(res);
      const coordinates = res.data.results[0].geometry.location;
      const map = new google.maps.Map(document.getElementById("map")!, {
        center: coordinates,
        zoom: 8
      });
      new google.maps.Marker({ position: coordinates, map: map });
    })
    .catch(err => {
      alert(err);
      console.log(err);
    });
}
form.addEventListener("submit", searchAddressHandler);

//
