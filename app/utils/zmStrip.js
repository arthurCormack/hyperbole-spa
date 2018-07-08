import he from 'he';

export default function zmStrip(zmContent) {
  let StrippedString = '';
  if (typeof zmContent === 'string') {
    StrippedString = zmContent.replace(/(<([^>]+)>)/ig, '');
  } else {
    StrippedString = '';
  }

  return he.decode(StrippedString);
}
