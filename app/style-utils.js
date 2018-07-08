import { css } from 'styled-components'

export const media = {
  tiny: (...args) => css`
    @media screen and (max-width: 320px) {
      ${ css(...args) }
    }
  `,
  extrasmall: (...args) => css`
    @media screen and (max-width: 480px) {
      ${ css(...args) }
    }
  `,
  small: (...args) => css`
    @media screen and (max-width: 768px) {
      ${ css(...args) }
    }
  `,
  medium: (...args) => css`
    @media screen and (max-width: 992px) {
      ${ css(...args) }
    }
  `,
  large: (...args) => css`
    @media screen and (max-width: 1200px) {
      ${ css(...args) }
    }
  `,
  print: (...args) => css`
    @media (print) {
      ${ css(...args) }
    }
  `,
}
export default media;
