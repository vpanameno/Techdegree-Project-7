import React from 'react';
import Photo from './Photo';

const PhotoContainer = props => {

  const results = props.data
  let photos = results.map(photo =>
    <Photo url={`https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`} key={photo.id}/>
  )

  return(
      <div>
        <h2>{props.title}</h2>
        <ul>
          {photos}
        </ul>
      </div>
    )
  }

export default PhotoContainer;
