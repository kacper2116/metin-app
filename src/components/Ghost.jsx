import React from 'react'
import useMousePosition from '../hooks/useMousePosition'

const Ghost = ({ draggedItem }) => {

    const mousePosition = useMousePosition();
    return (
        <img src={draggedItem.item.img} draggable="false" className="ghost-img" style=
            {{
                left: mousePosition.x,
                top: mousePosition.y
            }} />
    )

}

export default Ghost