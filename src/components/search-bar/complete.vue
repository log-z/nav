<template>
    <div class="search-complete card-2" v-if="list.length > 1">
        <ol>
            <li :class="{'active': isActive(index + 1)}"
                v-for="(item, index) in $_.drop(list)" :key="index + 1"
                @mousedown="selecte(index + 1)">
                {{item}}
            </li>
        </ol>
    </div>
</template>

<script>
export default {
    props: {
        list: {
            type: Array,
            default: function() {
                return [];
            }
        },
        event: {
            required: true,
        },
    },
    data: function() {
        return {
            active: 0,
        }
    },
    watch: {
        list: function() {
            this.active = 0;
        }
    },
    methods: {
        selecte: function(index) {
            this.active = index;
            this.$emit('selecte', this.list[this.active]);
        },
        isActive: function(index) {
            return this.active == index;
        },
        next: function() {
            this.active = (this.active += 1) % this.list.length;
            this.$emit('change', this.list[this.active]);
        },
        prev: function() {
            this.active = (this.active -= 1) % this.list.length;
            if (this.active < 0) this.active = this.list.length - 1;
            this.$emit('change', this.list[this.active]);
        },
    },
    created: function() {
        this.event.$on('next', this.next);
        this.event.$on('prev', this.prev);
    },
}
</script>

<style>
/* 自动完成 */
.search-complete {
	margin-top: var(--v-spacing);
	position: absolute;
    top: 100%;
    right: 0;
    left: 0;
    background: var(--bg-color);
	z-index: 1;
}

/* 自动完成列表 */
.search-complete>ol {
	margin: var(--v-spacing) 0;
	padding: 0;
	list-style: none;
	text-align: left;
}

/* 自动完成选项 */
.search-complete>ol>li {
	padding: var(--v-spacing) var(--h-spacing);
	cursor: pointer;
	transition: background 0.1s ease-out;
}
.search-complete>ol>li.active,
.search-complete>ol>li:hover {
	background: var(--hover-bg-color);
}
</style>
