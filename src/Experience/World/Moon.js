import * as THREE from 'three'
import Experience from '../Experience.js'

export default class Moon
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources

        this.setGeometry()
        this.setTextures()
        this.setMaterial()
        this.setMesh()
    }

    setGeometry()
    {
        this.geometry = new THREE.SphereGeometry(1, 200, 200)
    }

    setTextures()
    {
        this.texture = this.resources.items.moonTexture
        this.texture.encoding = THREE.sRGBEncoding
        this.displacementTexture = this.resources.items.moonDisplacement
        this.displacementTexture.encoding = THREE.sRGBEncoding
    }

    setMaterial()
    {
        this.material = new THREE.MeshBasicMaterial({
           color: 0xffffff ,
            map: this.texture ,
            displacementMap: this.displacementTexture,
            displacementScale: 0.06,
            bumpMap: this.displacementTexture,
            bumpScale: 0.04,
            reflectivity:0, 
            shininess :0
        })
    }

    setMesh()
    {
        this.mesh = new THREE.Mesh(this.geometry, this.material)
        this.mesh.position.set(15, 8, - 8)
        this.mesh.scale.set(1, 1, 1)
        this.scene.add(this.mesh)

        this.experience.time.on('tick', () =>{
            this.mesh.position.x = Math.cos(this.experience.time.elapsed * 0.0001) * 14;
            this.mesh.position.z = Math.sin(this.experience.time.elapsed * 0.0001) * 14;
            this.mesh.position.y = Math.sin(this.experience.time.elapsed * 0.0001) * 8;
        })
    }
}