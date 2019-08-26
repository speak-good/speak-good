import {normArrGen, flattenArr} from './flatArrGen'

// let pose = {
//   score: 0.9456103934961206,
//   keypoints: [
//     {
//       part: 'nose',
//       position: {x: 359.6240352098595, y: 98.88732759263779},
//       score: 0.9914094805717468
//     },
//     {
//       part: 'leftEye',
//       position: {x: 367.0500984531482, y: 89.91044530232746},
//       score: 0.9822882413864136
//     },
//     {
//       part: 'rightEye',
//       position: {x: 356.9849982106014, y: 90.20534483167859},
//       score: 0.9785081744194031
//     },
//     {
//       part: 'leftEar',
//       position: {x: 376.38764423857106, y: 96.17234536064994},
//       score: 0.7588149905204773
//     },
//     {
//       part: 'rightEar',
//       position: {x: 339.2365045292795, y: 92.9921873474121},
//       score: 0.657842218875885
//     },
//     {
//       part: 'leftShoulder',
//       position: {x: 391.2571077884482, y: 142.26510379367403},
//       score: 0.9973859190940857
//     },
//     {
//       part: 'rightShoulder',
//       position: {x: 331.7907588064494, y: 141.45820370144313},
//       score: 0.9935976266860962
//     },
//     {
//       part: 'leftElbow',
//       position: {x: 416.58405337913814, y: 195.3175655449761},
//       score: 0.9767336845397949
//     },
//     {
//       part: 'rightElbow',
//       position: {x: 317.84903415940283, y: 194.7503633626302},
//       score: 0.9821184277534485
//     },
//     {
//       part: 'leftWrist',
//       position: {x: 430.6581989593959, y: 247.27174309624564},
//       score: 0.9848974347114563
//     },
//     {
//       part: 'rightWrist',
//       position: {x: 294.3377893827082, y: 243.53857126871742},
//       score: 0.9579808115959167
//     },
//     {
//       part: 'leftHip',
//       position: {x: 378.5462195512449, y: 240.79929779052733},
//       score: 0.9889102578163147
//     },
//     {
//       part: 'rightHip',
//       position: {x: 340.33980100727933, y: 240.42929175482854},
//       score: 0.9951163530349731
//     },
//     {
//       part: 'leftKnee',
//       position: {x: 378.57141692843567, y: 335.98935994466143},
//       score: 0.98810213804245
//     },
//     {
//       part: 'rightKnee',
//       position: {x: 350.1087449070962, y: 337.2346742757161},
//       score: 0.9938323497772217
//     },
//     {
//       part: 'leftAnkle',
//       position: {x: 373.4628467956, y: 413.8407137722439},
//       score: 0.9185164570808411
//     },
//     {
//       part: 'rightAnkle',
//       position: {x: 350.7835908884111, y: 418.3430186631944},
//       score: 0.9293221235275269
//     }
//   ]
// }

// let poses = [pose]
// export let powerNormArray = normArrGen(poses)
// export let powerFlatnormArray = flattenArr(powerNormArray)
// 6823692826335045

let pose = {
  score: 0.9456103934961206,
  keypoints: [
    {
      part: 'nose',
      position: {x: 360.75492468071405, y: 220.33398002828267},
      score: 0.9983281493186951
    },

    {
      part: 'leftEye',
      position: {x: 379.06178089982944, y: 207.83646127944178},
      score: 0.9986503720283508
    },

    {
      part: 'rightEye',
      position: {x: 341.09805304648347, y: 206.0104754982787},
      score: 0.9970160722732544
    },

    {
      part: 'leftEar',
      position: {x: 401.2993079782329, y: 225.85946374547945},
      score: 0.886253297328949
    },

    {
      part: 'rightEar',
      position: {x: 318.0029072580996, y: 231.76374803311043},
      score: 0.9019086360931396
    },

    {
      part: 'leftShoulder',
      position: {x: 443.4050528137615, y: 323.0515794159751},
      score: 0.9802983403205872
    },

    {
      part: 'rightShoulder',
      position: {x: 276.4740975768635, y: 332.93218414578314},
      score: 0.9812217354774475
    },

    {
      part: 'leftElbow',
      position: {x: 557.452100316241, y: 303.5492531977351},
      score: 0.886562168598175
    },

    {
      part: 'rightElbow',
      position: {x: 147.90137785845715, y: 283.7671251608286},
      score: 0.8894621133804321
    },

    {
      part: 'leftWrist',
      position: {x: 121.0516498455226, y: 158.07237030844308},
      score: 0.7047709822654724
    },

    {
      part: 'rightWrist',
      position: {x: 123.16674740118013, y: 156.98625241967267},
      score: 0.8618481755256653
    },

    {
      part: 'leftHip',
      position: {x: 414.7780522471812, y: 562.1995693852003},
      score: 0.7120426893234253
    },

    {
      part: 'rightHip',
      position: {x: 306.01621767991367, y: 559.6203721949184},
      score: 0.6095495820045471
    },

    {
      part: 'leftKnee',
      position: {x: 279.93451566632444, y: 721.0700785017156},
      score: 0.08403539657592773
    },

    {
      part: 'rightKnee',
      position: {x: 895.6528763463077, y: 578.7805212003896},
      score: 0.08605439215898514
    },

    {
      part: 'leftAnkle',
      position: {x: 389.72677727850083, y: 577.9397211725706},
      score: 0.008726452477276325
    },

    {
      part: 'rightAnkle',
      position: {x: 119.0033587687265, y: 139.22373378312201},
      score: 0.01354924961924553
    }
  ]
}

let poses = [pose]
export let power2NormArray = normArrGen(poses)
export let power2FlatnormArray = flattenArr(power2NormArray)
