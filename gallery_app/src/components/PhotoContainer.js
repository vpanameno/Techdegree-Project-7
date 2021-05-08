import React, { Component } from 'react';
import Photo from './Photo';
import NotFound from './NotFound'
import { withRouter } from 'react-router-dom'

class PhotoContainer extends Component {

//function below makes sure that once the component updates the browser buttons work and url match
  componentDidUpdate() {
    let path = this.props.history.location.pathname;
    let query = this.props.title;
    if(path.includes("/search/")) {
        path = path.replace('/search/', '')
        if(path !== query) {
            this.props.onSearch(path)
        }
    }

}
  render() {
    let photos;

  //Function below determines if the user has inputted a result: if it's empty it will render the notFound component otherwise it will pass URL
    if (this.props.data.length > 0) {
      photos = this.props.data.map(photo =>
        <Photo url={`https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`} key={photo.id} />);
        } else {
          photos = <NotFound />
        }

  return (
      <div>
        <h2>{this.props.title}</h2>
        <ul>
          {photos}
        </ul>
      </div>
    )
  }
}

export default withRouter(PhotoContainer);
