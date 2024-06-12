const geoapify_def = 
{
    baseUrl: 'https://maps.geoapify.com/v1/staticmap',
    queries: {
        apiKey: 'c24194447ad64289ac980070dd61d524',
        style: 'osm-bright',
        width: '1100',
        height: '800',
        lon: '-47.631829',
        lat: '-22.708638',
        zoom: '15.5526',
        scaleFactor: '2'
    }
}

const marker_def =
{
    type: 'awesome',
    color: '%2300790e',
    size: 'large',
    icon: 'tree',
    icontype: 'awesome',
    textsize: 'large',
    text: '2',
    whitecircle: 'no'
}

export {marker_def};

export default geoapify_def;