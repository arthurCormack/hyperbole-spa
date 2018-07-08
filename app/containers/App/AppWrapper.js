import styled from 'styled-components';

const AppWrapper = styled.div`
  background: #eef0f1;

  /*-----------------------------------------------------------------------------------*/
  /*	2.0 General Styles
  /*-----------------------------------------------------------------------------------*/

  /* --- Sans Serif Font --- */
  ${''/* font-family: sans-serif; */}
  /* --- Headings --- */
  ${''/* h1, h2, h3, h4, h5, h6 {
  	font-family: 'Oswald', Arial, sans-serif;
  	color: #000;
  	font-weight: bold;
  	-webkit-hyphens: auto;
  	   -moz-hyphens: auto;
  	    -ms-hyphens: auto;
  			hyphens: auto;

  } */}
  .AppTest {
    /*
    -gets applied late in the game. 2nd or 3rd Flash.
    */
  }

  .postContainer {
    min-height: 240px;
    position: relative;
    display:block;
  }
`;
export default AppWrapper;
