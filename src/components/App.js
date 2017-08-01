import React, { Component } from 'react';
import { connect } from 'react-redux';
import { itemsFetchData } from './redux/reducers';

import './scss/App.css';

class App extends Component {

  componentWillMount() {
    console.log('componentWillMount') //once at beginning
    //Callback Function: https://www.flickr.com/services/api/response.json.html nojsoncallback=1
    const url = 'https://api.flickr.com/services/feeds/photos_public.gne?format=json&nojsoncallback=1';
    this.props.fetchData(url);

  }
  render() {
    const url = 'https://api.flickr.com/services/feeds/photos_public.gne?format=json';

    if (this.props.hasErrored) {
      return (
        <div className="App">
          <div>
            <div className="App_header">
              <h2>
                <a href={url}>
                  Flickr Photo Stream
              </a>
              </h2>
            </div>
            <div className="App_content flexWrap">
              <h2>Sorry! There was an error loading the items</h2>
            </div>
          </div>
        </div>
      );
    }

    if (this.props.isLoading) {
      return (
        <div className="App">
          <div>
            <div className="App_header">
              <h2>
                <a href={url}>
                  Flickr Photo Stream
              </a>
              </h2>
            </div>
            <div className="App_content flexWrap">
              <h2>Loading…</h2>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="App">
        <div>
          <div className="App_header">
            <h2>
              <a href={url}>
                Flickr Photo Stream
              </a>
            </h2>
          </div>
          <div className="App_content flexWrap">

            {this.props.cards}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    cards: state.cards,
    hasErrored: state.itemsHasErrored,
    isLoading: state.itemsIsLoading
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchData: (url) => dispatch(itemsFetchData(url))
  };
};

//export default App;
export default connect(mapStateToProps, mapDispatchToProps)(App);


