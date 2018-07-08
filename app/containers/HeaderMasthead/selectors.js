import { createSelector } from 'reselect';


const selectRoute = (state) => state.get('route');

const selectLocation = () => createSelector(
  selectRoute,
  (routeState) => {
    // console.log(`selectLocation`, routeState);
    if (!routeState) return false;
    return routeState.get('locationBeforeTransitions');
    // return routeState;
  }
);

// const makeSelectLocationState = () => {
//   let prevRoutingState;
//   let prevRoutingStateJS;
//   return (state) => {
//     const routingState = state.get('route'); // or state.route
//     if (!routingState.equals(prevRoutingState)) {
//       prevRoutingState = routingState;
//       prevRoutingStateJS = routingState.toJS();
//     }
//     return prevRoutingStateJS;
//   };
// };
export default selectLocation;
export {
  selectRoute,
  selectLocation,
}
