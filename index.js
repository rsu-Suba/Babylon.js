function main() {
    const canvas = document.getElementById('canvas');
    const engine = new BABYLON.Engine(canvas);
    
    function createScene() {
      const scene = new BABYLON.Scene(engine);
      const camera = new BABYLON.ArcRotateCamera("camera", BABYLON.Tools.ToRadians(45), BABYLON.Tools.ToRadians(60), 15, new BABYLON.Vector3(0, 0, 0), scene);
      camera.attachControl(canvas, true);
      camera.minZ = 0.001;
      const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(1, 1, 0), scene);
      const model = BABYLON.SceneLoader.ImportMeshAsync("","./Models/", "PC-Remake.glb");
      const plane = new BABYLON.MeshBuilder.CreateGround("ground", {width:12, height:12});
      plane.position.y = -0.1
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
