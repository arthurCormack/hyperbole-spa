import he from 'he';

export default function zmShorten(zmContent) {
  let lastSpace = null;
  let trimmedText = zmContent;
  let trimmedStrippedString = '';
  if (typeof zmContent === 'string') {
    if (zmContent.length > 150) {
      lastSpace = zmContent.indexOf(zmContent.substr(150), ' ');
      // Trim
      // trimmedText = zmContent.substr(0, lastSpace) + '...';
      trimmedText = `${zmContent.substr(0, lastSpace)} ...`;
      trimmedStrippedString = trimmedText.replace(/(<([^>]+)>)/ig, '');
    } else {
      trimmedStrippedString = '';
    }
  } else {
    trimmedStrippedString = '';
  }

  return he.decode(trimmedStrippedString);
}
