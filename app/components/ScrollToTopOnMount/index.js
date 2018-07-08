import { Component } from 'react';

export class ScrollToTopOnMount extends Component {
  componentDidMount() {
    console.log(`ScrollToTopOnMount.componentDidMount()`);
    window.scrollTo(0, 0);
  }

  render() {
    return null;
  }
}

export default ScrollToTopOnMount;
