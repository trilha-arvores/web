import geoapify_def, {marker_def} from '../data/geoapify_def'

export default function geoapify(trees){

    const querryMarkersCreate = (marker, trees) => {
        // Filtra árvores que têm latitude e longitude válidas
        const validTrees = (trees || []).filter(tree => 
            tree && 
            typeof tree.latitude === 'number' && 
            typeof tree.longitude === 'number' &&
            isFinite(tree.latitude) &&
            isFinite(tree.longitude)
        );
        
        return validTrees.map( (tree, index) => {
            return `lonlat:${tree.longitude},${tree.latitude};type:${marker.type};color:${marker.color};size:${marker.size};icon:${marker.icon};icontype:${marker.icontype};text:${index + 1};textsize:${marker.textsize};whitecircle:${marker.whitecircle}`;
        }).join('|');
    }

    function addQueryParams(baseUrl, params) {
        let url = new URL(baseUrl);
    
        for (const [key, value] of Object.entries(params)) {
            if (key === 'marker') {
                // Adicionar marcadores diretamente sem codificação dupla
                if(value !== "")
                    url.searchParams.append(key, value);
            } else if (Array.isArray(value)) {
                value.forEach(val => url.searchParams.append(key, val));
            } else if (typeof value === 'object' && value !== null) {
                for (const [subKey, subValue] of Object.entries(value)) {
                    url.searchParams.append(`${key}:${subKey}`, subValue);
                }
            } else {
                url.searchParams.append(key, value);
            }
        }
    
        return url.toString();
    }
    
    const centroid = (arr, defLon, defLat) => {
    let sumLat = 0, sumLon = 0, count = 0;
    (arr || []).forEach(t => {
      const lat = Number(t?.latitude);
      const lon = Number(t?.longitude);
      if (Number.isFinite(lat) && Number.isFinite(lon)) {
        sumLat += lat; sumLon += lon; count++;
      }
    });
    if (count === 0) return { lon: Number(defLon), lat: Number(defLat) };
    return { lon: sumLon / count, lat: sumLat / count };
  };    


    const querryParamsCreate = (def) => {
        
        const markersString = querryMarkersCreate(marker_def, trees);
        const center = centroid(trees, def.queries.lon, def.queries.lat);
        const params = {
            style: def.queries.style,
            width: def.queries.width,
            height: def.queries.height,
            center: `lonlat:${center.lon},${center.lat}`,
            zoom: def.queries.zoom,
            marker: decodeURIComponent(markersString),
            scaleFactor: 2,
            apiKey: "c24194447ad64289ac980070dd61d524"
        };
        
        
        params.zoom = 16.5;
        const finalUrl = addQueryParams(def.baseUrl, params);

        return finalUrl.toString();
    }

    const imageUrl = querryParamsCreate(geoapify_def);

    return imageUrl;
}