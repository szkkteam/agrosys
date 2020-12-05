import {
    pagePadding
} from './constants'

export default {
    MuiCssBaseline: {
        '@global': {
          html: {
            height: '100vh',
            width: '100vw',
          },
          body: {
            height: '100vh',
            width: '100vw',
          },
          '#app': {
            height: '100%',
            width: '100%',
            padding: `${pagePadding}px`,
          },
        },
      },
    
}
/*
html,
body {
  margin: 0;
  padding: 0;
  height: 100vh;
  width: 100vw;
}

* {
  box-sizing: border-box;
}

#app {
  height: 100%;
  width: 100%;

  padding: $page-padding;

  >div:first-child, main {
    height: 100%;
    width: 100%;
  }
}

.app-container {
    display: flex;
}

.main-content {
    width: 100%;
    //flex-grow: 1;
    //min-height: 100%;
    >div:nth-child(2) {
      display: flex;
      height: calc(100% - #{$content-top-spacing-height} + #{$page-padding});
    }
        
}
.content-spacer {
  height: calc(#{$content-top-spacing-height} - #{$page-padding});
  display: flex;
  align-items: center;
}




.pos-rel {
  position: relative;
}

.MuiPaper-outlined {
  border: none;
}

.h-100 {
  height: 100%;
}
*/