import { injectGlobal } from 'styled-components';

/* eslint no-unused-expressions: 0 */
injectGlobal`
  html,
  body {
    color:#000;
  }

  body {
    background: #eef0f1;

    font-family: 'Crimson Text', serif;
    font-size: 11pt;
  }

  @media screen and (max-width: 480px) {
    font-size: 5pt;
  }

  body.fontLoaded {
    background: #eef0f1;

    font-family: 'Crimson Text', serif;
    -webkit-font-smoothing: antialiased;
    text-shadow: 1px 1px 1px rgba(0,0,0,0.004);
    -webkit-animation-delay: 0.1s;
    -webkit-animation-name: fontfix;
    -webkit-animation-duration: 0.1s;
    -webkit-animation-iteration-count: 1;
    -webkit-animation-timing-function: linear;
  }

  .AffixedNav {
    display: none;
  }
  body.navIsSticky .AffixedNav {
    display: block;
  }

  .flexContainer {
  padding: 0;
  margin: 0;
  list-style: none;
  display: flex;
}

.spaceEvenly {
  justify-content: space-evenly;
}

.contestIsClosed {
  text-transform: uppercase;
  color: #D02D37;
}

.closedArchiveWord {
  text-transform: uppercase;
  color: #ffffff;
  font-size: 1.3em;
  background: #D02D37;
  position: absolute;
  /* float: right; */
  right: 15px;
  padding: 7px 10px;
  font-family: 'Roboto Condensed', sans-serif;
  font-weight: bold;
}
.contestClosedClass img {
  opacity: .8;
}

.realEstateBigBox {
    position: relative;
    left: -11px;
    top: -14px;
}

.flexItem {
  text-align: center;
}

  .searchModal {
    display:none;
  }
  body.searchIsAvtive .searchModal {
    display: block;
  }
  .full {
    width: 100%;
    float:left;
  }

  .caret {
    display: none !important;
  }
  button:focus {
    outline: none;
  }

.drawerBallTitle {
  float: left;
}

  .thickUnderline {
    height: 4px;
    width: 100%;
    display: block;
    background: #000;
    float: left;
    margin: 10px 0 28px;
  }

  .chunkMargBottom {
    margin-bottom: 95px;
  }


  .MargBotMd {
    margin-bottom: 40px;
  }

  .tileSocial {
    position: absolute;
    bottom: 3px;
  }

  .zFront {
    z-index: 99999;
  }

#myBtn {
  position: fixed;
  bottom: 20px;
  right: 30px;
  z-index: 99;
  font-size: 18px;
  text-decoration: none;
  font-weight: bold;
  border: none;
  outline: none;
  background-color: #337ab7;
  cursor: pointer;
  padding: 15px;
  border-radius: 4px;
  color:#fff;

}

#myBtn:hover {
  background-color: #555;
}
#answers {
  display: none;
}

.section{
  display: block;
  color: #000;
  border: 20px solid transparent;
  box-shadow: 1px 2px 2px 2px rgba(0, 0, 0, .05);
  margin: 25px 0px 30px;
}

p.section:target { background: #d6ebf2; text-decoration:none; font-weight:normal;
  border-top: 150px solid transparent;
  margin-top: -150px;
   -webkit-background-clip: padding-box;  background-clip: padding-box;
    -moz-background-clip: padding;
  }



p.section:hover { color: #000; text-decoration:none; font-weight:normal; }


.panel{
  text-align:center;
  border: 20px solid transparent;
  box-shadow: 1px 2px 2px 2px rgba(0, 0, 0, .05);
  margin-bottom: 40px;
}
  .panel-heading {
    background-color: #eef0f1;
    color: #000;
    cursor: pointer;
    padding: 8px;
    text-align: center;
    border: none;
    display: block;
    font-size: 22px;


  }
.panel-heading:hover{
  background-color: #fff;
  border: 1px solid #e7e7e7;
  color:#000;
}
  .panel {
    .panel-heading {
      cursor: pointer;
    }
    .panel-collapse {
      overflow:hidden;
      transition: height 0.3s ease-out;
    }
    .panel-body {
      border: none !important;
      background-color: #fff;
    }
    h2 {margin-top: 5px !important;}
  }

  #NewsletterSignupForm {
    font-size: 1.49em;
  }
  .zFrontBackup {
    z-index: 99;
  }

  .bold {
    font-weight: bold;
  }

  .modal-container {
    position: relative;
  }
  .modal-container .modal, .modal-container .modal-backdrop {
    position: absolute;
  }

  .trend1 {
    left: 5px;
  }

  .noMarg {margin:0 !important;}
  .noMargTop {margin-top: 0 !important;}


  .padBottomSm {padding-bottom: 15px;}
  .padBotLg {padding-bottom: 45px;}
  .padBottomSmFull {padding-bottom: 15px; float:left; width: 100%;}
  .padBottomLg {padding-bottom: 45px;}


  .drawerHamburger {
    color: #000002;
    font-size: 20pt;
    line-height: 49px;
  }

  .frame {
      height: 245px;
      width: 245px;
      overflow: hidden;
      display: block;
  }

  .zoomin:hover {
      cursor: pointer !important;
  }

  .zoomin img {
      height: 245px;
      width: 245px;
      -webkit-transition: all 2s ease;
      -moz-transition: all 2s ease;
      -ms-transition: all 2s ease;
      transition: all 2s ease;
      cursor: pointer !important;
  }

  .zoomin img:hover {
      width: 270px;
      height: 270px;
  }

  .frameLg {
      height: 610px;
      width: 520px;
      overflow: hidden;
      display: block;
  }

  .zoominLg img {
      height: 610px;
      width: 520px;
      -webkit-transition: all 2s ease;
      -moz-transition: all 2s ease;
      -ms-transition: all 2s ease;
      transition: all 2s ease;
  }

  .zoominLg img:hover {
      width: 555px;
      height: 645px;
  }

  .centeredMargin {
    display: block;
    margin: 0 auto;
  }

  .centeredMargin {
    display: block;
    margin: 0 auto;
    float: left;
    width: 100%;
  }

  .redTagPostMargin {
      margin: 0 20px;
  }

  .noMargLeft {
    margin-left: 0 !important;
  }

  .notFullWidth {
    max-width: 700px;
  }

  .padBotMd {
    padding-bottom: 25px;
  }


  .padBotMdFull {
    padding-bottom: 25px;
    float: left;
    width: 100%;
  }


  .stickyToggle {
    top: auto !important;
    left: !important;
    float: right !important;
  }

  .dropdown-menu > li > a:hover, .dropdown-menu > li > a:focus {
      color: #262626;
      text-decoration: none;
      background-color: #f5f5f5 !important;
  }

  .navbar-default .navbar-toggle {
      border-color: none;
      position: relative;
      top: -48px;
      left: 20px !important;
  }

  .nav > li > a {
    font-size: 13pt;
    padding: 15px 10px !important;
  }

  .navbar-toggle {
    float: left;
  }
  .navbar-default .navbar-toggle {
      border-color: #fff;
  }

  /** CENTER NAVBAR **/
  .navbar .navbar-nav {
  display: inline-block;
  float: none;
  vertical-align: top;
}

.navbar .navbar-collapse {
  text-align: center;
}
.navbar-default .navbar-nav li > a,
.navbar-default .navbar-nav .active > a,
.navbar-default .navbar-nav .active > a:hover,
.navbar-default .navbar-nav .active > a:focus {
    background-color: #fff;
    color: #000;
}

.navbar-default .navbar-nav a:focus {
  outline: none;
}

 .navbar-default .navbar-nav .active > a:focus {
   outline: none;
 }

 .navbar .navbar-collapse {
   position: relative;
   margin: 0 auto;
   text-align: center;
   display: inline-table !important;
 }

 .navbar-header {
   float: left;
   width: 0;
}
.specialMobNavHeader {
  float: left;
  width: 100%;
}
.specialMobNavHeader button{
  display: none !important;
}

.postContent {
  margin-top: 20px;
}
.postContent p {
  margin-bottom: 22px;
}
.postContent iframe {
  ${'' /* impose min-height so that unrendered youtube videos will occumy the correct height and not throw off scroll top values during re-renders of the page  */}
  min-height: 315px;
}
.postContent h1, .headingPostContent h1 {
  font-size: 3em;
  margin-bottom: 4px !important;
  padding-bottom: 0 !important;
}

.postContent img {
  display: table;
  margin: 15px 0;
  max-width: 100%;
  height: auto;
}

.postContent figure {
  max-width: 100% !important;
}

.heightSpacer {
  width: 100%;
  height: 45px;
  display: block;
}

.padTopLg {
  padding-top: 40px;
}
.padTopMd {
  padding-top: 30px !important;
}

.padTopBotMd {
  padding-top: 30px !important;
  padding-bottom: 40px !important;
}

.padTopMdFull {
  padding-top: 10px;
  float: left;
  width: 100%;
}
.padTopBtmMdFull {
  padding: 15px 0;
  float: left;
  width: 100%;
}

.padXLgTop {
  padding-top: 110px !important;
}

.topTeaserPad {
  float: left;
  width: 100%;
  margin: 8px 0 0 0;
}

.margBotSm {
    margin-bottom: 8px;
}


/** MD **/

.frameMdSquare {
  width: 520px;
  height: 412px;
    overflow: hidden;
    display: block;
}

.zoominMdSquare img {
    width: 520px;
    height: 412px;
    -webkit-transition: all 2s ease;
    -moz-transition: all 2s ease;
    -ms-transition: all 2s ease;
    transition: all 2s ease;
}

.zoominMdSquare img:hover {
    width: 545px;
    height: 437px;
}


/** SIDEBAR **/

h1.sidebarHeading {
  font-family: 'Roboto Condensed', sans-serif !important;
  font-size: 12pt;
  text-transform: uppercase;
  color: #d02d2f;
}

.sideBarUnderline {
  float: left;
  width: 100%;
  display: block;
  background: #000;
  height: 4px;
}

.specialCategories a {
  float: left;
  width: 100%;
}

button.mobileDrawerCat {
    position: relative;
    left: -10px;
    width: 100%;
}

h1.termTitle {
  text-transform: capitalize !important;
}

.specialCategories a:hover{
  text-decoration: none !important;
}


.specialCategories a span {
  transition: 0.2s all;
}

.specialCategories a:hover span {
    color: #d02d2f;
    cursor: pointer;
}

.specialWidthWrap {
  float: left;
  width: 60px;
}

.specialUnderline {
  float: right;
  width: 196px;
  height: 1px;
  display: block;
  background: #e6e6e6;
  margin: 7px 0 0 0;
}

.specialCat {
  padding: 12px 0 0 0;
}

.specialCat span {
  color: #000;
  text-decoration: none;
  font-size: 12pt;
  font-family: 'Roboto Condensed', sans-serif;
  margin-top: 6px;
  display: block;
  -webkit-text-transform: uppercase;
  text-transform: uppercase;
}

.specialCat span:hover {
  text-decoration: none;
}

.specialCat img {
  width: 50px;
  top: -6px;
  position: relative;
  float: left;
}

.importantLinks {
  float: left;
  width: 100%;
}

.importantLinks a {
  float: left;
  width: 100%;
  color: #000;
  -webkit-text-decoration: none;
  text-decoration: none;
  font-size: 12pt;
  font-family: 'Roboto Condensed', sans-serif;
  margin-top: 6px;
  display: block;
  padding: 5px 0 10px;
  border-bottom: 1px solid #e6e6e6;
  -webkit-transition: 0.2s all;
  transition: 0.2s all;
}

.importantLinks a:hover {
  color: #d02d2f;
  cursor: pointer;
}

.importantCats {
  float: left;
  width: 100%;
}

.importantCats a, .importantCats button {
  float: left;
  width: 100%;
  color: #000;
  -webkit-text-decoration: none;
  text-decoration: none;
  font-size: 13pt;
  text-transform: uppercase;
  font-family: 'Roboto Condensed', sans-serif;
  margin-top: 6px;
  display: block;
  padding: 5px 0 10px;
  border-bottom: 1px solid #e6e6e6;
  -webkit-transition: 0.2s all;
  transition: 0.2s all;
}

.importantCats a:hover {
  color: #d02d2f;
  cursor: pointer;
}

.importantCats a span{
  width: 60px;
  font-size: 15pt;
  left: 10px;
  position: relative;
}

.socialMediaLinks {
    float: left;
    width: 100%;
    padding: 10px 0;
}

.socialCircle {
    background: #a59999;
    width: 30px;
    height: 30px;
    float: left;
    display: block;
    border-radius: 100%;
    text-align: center;
    padding-top: 4px;
    padding-right: 1px;
    margin: 10px 10px 10px 0;
    transition: 0.2s all;
}

.socialCircle:hover {
  background: #d02d2f;
}

.socialIcon {
    color: #fff;
}

/*SEARCH*/
.modal-title {
    margin: 0;
    line-height: 1.42857143;
    font-family: 'Roboto Condensed', sans-serif;
    text-transform: uppercase;
    font-size: 1.8em;
}

input[type="search"] {
  -webkit-appearance: none;
  width: 450px;
  padding: 12px 20px;
  margin: 8px 0;
  box-sizing: border-box;
  border: 1px solid #adadad;
  border-right: none;
}

button.ais-SearchBox__submit {
  height: 46px;
  background: #d02e30;
  width: 40px;
  color: white;
  position: relative;
  top: -1px;
  border-top-right-radius: 9px;
  border-bottom-right-radius: 9px;
  transition: 0.3s all;
}
button.ais-SearchBox__submit:hover {
  background: #961b1c;
}
button.ais-SearchBox__reset {
    width: 37px;
}

.modal-header button.close {
    font-size: 50px;
    position: absolute;
    right: 24px;
    top: 0px;
}
.modal-footer {
  display: none;
}
.modal-content {
    max-height: 660px;
    overflow: scroll !important;
}
.modal-content::-webkit-scrollbar {
    display: none;
}

.newsletterWrap {
  font-size: 1.5em;
}

a.redItalic {
  color: #d02d2f !important;
}

#left-tabs-example h1 {
  font-size: 18pt;
  font-family: 'Crimson', serif;
  ${'' /* text-transform: uppercase; */}
  text-decoration: underline;
  margin: 0px 0 10px 0px;
  padding-bottom: 10px;
  text-align: left;
}
#left-tabs-example .nav-stacked > li {
  float: none;
  left: -1px;
  margin-bottom: 1px;
}
#left-tabs-example .nav-stacked > li + li {
    margin-top: 0px;
}
#left-tabs-example .nav-tabs {
  border-bottom: rgba(0,0,0,0) !important;
  position: relative;
  left: 18px;
  top: 0;
  }
#left-tabs-example .nav > li > a {
  height: auto;
  -webkit-text-align: center;
  text-align: center;
  ${'' /* border-right: 1px solid #c3c3c3; */}
  border-radius: 0 !important;
  border-right: none;
  padding: 10px 10px !important;
}
#left-tabs-example .nav > li > a > img {
    max-width: none;
    width: 65px;
}
#left-tabs-example .nav-tabs > li.active > a {
      color: #555;
      cursor: default;
      background-color: #e4e4e4;
      /* border: 1px solid #ddd; */
      /* border-right: none !important; */
      /* border-left: 1px solid #c3c3c3; */
      /* border-top: 1px solid #c3c3c3; */
      /* border-bottom: 1px solid #c3c3c3; */
      border: none !important;
      z-index: 0;
}
#left-tabs-example .nav-tabs > li > a:hover {
  color: #555;
  cursor: default;
  background-color: #e4e4e4;
  /* border: 1px solid #ddd; */
  /* border-right: none !important; */
  /* border-left: 1px solid #c3c3c3; */
  /* border-top: 1px solid #c3c3c3; */
  /* border-bottom: 1px solid #c3c3c3; */
  border: none !important;
  z-index: 0;
}
#left-tabs-example .nav > li > a:focus, .nav > li > a:active {
  color: #555;
  cursor: default;
  background-color: #e4e4e4;
  /* border: 1px solid #ddd; */
  /* border-right: none !important; */
  /* border-left: 1px solid #c3c3c3; */
  /* border-top: 1px solid #c3c3c3; */
  /* border-bottom: 1px solid #c3c3c3; */
  border: none !important;
  z-index: 0;
}

.redVerticalLine {
    border-left: 3px solid #d02e30;
    min-height: 565px;
}

.specialCatPost {
  float: left;
  border-bottom: 1px solid #e6e6e6;
  margin-bottom: 15px;
  color: #000;
}
#left-tabs-example .specialCatPost:last-child {
  border-bottom: none !important;
  margin-bottom: 0;
}
#left-tabs-example .specialCatPost:last-child p{
  margin-bottom: 0;
}
.specialCatPost:hover {
  cursor: pointer;
}

.specialCatPost h2 {
    font-size: 15pt;
    margin: 0 0 4px 0;
    font-family: 'Roboto Condensed', sans-serif;
}

.specialCatPost:hover h2 {
  color: #d02e30;
}
.specialCatPost:hover p {
  color: #000;
}

.specialCatPost p {
  font-size: 1.1em;
  line-height: 15pt;
}

/*StandAlonePoll*/

.jedenPoll iframe {
  vertical-align: middle;
  width: 100%;
  background: #fff;
  border: 2px solid #000;
  box-shadow: none !important;
  padding: 20px;
}

.wallpaperWrapper {
    position: absolute;
    width: 100%;
    z-index:0;
    height:100%;
    top:320px;
    left: 0;
    text-align: center;

}
.wallpaperContainer {
  margin: 0 auto;
  position: relative;
}
.pastWallpaperVerticalOffset .wallpaperWrapper {
  position: fixed;
  z-index:0;
  top:0;
  left: 0;

}
.pastWallpaperVerticalOffset .wallpaperContainer {

}
h1.ezpoll {
  text-decoration: underline !important;
}
#tp-default-default-preset h3.tp-question {
    padding: 1em;
    background: none;
    border: none;
    text-align: center;
    font-family: 'Roboto Condensed', sans-serif !important;
    font-weight: 700;
    font-size: 15pt;
    text-transform: uppercase;
}

#tp-default-default-preset .tp-choices li label .choice-content {
    border-left: none;
}

#tp-default-default-preset .tp-choices li label > div {
    display: table-cell;
    padding: 0;
}
#tp-default-default-preset .tp-choices li label .input {
    background: none;
    vertical-align: middle;
}

#tp-default-default-preset .tp-choices {
    background: none;
    border: none;
}

.featuredTile {
  position: relative;
  z-index: 1;
  float: left;
  width: 100%;
  transition: 0.2s all;
}
.featuredTile .onHoverSocial {
  z-index: 2;
  position: absolute;
  top: 10px;
  left: 20px;
  display: none;
  transition: 0.2s all;
}
.featuredTile:hover .onHoverSocial {
  transition: 0.2s all;
  display: block;
}

.fullTileImg {
  float: left;
  width: 100%;
  position: relative;
}

.fullWidthPhotoCredit p {
  position: absolute;
  right: 0;
  bottom: 0;
  background: rgb(238, 240, 241);
  padding: 2px 7px;
  margin-bottom: 0;
}

.landscapeInsetPhotoCredit p {
  float: left;
  width: 100%;
  text-align: right;
}

.portraitInsetPhotoCredit p {
  line-height: normal !important;
  font-size: 1em !important;
  margin-bottom: 26px;
  float: left;
  width: 100%;
  text-align: right;
}

.smallerWord {
  font-size: 8pt;
}

@media screen and (max-width: 1200px) {
  .smallerWord {
    font-size: 6pt;
  }

  .fullWidthPhotoCredit p {
    right: 0;
    top: 0;
    bottom: auto;
  }

  .specialCatPost h2 {
      font-size: 15pt;
  }
  #left-tabs-example .nav > li > a > img {
    width: 49px;
  }

  #left-tabs-example .col-sm-4 {
    width: 70px;
  }
  #left-tabs-example .nav-tabs {
    left: 0;
    top: 0;
  }
  .redVerticalLine {
    ${'' /* col-md-8 */}
    width: 209px;
    float: left;
  }
  #left-tabs-example .nav > li > a {
      font-size: 13pt;
      padding: 20px 0px;
      width: 54px;
      position: relative;
      left: -10px;
  }
  #left-tabs-example .nav > li > a {
    width: 67px;
  }
}


@media screen and (max-width: 992px) {
  .sidebarSingle .adunitContainer {
    display: none;
  }
  .smallerWord {
    font-size: 8.5pt;
  }

  h1.termTitle {
    font-size: 3em !important;
  }

  #left-tabs-example .col-sm-4 {
    width: 100%;
    padding: 0;
  }
  #left-tabs-example .nav-tabs {
      left: 0;
      top: 0;
      float: left;
      width: 100%;
  }
  #left-tabs-example .nav-stacked > li {
      float: left;
      left: 0;
      margin-bottom: 0;
      top: 2px;
  }
  #left-tabs-example .nav > li > a {
      left: 0;
      width: 100%;
  }
  #left-tabs-example .nav > li > a > img {
      width: 60px;
  }
  .redVerticalLine {
    border-top: 3px solid #d02e30;
    border-left: none;
    width: 100%;
    padding: 20px 15px 30px 15px;
    float: left;
    min-height: auto;
  }
  #left-tabs-example h1 {
    font-size: 24pt;
  }
}

@media screen and (max-width: 768px) {
  ${'' /* .redVerticalLine
    padding: 20px 35px 30px 35px !important;
  } */}
  h1.termTitle {
    font-size: 2.4em;
  }

  #left-tabs-example .tab-content {
    float: left;
      width: 100%;
      padding: 10px 20px;
  }
  #left-tabs-example .nav-stacked > li {
      width: 19%;
  }
  #left-tabs-example .nav > li > a > img {
    width: 85%;
}
}

/** VIDEO CSS **/
.video{
		max-width:100%;
		background:#fefefe;
		/*padding:2.857em 0;*/
	}
	.video:after{
		content:"";
		display:block;
		clear:both;
	}

.videoWrapper {
	position: relative;
	padding-bottom: 56.25%; /* 16:9 */
	padding-top: 25px;
	height: 0;
	${'' /* margin-left:5%;
	margin-right:5%; */}
	margin-bottom:20px;
}
.videoWrapper iframe {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	border:0;
}

${'' /* .smTopNav ul {
  position: absolute;
  top: 0px;
  right: 100px;
} */}

@media screen and (max-width: 1200px) {

  ${'' /* .nav > li > a {
        padding: 10px 10px;
  } */}

  .frameMdSquare {
    width: 420px;
    height: 334px;
  }
  .zoominMdSquare img {
    width: 420px;
    height: 334px;
  }
  .zoominMdSquare img:hover {
      width: 445px;
      height: 359px;
  }
}

@media screen and (max-width: 992px) {

  .frameMdSquare {
    width: 650px;
    height: 516px;
  }
  .zoominMdSquare img {
    width: 650px;
    height: 516px;
  }
  .zoominMdSquare img:hover {
    width: 675px;
    height: 541px;
  }
}

/** SM **/

.frameSm {
    height: 215px;
    width: 215px;
    overflow: hidden;
    display: block;
}

.zoominSm img {
    height: 215px;
    width: 215px;
    -webkit-transition: all 2s ease;
    -moz-transition: all 2s ease;
    -ms-transition: all 2s ease;
    transition: all 2s ease;
}

.zoominSm img:hover {
    width: 240px;
    height: 240px;
}



  @media screen and (max-width: 1200px) {
    .frame {
      height: 185px;
      width: 185px;
    }
    .zoomin img {
      height: 185px;
      width: 185px;
    }
    .zoomin img:hover {
        width: 210px;
        height: 210px;
    }


    .frameLg {
        height: 510px;
        width: 420px;
    }
    .zoominLg img {
      height: 510px;
      width: 420px;
    }
    .zoominLg img:hover {
        height: 535px;
        width: 445px;
    }
  }

  @media screen and (max-width: 992px) {
    .frame {
      height: 305px;
      width: 305px;
    }
    .zoomin img {
      height: 305px;
      width: 305px;
    }
    .zoomin img:hover {
      height: 330px;
      width: 330px;
    }

    .frameLg {
      margin: 0 auto;
    }
  }

  .smallOnly {display:none;}

  @media screen and (max-width: 768px) {
    .padXLgTop {
      padding-top: 0 !important;
    }

    ${'' /* .drawerHamburgerNotFixed {
      position: relative;
      display: block;
      top: -18px;
      font-size: 20pt;
    } */}

    .smallOnly {
      display: block;
    }

    .hiddenSm {
        display: none;
    }

    ${'' /* .navbar-default .navbar-toggle {
      display: none !important;
    } */}

    .navbar-brand {
      float: none;
      padding: 15px 15px;
      font-size: 18px;
      margin: 0 auto;
      display: block;
      text-align: center;
    }

    .navbar-brand > img {
      position: relative;
      width: 110px;
      margin: 0 auto;
      display: block;
      text-align: center;
      float: none;
      top: 0;
      left: 10px;
    }

    .frame {
      height: 305px;
      width: 305px;
      margin: 0 auto;
    }
    .zoomin img {
      height: 305px;
      width: 305px;
    }
    .zoomin img:hover {
      height: 330px;
      width: 330px;
    }



    .frameLg {
        height: auto;
        width: 100%;
    }
    .zoominLg img {
      height: auto;
      width: 100%;
    }
    .zoominLg img:hover {
      height: auto;
      width: 100%;
    }


    .frameMdSquare {
      width: 100%;
      height: auto;
      margin-top: 45px;
    }

    .zoominMdSquare img {
      width: 100%;
      height: auto;
    }

    .zoominMdSquare img:hover {
      width: 100%;
      height: auto;
    }


    .frameSm {
      width: 100%;
      height: auto;
    }

    .zoominSm img {
      width: 100%;
      height: auto;
    }

    .zoominSm img:hover {
      width: 100%;
      height: auto;
    }

  }

  @media screen and (max-width: 560px) {
    .frameLg {
      height: 352px;
      width: 278px;
    }
    .zoominLg img {
      height: 352px;
      width: 278px;
    }
    .zoominLg img:hover {
        height: 377px;
        width: 302px;
    }
  }

  @media screen and (max-width: 480px) {
    .frame {
      height: 100%;
      width: 100%;
    }
    .zoomin img {
      height: 100%;
      width: 100%;
    }
    .zoomin img:hover {
      height: 100%;
      width: 100%;
    }

    .drawerHamburger {
      font-size: 16pt;
      line-height: 46px;
    }
    ${'' /* .drawerHamburgerNotFixed {
      display: block;
      position: relative;
      top: 43px;
      font-size: 18pt;
    } */}


  }

/*SMALL - XS GRID POINT*/
@media screen and (max-width: 768px) and (min-width: 480px) {
  ${'' /* .smxsGridPoint {
    width: 43%;
    float: left;
  } */}
}



@media print {
  header, #leaderBoardWrapper, .leaderBoardWrapper, #sponsoredPrint, #footer, #socialPrint,
  iframe, video, .adunitContainer, .leaderBoardWrapper, .noPrint, .redItalic, .blackItalic,
  .searchIcon, .smallOnly, .forceCenter, .drawerHamburger, .ShrinkingBox {
    display: none !important;
  }
  .theFeaturedThingPrint {
    width: 100% !important;
  }
  img {
    max-width: 300px !important;
    float: left;
    padding: 0 20px 0 10px;
  }
  .postContent img {
    max-width: 300px !important;
    float:left;
    padding: 0 20px 0 10px;
  }
  a[href]:after {
    ${'' /* content: none !important; */}
  }
  .notTheCurrentThing {
    display:none !important;
  }
}

  /* Clearfix */
  .clearfix:after, #main-wrap .sharedaddy:after {clear:both; content:' '; display:block; font-size:0; line-height:0; visibility:hidden; width:0; height:0; }
  .cf:before, .cf:after {content: " "; /* 1 */ display: table; /* 2 */}
  .cf:after {clear: both;}
  /**
   * For IE 6/7 only
   * Include this rule to trigger hasLayout and contain floats.
   */
  .cf {*zoom: 1;}
`;
