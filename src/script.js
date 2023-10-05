import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { GUI } from 'three/addons/libs/lil-gui.module.min.js'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
import { RGBELoader } from 'three/addons/loaders/RGBELoader.js'
import { EXRLoader } from 'three/addons/loaders/EXRLoader.js'
import {GroundProjectedSkybox } from 'three/addons/objects/GroundProjectedSkybox.js'




/**
 * Loaders
 */

const gltfLoader = new GLTFLoader();
const cubeTextureLoader = new THREE.CubeTextureLoader();
const rgbeLoader = new RGBELoader();
const exrLoader = new EXRLoader();
const textureLoader = new THREE.TextureLoader();

/**
 * Base
 */
// Debug
const gui = new GUI()
const global = {}

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Update all materials
 */
const updateAllMaterials = () => {
    scene.traverse((child) => {
        if (child.isMesh && child.material.isMeshStandardMaterial) {
            child.material.envMapIntensity = global.envMapIntensity
        }
    })
}



/**
 * Environment map
 */

scene.backgroundBlurriness = 0
scene.backgroundIntensity = 1

gui.add(scene, 'backgroundBlurriness').min(0).max(1).step(0.001)
gui.add(scene, 'backgroundIntensity').min(0).max(10).step(0.001)

// Global Intensity

global.envMapIntensity = 1
gui
    .add(global, 'envMapIntensity')
    .min(0)
    .max(10)
    .step(0.001)
    .onChange(updateAllMaterials)


const guiControls = {
    backgroundLDR: 'image',
    backgroundHDR: 'image',
    backgroundEXR: 'image',
    backgroundIA: 'image',
};

// Base Background Value
// const environmentMap = textureLoader.load('../static/environmentMaps/blockadesLabsSkybox/anime_art_style_japan_streets_with_cherry_blossom_.jpg')
// environmentMap.mapping = THREE.EquirectangularReflectionMapping;
// environmentMap.colorSpace = THREE.SRGBColorSpace

// scene.environment = environmentMap;
// scene.background = environmentMap;

// LDR Cube Texture

gui.add(guiControls, 'backgroundLDR', ['street', 'amphitheater', 'plain'])  // à compléter
    .onChange((mode) => {
        switch (mode) {  // à compléter
            case 'street':
                var environmentMap = cubeTextureLoader.load([
                    '../static/environmentMaps/0/px.png',
                    '../static/environmentMaps/0/nx.png',
                    '../static/environmentMaps/0/py.png',
                    '../static/environmentMaps/0/ny.png',
                    '../static/environmentMaps/0/pz.png',
                    '../static/environmentMaps/0/nz.png',
                ])
                
                scene.environment = environmentMap;
                scene.background = environmentMap;
                
                break;
            case 'amphitheater':
                var environmentMap = cubeTextureLoader.load([
                    '../static/environmentMaps/1/px.png',
                    '../static/environmentMaps/1/nx.png',
                    '../static/environmentMaps/1/py.png',
                    '../static/environmentMaps/1/ny.png',
                    '../static/environmentMaps/1/pz.png',
                    '../static/environmentMaps/1/nz.png',
                ])

                scene.environment = environmentMap;
                scene.background = environmentMap;
                
                break;
            case 'plain':
                var environmentMap = cubeTextureLoader.load([
                    '../static/environmentMaps/2/px.png',
                    '../static/environmentMaps/2/nx.png',
                    '../static/environmentMaps/2/py.png',
                    '../static/environmentMaps/2/ny.png',
                    '../static/environmentMaps/2/pz.png',
                    '../static/environmentMaps/2/nz.png',
                ])
                
                scene.environment = environmentMap;
                scene.background = environmentMap;
                
                break;
        }
    });

// HDR (RGBE) equirectangular

gui.add(guiControls, 'backgroundHDR', ['street', 'amphitheater', 'plain'])  // à compléter
    .onChange((mode) => {
        switch (mode) {  // à compléter
            case 'street':
                rgbeLoader.load('../static/environmentMaps/0/2k.hdr', (environmentMap) => {
                    environmentMap.mapping = THREE.EquirectangularReflectionMapping

                    scene.environment = environmentMap;
                    scene.background = environmentMap;
                })
                break;
            case 'amphitheater':
                rgbeLoader.load('../static/environmentMaps/1/2k.hdr', (environmentMap) => {
                    environmentMap.mapping = THREE.EquirectangularReflectionMapping

                    scene.environment = environmentMap;
                    scene.background = environmentMap;
                })
                break;
            case 'plain':
                rgbeLoader.load('../static/environmentMaps/2/2k.hdr', (environmentMap) => {
                    environmentMap.mapping = THREE.EquirectangularReflectionMapping

                    scene.environment = environmentMap;
                    scene.background = environmentMap;
                })
                break;
        }
    });

// HDR (EXR) equirectengular
const backgroundController = gui.add(guiControls, 'backgroundEXR', ['nvidiaIA']);

backgroundController.onChange((mode) => {
  switch (mode) {
    case 'nvidiaIA':
      exrLoader.load('../static/environmentMaps/nvidiaCanvas-4k.exr', (environmentMap) => {
        environmentMap.mapping = THREE.EquirectangularReflectionMapping;
        scene.environment = environmentMap;
        scene.background = environmentMap;
      });
      break;
  }
});

// Set the initial value of the toggle button
backgroundController.setValue('image');

// LDR equirectangular

gui.add(guiControls, 'backgroundIA', ['sakura', 'neon', 'castles', 'wood_cabin', 'futuristic'])  // à compléter
    .onChange((mode) => {
        switch (mode) {  // à compléter
            case 'sakura':
                var environmentMap = textureLoader.load('../static/environmentMaps/blockadesLabsSkybox/anime_art_style_japan_streets_with_cherry_blossom_.jpg')
                environmentMap.mapping = THREE.EquirectangularReflectionMapping;
                environmentMap.colorSpace = THREE.SRGBColorSpace

                scene.environment = environmentMap;
                scene.background = environmentMap;
                
                break;
            case 'neon':
                var environmentMap = textureLoader.load('../static/environmentMaps/blockadesLabsSkybox/digital_painting_neon_city_night_orange_lights_.jpg')
                environmentMap.mapping = THREE.EquirectangularReflectionMapping;
                environmentMap.colorSpace = THREE.SRGBColorSpace

                scene.environment = environmentMap;
                scene.background = environmentMap;
                
                break;
            case 'castles':
                var environmentMap = textureLoader.load('../static/environmentMaps/blockadesLabsSkybox/fantasy_lands_castles_at_night.jpg')
                environmentMap.mapping = THREE.EquirectangularReflectionMapping;
                environmentMap.colorSpace = THREE.SRGBColorSpace

                scene.environment = environmentMap;
                scene.background = environmentMap;
                
                break;
            case 'wood_cabin':
                var environmentMap = textureLoader.load('../static/environmentMaps/blockadesLabsSkybox/interior_views_cozy_wood_cabin_with_cauldron_and_p.jpg')
                environmentMap.mapping = THREE.EquirectangularReflectionMapping;
                environmentMap.colorSpace = THREE.SRGBColorSpace

                scene.environment = environmentMap;
                scene.background = environmentMap;
                
                break;
            case 'futuristic':
                var environmentMap = textureLoader.load('../static/environmentMaps/blockadesLabsSkybox/scifi_white_sky_scrapers_in_clouds_at_day_time.jpg')
                environmentMap.mapping = THREE.EquirectangularReflectionMapping;
                environmentMap.colorSpace = THREE.SRGBColorSpace

                scene.environment = environmentMap;
                scene.background = environmentMap;
                
                break;
        }
    });


// // Ground projected skybox
// rgbeLoader.load('../static/environmentMaps/1/2k.hdr', (environmentMap) => {
//     environmentMap.mapping = THREE.EquirectangularReflectionMapping;
//     scene.environment = environmentMap

//     // Skybox
//     const skybox = new GroundProjectedSkybox(environmentMap)
//     skybox.radius = 120
//     skybox.height = 11
//     skybox.scale.setScalar(50)
//     scene.add(skybox)

//     gui.add(skybox, 'radius', 1, 200, 0.1).name('skyboxRadius')
//     gui.add(skybox, 'height', 1, 200, 0.1).name('skyboxHeight')
// })

    
/**
 * Real time environment map
 */

var environmentMap = textureLoader.load('../static/environmentMaps/blockadesLabsSkybox/interior_views_cozy_wood_cabin_with_cauldron_and_p.jpg')
environmentMap.mapping = THREE.EquirectangularReflectionMapping;
environmentMap.colorSpace = THREE.SRGBColorSpace

scene.background = environmentMap;

// Holy donut
const holyDonut = new THREE.Mesh(
    new THREE.TorusGeometry(8, 0.5),
    new THREE.MeshBasicMaterial({ color: new THREE.Color(10, 4, 2) })
)
holyDonut.layers.enable(1)
holyDonut.position.y = 3.5
scene.add(holyDonut)

// Cube render target
const cubeRenderTarget = new THREE.WebGLCubeRenderTarget(
    256,
    {
        type: THREE.HalfFloatType
    }
)

scene.environment = cubeRenderTarget.texture

// Cube camera
const cubeCamera = new THREE.CubeCamera(0.1, 100, cubeRenderTarget)
cubeCamera.layers.set(1)

/**
 * Torus Knot
 */
const torusKnot = new THREE.Mesh(
    new THREE.TorusKnotGeometry(1, 0.4, 100, 16),
    new THREE.MeshStandardMaterial({ roughness: 0, metalness: 1, color: 0xaaaaaa })
)

// torusKnot.material.envMap = environmentMap
torusKnot.position.x = -4
torusKnot.position.y = 4
scene.add(torusKnot)


/**
 * Models
 */

gltfLoader.load(
    '../static/models/FlightHelmet/glTF/FlightHelmet.gltf',
    (gltf) => {
        gltf.scene.scale.set(10, 10, 10)
        scene.add(gltf.scene)

        updateAllMaterials()
    }
)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () => {
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.set(4, 5, 4)
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.target.y = 3.5
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()
const tick = () => {
    // Time
    const elapsedTime = clock.getElapsedTime()

    // Real time environment map
    if(holyDonut){
        holyDonut.rotation.x = Math.sin(elapsedTime) * 2

        cubeCamera.update(renderer, scene)
    }

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()