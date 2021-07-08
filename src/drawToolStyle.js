export const drawToolStyle = [
  //polygon fill on drawing
  {
    id: 'gl-draw-polygon-fill',
    type: 'fill',
    filter: ['all', ['==', '$type', 'Polygon'], ['!=', 'mode', 'static']],
    paint: {
      'fill-color': 'rgba(9, 53, 72, 0.12)',
      'fill-opacity': 1
    }
  },
  // polygon outline stroke
  {
    id: 'gl-draw-polygon-stroke-active',
    type: 'line',
    paint: {
      'line-color': '#6e2732',
      'line-width': 2,
      'line-dasharray': [5, 6]
    }
  },
  {
    id: 'gl-draw-polygon-and-line-vertex-halo-active',
    filter: [
      'all',
      ['==', 'meta', 'vertex'],
      ['==', '$type', 'Point'],
      ['!=', 'mode', 'static']
    ],
    type: 'circle',
    paint: {
      'circle-radius': 6,
      'circle-color': '#057982'
    }
  },
  {
    id: 'gl-draw-polygon-and-line-vertex-active',
    type: 'circle',
    paint: {
      'circle-radius': 5,
      'circle-color': '#EEF0F5'
    }
  }
]
