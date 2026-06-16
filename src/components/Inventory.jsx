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
            id: 1,
            name: "Miecz+9",
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
    ]

    const [currentPage, setCurrentPage] = useState(0)
    const [X_SIZE, Y_SIZE] = [5, 9] //Wymiary inventory
    const mousePosition = useMousePosition();
    const [selectedItem, setSelectedItem] = useState(null);
    const startPos = useRef({ x: 0, y: 0 });
    const moveMode = useRef(null);

    const [items, setItems] = useState([
        [
            { item: items_arr[0], slot: 0 },
            { item: items_arr[0], slot: 14 },
        ],
        [
            { item: items_arr[0], slot: 1 }
        ]
    ]);

    useEffect(() => {
        console.log(items)
    }, [items])


    const handlePointerDown = (e, item) => {

        console.log('pointer down')

        setSelectedItem(item);
        startPos.current = { x: e.clientX, y: e.clientY };
        moveMode.current = null;
    }

    useEffect(() => {

        const handlePointerUp = (e) => {

            console.log('pointer up')
            if (!selectedItem) return;
            if (moveMode.current === 'click') {
                console.log('click drop end');
                moveMode.current = null;
                setSelectedItem(null);
                return;
            } if (moveMode.current === 'drag') {
                console.log('drag end');
                setSelectedItem(null);
            } else {
                moveMode.current = 'click';
                console.log('click drop start');
            }
        }

        const handlePointerMove = (e) => {
            if (!selectedItem) return;
            if (moveMode.current !== null) return;

            const moveX = Math.abs(e.clientX - startPos.current.x)
            const moveY = Math.abs(e.clientY - startPos.current.y)

            if (moveX > 5 || moveY > 5) {
                moveMode.current = "drag"
                console.log("drag start")
            }
        }
        window.addEventListener('mousemove', handlePointerMove);
        window.addEventListener('mouseup', handlePointerUp);

        return () => {
            window.removeEventListener('mousemove', handlePointerMove);
            window.removeEventListener('mouseup', handlePointerUp);
        }

    }, [selectedItem])


    const isSlotEmpty = (page, slot) => {

        return !items[page].some(({ item, slot: itemSlot }) => {
            for (let i = 0; i < item.size; i++) {
                const currentSlot = itemSlot + i * X_SIZE;
                if (currentSlot === slot) return true;
            }
            return false;
        })
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

                    const item = items[currentPage].find(item => item.slot === index);

                    return (
                        <div key={index} id={`slot-${index}`} className="slot">
                            {item &&
                                <div className="item">
                                    <img className="item-img" draggable="false" onMouseDown={(e) => handlePointerDown(e, item)} src={item.item.img}></img>
                                </div>
                            }
                        </div>
                    )
                })}
            </div>
            <button onClick={() => spawnItem(1)}>Add item</button>
            {selectedItem && (
                <img src={selectedItem.item.img} draggable="false" className="ghost-img" style=
                    {{
                        left: mousePosition.x,
                        top: mousePosition.y
                    }} />
            )}

        </div>
    )
}

export default Inventory