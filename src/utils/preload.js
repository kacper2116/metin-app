import itemsDB from '../data/items.json';
const icons = [
    '/icons/add_icon.svg',
    '/icons/en_icon.png',
    '/icons/pl_icon.png',
    '/icons/reset_icon.svg'
]

const preloadImage = (src) => {
    const img = new Image();
    img.src = src;
};

export const preloadAssets = () => {

    const itemImages = itemsDB.map(item => `/${item.img}`);

    const images = [
        ...itemImages,
        ...icons
    ]


    images.forEach(preloadImage);

};