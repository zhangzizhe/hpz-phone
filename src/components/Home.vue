<template>
	<div class="home-content">
		<div class="home-logo">
			<img src="../assets/img/logo.png" alt="汇票栈">
		</div>
		<div class="home">
			<div class="home-content-top">
				<div class="home-ctb">
					<ul class="tab">
						<li @click="tabActive(1)" v-bind:class="istabActive===1?'tab-title tab-active':'tab-title'">{{title1}}</li>
						<li @click="tabActive(2)" v-bind:class="istabActive===2?'tab-title tab-active':'tab-title'">{{title2}}</li>
					</ul>
					<div>
						<form id="from" v-if="istabActive===1">
							<label for="ticket" class="select-p">
								<div class="fx" @click="showSelect()">
									<img class="ticket" src="../assets/img/ticket.png" alt="">
									<input id="ticket" type="text" placeholder="请选择票据类型" :value="ticketType" readonly="readonly">
									<div class="select-model" v-if="showSelectModel">
										<mt-popup v-model="ticketTypeVisible" position="bottom" style="width:100%;">
											<mt-radio style="width:100%;" title="票据类型" align="right" v-model="ticketType" :options="selectOptions"></mt-radio>

										</mt-popup>
									</div>
								</div>
								<img class="selected" src="../assets/img/selected.png" alt="">
							</label>
							<label for="money" class="select-p">
								<div class="fx">
									<img class="ticket" src="../assets/img/money.png" alt="">
									<input id="money" type="number" placeholder="请输入您要买入的票据金额" v-model="money" oninput="if(value.length>5)value=value.slice(0,5)">
								</div>
								<span class="money-d">万元</span>
							</label>
							<label for="time" class="select-p">
								<div class="fx" @click="showTime()">
									<img class="time" src="../assets/img/time.png" alt="">
									<input readonly="readonly" id="time" type="text" placeholder="请选择期望汇票剩余天数" v-model="time">
									<div class="select-model" v-if="showTimeModel">
										<mt-popup v-model="timeVisible" position="bottom" style="width:100%;">
											<mt-radio style="width:100%;" title="汇票剩余天数" align="right" v-model="time" :options="timeOptions"></mt-radio>
										</mt-popup>
									</div>
								</div>
								<img class="selected" src="../assets/img/selected.png" alt="">
							</label>
							<label for="bank" class="select-p">
								<div class="fx" @click="showBank()">
									<img class="ticket" src="../assets/img/bank.png" alt="">
									<input readonly="readonly" id="bank" type="text" placeholder="请选择期望承兑银行" v-model="bankType">
									<div class="select-model" v-if="showBankModel">
										<mt-popup v-model="bankTypeVisible" position="bottom" style="width:100%;">
											<mt-radio style="width:100%;" title="承兑银行" align="right" v-model="bankType" :options="banktOptions"></mt-radio>

										</mt-popup>
									</div>
								</div>
								<img class="selected" src="../assets/img/selected.png" alt="">
							</label>
							<label for="phone" class="select-p">
								<div class="fx">
									<img class="ticket" src="../assets/img/phone.png" alt="">
									<input id="phone" type="number" placeholder="请输入手机号码" v-model="phone" oninput="if(value.length>11)value=value.slice(0,11)">
								</div>
							</label>

							<div class="button" @click="submit">提交</div>

						</form>
						<form action="" v-if="istabActive===2">
							<label for="ticket" class="select-p">
								<div class="fx" @click="showSelect()">
									<img class="ticket" src="../assets/img/ticket.png" alt="">
									<input readonly="readonly" id="ticket" type="text" placeholder="请选择票据类型" :value="ticketType">
									<div class="select-model" v-if="showSelectModel">
										<mt-popup v-model="ticketTypeVisible" position="bottom" style="width:100%;">
											<mt-radio style="width:100%;" title="票据类型" align="right" v-model="ticketType" :options="selectOptions"></mt-radio>

										</mt-popup>
									</div>
								</div>
								<img class="selected" src="../assets/img/selected.png" alt="">
							</label>
							<label for="money" class="select-p">
								<div class="fx">
									<img class="ticket" src="../assets/img/money.png" alt="">
									<input id="money" type="number" placeholder="请输入您要贴现的票面金额" v-model="money" oninput="if(value.length>5)value=value.slice(0,5)">
								</div>
								<span class="money-d">万元</span>
							</label>
							<label for="time" class="select-p">
								<div class="fx" @click="open">
									<img class="time" src="../assets/img/time.png" alt="">
									<input readonly="readonly" id="time" type="text" placeholder="请选择您的到期日期" v-model="time">
								</div>
								<img class="selected" src="../assets/img/selected.png" alt="">
							</label>
							<mt-datetime-picker type="date" ref="picker" v-model="time" year-format="{value} 年" month-format="{value} 月" @confirm="handleConfirm" date-format="{value} 日" :startDate="startDate" :endDate="endDate">
							</mt-datetime-picker>
							<label for="bank" class="select-p">
								<div class="fx" @click="showBank()">
									<img class="ticket" src="../assets/img/bank.png" alt="">
									<input readonly="readonly" id="bank" type="text" placeholder="请输入您的承兑银行" v-model="bankType">
									<div class="select-model" v-if="showBankModel">
										<mt-popup v-model="bankTypeVisible" position="bottom" style="width:100%;">
											<mt-radio style="width:100%;" title="承兑银行" align="right" v-model="bankType" :options="banktOptions"></mt-radio>
										</mt-popup>
									</div>
								</div>
								<img class="selected" src="../assets/img/selected.png" alt="">
							</label>
							<label for="phone" class="select-p">
								<div class="fx">
									<img class="ticket" src="../assets/img/phone.png" alt="">
									<input id="phone" type="number" placeholder="请输入手机号码" v-model="phone" oninput="if(value.length>11)value=value.slice(0,11)">
								</div>
							</label>

							<div class="button" @click="submit">提交</div>

						</form>
					</div>
				</div>
			</div>

			<div class="home-process">
				<img src="../assets/img/process.png" alt="">
			</div>
			<div class="home-safe">
				<img src="../assets/img/safe.png" alt="">
			</div>
			<div class="home-data">
				<img class="data-title" src="../assets/img/data-title.png" alt="">
				<div class="data-num">
					<div class="data-center">
						<img class="data-lr" src="../assets/img/data-left.png" alt="">
						<div class="data-left">
							<span>{{transactionNum}}笔</span>
							<span>累计交易笔数</span>
						</div>
					</div>
					<div class="data-center">
						<img class="data-lr" src="../assets/img/data-right.png" alt="">
						<div class="data-left">
							<span>{{transactionMoney}}亿元</span>
							<span>累计电票成交金额</span>
						</div>
					</div>
				</div>

			</div>
			<div class="home-phone">
				<h2 class="p-text">汇票栈竭诚为您服务</h2>
				<div class="p-button fx">
					<img class="button-phone" src="../assets/img/phone1.png" alt="">
					<!-- window.location.href = 'tel://0755637' -->
					<a href="tel:4006609655">400-6609-655</a>
				</div>

			</div>
		</div>
		<Tel :childmsg="msgdata" :showscu="showsucepop"></Tel>
	</div>
</template>

<script>
import { Toast } from 'mint-ui';
import { DatetimePicker } from 'mint-ui';
import * as global from '../util/js/global'
import Tel from '@/components/tel/Tel';
export default {
	name: 'Home',
	mounted() {
		let that=this
		console.log(global.globalUrl)
		let url=global.globalUrl()+'/json/m/pub/v1/draft/platform/data/total'
		that.axios.get(url).then(res => {
					console.log(res);
					that.transactionNum=res.data.dbAllTradeNum
					that.transactionMoney=res.data.strMoneyYiAll

				})
				.catch(function(res) {
					console.log(res);
				});
	},
	methods: {
		timeTypeNum: function(a) {
			// '一年期', '半年期', '三个月', '其他'
			if (a == '一年期') {
				return (a = 1);
			} else if (a == '半年期') {
				return (a = 2);
			} else if (a == '三个月') {
				return (a = 3);
			} else if (a == '其他') {
				return (a = 4);
			}
		},
		ticketTypeNum: function(a) {
			if (a == '电子银行承兑汇票') {
				return (a = {
					draftAttr: 1,
					draftType: 1,
				});
			} else if (a == '电子商业承兑汇票') {
				return (a = {
					draftAttr: 1,
					draftType: 2,
				});
			} else if (a == '纸质银行承兑汇票') {
				return (a = {
					draftAttr: 2,
					draftType: 1,
				});
			} else if (a == '纸质商业承兑汇票') {
				return (a = {
					draftAttr: 2,
					draftType: 2,
				});
			}
		},
		formatDate: function(date) {
			let y = date.getFullYear();
			let m = date.getMonth() + 1;
			m = m < 10 ? '0' + m : m;
			var d = date.getDate();
			d = d < 10 ? '0' + d : d;
			return y + '-' + m + '-' + d;
		},
		open: function(picker) {
			this.$refs.picker.open();
		},
		handleConfirm: function(value) {
			console.log(value);
			this.time = this.formatDate(value);
		},
		showTime: function() {
			// console.log(this.startDate);
			this.showTimeModel = true;
			this.timeVisible = !this.timeVisible;
			// console.log(this.time);
		},
		showBank: function() {
			this.showBankModel = true;
			this.bankTypeVisible = !this.bankTypeVisible;
			console.log(this.bankType);
		},
		showSelect: function() {
			this.showSelectModel = true;
			this.ticketTypeVisible = !this.ticketTypeVisible;
			console.log(this.ticketType);
		},
		submit: function() {
	
			let that = this;

			let data = {};
			console.log(this.istabActive);
			this.isSubmit = false;

			if (this.istabActive == 1) {
				// date={}
				if (!this.money) {
					Toast({
						message: '请输入您要买入的票据金额',
						duration: 2000,
					});
					return;
				}
				if (!this.time) {
					Toast({
						message: '请选择汇票剩余天数',
						duration: 2000,
					});
					return;
				}

				if (!this.bankType) {
					Toast({
						message: '请选择期望承兑银行',
						duration: 2000,
					});
					return;
				}

				data.surplus_day = this.timeTypeNum(this.time);
			}

			if (this.istabActive == 2) {
				if (this.stateNum % 5 > 1) {
					Toast({
						message: '您的需求提交次数已达上限，请登录汇票栈网站继续进行操作',
						duration: 2000,
					});
					return;
				}
				if (!this.money) {
					Toast({
						message: '请输入您要贴现的票面金额',
						duration: 2000,
					});
					return;
				}

				if (!this.time) {
					Toast({
						message: '请选择您的到期日期',
						duration: 2000,
					});
					return;
				}

				if (!this.bankType) {
					Toast({
						message: '请选择期望承兑银行',
						duration: 2000,
					});
					return;
				}
				data.dueDate = this.time;
			}

			var reg = /^1[0-9]{10}$/;
			if (!this.phone) {
				Toast({
					message: '请输入手机号码',
					duration: 2000,
				});
				this.phoneArr = true;
				return;
			}
			if (!reg.test(this.phone)) {
				Toast({
					message: '请输入正确的手机号码',
					duration: 2000,
				});
				this.phoneArr = true;
				return;
			}
			let t = {};
			t.type = this.ticketTypeNum(this.ticketType);
			data.draftAttr = t.type.draftAttr;
			data.draftType = t.type.draftType;
			// data.money = this.money;
			console.log(parseInt(this.money))
			data.money = parseInt(this.money);
			
			data.acceptorBankName = this.bankType;
			data.mobile = this.phone;
			data.demand_type=1
			let url='';
			if(this.istabActive==1){
				//收票
				url=global.globalUrl()+'/json/m/pub/v1/user/draft/receive/demand'
			}
			if(this.istabActive==2){
				//贴现
				url=global.globalUrl()+'/json/m/pub/v1/user/draft/discount/demand'
			}
			console.log(JSON.stringify(data));
			console.log(data);
			that.axios.post(url, data).then(res => {
					console.log(res);
					if(!res.data.rusult){
						//未注册
						that.msgdata=2
					}else{
						that.showsucepop=true
					}
						// that.mobileStatus=1
			// this.$router.push({ name: 'tel', query: { mobileStatus: that.mobileStatus } });
			// console.log(this.$router.params);
					// 		if(!this.isSubmit){
					// 	Toast({
					// 		message: '请勿重复提交',
					// 		duration: 2000,
					// 	});
					// 	return
					// }
				})
				.catch(function(res) {
					console.log(res);
				});

			console.log(data);
		},
		tabActive: function(a) {
			this.istabActive = a;
			this.ticketType = '电子银行承兑汇票';
			this.money = '';
			this.time = '';
			this.bankType = '';
			this.phone = '';

			console.log(this.istabActive);
		},
		onValuesChange: function(picker, values) {
			console.log(values);
			this.value = values[0];
			console.log(this.value);
		},
	},
	data() {
		return {
			msgdata:null,
			showsucepop:null,
			mobileStatus:null,
			transactionNum: null,
			transactionMoney: null,
			isSubmit: true,
			timedata: null,
			startDate: new Date(new Date().setDate(new Date().getDate() + 1)),
			endDate: new Date(new Date().setDate(new Date().getDate() + 366)),
			timeOptions: ['一年期', '半年期', '三个月', '其他'],
			banktOptions: ['国股银行', '大型城商行', '小型城商行', '其他类型'],
			selectOptions: ['电子银行承兑汇票', '电子商业承兑汇票', '纸质银行承兑汇票', '纸质商业承兑汇票'],
			showTimeModel: false,
			showSelectModel: false,
			showBankModel: false,
			ticketType: '电子银行承兑汇票',
			money: '',
			time: '',
			bankType: '',
			value: '',
			phone: '',
			title1: '我要收票',
			title2: '我要贴现',
			istabActive: 1,
			timeVisible: false,
			ticketTypeVisible: false,
			bankTypeVisible: false,
		};
	},
	components: {
		Tel,
	},
};
</script>
<style>
.transactionMoney {
	font-size: 18px !important;
}
.mint-cell-wrapper {
	font-size: 25px !important;
}
.picker-slot {
	font-size: 25px !important;
}
.mint-datetime-action {
	font-size: 25px !important;
}
</style>
<style scoped>
::-webkit-input-placeholder {
	/* WebKit browsers */
	color: #9999;
	font-size: 24px;
}
.data-center {
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: center;
}
.data-left {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
}
.data-left :nth-child(1) {
	margin-bottom: 25px;
	font-size: 32px;
	font-weight: 800;
	color: #60bcee;
}
.data-left :nth-child(2) {
	font-size: 24px;
	color: #999999;
	font-weight: 600;
}
.data-num {
	display: flex;
	width: 100%;
	justify-content: space-around;
	align-items: center;
}
.select-model {
	width: 100%;
}
.button {
	margin-top: 35px;
	width: 100%;
	height: 88px;
	line-height: 88px;
	font-size: 32px;
	font-weight: 800;
	border-radius: 10px;
	color: #ffffff;
	background: #60bcee;
	text-align: center;
}
.money-d {
	display: block;
	width: 55px;
	height: 36px;
	text-align: center;
}
.time {
	width: 37px;
	height: 42px;
}
.fx {
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
}
input {
	width: 100%;
	height: 50px;
	border: none;
	padding-left: 36px;
	/* padding:10px 0 10px 36px; */
	margin: 0;
	box-sizing: border-box;
	line-height: 50px;
	font-size: 24px;
	/* text-align: center; */
}
.selected {
	width: 33px;
	height: 33px;
}
.ticket {
	/* margin-right:35px; */
	width: 45px;
	height: 36px;
}
ul {
	display: flex;
	width: 100%;
	height: 30px;
	justify-content: flex-end;
}
.tab-title {
	color: #999999;
	font-size: 24px;
	height: 30px;
	margin-left: 86px;
	font-weight: 800;
	line-height: 30px;
}
.tab-active {
	color: #60bcee;
	font-size: 32px;
}
.popup {
	width: 100%;
	/* height: 50px; */
}
@import '../util/css/reset.css';
.select-p {
	font-family: Microsoft YaHei UI;
	/* font-size: 18px; */
	display: flex;
	width: 100%;
	height: 88px;
	justify-content: space-between;
	align-items: center;
	/* background: green; */
	border-bottom: 1px solid #b0def7;
}
.showPicker {
	/* position: absolute;
  top:0;
  left: 0; */
	background: hotpink;
	width: 100%;
	height: 100%;
}
.picker-items {
	text-align: center !important;
}
img {
	display: block;
	width: 100%;
	height: 100%;
}
.home-content {
	font-family: Microsoft YaHei UI;
	width: 100%;
	height: 100%;
	/* height: 3642px; */
	display: flex;
	flex-direction: column;
	justify-content: space-between;
}
.home {
	width: 100%;
	background: #60bcee;
	padding: 0 20px;
	box-sizing: border-box;
}
.home-logo {
	width: 100%;
	height: 300px;
}
.home-logo img {
	width: 100%;
	display: block;
}
.home-content-top {
	width: 100%;
	/* height: 688px; */
	background: #fff;
	border-radius: 10px;
	box-sizing: border-box;
	padding: 10px;
}
.home-ctb {
	width: 100%;
	height: 100%;
	border: 2px solid #b0def7;
	border-radius: 10px;
	box-sizing: border-box;
	padding: 30px 18px 10px 18px;
}
.tab {
	/* margin-top:30px; */
	margin-bottom: 60px;
}
.home-process {
	margin-top: 30px;
	width: 100%;
	height: 1065px;
}
.home-process img,
.home-safe img {
	width: 100%;
	display: block;
}
.home-safe {
	margin-top: 30px;
	width: 100%;
	height: 544px;
}
.data-title {
	width: 520px;
	height: 76px;
	margin-bottom: 77px;
}
.data-lr {
	width: 137px;
	height: 137px;
	margin-bottom: 30px;
}
.home-data {
	display: flex;
	flex-direction: column;
	/* justify-content: space-between; */
	align-items: center;
	margin-top: 30px;
	width: 100%;
	height: 530px;
	position: relative;
	background: #fff;
	border-radius: 10px;
	box-sizing: border-box;
	padding: 40px 0px 103px 0px;
}
.home-phone {
	margin-top: 30px;
	width: 100%;
	height: 250px;
	background: #fff;
	border-radius: 10px 10px 0 0;
	box-sizing: border-box;
	padding: 40px 30px 30px 30px;
}
.home-phone .p-text {
	font-weight: 800;
	font-size: 32px;
	color: #61beef;
}
.home-phone .p-button {
	color: #ffffff;
	margin-top: 60px;
	width: 100%;
	height: 88px;
	background: #61beef;
	text-align: center;
	line-height: 88px;
	border-radius: 10px;
	font-weight: 600;
	font-size: 32px;
}
.button-phone {
	width: 47px;
	height: 47px;
	margin-right: 20px;
}
</style>
