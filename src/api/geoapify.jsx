import geoapify_def, {marker_def} from '../data/geoapify_def'

export default function geoapify(trees){

    const querryMarkersCreate = (marker, trees) => {
        return trees.map( (tree, index) => {
            return `lonlat:${tree.lon},${tree.lat};type:${marker.type};color:${marker.color};size:${marker.size};icon:${marker.icon};icontype:${marker.icontype};text:${index + 1};textsize:${marker.textsize};whitecircle:${marker.whitecircle}`;
        }).join('|');
    }

    function addQueryParams(baseUrl, params) {
        let url = new URL(baseUrl);
    
        for (const [key, value] of Object.entries(params)) {
            if (key === 'marker') {
                // Adicionar marcadores diretamente sem codificação dupla
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
    

    const querryParamsCreate = (def) => {
        
        const markersString = querryMarkersCreate(marker_def, trees);

        const params = {
            style: def.queries.style,
            width: def.queries.width,
            height: def.queries.height,
            center: `lonlat:${def.queries.lon},${def.queries.lat}`,
            zoom: def.queries.zoom,
            marker: decodeURIComponent(markersString),
            scaleFactor: 2,
            apiKey: "c24194447ad64289ac980070dd61d524"
        };
        
        const finalUrl = addQueryParams(def.baseUrl, params);

        return finalUrl.toString();
    }

    const imageUrl = querryParamsCreate(geoapify_def);

    return imageUrl;
}