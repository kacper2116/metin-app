import { useContext } from 'react'
import MouseContext from '../contexts/MouseContext';

const Ghost = ({ draggedItem }) => {

    const mousePosition = useContext(MouseContext);
    return (
        <img src={draggedItem.item.img} draggable="false" className="ghost-img" style=
            {{
                left: mousePosition.x,
                top: mousePosition.y
            }} />
    )

}

export default Ghost