<template>
    <div class="loading">
        <span></span>
    </div>
</template>


<script>
export default {

}
</script>

<style scoped>
    .loading {
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
    }
  span {
    display: block;
    width: 70px;
    height: 70px;
    border-radius: 50%;
    border: 2px solid transparent;
    border-top-color: black;
    animation: circle-loading 1200ms ease infinite;
  }
    @keyframes circle-loading {
    to {
      transform: rotateZ(360deg);
    }
  }
</style>