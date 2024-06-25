import geoapify from "../api/geoapify";
import treesData from '../data/trees';
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
            const treeObj = Object.values(trees).find(tree => tree.id == treeId)
            treeObjs.push(treeObj);
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