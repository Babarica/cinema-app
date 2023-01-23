<template>
    <p class="ganr">
        {{ganr.genre}}
    </p>
</template>


<script>
export default {
    props: {
        ganr: {
            type: Object,
            required: true
        }
    }
}
</script>

<style scoped>
    .ganr {
        font-family: 'Rufina', sans-serif;
        font-style: normal;
        font-weight: 400;
        font-size: 18px;
        cursor: pointer;
        line-height: 22px;
        white-space: nowrap;
        padding-right: 60px;
        position: relative;
        z-index: 333;
    }
</style>