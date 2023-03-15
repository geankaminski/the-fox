import * as THREE from 'three'
import TWEEN from '@tweenjs/tween.js'
import Experience from '../Experience.js'

export default class Fox
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.time = this.experience.time
        this.debug = this.experience.debug

        // Debug
        if(this.debug.active)
        {
            this.debugFolder = this.debug.ui.addFolder('fox')
        }

        // Resource
        this.resource = this.resources.items.foxModel
        this.natureSound = this.resources.items.natureSound

        this.setModel()
        this.setAnimation()
    }

    setModel()
    {
        this.model = this.resource.scene
        this.model.scale.set(0.02, 0.02, 0.02)
        this.scene.add(this.model)

        this.model.traverse((child) =>
        {
            if(child instanceof THREE.Mesh)
            {
                child.castShadow = true
            }
        })
    }

    mouseIntersections(event) {
        const mouse = new THREE.Vector2()
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1

        const raycaster = new THREE.Raycaster()
        raycaster.setFromCamera(mouse, this.experience.camera.instance)

        const intersects = raycaster.intersectObjects(this.experience.world.scene.children)

        return intersects
    }

    setAnimation()
    {
        this.animation = {}
        
        // Mixer
        this.animation.mixer = new THREE.AnimationMixer(this.model)
        
        // Actions
        this.animation.actions = {}
        
        this.animation.actions.idle = this.animation.mixer.clipAction(this.resource.animations[0])
        this.animation.actions.walking = this.animation.mixer.clipAction(this.resource.animations[1])
        this.animation.actions.running = this.animation.mixer.clipAction(this.resource.animations[2])
        
        this.animation.actions.current = this.animation.actions.idle
        this.animation.actions.current.play()

        // Play the action
        this.animation.play = (name) =>
        {
            const newAction = this.animation.actions[name]
            const oldAction = this.animation.actions.current

            newAction.reset()
            newAction.play()
            newAction.crossFadeFrom(oldAction, 1)

            this.animation.actions.current = newAction
        }


        window.addEventListener('click', (event) => {
            if(this.animation.actions.current === this.animation.actions.walking) return
            const intersects = this.mouseIntersections(event)
            if(intersects.length > 0)
            {
                const point = intersects[0].point
                this.animation.walkTo(point, 'walking')
            }
        })

        /* window.addEventListener('dblclick', (event) => {
            if(this.animation.actions.current === this.animation.actions.running) return
            const intersects = this.mouseIntersections(event)
            if(intersects.length > 0)
            {
                const point = intersects[0].point
                this.animation.walkTo(point, 'running')
            }
        }) */

        this.animation.walkTo = (point, type) =>
        {
            const direction = new THREE.Vector3()
            direction.subVectors(point, this.model.position)
            direction.y = 0
            direction.normalize()

            const angle = Math.atan2(direction.x, direction.z)
            this.model.rotation.y = angle

            this.animation.play(type)

            const distance = this.model.position.distanceTo(point)
            const velocity = type === 'running' ? 4 : 2
            const duration = distance / velocity

            const tween = new TWEEN.Tween(this.model.position)
            tween.to(point, duration * 1000)
            tween.easing(TWEEN.Easing.Quadratic.InOut)
            tween.onComplete(() => {
                this.animation.play('idle')
            })
            tween.start()

            this.experience.time.on('tick', () =>{
                tween.update(this.experience.time.elapsed)
            })
        }

        // Debug
        if(this.debug.active)
        {
            const debugObject = {
                playIdle: () => { this.animation.play('idle') },
                playWalking: () => { this.animation.play('walking') },
                playRunning: () => { this.animation.play('running') }
            }
            this.debugFolder.add(debugObject, 'playIdle')
            this.debugFolder.add(debugObject, 'playWalking')
            this.debugFolder.add(debugObject, 'playRunning')
        }
    }

    update()
    {
        this.animation.mixer.update(this.time.delta * 0.001)
    }
}