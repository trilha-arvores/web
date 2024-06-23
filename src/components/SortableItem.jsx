import {useSortable} from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';
import { BsArrowRight } from "react-icons/bs";

export default function SortableItem(props) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({id: props.children});
  
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  
  return (
    <>
      <li className='list-group-item p-relative tree-draggable-item' ref={setNodeRef} style={style} {...attributes} {...listeners}>
          {props.children}
          <BsArrowRight className='betwen-trees-arrow'/>
      </li>
    </>
  );
}