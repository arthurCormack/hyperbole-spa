/**
 * Returns a cookie called name
 *
 * @param  {string} name A response from a network request
 *
 * @param  {Boolean} exactMatch whether or not to use exact matches, or partial matches
 *
 * @return {string} The Cookie string
 */
export default function readCookie(name, exactMatch=true) {
    let ca = document.cookie.split(';');
    if (exactMatch) {
      let nameEQ = name + "=";
    } else {
      // // take the first partial match
      // let partialMatch = null;
      // ca.forEach((item) => {
      //   if (item.indexOf(name) !== -1) {
      //     // do stuff
      //     partialMatch = item;
      //     break;
      //   }
      // });

    }

    for(let i=0;i < ca.length;i++) {
        let c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);// trims possible whitespace char at beginning
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}
