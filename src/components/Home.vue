<template>
<div class="home-content">
  <div class="home-logo">
   <img src="../assets/img/logo.png" alt="汇票栈">
  </div>
  <div class="home">
    <div class="home-content-top">
      <div class="home-ctb">

      </div>
    </div>
  </div>
  </div>
</template>

<script>
export default {
	name: 'Home',
	data() {
		return {
			msg: '专业票据交易服务平台',
		};
	},
};
</script>

<style scoped>
@import '../util/css/reset.css';
.home-content {
	width: 100%;
	/* height: 100%; */
 
}
.home {
  width: 100%;
	background: #60bcee;
	padding: 0 20px;
  box-sizing: border-box;
   height: 3642px;
}
.home-logo {
	width: 100%;
 	height: 300px;
}
.home-logo img {
	width: 100%;
	height: 300px;
  float: left;
}
.home-content-top {
	width: 100%;
	height: 688px;
	background: #fff;
  border-radius: 10px;
  box-sizing: border-box;
  padding: 
}
.home-ctb{
  width: 100%;

}
</style>