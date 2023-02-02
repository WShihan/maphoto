import { View } from "ol";
import { fromLonLat } from "ol/proj";
export function locateHere() {
  navigator.geolocation.getCurrentPosition(
    (post) => {
      const lat = post.coords.latitude;
      const lon = post.coords.longitude;
      window.map.setView(
        new View({
          center: fromLonLat([lon, lat]),
          zoom: 10,
        })
      );
    },
    (error) => {
      console.error(error);
    }
  );
}
