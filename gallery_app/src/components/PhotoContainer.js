import React from 'react';
import Photo from './Photo';
import NotFound from './NotFound'

const PhotoContainer = props => {

  const results = props.data

  let photos;
  //Function below determines if the user has inputted a result: if it's empty it will render the notFound component otherwise it will pass URL
  if (results.length> 0) {
     photos = results.map(photo =>
    <Photo url={`https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`} key={photo.id} />);
    } else {
      photos = <NotFound />
    }

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
