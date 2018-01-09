<template>
	<div>
		<mt-popup v-model="popupVisible" pop-transition="popup-fade" closeOnClickModal class="TelPopup" v-if="isShowTel==1">
			<div class="telpop">
				<h3 class="h3">验证您的联系手机</h3>
				<mt-field readonly="readonly" label="手机号" placeholder="" type="tel" v-model="phone" :attr="{ maxlength: 11 }" :state=msg></mt-field>
				<mt-field label="验证码" v-model="sms_code" :attr="{ maxlength: 6 }">
					<mt-button class="validate" @click="countdown" :disabled="smsDis">{{smsBtnText}}</mt-button>
				</mt-field>
				<mt-button type="primary" size="large" class="btn" @click="verify()">立即验证</mt-button>
			</div>
		</mt-popup>
		<div class="sucepop" v-if="isShowTel==2">
			<mt-popup v-model="suceVisible" position="top" modal class="ProPop">
				<div class="cont">
					<div v-if="IsShow==1">
						<h1>您已注册成功，请注意查收短信</h1>
						<p>我们已收到您的需求</p>
						<p>客服人员会尽快与您联系</p>
					</div>
					<div v-if="IsShow==2">
						<h1>您的需求已提交</h1>
						<p>客服人员会尽快与您联系</p>
					</div>
				</div>
				<mt-button type="primary" size="large" class="ProPopBtn" @click="SuceClose()">再次发布需求</mt-button>
			</mt-popup>
		</div>
	</div>
</template>

<script>
import * as global from '../../util/js/global';
export default {
	name: 'tel',
	props: ['childMsg'],
	data() {
		return {
			isShowTel: this.childMsg.showph,
			phone: this.childMsg.phoneNum,
			parentFormData: this.childMsg.formDate,
			sms_code: '',
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
			instance1: null,
		};
	},
	mounted() {
		this.countdown();
	},
	beforeUpdate() {},
	methods: {
		istabActive(a) {
			// 1收票2贴现
			console.log(a);
			let verifyUrl = '';
			if (a == 1) {
				verifyUrl = global.globalUrl() + '/json/m/pub/v1/user/draft/receive/reg-demand';
			}
			if (a == 2) {
				verifyUrl = global.globalUrl() + '/json/m/pub/v1/user/draft/discount/reg-demand';
			}
			return verifyUrl;
		},
		countdown() {
			let _this = this;
			if (this.instance1) {
				this.instance1.close();
			}

			console.log(this.phone);
			if (this.isShowTel == 2) {
				return false;
			}
			if (!/^1\d{10}$/.test(this.phone)) {
				this.msg = 'error';
				this.instance1 = this.$toast({
					message: '请输入正确的手机号码',
					position: 'top',
					className: 'toast',
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

			let url = global.globalUrl() + '/json/pub/v1/user/sms/code/discount';
			_this.axios
				.post(url, { mobile: _this.phone })
				.then(res => {
					console.log(res);
					if (res.data.success)
						_this.instance1 = _this.$toast({
							message: '验证码发送成功',
							position: 'top',
							className: 'toast',
						});
				})
				.catch(function(error) {
					if (error.response) {
						console.log(error.response.data);
						_this.instance1 = _this.$toast({
							message: error.response.data.rsMsg,
							position: 'top',
							className: 'toast',
						});
						console.log(error.response.status);
						console.log(error.response.headers);
					} else if (error.request) {
						console.log(error.request);
					} else {
						console.log('Error', error.message);
					}
					console.log(error.config);
				});
		},

		verify() {
			console.log(this.childMsg.istabActive);
			let that = this;
			let verifyUrl = this.istabActive(that.childMsg.istabActive);
			// console.log(this.parentFormData.time + '子组件拿到formData');
			console.log(verifyUrl);
			if (!/^1\d{10}$/.test(this.phone)) {
				this.msg = 'error';
				this.instance1 = this.$toast({
					message: '请输入正确的手机号码',
					position: 'top',
					className: 'toast',
				});
				return false;
			}
			if (!this.sms_code) {
				this.instance1 = this.$toast({
					message: '验证码错误',
					position: 'top',
					className: 'toast',
				});
				return false;
			}

			that.parentFormData.sms_code = that.sms_code;
			console.log(that.parentFormData);
			that.axios
				.post(verifyUrl, that.parentFormData)
				.then(res => {
					console.log(res);
					if (res.data.result) {
						that.IsShow = 1;
						that.isShowTel = 2;
					}
					console.log(res.success);
					console.log(res.rsMsg);
				})
				.catch(error => {
					if (error.response) {
						console.log(error.response.data);
						that.instance1 = that.$toast({
							message: error.response.data.rsMsg,
							position: 'top',
							className: 'toast',
						});
						console.log(error.response.status);
						console.log(error.response.headers);
					} else if (error.request) {
						console.log(error.request);
					} else {
						console.log('Error', error.message);
					}
				});
		},
		SuceClose() {
			console.log(this.childMsg.showph);
			this.isShowTel = 3;
			this.$emit('newNodeEvent', false);
		},
	},
	components: {},
};
</script>

<style>
.toast {
	display: flex !important;
	justify-content: center !important;
	align-items: center !important;
	width: 80% !important;
	height: 200px !important;
	box-sizing: border-box;
	font-weight: 600;
}
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
	position: absolute;
	left: 0;
	top: 50%;
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

