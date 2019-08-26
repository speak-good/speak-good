import React from 'react'
import {Link} from 'react-router-dom'

export const poses = [
  {
    name: 'powerpose',
    imageUrl: 'https://image.flaticon.com/icons/png/512/62/62270.png',
    select: ''
  },
  {
    name: 'powerpose2',
    imageUrl: 'https://i.imgur.com/xhUotiC.png',
    select: ''
  }
]

const SelectPose = props => {
  return (
    <div>
      <h1 className="powerCamDiv">Choose your power pose</h1>
      <div className="pose">
        {poses.map((pose, i) => {
          return (
            <div key={i} className="col col-lg-6">
              <Link to={`/train/${pose.name}`}>
                <img className="trainingImage" id={i} src={pose.imageUrl} />
              </Link>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default SelectPose
