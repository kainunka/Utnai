import * as types from '../constants/actionTypes';

export const mapStateToProps = (state) => {
  return {
    feed: state.feed
  }
}

export const mapDispatchToProps =(dispatch) => {
  return {
    FEED_DATA: (feedData) => {
      dispatch({
        type: types.FEED_DATA,
        feedData: feedData
      })
    },
  }
}