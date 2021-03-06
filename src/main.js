import Vue from 'vue';
import './style.scss';
import genres from './util/genres';

new Vue({
    el: '#app',
    data: {
        genre: [],
        time: []
    },
    methods: {
        checkFilter3(category, title, checked){
            console.log("~checkFilter3" + ' ' + category + ' ' + title + ' ' + checked);
            if(checked){
                this[category].push(title);
            }else{
                var index = this[category].indexOf(title);
                if(index > -1){
                        this[category].splice(index, 1);
                }
            }
        }
    },
    components: {
        'movie-list': {
            template: `<div id="movie-list">
                            <div v-for="movie in movies" class="movie">{{movie.title}}</div>
                       </div>`,
            data() {
                return {
                    movies: [
                        {title:"Pulp fiction"},
                        {title:"Home alone"},
                        {title:"Austin Powers"}
                    ]
                };
            }
        },
        'movie-filter': {
            data() {
                return {
                    genres
                }
            },
            template: `<div id="movie-filter">
                            <h2>Filter results</h2>
                            <div class="filter-group">
                                <check-filter v-on:evt-check-filter-1="checkFilter2" v-for="genre in genres" v-bind:title="genre"></check-filter>
                            </div>      
                       </div>`,
            methods: {
                checkFilter2(category, title, checked){
                    console.log("~checkFilter2");
                    this.$emit('evt-check-filter-2', category, title, checked);
                }
            },
            components: {
                'check-filter': {
                    data(){
                        return {
                            checked: false
                        }
                    },
                    props: ['title'],
                    template:  `<div v-bind:class="{'check-filter': true, active: checked}" v-on:click="checkFilter1">
                                    <span class="checkbox"></span>
                                    <span class="check-filter-title">{{title}}</span>
                                </div>`,
                    methods: {
                        checkFilter1(){
                            console.log("~checkFilter1");
                            this.checked = !this.checked;
                            this.$emit('evt-check-filter-1', 'genre', this.title, this.checked);
                        }
                    }
                }
            }
        }
    }
});