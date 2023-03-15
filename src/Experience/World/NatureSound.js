import * as THREE from 'three'
import Experience from '../Experience.js'

export default class NatureSound
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.setAudio()
    }

    setAudio()
    {
        this.audio = new THREE.Audio(this.experience.listener)
        this.audio.setBuffer(this.resources.items.natureSound)
        this.audio.setLoop(true)
        this.audio.setVolume(0.6)
        this.audio.play()
    }
}