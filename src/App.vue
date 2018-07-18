<template>
  <router-view/>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
body {
  background: radial-gradient(rgba(0, 0, 0, .5), olive);
}
ul, ol{
  list-style: none;
}
a{
  color: #fff;
  text-decoration: none;
}
.inner_c {
  margin: 0 auto;
  width: 1190px;
}
.clearFix:after {
  display: block;
  clear: both;
  content: ".";
  visibility: hidden;
  height: 0;
  font-size: 0;
}
.fl {
  float: left;
}
.fr {
  float: right;
}
</style>
