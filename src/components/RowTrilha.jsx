import { BsPencil, BsTrash } from "react-icons/bs";

export default function RowTrilha(props) {

    const trail = props.trail;

    return (
        <tr className="table-row bg-white trilha_round">
            <th scope="row">
                <img src={trail.image} className="rounded img_lista" alt={trail.name}/>
            </th>
            <td className="align-middle">{trail.name}</td>
            <td className="align-middle">{trail.n_trees}</td>
            <td className="align-middle">{trail.dist} km</td>
            <td className="align-middle">{trail.created}</td>
            <td className="align-middle">
                <div className="btn-interactice"
                    onClick={() => {props.modalFunc(trail)}}>
                    <BsPencil className="color-txt-musgo"/>
                </div>
            </td>
            <td className="align-middle">
                <div className="btn-interactice">
                    <BsTrash className="color-txt-musgo"/>
                </div>
            </td>
        </tr>
    );
  }