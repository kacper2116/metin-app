import { useEffect, useState, useRef } from "react"
import './Inventory.css'
import useMousePosition from '../hooks/useMousePosition'

const Inventory = () => {

    const items_arr = [
        {
            id: 1,
            name: "Miecz+0",
            from_level: 1,
            attack_value: "13-15",
            magical_attack_value: "15-19",
            attack_speed: "+22%",
            wearable: true,
            for: ["Wojownik", "Ninja", "Sura"],
            upgrade: {
                yang: null,
                upgrade_items: null,
                upgrade_change: null,
            },
            img: "https://pl-wiki.metin2.gameforge.com/images/7/7a/Miecz.png",
            size: 2,
        },
        {
            id: 2,
            name: "Miecz żalu",
            from_level: 1,
            attack_value: "13-15",
            magical_attack_value: "15-19",
            attack_speed: "+22%",
            wearable: true,
            for: ["Wojownik", "Ninja", "Sura"],
            upgrade: {
                yang: null,
                upgrade_items: null,
                upgrade_change: null,
            },
            img: "https://pl-wiki.metin2.gameforge.com/images/8/82/Miecz_%C5%BBalu.png",
            size: 3,
        },
        {
            id: 3,
            name: "Kozik Czar. Lis.",
            from_level: 1,
            attack_value: "13-15",
            magical_attack_value: "15-19",
            attack_speed: "+22%",
            wearable: true,
            for: ["Wojownik", "Ninja", "Sura"],
            upgrade: {
                yang: null,
                upgrade_items: null,
                upgrade_change: null,
            },
            img: "https://pl-wiki.metin2.gameforge.com/images/f/fa/Kozik_Czar._Lis..png",
            size: 1,
        },
    ]

    const [currentPage, setCurrentPage] = useState(0)
    const [X_SIZE, Y_SIZE] = [5, 9] //Wymiary inventory

    const mousePosition = useMousePosition();
    const [draggedItem, setDraggedItem] = useState(null);
    /*  const [hoveredSlots, setHoveredSlots] = useState({ slots: [], canPlace: true }); */
    const hoveredSlots = useRef({ slots: [], canPlace: true })
    const itemOriginSlots = useRef([]);

    const startPos = useRef({ x: 0, y: 0 });
    const moveMode = useRef(null);

    const [items, setItems] = useState([
        [
            { item: items_arr[0], slot: 0 },
            { item: items_arr[1], slot: 14 },
            { item: items_arr[2], slot: 30 },
        ],
        [
            { item: items_arr[0], slot: 1 }
        ]
    ]);


    const findItemBySlot = (page, slot) => {

        return items[page].find(item => {

            for (let i = 0; i < item.item.size; i++) {
                const currentSlot = item.slot + i * X_SIZE;
                if (currentSlot === slot) return true;
            }
            return false;
        })

    }

    const handleClickSlot = (e) => {

        if (draggedItem) {
            handleDropItem(e);
            return;
        }

        const slotIndex = Number(e.currentTarget.id.split('-')[1]);
        const itemInSlot = findItemBySlot(currentPage, slotIndex);


        if (itemInSlot) {
            setDraggedItem(itemInSlot)
            startPos.current = { x: e.clientX, y: e.clientY };
            itemOriginSlots.current = getItemSlots(itemInSlot);

            let slots = getSelectedSlots(slotIndex, itemInSlot.item.size)

            const canPlace = itemOriginSlots.current.every(slot => slots.includes(slot)) ? true : canPlaceItem(currentPage, Math.min(...slots), itemInSlot.item);

            hoveredSlots.current = ({ slots: getSelectedSlots(slotIndex, itemInSlot.item.size), canPlace });
        }

    }

    const handleDropItem = (e) => {
        if (!draggedItem) return;
        console.log('droping item')
        const slotIndex = hoveredSlots.current.slots[0];

        if (canPlaceItem(currentPage, slotIndex, draggedItem.item)) {
            console.log('moving item')
            setItems(prev => {
                const copy = [...prev];
                const currPageCopy = [...copy[currentPage]];

                const updatedPage = currPageCopy.map(item =>
                    item.slot === draggedItem.slot ? { ...item, slot: slotIndex } : item
                )

                copy[currentPage] = updatedPage;
                return copy;
            })
        }

        hoveredSlots.current = ({ slots: [], canPlace: true });
        setDraggedItem(null);
        moveMode.current = null;
        itemOriginSlots.current = [];

    }

    const getItemSlots = (item) => {
        const itemSize = item.item.size;
        const itemSlot = item.slot;
        const itemSlots = [];
        for (let i = 0; i < itemSize; i++) {
            const currentSlot = itemSlot + i * X_SIZE;
            itemSlots.push(currentSlot);
        }

        return itemSlots;
    }

    const getSelectedSlots = (slotIndex, itemSize) => {

        let slots = []
        for (let i = 0; i < itemSize; i++) {
            let currentSlot = null;
            if (i > 1) currentSlot = slotIndex - X_SIZE
            else currentSlot = slotIndex + i * X_SIZE;
            slots.push(currentSlot)
        }

        let badIndex = slots.findIndex(slotIndex => slotIndex < 0 || slotIndex > X_SIZE * Y_SIZE - 1);
        if (badIndex !== -1) {

            if (slots[badIndex] < 0) {
                slots[badIndex] = Math.max(...slots) + X_SIZE;
            }
            if (slots[badIndex] > X_SIZE * Y_SIZE - 1) {
                slots[badIndex] = Math.min(...slots) - X_SIZE;
            }
        }
        const sorted = slots.sort((a, b) => a - b);
        return sorted;
    }

    const handleHoverSlots = (index) => {

        if (!draggedItem) return;
        let slots = getSelectedSlots(index, draggedItem.item.size);
        const canPlace = itemOriginSlots.current.every(slot => slots.includes(slot))
            ? true
            : canPlaceItem(currentPage, Math.min(...slots), draggedItem.item);
        hoveredSlots.current = ({ slots: [...slots], canPlace });
    }

    useEffect(() => {

        const handleMouseUp = (e) => {

            console.log('pointer up')
            if (!draggedItem) return;
            if (moveMode.current === 'click') {
                console.log('click drop end');

                return;
            } if (moveMode.current === 'drag') {
                console.log('drag end');
                handleDropItem(e);
            } else {
                moveMode.current = 'click';
                console.log('click drop start');
            }
        }

        const handleMouseMove = (e) => {
            if (!draggedItem) return;
            if (moveMode.current !== null) return;

            const moveX = Math.abs(e.clientX - startPos.current.x)
            const moveY = Math.abs(e.clientY - startPos.current.y)

            if (moveX > 5 || moveY > 5) {
                moveMode.current = "drag"
                console.log("drag start")
            }
        }
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', handleMouseUp);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        }

    }, [draggedItem])


    const isSlotEmpty = (page, slot) => {
        return !findItemBySlot(page, slot)
    }

    const canPlaceItem = (page, slot, item) => {

        for (let i = 0; i < item.size; i++) {
            const currentSlot = slot + i * X_SIZE;

            if (currentSlot >= X_SIZE * Y_SIZE) return false;
            if (!isSlotEmpty(page, currentSlot)) return false;
        }

        return true;
    }

    const addItem = (item, page) => {
        setItems((prev) => {
            const updated = structuredClone(prev)
            updated[page] = [...updated[page], item];
            console.log(updated)
            return updated;
        })
    }

    const spawnItem = (id) => {

        const itemToSpawn = items_arr.find(item => item.id === id);

        for (let page = 0; page < items.length; page++) {

            for (let slot = 0; slot < X_SIZE * Y_SIZE; slot++) {
                if (canPlaceItem(page, slot, itemToSpawn)) {
                    addItem({ item: itemToSpawn, slot: slot }, page);
                    console.log("Dodano item");
                    return;
                }
            }
        }
        console.log("Nie można dodać itemu")
    }

    return (
        <div className="inventory">
            <div className="pages">
                <button className={`page ${currentPage === 0 && 'page-active'}`} onClick={() => setCurrentPage(0)}>I</button>
                <button className={`page ${currentPage === 1 && 'page-active'}`} onClick={() => setCurrentPage(1)}>II</button>
            </div>
            <div className="slots">
                {Array.from({ length: X_SIZE * Y_SIZE }).map((_, index) => {

                    const item = items[currentPage]?.find(item => item.slot === index);

                    return (
                        <div key={index} id={`slot-${index}`} className='slot' onMouseDown={handleClickSlot} onMouseEnter={(e) => handleHoverSlots(index)} onMouseLeave={(e) => hoveredSlots.current = ({ slots: [], canPlace: true })}>
                            {hoveredSlots.current.slots?.includes(index) &&
                                <div className={`slot-overlay ${!hoveredSlots.current.canPlace && 'slot-overlay-red'}`}></div>
                            }
                            {item &&
                                <div className={`item ${draggedItem && 'item-selected'}`} >
                                    <img className="item-img" draggable="false" src={item.item.img}></img>
                                </div>
                            }
                        </div>
                    )
                })}
            </div>
            <button onClick={() => spawnItem(1)}>Add item</button>
            {draggedItem && (
                <img src={draggedItem.item.img} draggable="false" className="ghost-img" style=
                    {{
                        left: mousePosition.x,
                        top: mousePosition.y
                    }} />
            )}

        </div>
    )
}

export default Inventory