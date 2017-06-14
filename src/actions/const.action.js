import * as types from '../constants/actionTypes';

export const mapStateToProps = (state) => {
  return {
    const: state.const
  }
}

export const mapDispatchToProps =(dispatch) => {
  return {
    CHECK_LOGIN: (checkLogin) => {
      dispatch({
        type: types.CHECK_LOGIN,
        checkLogin: checkLogin
      })
    },
    ON_LOCATION_LAT: (onLocationLat) => {
      dispatch({
        type: types.ON_LOCATION_LAT,
        onLocationLat
      })
    },
    ON_LOCATION_LONG: (onLocationLong) => {
      dispatch({
        type: types.ON_LOCATION_LONG,
        onLocationLong
      })
    },
    USER_PROFILE: (userProfile) => {
      dispatch({
        type: types.USER_PROFILE,
        userProfile
      })
    },
  }
}