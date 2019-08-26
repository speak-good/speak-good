import {normArrGen, flattenArr} from './flatArrGen'

let pose = {
  score: 0.9456103934961206,
  keypoints: [
    {
      part: 'nose',
      position: {x: 359.6240352098595, y: 98.88732759263779},
      score: 0.9914094805717468
    },
    {
      part: 'leftEye',
      position: {x: 367.0500984531482, y: 89.91044530232746},
      score: 0.9822882413864136
    },
    {
      part: 'rightEye',
      position: {x: 356.9849982106014, y: 90.20534483167859},
      score: 0.9785081744194031
    },
    {
      part: 'leftEar',
      position: {x: 376.38764423857106, y: 96.17234536064994},
      score: 0.7588149905204773
    },
    {
      part: 'rightEar',
      position: {x: 339.2365045292795, y: 92.9921873474121},
      score: 0.657842218875885
    },
    {
      part: 'leftShoulder',
      position: {x: 391.2571077884482, y: 142.26510379367403},
      score: 0.9973859190940857
    },
    {
      part: 'rightShoulder',
      position: {x: 331.7907588064494, y: 141.45820370144313},
      score: 0.9935976266860962
    },
    {
      part: 'leftElbow',
      position: {x: 416.58405337913814, y: 195.3175655449761},
      score: 0.9767336845397949
    },
    {
      part: 'rightElbow',
      position: {x: 317.84903415940283, y: 194.7503633626302},
      score: 0.9821184277534485
    },
    {
      part: 'leftWrist',
      position: {x: 430.6581989593959, y: 247.27174309624564},
      score: 0.9848974347114563
    },
    {
      part: 'rightWrist',
      position: {x: 294.3377893827082, y: 243.53857126871742},
      score: 0.9579808115959167
    },
    {
      part: 'leftHip',
      position: {x: 378.5462195512449, y: 240.79929779052733},
      score: 0.9889102578163147
    },
    {
      part: 'rightHip',
      position: {x: 340.33980100727933, y: 240.42929175482854},
      score: 0.9951163530349731
    },
    {
      part: 'leftKnee',
      position: {x: 378.57141692843567, y: 335.98935994466143},
      score: 0.98810213804245
    },
    {
      part: 'rightKnee',
      position: {x: 350.1087449070962, y: 337.2346742757161},
      score: 0.9938323497772217
    },
    {
      part: 'leftAnkle',
      position: {x: 373.4628467956, y: 413.8407137722439},
      score: 0.9185164570808411
    },
    {
      part: 'rightAnkle',
      position: {x: 350.7835908884111, y: 418.3430186631944},
      score: 0.9293221235275269
    }
  ]
}

let poses = [pose]
export let powerNormArray = normArrGen(poses)
export let powerFlatnormArray = flattenArr(powerNormArray)
