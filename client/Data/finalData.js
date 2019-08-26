import {powerNormArray, powerFlatnormArray} from './PowerPose'
export let flatImageData = []

flatImageData.push(
  // other potential poses,
  powerFlatnormArray
)

export let compareObj = [{pose: 'powerpose', norm: powerNormArray}]

export let parts = [
  'nose',
  'leftEye',
  'rightEye',
  'leftEar',
  'rightEar',
  'rightShoulder',
  'leftElbow',
  'rightElbow',
  'leftWrist',
  'rightWrist',
  'leftHip',
  'rightHip',
  'leftKnee',
  'rightKnee',
  'leftAnkle',
  'rightAnkle'
]
