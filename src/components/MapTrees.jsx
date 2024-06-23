import geoapify from "../api/geoapify";
import treesData from '../data/trees';
import {useState, useEffect} from 'react';
import Loading from './Loading';

export default function MapTrees(props) {
    const trees = props.trees;

    const [imageUrl, setImageUrl] = useState(geoapify(trees));
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        setImageUrl(geoapify(treeListToObj(trees)));
        setLoaded(false);
    }, [trees])

    const treeListToObj = (trees) => {
        const treeObjs = [];

        for(const treeId of trees){
            const treeObj = treesData.find(tree => tree.id == treeId)
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