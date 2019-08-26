import {drawKeyPoints, drawSkeleton} from './components/utils'
import {compareObj, flatImageData, parts} from './Data/finalData'
import {normArrGen} from './Data/flatArrGen'
import {compare} from './cosineFunc'
import {stop} from './components/Camera'
import {gotResult, updateStop} from './store/trainer'
import store from './store'

export function detectPose(
  props,
  argcanvas,
  poseDetectionFrame,
  posenet,
  video,
  poseName
) {
  const {videoWidth, videoHeight} = props
  const canvas = argcanvas

  const canvasContext = canvas.getContext('2d')

  canvas.width = videoWidth
  canvas.height = videoHeight

  poseDetectionFrame(canvasContext, props, posenet, video, poseName)
}

export function poseDetectionFrame(
  canvasContext,
  props,
  posenet,
  argvideo,
  poseName
) {
  const {
    algorithm,
    imageScaleFactor,
    flipHorizontal,
    outputStride,
    minPoseConfidence,
    minPartConfidence,
    maxPoseDetections,
    nmsRadius,
    videoWidth,
    videoHeight,
    showVideo,
    showPoints,
    showSkeleton,
    skeletonColor,
    skeletonLineWidth
  } = props

  const posenetModel = posenet
  const video = argvideo
  const findPoseDetectionFrame = async () => {
    let poses = []

    switch (algorithm) {
      case 'single-pose': {
        const pose = await posenetModel.estimateSinglePose(
          video,
          imageScaleFactor,
          flipHorizontal,
          outputStride
        )
        poses.push(pose)
        let refPoses = ['powerpose']

        let index = refPoses.indexOf(poseName)

        let flatRefImage = flatImageData[index]

        let normArray1 = normArrGen(poses)

        let minCosineDistance = compare(normArray1, flatRefImage)
        if (minCosineDistance > 0.4) {
          store.dispatch(gotResult('BadPose', minCosineDistance))
        } else {
          store.dispatch(gotResult(compareObj[index].pose, minCosineDistance))
        }
        break
      }
    }
    canvasContext.clearRect(0, 0, videoWidth, videoHeight)

    if (showVideo) {
      canvasContext.save()
      canvasContext.scale(-1, 1)
      canvasContext.translate(-videoWidth, 0)
      canvasContext.drawImage(video, 0, 0, videoWidth, videoHeight)
      canvasContext.restore()
    }

    poses.forEach(({score, keypoints}) => {
      if (score >= minPoseConfidence) {
        if (showPoints) {
          drawKeyPoints(
            keypoints,
            minPartConfidence,
            skeletonColor,
            canvasContext
          )
        }
        if (showSkeleton) {
          drawSkeleton(
            keypoints,
            minPartConfidence,
            skeletonColor,
            skeletonLineWidth,
            canvasContext
          )
        }
      }
    })
    if (!stop) {
      requestAnimationFrame(findPoseDetectionFrame)
    } else {
      store.dispatch(updateStop())
    }
  }

  findPoseDetectionFrame()
}
