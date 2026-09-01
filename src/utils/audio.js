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

export const playSound = (name) => {
    const audio = new Audio(sound[name])
    audio.play();
}