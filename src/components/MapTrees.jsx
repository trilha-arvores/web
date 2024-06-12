import geoapify from "../api/geoapify";
import treesData from '../data/trees';
import {useState, useEffect} from 'react';
import { RotatingLines } from "react-loader-spinner";

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
        console.log(trees)

        for(const treeId of trees){
            const treeObj = treesData.find(tree => tree.id == treeId)
            treeObjs.push(treeObj);
        } 
        
        console.log(treeObjs);
        return treeObjs;
    }

    const Loading = () => (
        <div className="loading">
            <RotatingLines
            strokeColor="grey"
            strokeWidth="5"
            animationDuration="0.75"
            width="96"
            visible={true}
            />
        </div>
    );

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