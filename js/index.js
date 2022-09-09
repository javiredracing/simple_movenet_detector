var detector, rafId, camera;
var MODEL, MODEL_TYPE;
var interfaz;
var DRAW_SKELETON = true;
var DRAW_HANDS = true;
var DRAW_BACKGROUND = true;

document.addEventListener("DOMContentLoaded", function(){
	interfaz = new Interface();
	MODEL = poseDetection.SupportedModels.MoveNet;
	MODEL_TYPE = poseDetection.movenet.modelType.SINGLEPOSE_LIGHTNING;
	app();
});

async function renderPrediction() {
  await renderResult();
  rafId = requestAnimationFrame(renderPrediction);
}

async function renderResult() {
	var poses;
	try {
      poses = await detector.estimatePoses(camera.video,{maxPoses: STATE.modelConfig.maxPoses, flipHorizontal: false});
    } catch (error) {
      detector.dispose();
      detector = null;
      alert(error);
    }
	//camera.drawCtx();
	//if (!DRAW_BACKGROUND)
		//camera.drawBackground();
		//hide camera background
    camera.clearCtx();
	if (poses && poses.length > 0){
		//console.log(poses[0].keypoints);
		if (DRAW_SKELETON)
			camera.drawResults(poses);
		var coords = camera.drawHandsPointer(poses, DRAW_HANDS);
        var screenCoords = [];
        for (const coord of coords){
            if (typeof coord !== 'undefined'){
                //interfaz.setLabel(interfaz.label, coords);
                let screenCoord = toScreenCoords(coord);
                screenCoords.push(screenCoord);
            }
        }
        if (screenCoords.length > 0)
            interfaz.manageCoords(screenCoords);
        else
            interfaz.noCoords();
	}
}

async function createDetector() {
	  return poseDetection.createDetector(MODEL, MODEL_TYPE);
}

async function app() {
	camera = await Camera.setupCamera(poseDetection, MODEL);
	/*console.log(camera.canvas.getBoundingClientRect());
	console.log(camera.video.getBoundingClientRect());
	console.log(iface.getBoundingClientRect());*/
	await setBackendAndEnvFlags(FLAGS, "tfjs-webgl");
	detector = await createDetector();
	//console.log(detector);
	renderPrediction();
}

function toScreenCoords(coord) {
	let rect = camera.canvas.getBoundingClientRect();
    let traslationX = rect.width / camera.canvas.width;
    let traslationY = rect.height / camera.canvas.height;
    let wx = (camera.canvas.width - coord.x) * traslationX;  //Cambiar coordenadas x,y mirror
    let wy = coord.y * traslationY;
    
    return toPoint(wx, wy, coord.name);
}

function toPoint(x, y, name) {
  return { x: x, y: y, name: name }
}

async function setBackendAndEnvFlags(flagConfig, backend) {
  if (flagConfig == null) {
    return;
  } else if (typeof flagConfig !== 'object') {
    throw new Error(
        `An object is expected, while a(n) ${typeof flagConfig} is found.`);
  }

  // Check the validation of flags and values.
  for (const flag in flagConfig) {
    // TODO: check whether flag can be set as flagConfig[flag].
    if (!(flag in TUNABLE_FLAG_VALUE_RANGE_MAP)) {
      throw new Error(`${flag} is not a tunable or valid environment flag.`);
    }else{
		console.log(flag);
	}
    if (TUNABLE_FLAG_VALUE_RANGE_MAP[flag].indexOf(flagConfig[flag]) === -1) {
      throw new Error(
          `${flag} value is expected to be in the range [${
              TUNABLE_FLAG_VALUE_RANGE_MAP[flag]}], while ${flagConfig[flag]}` +
          ' is found.');
    }else{console.log(TUNABLE_FLAG_VALUE_RANGE_MAP[flag].indexOf(flagConfig[flag]))}
  }

  tf.env().setFlags(flagConfig);

  const [runtime, $backend] = backend.split('-');

  if (runtime === 'tfjs') {
    await resetBackend($backend);
  }
}

async function resetBackend(backendName) {
  const ENGINE = tf.engine();
  if (!(backendName in ENGINE.registryFactory)) {
    throw new Error(`${backendName} backend is not registed.`);
  }

  if (backendName in ENGINE.registry) {
    const backendFactory = tf.findBackendFactory(backendName);
    tf.removeBackend(backendName);
    tf.registerBackend(backendName, backendFactory);
  }
  await tf.setBackend(backendName);
}

const TUNABLE_FLAG_VALUE_RANGE_MAP = {
  WEBGL_VERSION: [1, 2],
  WASM_HAS_SIMD_SUPPORT: [true, false],
  WASM_HAS_MULTITHREAD_SUPPORT: [true, false],
  WEBGL_CPU_FORWARD: [true, false],
  WEBGL_PACK: [true, false],
  WEBGL_FORCE_F16_TEXTURES: [true, false],
  WEBGL_RENDER_FLOAT32_CAPABLE: [true, false],
  WEBGL_FLUSH_THRESHOLD: [-1, 0, 0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2],
  CHECK_COMPUTATION_FOR_ERRORS: [true, false],
};
const FLAGS = {'WEBGL_VERSION': 2, 'WEBGL_CPU_FORWARD':true, 'WEBGL_PACK':true,
    'WEBGL_FORCE_F16_TEXTURES':false, 'WEBGL_RENDER_FLOAT32_CAPABLE':true,
    'WEBGL_FLUSH_THRESHOLD':-1};
/*const BACKEND_FLAGS_MAP = {
  ['tfjs-wasm']: ['WASM_HAS_SIMD_SUPPORT', 'WASM_HAS_MULTITHREAD_SUPPORT'],
  ['tfjs-webgl']: [
    'WEBGL_VERSION', 'WEBGL_CPU_FORWARD', 'WEBGL_PACK',
    'WEBGL_FORCE_F16_TEXTURES', 'WEBGL_RENDER_FLOAT32_CAPABLE',
    'WEBGL_FLUSH_THRESHOLD'
  ],
  ['mediapipe-gpu']: []
};
const MODEL_BACKEND_MAP = {
  [posedetection.SupportedModels.PoseNet]: ['tfjs-webgl'],
  [posedetection.SupportedModels.MoveNet]: ['tfjs-webgl', 'tfjs-wasm'],
  [posedetection.SupportedModels.BlazePose]: ['mediapipe-gpu', 'tfjs-webgl']
}*/
