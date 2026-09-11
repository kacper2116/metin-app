const sound = {
    click_button: '/audio/ui1.wav',
    drag_item: '/audio/ui2.wav',
    drop_default: '/audio/ui3.wav',
    drop_weapon: '/audio/ui4.wav',
    drop_armour: '/audio/ui5.wav',
    drop_jewelry: '/audio/ui6.wav',
    upgrade_success: '/audio/ui7.wav',
    upgrade_failure: '/audio/ui8.wav'
}

export const dropSounds = {
    weapon: 'drop_weapon',
    armour: 'drop_armour',
    earrings: 'drop_jewelry',
    necklace: 'drop_jewelry'
}


const sounds = Object.fromEntries(
    Object.entries(sound).map(([name, path]) => {
        const audio = new Audio(path);

        audio.preload = 'auto';
        audio.load();

        return [name, audio];
    })
);

export const playSound = (name) => {

    const audio = sounds[name];
    if (!audio) return;
    audio.currentTime = 0;
    audio.play();
}