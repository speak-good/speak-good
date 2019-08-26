import {powerNormArray, powerFlatnormArray} from './PowerPose'
import {power2NormArray, power2FlatnormArray} from './PowerPose2'
export let flatImageData = []

flatImageData.push(
  // other potential poses,
  powerFlatnormArray,
  power2FlatnormArray
)

export let compareObj = [
  {pose: 'powerpose', norm: powerNormArray},
  {pose: 'powerpose2', norm: power2NormArray}
]

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
