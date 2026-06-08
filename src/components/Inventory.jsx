import { useEffect, useState } from "react"
import './Inventory.css'

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
        }
    ]



    const [X_SIZE, Y_SIZE] = [5, 9]
    const [items, setItems] = useState([
        {
            position: 1,
            item: items_arr[0],
        }
    ]);

    useEffect(() => {
        console.log(items)
    }, [items])

    const isSlotEmpty = (slot) => {
        return !items.some(({ position, item }) => {
            for (let i = 0; i < item.size; i++) {
                const currentSlot = position + i * X_SIZE;
                if (currentSlot === slot) return true;
            }
            return false;
        })
    }

    const canPlaceItem = (slot, item) => {

        for (let i = 0; i < item.size; i++) {
            const currentSlot = slot + i * X_SIZE;

            if (currentSlot > X_SIZE * Y_SIZE) return false;
            if (!isSlotEmpty(currentSlot)) return false;
        }
        return true;
    }

    const addItem = (item) => {
        setItems((prev) => {
            const copy = [...items]
            copy.push(item);
            return copy;
        })
    }

    const spawnItem = (id) => {

        const itemToSpawn = items_arr.find(item => item.id === id);

        for (let i = 1; i <= X_SIZE * Y_SIZE; i++) {
            if (canPlaceItem(i, itemToSpawn)) {
                addItem({ item: itemToSpawn, position: i });
                console.log("Dodano item");
                return;
            }
        }
        console.log("Nie można dodać itemu")
    }


    return (
        <div className="inventory">
            <div className="pages">
                <div className="page page-active">I</div>
                <div className="page">II</div>
            </div>
            <div className="slots">
                {Array.from({ length: X_SIZE * Y_SIZE }).map((_, index) => {

                    const item = items.find(item => item.position === index + 1);
                    return (
                        <div key={index + 1} id={`slot-${index + 1}`} className="slot">
                            {item &&
                                <img className="item-img" src={item.item.img}></img>
                            }
                        </div>
                    )
                })}
            </div>
            <button onClick={() => spawnItem(1)}>Add item</button>
        </div>
    )
}

export default Inventory