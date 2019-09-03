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

