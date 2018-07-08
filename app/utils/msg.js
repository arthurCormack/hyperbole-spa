// // URI Encode stuff so that it can be safely passed as a param to things like facebook sharing
// export const serialize = (params) => {
//   return Object.keys(params).map(param => `${param}=${encodeURIComponent(params[param].trim())}`).join('&');
// }
// export default serialize;

export const msg = (someMSG) => {
  if (process.env.NODE_ENV === 'production') {

  } else {
    console.log(someMSG);
  }
}
