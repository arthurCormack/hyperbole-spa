import { CONJURE_SOCIALMEDIATHING } from './constants';

export function conjureSocialMediaThing (url, title, isSocialSharingPanelOpen=true) {
  // console.log(`conjureSocialMediaThing(${url}, ${title}, ${isSocialSharingPanelOpen})`);
  return {
    type: CONJURE_SOCIALMEDIATHING,
    url,
    title,
    isSocialSharingPanelOpen,
  }
}
