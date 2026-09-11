export const preloadImages = (items) => {
    items.forEach(item => {
        const img = new Image();
        img.src = `/${item.img}`;
    });
};