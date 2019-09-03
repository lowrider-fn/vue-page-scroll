# Vue page scroll [Example](https://lowrider-fn.github.io/vue-page-scroll/)

## Initialisation
```html
<template>
  <Vps :options="options"
       @vpsBeforeMove="vpsBeforeMoveHandler($event)"
       @vpsAfterMove="vpsAfterMoveHandler($event)"
       @vpsNavClick="vpsNavClickHandler($event)"
       @vpsReady="vpsReadyHandler()"
       @vpsDestroy="vpsDestroyHandler()"
  >
      //content blocks with index from 0
  </Vps>
</template>
```
```javascript
<script>

import  Vps  from './vps';

export default {
    components: {
        Vps,
    },
    data: () => ({
        options: {
            wrappers  : ['html', 'body', '#app', 'main'],
            header    : 'header',
            footer    : 'footer',
            section   : 'section',
            transform : true,
            easing    : 'ease',
            animation : 700,
            loop      : true,
            global    : true,
            pagination: true,
            keyboard  : true,
            beforeMove: true
        },
    }),
    methods: {
        vpsReadyHandler() {
            console.log('Vps ready');
        },
        vpsDestroyHandler() {
            console.log('Vps destroy');
        },
        vpsBeforeMoveHandler(index) {
            console.log(`Vps before move event : ${index}`);
        },
        vpsAfterMoveHandler(index) {
            console.log(`Vps after move event : ${index}`);
        },
        vpsNavClickHandler(index) {
            console.log(`Vps nav click event : ${index}`);
        },
    },
};

</script>
```
## Props
Name         | Type          | Required | Description
------------|--------------|----------|------------------------------------------------------------------------------------
wrappers | String | Required if global true | All Vps wrappers tag or selector
header | String | Required if global true | Header tag or selector
footer | String | Required if global true | Header tag or selector
section | String | Required if global true | Section tag or selector
easing | String | Required if transform true | Css transform prop
animation | Number | Required if transform true | Css transform prop and time interval between animations
transform | Boolean | | Enable built-in slide turning (You can set custom handler)
loop | Boolean | | Enable infinite page scrolling
global | Boolean | Required if transform || keyboard true | Enable built-in setter global style (You can set custom settings)
pagination | Boolean | | Enable pagination
keyboard | Boolean | | Enable built-in keyboard slide turning (You can set custom settings)
beforeMove | Boolean | | Enable built-in settings header and foter when slide turning (You can set custom settings)


## Events
Name         | Description
------------|----------------------------------------------------------------------------------------------
vpsBeforeMove | Before move slide event for custom handler turning slide if transform false and custom settings style header and footer if beforeMove false
vpsAfterMove | After move slide event
vpsNavClick | Pagination click event 
vpsReady | Vps ready event for custom settings global style if global false
vpsDestroy | Vps destroy event for custom reseting global style if global false
