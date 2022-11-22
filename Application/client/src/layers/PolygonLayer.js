// export function PolygonLayer(){
//  /**
//    * Data format:
//    * [
//    *   {
//    *     // Simple polygon (array of coords)
//    *     contour: [[-122.4, 37.7], [-122.4, 37.8], [-122.5, 37.8], [-122.5, 37.7], [-122.4, 37.7]],
//    *     zipcode: 94107,
//    *     population: 26599,
//    *     area: 6.11
//    *   },
//    *   {
//    *     // Complex polygon with holes (array of rings)
//    *     contour: [
//    *       [[-122.4, 37.7], [-122.4, 37.8], [-122.5, 37.8], [-122.5, 37.7], [-122.4, 37.7]],
//    *       [[-122.45, 37.73], [-122.47, 37.76], [-122.47, 37.71], [-122.45, 37.73]]
//    *     ],
//    *     zipcode: 94107,
//    *     population: 26599,
//    *     area: 6.11
//    *   },
//    *   ...
//    * ]
//    */
//    const 2 = new PolygonLayer({
//     id: 'polygon-layer',
//     data,
//     pickable: true,
//     stroked: true,
//     filled: true,
//     wireframe: true,
//     lineWidthMinPixels: 1,
//     getPolygon: d => d.contour,
//     getElevation: d => d.population / d.area / 10,
//     getFillColor: d => [d.population / d.area / 60, 140, 0],
//     getLineColor: [80, 80, 80],
//     getLineWidth: 1
//   });
// }