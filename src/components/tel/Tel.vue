<template>
  <div>
    <mt-popup v-model="popupVisible" pop-transition="popup-fade" closeOnClickModal class="TelPopup" v-if="childmsg==2">
      <div class="telpop">
        <h3 class="h3">验证您的联系手机</h3>
        <mt-field label="手机号" placeholder="" type="tel" v-model="phone" :attr="{ maxlength: 11 }" :state=msg></mt-field>
        <mt-field label="验证码" v-model="captcha" :attr="{ maxlength: 6 }">
          <mt-button class="validate" @click="countdown" :disabled="smsDis">{{smsBtnText}}</mt-button>
        </mt-field>
        <mt-button type="primary" size="large" class="btn" @click="verify()">立即验证</mt-button>
      </div>
    </mt-popup>
    <div class="sucepop" v-if="showscu">
      <mt-popup v-model="suceVisible" position="top" modal class="ProPop">
        <mt-popup v-model="suceVisible" pop-transition="popup-fade" modal class="cont">
          <div v-if="IsShow==1">
            <h1>您已注册成功，请注意查收短信</h1>
            <p>我们已收到您的需求</p>
            <p>客服人员会尽快与您联系</p>
          </div>
          <div v-if="IsShow==2">
            <h1>您的需求已提交</h1>
            <p>客服人员会尽快与您联系</p>
          </div>
        </mt-popup>
        <mt-button type="primary" size="large" class="ProPopBtn" @click="SuceClose()">再次发布需求</mt-button>
      </mt-popup>
    </div>
  </div>
</template>

<script>
export default {
	name: 'tel',
	props: ['childmsg','showscu'],
	data() {
		return {
			isShowTel: '',
			phone: '',
			captcha: '',
			msg: '',
			popupVisible: true,
			smsDis: false,
			smsBtnText: '获取验证码',
			count: 60, // 间隔函数，1秒执行
			curCount: 0, // 当前剩余秒数
			interValObj: null,
			sucepop: false,
			IsShow: 2,
			suceVisible: true,
		};
	},
	created() {
		//  let status = this.childmsg.mobileStatus;
		// console.log(status)
	},
	mounted() {
		// console.log(132)
		// let status = this.childmsg.mobileStatus;
		// console.log(status)
		// let phone=this.$route.query.phone

		// this.phone=phone
		// if (!status==3) {
		// 	this.isShowTel = 2;
		// }
	},
	beforeUpdate() {},
	updated() {
		//  console.log(132)
		//     let status = this.childmsg.mobileStatus;
		// console.log(this.childmsg)
		// // let phone=this.$route.query.phone
		// // this.phone=phone
		// if (!status==3) {
		// 	this.isShowTel = 2;
		// }
		// console.log();
	},
	// computed: {
	// 	pokerHistory() {
  //     	 let status = this.childmsg.mobileStatus;
	// 		if (status==3) {
	// 		this.isShowTel = 2;
	// 	}
	// 	},
	// },
	// watch: {
	// 	childmsg(newValue, oldValue) {
	// 		console.log(newValue);
	// 	},
	// },
	methods: {
		countdown() {
			let _this = this;
			if (!/^1\d{10}$/.test(this.phone)) {
				this.msg = 'error';
				this.$toast({
					message: '请输入正确的手机号码',
					position: 'top',
				});
				return false;
			}
			if (this.smsDis) {
				return false;
			}
			this.smsDis = true; //按钮禁用
			this.msg = 'success';
			_this.interValObj = window.setInterval(() => {
				if (_this.count === 0) {
					window.clearInterval(_this.interValObj); // 停止计时器
					_this.smsDis = false;
					_this.count = 60;
					_this.smsBtnText = '获取验证码';
					return false;
				}
				_this.smsBtnText = `${_this.count--}秒再获取`;
			}, 1000);
			this.$toast({
				message: '验证码发送成功',
				position: 'top',
			});
			// 发送请求
			//        _this.$ajax({
			//          method: 'post',
			//          url: '',
			//          data: {Phone: mobile}
			//        })
			//          .then((response) => {
			//            if (response.data.Code === 2000) {
			//              this.$message({
			//                message: '短信发送成功！',
			//                type: 'success'
			//              })
			//            }
			//          })
			//          .catch((reject) => {
			//            console.log(reject)
			//          })
		},

		verify() {
			if (!/^1\d{10}$/.test(this.phone)) {
				this.msg = 'error';
				this.$toast({
					message: '请输入正确的手机号码',
					position: 'top',
				});
				return false;
			}
			if (!this.captcha) {
				this.$toast({
					message: '验证码错误',
					position: 'top',
				});
				return false;
			}

			this.suceVisible = true;
			this.IsShow = 1;
			this.sucepop = true;
		},
		SuceClose() {
			this.suceVisible = false;
			this.$router.push({ name: 'Home' });
		},
	},
	components: {},
};
</script>

<style>
.mint-toast {
	z-index: 2999 !important;
	background: black !important;
}
.TelPopup {
	width: 560px;
	height: 485px;
	background: #ffffff;
	border-radius: 8px;
}
.telpop {
	padding: 0 30px;
}
.telpop .h3 {
	height: 132px;
	line-height: 132px;
	font-size: 34px;
	color: #61beef;
}
.telpop .mint-field {
	height: 88px;
	border-bottom: 1px solid #b0def7;
}
.telpop .mint-field .mint-cell-wrapper {
	font-size: 28px !important;
	color: #999999;
}
.telpop .btn {
	margin-top: 60px;
	height: 88px;
	font-size: 32px;
	border-radius: 8px;
	background: #61beef;
}
.telpop .validate {
	background: none;
	color: #ee9446;
	border: none;
	box-shadow: none;
	font-size: 28px !important;
}
/*成功弹窗*/
.ProPop {
	width: 100%;
	height: 100%;
	background: url('../../assets/img/popup.png') no-repeat;
	background-size: cover;
}
.ProPop .cont {
	width: 100%;
}
.ProPop .cont h1 {
	font-size: 32px;
	color: #61beef;
	height: 70px;
	line-height: 70px;
	font-weight: bolder;
}
.ProPop .cont p {
	font-size: 28px;
	color: #999999;
	height: 42px;
	line-height: 42px;
}
.ProPop .ProPopBtn {
	height: 88px;
	font-size: 32px;
	border-radius: 8px;
	position: absolute;
	bottom: 30px;
	left: 50%;
	width: 580px;
	margin-left: -290px;
	background: #61beef;
}
</style>

