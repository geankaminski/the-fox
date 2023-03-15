import * as THREE from 'three'
import Experience from '../Experience.js'

export default class Stars
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources

        this.setGeometry()
        this.setMaterial()
        this.setMesh()
    }

    setGeometry()
    {
        this.geometry = new THREE.BufferGeometry()
        const vertices = []
        for(let i = 0; i < 1000; i++)
        {
           
        }
        this.geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3))
    }

    setMaterial()
    {
        this.material = new THREE.PointsMaterial({
            size: 0.5, 
            sizeAttenuation: true, 
            alphaTest: 0.5, 
            transparent: true
        })
    }

    setMesh()
    {
        this.mesh = new THREE.Points(this.geometry, this.material)
        this.scene.add(this.mesh)
    }
}