import * as THREE from 'three'
import Experience from '../Experience.js'

export default class Environment
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.debug = this.experience.debug
        
        if(this.debug.active)
        {
            this.debugFolder = this.debug.ui.addFolder('environment')
        }

        this.setSunLight()
        this.setEnvironmentMap()
    }

    setSunLight()
    {
        this.sunLight = new THREE.DirectionalLight('#ffffff', 4)
        this.sunLight.castShadow = true
        this.sunLight.shadow.camera.far = 100
        this.sunLight.shadow.mapSize.set(1024, 1024)
        this.sunLight.shadow.normalBias = 0.05
        this.sunLight.position.set(15, 8, - 8)

        const d = 12;

        this.sunLight.shadow.camera.left = - d;
        this.sunLight.shadow.camera.right = d;
        this.sunLight.shadow.camera.top = d;
        this.sunLight.shadow.camera.bottom = - d;

        /* const helper = new THREE.DirectionalLightHelper(this.sunLight, 5);
        this.scene.add(helper); */

        this.scene.add(this.sunLight)

        this.experience.time.on('tick', () =>{
            this.sunLight.position.x = Math.cos(this.experience.time.elapsed * 0.0001) * 12;
            this.sunLight.position.z = Math.sin(this.experience.time.elapsed * 0.0001) * 12;
            this.sunLight.position.y = Math.sin(this.experience.time.elapsed * 0.0001) * 12;
            this.sunLight.lookAt(0, 0, 0);
        })

        if(this.debug.active)
        {
            this.debugFolder
                .add(this.sunLight, 'intensity')
                .name('sunLightIntensity')
                .min(0)
                .max(10)
                .step(0.001)
            
            this.debugFolder
                .add(this.sunLight.position, 'x')
                .name('sunLightX')
                .min(- 20)
                .max(20)
                .step(0.001)
            
            this.debugFolder
                .add(this.sunLight.position, 'y')
                .name('sunLightY')
                .min(- 20)
                .max(20)
                .step(0.001)
            
            this.debugFolder
                .add(this.sunLight.position, 'z')
                .name('sunLightZ')
                .min(- 20)
                .max(20)
                .step(0.001)

            this.debugFolder
                .add(this.sunLight.shadow.camera, 'far')
                .name('sunLightShadowFar')
                .min(0)
                .max(100)
                .step(0.001)

            this.debugFolder
                .add(this.sunLight.shadow.mapSize, 'width')
                .name('sunLightShadowWidth')
                .min(0)
                .max(2048)
                .step(1)
        }
    }

    setEnvironmentMap()
    {
        this.environmentMap = {}
        this.environmentMap.intensity = 0.4
        this.environmentMap.texture = this.resources.items.environmentMapTexture
        this.environmentMap.texture.encoding = THREE.sRGBEncoding
        
        this.scene.environment = this.environmentMap.texture

        this.environmentMap.updateMaterials = () =>
        {
            this.scene.traverse((child) =>
            {
                if(child instanceof THREE.Mesh && child.material instanceof THREE.MeshStandardMaterial)
                {
                    child.material.envMap = this.environmentMap.texture
                    child.material.envMapIntensity = this.environmentMap.intensity
                    child.material.needsUpdate = true
                }
            })
        }
        this.environmentMap.updateMaterials()

        this.scene.background = this.environmentMap.texture

        // Debug
        if(this.debug.active)
        {
            this.debugFolder
                .add(this.environmentMap, 'intensity')
                .name('envMapIntensity')
                .min(0)
                .max(4)
                .step(0.001)
                .onChange(this.environmentMap.updateMaterials)
        }
    }
}