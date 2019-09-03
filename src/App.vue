<template>
    <div id="app">
        <header>
            <h1>
                Header
            </h1>
        </header>
        <main>
            <Vps :options="options"
                 @vpsBeforeMove="vpsBeforeMoveHandler($event)"
                 @vpsAfterMove="vpsAfterMoveHandler($event)"
                 @vpsNavClick="vpsNavClickHandler($event)"
                 @vpsReady="vpsReadyHandler()"
                 @vpsDestroy="vpsDestroyHandler()"
            >
                <section v-for="(section,i) in sections"
                         :key="i"
                         :index="i "
                         :style="`background-color:${section.color}`"
                >
                    <h2>{{ section.title }}</h2>
                    <p>{{ section.text }}</p>
                </section>
            </Vps>
        </main>
        <footer>
            <h1>
                Footer
            </h1>
        </footer>
    </div>
</template>

<script>
import  Vps  from './vps';

export default {
    components: {
        Vps,
    },
    data: () => ({
        options: {
            wrappers   : ['html', 'body', '#app', 'main'],
            header     : 'header',
            footer     : 'footer',
            section    : 'section',
            transform  : true,
            easing     : 'ease',
            animation  : 700,
            beforeMove : true,
            loop       : true,
            global     : true,
            pagination : true,
            keyboard   : true,
        },
        sections: [
            {
                title: 'Section #1',
                color: '#19bb4f',
                text : `Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                    Earum minima dicta officia! Laboriosam repellendus doloribus est asperiores mollitia vel iusto,
                    dolorum aliquam aliquid natus, incidunt voluptate nihil, explicabo quod dicta.`,
            },
            {
                title: 'Section #2',
                color: '#eb3c95',
                text : `Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                    Earum minima dicta officia! Laboriosam repellendus doloribus est asperiores mollitia vel iusto,
                    dolorum aliquam aliquid natus, incidunt voluptate nihil, explicabo quod dicta.`,
            },
            {
                title: 'Section #3',
                color: '#f48333',
                text : `Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                    Earum minima dicta officia! Laboriosam repellendus doloribus est asperiores mollitia vel iusto,
                    dolorum aliquam aliquid natus, incidunt voluptate nihil, explicabo quod dicta.`,
            },
            {
                title: 'Section #4',
                color: '#0bb5ad',
                text : `Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                    Earum minima dicta officia! Laboriosam repellendus doloribus est asperiores mollitia vel iusto,
                    dolorum aliquam aliquid natus, incidunt voluptate nihil, explicabo quod dicta.`,
            },
        ],
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

<style >
section {
    padding : 50px;
}
header {
    height : 90px;
    background : white;
}
footer {
    height : 90px;
    background : white;
}
#app {
    text-align : center;
    color : #2c3e50;
    font-family : 'Avenir', Helvetica, Arial, sans-serif;

    -webkit-font-smoothing : antialiased;
    -moz-osx-font-smoothing : grayscale;
}
button {
    margin : 0;
    padding : 0;
    cursor : pointer;
    text-decoration : none;
    color : inherit;
    border : none;
    -webkit-border-radius : 0;
    -moz-border-radius : 0;
    border-radius : 0;
    outline : none;
    background : none;

    -webkit-appearance : none;
    -moz-appearance : none;
    -ms-appearance : none;
    -o-appearance : none;
    appearance : none;
}
</style>
