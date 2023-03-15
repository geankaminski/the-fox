export default [
    {
        name: 'environmentMapTexture',
        type: 'cubeTexture',
        path:
        [
            'textures/environmentMap/parking/px.jpg',
            'textures/environmentMap/parking/nx.jpg',
            'textures/environmentMap/parking/py.jpg',
            'textures/environmentMap/parking/ny.jpg',
            'textures/environmentMap/parking/pz.jpg',
            'textures/environmentMap/parking/nz.jpg'
        ]
    },
    {
        name: 'grassColorTexture',
        type: 'texture',
        path: 'textures/dirt/color.jpg'
    },
    {
        name: 'grassNormalTexture',
        type: 'texture',
        path: 'textures/dirt/normal.jpg'
    },
    {
        name: 'moonTexture',
        type: 'texture',
        path: 'textures/moon/texture.jpg'
    },
    {
        name: 'moonDisplacement',
        type: 'texture',
        path: 'textures/moon/displacement.jpg'
    },
    {
        name: 'foxModel',
        type: 'gltfModel',
        path: 'models/Fox/glTF/Fox.gltf'
    },
    {
        name: 'natureSound',
        type: 'audio',
        path: 'sounds/nature-sound.mp3'
    },
]