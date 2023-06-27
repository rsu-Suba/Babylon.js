function main() {
    const canvas = document.getElementById('canvas');
    const engine = new BABYLON.Engine(canvas);
    
    function createScene() {
      const scene = new BABYLON.Scene(engine);
      scene.environmentTexture = BABYLON.CubeTexture.CreateFromPrefilteredData("https://playground.babylonjs.com/textures/forest.dds", scene);
      scene.createDefaultSkybox(scene.environmentTexture);
      engine.snapshotRenderingMode = BABYLON.Constants.SNAPSHOTRENDERING_FAST;
      engine.snapshotRendering = true;
      
      const camera = new BABYLON.ArcRotateCamera(
        "camera",
        BABYLON.Tools.ToRadians(45),
        BABYLON.Tools.ToRadians(60),
        15,
        new BABYLON.Vector3(0, 0, 0),
        scene
      );
      camera.attachControl(canvas, true);
      camera.minZ = 0.0001;
      camera.fov = BABYLON.Tools.ToRadians(80);
      camera.pinchDeltaPercentage = 0.0;
      camera.pinchPrecision = 1;
      camera.wheelPrecision = 3.5;
      camera.angularSensibilityX = 1750;
      camera.angularSensibilityY = 1750;

      var Pipeline = new BABYLON.DefaultRenderingPipeline("pipeline", true, scene, [camera]);
      Pipeline.imageProcessing.exposure = 2;
      Pipeline.imageProcessing.colorCurvesEnabled = false;
      Pipeline.imageProcessing.contrast = 0.92;
      Pipeline.bloomEnabled = true;
      Pipeline.bloomKernel = 180;
      Pipeline.bloomWeight = 1;
      Pipeline.bloomThreshold = 3.5;
      Pipeline.bloomScale = 2;
      Pipeline.imageProcessing.toneMappingEnabled = true;

      const light = new BABYLON.PointLight("light", new BABYLON.Vector3(-5, 0, 5), scene);
      light.intensity = 0.5;

      //const model = BABYLON.SceneLoader.ImportMeshAsync("","./Models/", "PC-Remake.glb");

      const plane = BABYLON.MeshBuilder.CreatePlane(
        "ground",{
          width:20,
          height:20,
          sideOrientation:BABYLON.Mesh.DOUBLESIDE
        });
      const planemat = new BABYLON.PBRMaterial("planemat",scene);
      plane.material = planemat;
      planemat.albedoColor = new BABYLON.Color3(0.2,0.3,0.8);
      planemat.metallic = 1;
      planemat.roughness = 0.05;
      plane.position.y = 0;
      plane.rotation.x = BABYLON.Tools.ToRadians(90);
      plane.receiveShadows = true;

      const box = new BABYLON.MeshBuilder.CreateBox("box",scene);
      box.position.y = 5;
      const boxmat = new BABYLON.PBRMaterial("boxmat", scene);
      boxmat.albedoColor = new BABYLON.Color3(0.5,0.4,0.2);
      boxmat.metallic = 1;
      boxmat.roughness = 0;
      box.material = boxmat;

      const shadowGenerator = new BABYLON.ShadowGenerator(512, light, true);
      shadowGenerator.useBlurExponentialShadowMap = true;
      shadowGenerator.addShadowCaster(box);

      scene.registerBeforeRender(function(){
        box.rotation.y += 0.005*scene.getEngine().getDeltaTime();
        box.rotation.x += 0.005*scene.getEngine().getDeltaTime();
      });
      return scene;
    }
    
    const scene = createScene();
    
    engine.runRenderLoop(() => {
      scene.render();
    });
    
    window.addEventListener('resize', () => {
      engine.resize();
    });
  }
  window.addEventListener('DOMContentLoaded', main);