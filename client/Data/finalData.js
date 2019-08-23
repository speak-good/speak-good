import {mountainNormArray, mountainFlatnormArray} from './MountainPose'
export let flatImageData = []

flatImageData.push(
  // other potential poses,
  mountainFlatnormArray
)

export let compareObj = [{pose: 'MountainPose', norm: mountainNormArray}]

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
