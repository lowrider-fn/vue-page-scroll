<template>
    <div class="vps"
         @mousewheel.stop="initScroll($event)"
    >
        <div ref="vps" class="vps__inner">
            <slot></slot>
        </div>

        <VpsNav v-if='options.pagination'
                :options="options"
                :currentIndex="currentIndex"
                :sections="sections"
                @vpsNavClick="moveTo($event)"
        />
    </div>
</template>

<script>
import {
    querySelectorAll, setCssText, querySelector, addClass, addEventListener, removeEventListener, removeClass,
} from './library';

import {
    footerHideStyles, headerShowStyles, headerHideStyles, hideScrollStyles, footerShowStyles,
} from './style-constants';

import VpsNav from './vps-nav';

export default {
    name      : 'Vps',
    components: {
        VpsNav,
    },
    props: {
        options: {
            type    : Object,
            required: true,
        },
    },
    data: () => ({
        lastAnimation: 0,
        position     : 0,
        currentIndex : 0,
        sections     : [],
        footer       : null,
        header       : null,
    }),
    mounted() {
        this.vpsInit();
    },
    destroy() {
        this.setGlobalStyles();
        this.$emit('vpsDestroy');
    },
    methods: {
        vpsInit() {
            if (!process.server) {
                this.setGlobalStyles(true);
                this.swipeEvents();
                this.keydownHandler();
                this.resize();
                this.$emit('vpsReady');
            }
        },
        resize() {
            window.onresize = () => this.setGlobalStyles(true);
        },
        setGlobalStyles(isVps) {
            if (this.options.global) {
                this.header = querySelector(this.options.header);
                this.footer = querySelector(this.options.footer);
                if(this.options.beforeMove){
                    setCssText(this.footer, isVps ? footerHideStyles : '');
                    setCssText(this.header, isVps ? headerShowStyles : '');
                }
                const els = this.options.wrappers.map(selector => querySelector(selector));
                els.forEach(el => setCssText(el, isVps ? hideScrollStyles : ''));
                this.setSectionStyle(isVps);
            }
        },
        setSectionStyle(isVps) {
            this.sections = querySelectorAll(this.options.section);
            this.sections.forEach((section, i) => {
                const headerHeight    = this.header.offsetHeight;
                const footerHeight    = this.footer.offsetHeight;
                const containerHeight = this.$refs.vps.offsetHeight;
                const { style }       = section;
                if (i === 0) {
                    style.height    = isVps ? `${containerHeight - headerHeight}px` : '';
                    style.marginTop = isVps ? `${headerHeight}px` : '';
                }
                if (i === this.sections.length - 1) {
                    style.height       = `${containerHeight - footerHeight}px`;
                    style.marginBottom = `${footerHeight}px`;
                }
                if (isVps) return  addClass(section, 'vps__section');
                removeClass(section, 'vps__section');
            });
        },
        keydownHandler() {
            if (this.options.keyboard && this.options.transform) {
                document.onkeydown = (e) => {
                    const tag        = e.target.tagName.toLowerCase();
                    const isNotField = tag !== 'input' && tag !== 'textarea';
                    const isUp       = e.which === 38 && isNotField;
                    const isDown     = e.which === 40 && isNotField;
                    if (isUp) this.moveUp();
                    if (isDown) this.moveDown();
                };
            }
        },
        initScroll(e) {
            const delta           = e.wheelDelta || -e.detail;
            const deltaOfInterest = delta;
            const timeNow         = new Date().getTime();

            if (timeNow - this.lastAnimation < this.options.animation) return;
            if (deltaOfInterest < 0) this.moveDown(e);
            else this.moveUp(e);

            this.lastAnimation = timeNow;
        },
        moveDown() {
            if (this.currentIndex === this.sections.length - 1) {
                if (this.options.loop) {
                    this.position     = 0;
                    this.currentIndex = 0;
                } else return;
            } else {
                this.currentIndex += 1;
                this.position      = this.currentIndex * 100 * -1;
            }
            this.transformPage();
        },
        moveUp() {
            const  last = this.sections.length - 1;
            if (this.currentIndex  === 0) {
                if (this.options.loop) {
                    this.position     = last * 100 * -1;
                    this.currentIndex = last;
                } else return;
            } else {
                this.currentIndex -= 1;
                this.position      = this.currentIndex * 100 * -1;
            }

            this.transformPage();
        },
        moveTo(index) {
            this.$emit('vpsNavClick', index);
            this.currentIndex = index;
            this.position     = index * 100 * -1;
            this.transformPage();
        },
        transformPage() {
            this.beforeMoveHandler(this.currentIndex);
            if (this.options.transform) {
                const { animation } = this.options;
                const { easing }    = this.options;
                const transformCSS  = `-webkit-transform: translate3d(0, ${this.position}%, 0);
                                -webkit-transition: -webkit-transform ${animation}ms ${easing};
                                -moz-transform: translate3d(0, ${this.position}%, 0);
                                -moz-transition: -moz-transform ${animation}ms ${easing};
                                -ms-transform: translate3d(0, ${this.position}%, 0);
                                -ms-transition: -ms-transform ${animation}ms ${easing};
                                transform: translate3d(0, ${this.position}%, 0);
                                transition: transform ${animation}ms ${easing};`;

                setCssText(this.$refs.vps, transformCSS);
            }
            this.$emit('vpsAfterMove', this.currentIndex);
        },
        beforeMoveHandler(index) {
            this.$emit('vpsBeforeMove', this.currentIndex);
            if(this.options.beforeMove){
                if (index > 0) setCssText(this.header, headerHideStyles);
                else setCssText(this.header, headerShowStyles);
                if (index === this.sections.length - 1) setCssText(this.footer, footerShowStyles);
                else setCssText(this.footer, footerHideStyles);
            }
        },
        swipeEvents() {
            let startX;
            let startY;

            const touchmove = (e) => {
                const { touches } = e;
                if (touches && touches.length) {
                    const deltaX = startX - touches[0].pageX;
                    const deltaY = startY - touches[0].pageY;
                    if (deltaY >= 50) this.moveDown(e);
                    if (deltaY <= -50) this.moveUp(e);

                    if (Math.abs(deltaX) >= 50 || Math.abs(deltaY) >= 50) {
                        removeEventListener('touchmove', touchmove);
                    }
                }
            };
            const touchstart = (e) => {
                const { touches } = e;
                if (touches && touches.length) {
                    startX = touches[0].pageX;
                    startY = touches[0].pageY;
                    addEventListener('touchmove', touchmove);
                }
            };
            addEventListener('touchstart', touchstart);
        },
    },
};

</script>

<style>
.vps {
    position : relative;
    display : block;
    width : 100%;
    height : 100%;
    margin : 0;
    padding : 0;

    -webkit-transform-style : preserve-3d;
    transform-style : preserve-3d;
}
.vps__inner {
    position : relative;
    display : block;
    width : 100%;
    height : 100%;
    padding : 0;

    -webkit-transform-style : preserve-3d;
    transform-style : preserve-3d;
}
.vps__section {
    position : relative;
    -webkit-box-sizing : border-box;
    box-sizing : border-box;
    width : 100%;
    height : 100%;
}
</style>
