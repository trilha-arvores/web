import geoapify from "../api/geoapify";
import {useState, useEffect} from 'react';
import Loading from './Loading';

export default function MapTrees(props) {

    const [trees, setTrees] = useState({});
    const [order, setOrder] = useState([]);
    const [imageUrl, setImageUrl] = useState(geoapify(order));
    const [loaded, setLoaded] = useState(false);
    
    useEffect(() => {
        setTrees(props.trees);
        setOrder(props.order);
    }, [props])

    useEffect(() => {
        setImageUrl(geoapify(treeListToObj(trees, order)));
        setLoaded(false);
    }, [trees, order])

    const treeListToObj = (trees, order) => {
        const treeObjs = [];

        for(const treeId of order){
            // [CORREÇÃO] Busca pelo esalq_id e resolve o problema de Texto vs Número
            const treeObj = Object.values(trees).find(tree => String(tree.esalq_id) === String(treeId));
            
            // Valida se a árvore existe e tem coordenadas válidas
            if (treeObj && 
                typeof treeObj.latitude === 'number' && 
                typeof treeObj.longitude === 'number' &&
                isFinite(treeObj.latitude) &&
                isFinite(treeObj.longitude)) {
                treeObjs.push(treeObj);
            }
        } 
        
        return treeObjs;
    }

    return (
        <div className="position-relative">
            <img 
                src = {imageUrl}
                alt="mapa" 
                className="map-image"
                onLoad={() => setLoaded(true)}
            />
            {!loaded? <Loading />: ''}
        </div>
    );
}