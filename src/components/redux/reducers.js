import React from 'react';
import ReduxThunk from 'redux-thunk';
import { combineReducers } from 'redux';
import fetchJsonp from 'fetch-jsonp'; //cors
import Card from '../Card';

//Action types---------------------------------------------------------
const ITEMS_HAS_ERRORED = 'ITEMS_HAS_ERRORED';
const ITEMS_IS_LOADING = 'ITEMS_IS_LOADING';
const ITEMS_FETCH_DATA_SUCCESS = 'ITEMS_FETCH_DATA_SUCCESS';

//Action creators------------------------------------------------------

//function Action Creator
export function itemsHasErrored(bool) {
  //return an Action Object {type:...} which represents a state
  return {
    type: ITEMS_HAS_ERRORED, //mandotory property
    hasErrored: bool //state
  };
}

//function Action Creator
export function itemsIsLoading(bool) {
  //return an Action Object {type:...} which represents a state
  return {
    type: ITEMS_IS_LOADING, //mandotory property
    isLoading: bool //state
  };
}

//function Action Creator
export function itemsFetchDataSuccess(cards) {
  //return an Action Object {type:...} which represents a state
  return {
    type: ITEMS_FETCH_DATA_SUCCESS, //mandotory property
    cards //state
  };
}

/**
 * By default, Redux action creators don’t support asynchronous actions like fetching data, so here’s where we utilise Redux Thunk. Thunk allows you to write action creators that return a function instead of an action.
 * The inner function can receive the store methods dispatch and getState as parameters
 * @param {*} url 
 */
//asynchronous function Action Creator based on Thunk
export function itemsFetchData(url) {
  return (dispatch) => {

    dispatch(itemsIsLoading(true));

    let fetchBody = api => fetchJsonp(url, {
      jsonpCallback: ' ',
      jsonpCallbackFunction: 'jsonFlickrFeed' //'jsonFlickrFeed'
    })
      //.then(res => res.ok ? res : res.json().then(err => Promise.reject(err)));

    fetchBody(url)
      .then((response) => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        dispatch(itemsIsLoading(false));
        return response;
      })
      .then((response) => response.json())
      .then((data) => {
        let cards = [];
        cards = data.items.map((card, index) => (
          <Card
            key={index}
            author={card.author}
            author_page={'https://www.flickr.com/people/' + card.author_id}
            title={card.title}
            description={card.description}
            image={card.media.m}
            imageLink={card.link}
            tags={card.tags}
          />
        ))

        dispatch(itemsFetchDataSuccess(cards))
      })
      .catch(() => dispatch(itemsHasErrored(true)));
  };
}


//Reducers-------------------------------------------------------------

/**
 * All reducers get called regardless of the action, so inside each one you have to return the original state if the action is not applicable.
 * Each reducer takes 2 parameters: the previous state (state) and an action object. We can also use an ES6 feature called default parameters to set the default initial state
 * @param {*} state 
 * @param {*} action 
 */
//Reducer (state, action) => state
export function hasErrored(state = false, action) {
  switch (action.type) {
    case ITEMS_HAS_ERRORED:
      return action.hasErrored;
    default:
      return state;
  }
}
//Reducer (state, action) => state
export function isLoading(state = false, action) {
  switch (action.type) {
    case ITEMS_IS_LOADING:
      return action.isLoading;
    default:
      return state;
  }
}
//Reducer (state, action) => state
export function cards(state = [], action) {
  switch (action.type) {
    case ITEMS_FETCH_DATA_SUCCESS:
      return action.cards;
    default:
      return state;
  }
}
//Root Reducer
export default combineReducers({
    hasErrored,
    isLoading,
    cards
});