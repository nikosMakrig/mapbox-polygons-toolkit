import './App.css';
import React, { useEffect, useRef, useState } from 'react';

import { MapGLToolKit, unifyPolygons, addSource } from 'npmpackage';

import 'mapbox-gl/dist/mapbox-gl.css';
import * as mapboxgl from "mapbox-gl";
import 'mapbox-gl/dist/mapbox-gl.css';

import { geojson } from "./mock";
import { MAPBOX_ACCESS_TOKEN } from "./config";

function App() {

  const mapStyle = 'mapbox://styles/beatadmiin/ckbjdllyd2cks1iqhmrdyk2km';

  const center = [23.706682920455933, 37.96821397694484];

  const MapRender = ({ mapStyle, center, zoom, accessToken }) => {
    const mapRef = useRef({});
    const [mapObj, setMapObj] = useState(null);
    const [polygonBuffer, setPolygonBuffer] = useState(0.04);

    const layers = {
      main: 'main',
      selectedArea: 'selectedArea'
    };

    useEffect(() => {
      const map = new mapboxgl.Map({
        container: mapRef.current,
        style: mapStyle,
        center,
        zoom,
        attributionControl: false,
        accessToken
      });

      if (map) {
        setMapObj(map);
      }

      addSource(map, layers.main, geojson, {
        paint: {
          'fill-color': 'rgba(75, 131, 82, 0.7)'
        }

      });


      return () => map.off()
    }, [mapStyle, center, zoom, accessToken]);

    const mergePolygons = intersectedPolygonsWithBuffer => {
      const currentData = mapObj.getSource(layers.main);
      const newPolygon = unifyPolygons(intersectedPolygonsWithBuffer, currentData, polygonBuffer);
    };

    const handleDrawPolygon = data => {
      const { intersectedPolygonsWithBuffer = [], selectedPolygons = {}, error = null } = data || {};
      if (error) console.log(error);

      if (intersectedPolygonsWithBuffer.length > 0) {
        mergePolygons(intersectedPolygonsWithBuffer)
      }
    };

    return (
      <>
        <div style={{ width: '100%', height: '100%', position: 'absolute' }} ref={mapRef}/>
        <MapGLToolKit map={mapObj}
                      returnToUser={data => handleDrawPolygon(data)}
                      polygonBuffer={polygonBuffer}
                      layer={layers.main}
        />
      </>
    );
  };

  return (
    <div style={{ width: '60%', height: 800 }}>
      <MapRender mapStyle={mapStyle}
                 center={center}
                 zoom={14}
                 accessToken={MAPBOX_ACCESS_TOKEN}
      />
    </div>
  );
}

export default App;
