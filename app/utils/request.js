import 'whatwg-fetch';

/**
 * Parses the JSON returned by a network request
 *
 * @param  {object} response A response from a network request
 *
 * @return {object}          The parsed JSON from the request
 */
function parseJSON(response) {
  if (response.status === 204 || response.status === 205) {
    return null;
  }
  try {
    const someResponseJSON = response.json();
    // console.log(`someResponseJSON`, someResponseJSON);
    return someResponseJSON;
  } catch (err) {
    console.log('parseJSON failed!!!!');
    console.log(err);
    console.log(someResponseJSON);
    return err;
  }
}

/**
 * Checks if a network request came back fine, and throws an error if not
 *
 * @param  {object} response   A response from a network request
 *
 * @return {object|undefined} Returns either the response, or throws an error
 */
function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

/**
 * Requests a URL, returning a promise
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 *
 * @return {object}           The response data
 */
export default function request(url, options = null) {
  // console.log(`request: ${url}`);
  let initObj;
  if (typeof window === 'undefined') {
    // we are on the server.
    let someHeaders = new Headers();
    someHeaders.append('pragma', 'no-cache');
    someHeaders.append('cache-control', 'no-cache');
    initObj = Object.assign({ headers: someHeaders }, options);
    // console.log(`server request`, url, initObj);
  } else {

    initObj = options;
    // console.log(`client request`, url, initObj);
  }

  return fetch(url, initObj)
    .then(checkStatus)
    .then(parseJSON);
}
