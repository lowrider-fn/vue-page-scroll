<template>
    <div class="vps__nav">
        <ul class="vps__nav-inner">
            <li v-for="(item,i) in sections"
                :key="i"
                class="vps__nav-item"
            >
                <button class="vps__nav-btn"
                        :class="`${currentIndex === i ? 'active' : '' }`"
                        type='button'
                        @click="$emit('vpsNavClick',i)"
                >
                </button>
            </li>
        </ul>
    </div>
</template>
<script>
export default {
    name : 'VpsNav',
    props: {
        options: {
            type    : Object,
            required: true,
        },
        sections: {
            type   : [Array, NodeList],
            default: () => [],
        },
        currentIndex: {
            type: [Number, String],
        },
    },
};
</script>
 <style scoped>
.vps__nav {
    position : absolute;
    z-index : 5;
    top : 50%;
    right : 10px;
    margin : 0;
    padding : 0;
    -webkit-transform : translateY(-100%);
    -ms-transform : translateY(-100%);
    transform : translateY(-100%);
}
.vps__nav-inner {
    margin : 0;
    padding : 0;
}
.vps__nav-item {
    padding : 0;
    list-style : none;
    text-align : center;
}
.vps__nav-btn {
    display : -webkit-box;
    display : -ms-flexbox;
    display : flex;
    width : 15px;
    height : 15px;
    margin : 5px;

    align-items : center;
    -webkit-box-align : center;
    -webkit-box-pack : center;
    -ms-flex-align : center;
    -ms-flex-pack : center;
    justify-content : center;
}

.vps__nav-btn:before {
    position : absolute;
    top : auto;
    left : auto;
    display : block;
    width : 4px;
    height : 4px;
    content : '';
    border-radius : 10px;
    background : rgba(0,0,0,0.85);
}
.vps__nav-btn.active:before {
    position : static;
    top : auto;
    left : auto;
    display : block;
    width : 10px;
    height : 10px;
    border : 1px solid black;
    background : none;
}

</style>
