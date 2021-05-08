import React, { Component} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import apiKey from './config'
import Nav from './components/Nav'
import PhotoContainer from './components/PhotoContainer'
import NotFound from './components/NotFound'
import SearchForm from './components/SearchForm'

class App extends Component {

  constructor() {
    super();
      this.state = {
        photos: [],
        dogPhotos: [],
        catPhotos: [],
        computerPhotos: [],
        tags: ''
          };
  }

  componentDidMount() {
    this.searchResults();
    this.dogPics();
    this.catPics();
    this.computerPics();

  }

//Created the function needed to fetch information based on user input
  searchResults = (query = "lizards") => {
    fetch(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${query}&per_page=24&format=json&nojsoncallback=1`)
      .then(response => response.json())
      .then(responseData=> {
        this.setState({ photos: responseData.photos.photo,
        tags: query
      })

        })
    .catch(err=> {
      console.log('Error fetching and parsing data', err)
      })
  }

//Functions below are the links that were given, needed to fetch specific data based on title

  dogPics = () => {
    fetch(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=dogs&per_page=24&format=json&nojsoncallback=1`)
    .then(response => response.json())
    .then(responseData=> {
      this.setState({ dogPhotos: responseData.photos.photo })
  })
    .catch(err=> console.log('Error fetching and parsing data', err))
  }


  catPics = () => {
      fetch(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=cats&per_page=24&format=json&nojsoncallback=1`)
      .then(response => response.json())
      .then(responseData=> {
        this.setState({ catPhotos: responseData.photos.photo })
})
  .catch(err=> console.log('Error fetching and parsing data', err))
}

  computerPics = () => {
    fetch(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=computers&per_page=24&format=json&nojsoncallback=1`)
    .then(response => response.json())
    .then(responseData=> {
      this.setState({ computerPhotos: responseData.photos.photo })
})
  .catch(err=> console.log('Error fetching and parsing data', err))

}
//Below I rendered the components in the order they appeared on the page and passed appropriate data to be used in child components
  render() {
    return (

    <BrowserRouter>
      <div className="container">
        <SearchForm onSearch={this.searchResults} />
        <Nav/>
        <div className="photo-container">
        <Switch>
          <Route exact path= "/" render={ () => <PhotoContainer data={this.state.photos}/>} />
          <Route exact path= "/search/:query" render={ () => <PhotoContainer data={this.state.photos} title={this.state.tags}/>} />
          <Route path= "/dogs" render={ () => <PhotoContainer data={this.state.dogPhotos} onClick={this.state.dogPhotos} title="dogs"/>} />
          <Route path= "/cats" render={ () => <PhotoContainer data={this.state.catPhotos} onClick={this.state.catPhotos} title="cats"/>} />
          <Route path= "/computers" render={ () => <PhotoContainer data={this.state.computerPhotos} onClick={this.state.computerPhotos} title="computers"/>} />
          <Route component={NotFound} />
        </Switch>
      </div>
    </div>
  </BrowserRouter>
  );
}
}

export default App;
