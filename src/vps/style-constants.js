const footerStyles = `position : fixed;
                      z-index : 99;
                      width : 100%;
                      left : 0;
                      right : 0;
                      bottom : 0;`;

const footerHideStyles = `-webkit-transition : .5s;
                          -o-transition : .5s;
                          transition : .5s;
                          -webkit-transform : translateY(100%);
                          -ms-transform : translateY(100%);
                          transform : translateY(100%);
                          ${footerStyles}`;

const footerShowStyles = `-webkit-transition : .3s;
                          -o-transition : .3s;
                          transition : .3s;
                          -webkit-transform : translateY(0);
                          -ms-transform : translateY(0);
                          transform : translateY(0);
                          ${footerStyles}`;

const headerStyles = `position : fixed;
                      z-index : 99;
                      width : 100%;
                      left : 0;
                      right : 0;
                      top :  0;`;

const headerHideStyles = `-webkit-transition : .3s;
                          -o-transition : .3s;
                          transition : .3s;
                          -webkit-transform : translateY(-100%);
                          -ms-transform : translateY(-100%);
                          transform : translateY(-100%);
                          ${headerStyles}`;

const headerShowStyles = `-webkit-transition : .8s;
                         -o-transition : .8s;
                         transition : .8s;
                         -webkit-transform : translateY(0);
                         -ms-transform : translateY(0);
                         transform : translateY(0);
                         ${headerStyles}`;

const hideScrollStyles = `overflow : hidden;
                          height : 100%;
                          transition : opacity 400ms;`;
export {
    footerStyles,
    footerHideStyles,
    footerShowStyles,
    headerStyles,
    headerHideStyles,
    headerShowStyles,
    hideScrollStyles,
};
