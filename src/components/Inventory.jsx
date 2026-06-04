import { useState } from "react"
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
        }
    ]

    const [X_SIZE, Y_SIZE] = [5, 9]
    const [items, setItems] = useState(null);

    return (
        <div className="inventory">
            <div className="pages">
                <div className="page page-active">I</div>
                <div className="page">II</div>
            </div>
            <div className="slots">
                {Array.from({ length: X_SIZE * Y_SIZE }).map((_, index) => (
                    <div key={index} className="slot"></div>
                ))}
            </div>
        </div>
    )
}

export default Inventory