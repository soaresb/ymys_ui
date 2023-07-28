<template>
    <li class="nav-item dropdown" style="list-style:none; list-style-type: none" v-on:updateOption="methodToRunOnSelect">
        
        <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            {{ this.name }}
        </a>
    
        <ul class="dropdown-menu">
            <li v-for="option in this.options" v-bind:key="option._id">
                <li v-if="option.children && option.children.length" class="dropdown-submenu">
                    <a class="dropdown-item" :href="option.href"> {{option.name}} <span
                        class="float-end custom-toggle-arrow">&#187</span></a>
                    <ul class="dropdown-menu">
                        <li v-for="child in option.children" v-bind:key="child._id" :value="child.value">
                            <a class="dropdown-item" :href="child.href" @click="updateOption(child)"> {{child.name}}</a>
                        </li>
                    </ul>
                </li>
                <li v-else :value="option.value">
                    <a class="dropdown-item" :href="option.href" @click="updateOption(option)"> {{option.name}}</a>
                </li>
            </li>
        </ul>
    </li>

</template>

<script>

import _ from 'lodash';

export default {
    name: 'Dropdown',
    props: {
        options: [],
        name: "",
        value: "",
        href: "",
        placeholder: "",
        padding: 0
    },
    data() {
        return {

        }
    },
    mounted() {

    },
    methods: {
        updateOption(option) {
            this.selectedOption = option;
            this.showMenu = false;
            this.$emit('updateOption', this.selectedOption);
        },
    }
    
        
}

</script>

<style>

.dropdown:hover >.dropdown-menu{
  display: block !important;
}

.dropdown-submenu:hover > .dropdown-menu{
  display: block !important;
    left: 100%;
    margin-top: -37px;
}

.dropdown-item{
  font-size: small; /* 13px */
}
.dropdown-toggle::after{
  font-size: var(--font-md);
  margin-bottom: -2px;
}
.dropdown-menu li a.active{
  color:#fff;
}

.custom-toggle-arrow{
    font-size: 18px;
    margin-top: 1px;
    line-height: 12px;
}
    
</style>