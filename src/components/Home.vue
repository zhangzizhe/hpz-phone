<template>
	<div class="home-content">
		<div class="home-logo">
			<img src="../assets/img/logo.png" alt="汇票栈">
		</div>
		<div class="home">
			<div class="home-content-top">
				<div class="home-ctb">
					<ul class="tab">
						<li @click="tabActive(2)" v-bind:class="istabActive===2?'tab-title tab-active':'tab-title'">{{title2}}</li>
						<li @click="tabActive(1)" v-bind:class="istabActive===1?'tab-title tab-active tab-title-right':'tab-title tab-title-right'">{{title1}}</li>

					</ul>
					<div>
						<form id="from" v-if="istabActive===1">
							<label for="ticket" class="select-p">
								<div class="fx" @click="showSelect()">
									<img class="ticket" src="../assets/img/ticket.png" alt="">
									<input id="ticket" type="text" placeholder="请选择票据类型" :value="ticketType" readonly="readonly">
									<div class="select-model" v-if="showSelectModel">
									</div>
								</div>
								<img class="selected" src="../assets/img/selected.png" alt="">
							</label>
							<label for="money" class="select-p">
								<div class="fx">
									<img class="ticket" src="../assets/img/money.png" alt="">
									<input id="money" pattern="[0-9]*" type="tel" placeholder="请输入您要买入的票据金额" v-model="money" @keyup="phoneType(3)">

									<!-- <input id="money" type="number" placeholder="请输入您要买入的票据金额" v-model="money" oninput="if(value.length>5)value=value.slice(0,5)"> -->
								</div>
								<span class="money-d">万元</span>
							</label>
							<label for="time" class="select-p">
								<div class="fx" @click="showTime()">
									<img class="time" src="../assets/img/time.png" alt="">
									<input readonly="readonly" id="time" type="text" placeholder="请选择期望汇票剩余天数" v-model="time">

								</div>
								<img class="selected" src="../assets/img/selected.png" alt="">
							</label>
							<label for="bank" class="select-p">
								<div class="fx" @click="showBank()">
									<img class="ticket" src="../assets/img/bank.png" alt="">
									<input readonly="readonly" id="bank" type="text" placeholder="请选择期望承兑银行" v-model="bankType">

								</div>
								<img class="selected" src="../assets/img/selected.png" alt="">
							</label>
							<label for="phone" class="select-p">
								<div class="fx">
									<img class="ticket" src="../assets/img/phone.png" alt="">
									<!-- <input id="phone" type="number" placeholder="请输入手机号码" v-model="phone" oninput="if(value.length>11)value=value.slice(0,11)"> -->
									<input id="phone" type="tel" pattern="[0-9]*" placeholder="请输入手机号码" v-model="phone" @keyup="phoneType">

								</div>
							</label>

							<div class="button" @click="submit">提交</div>

						</form>
						<form action="" v-if="istabActive===2">
							<label for="ticket" class="select-p">
								<div class="fx" @click="showSelect()">
									<img class="ticket" src="../assets/img/ticket.png" alt="">
									<input readonly="readonly" id="ticket" type="text" placeholder="请选择票据类型" :value="ticketType">

								</div>
								<img class="selected" src="../assets/img/selected.png" alt="">
							</label>
							<label for="money" class="select-p">
								<div class="fx">
									<img class="ticket" src="../assets/img/money.png" alt="">
									<input id="money" pattern="[0-9]*" type="tel" placeholder="请输入您要贴现的票面金额" v-model="money" @keyup="phoneType(3)">
								</div>
								<span class="money-d">万元</span>
							</label>
							<label for="time" class="select-p">
								<div class="fx" @click="open">
									<img class="time" src="../assets/img/time.png" alt="">
									<input readonly="readonly" id="time" type="text" placeholder="请选择您的到期日期" :value="time">
								</div>
								<img class="selected" src="../assets/img/selected.png" alt="">
							</label>

							<label for="bank" class="select-p">
								<div class="fx" @click="showBank()">
									<img class="ticket" src="../assets/img/bank.png" alt="">
									<input readonly="readonly" id="bank" type="text" placeholder="请选择您的承兑银行" :value="bankType">

								</div>
								<img class="selected" src="../assets/img/selected.png" alt="">
							</label>
							<label for="phone" class="select-p">
								<div class="fx">
									<img class="ticket" src="../assets/img/phone.png" alt="">
									<!-- <input id="phone" type="tel" placeholder="请输入手机号码" v-model="phone" oninput="if(value.length>11)value=value.slice(0,11)"> -->
									<input id="phone" type="tel" pattern="[0-9]*" placeholder="请输入手机号码" v-model="phone" @keyup="phoneType">

								</div>
							</label>

							<div class="button" @click="submit">提交</div>

						</form>
					</div>
				</div>
				<div class="select-model" v-if="showSelectModel">
					<mt-popup v-model="ticketTypeVisible" position="bottom" style="width:100%;">
						<div class="popup-control">
							<span @click="cancel('ticket')">取消</span>
							<span @click="determine('ticket')">确定</span>
						</div>
						<mt-radio style="width:100%;" align="right" v-model="ticketTypeRadio" :options="selectOptions"></mt-radio>
					</mt-popup>
				</div>

				<div class="select-model" v-if="showTimeModel">
					<mt-popup v-model="timeVisible" position="bottom" style="width:100%;">
						<div class="popup-control">
							<span @click="cancel('time')">取消</span>
							<span @click="determine('time')">确定</span>
						</div>
						<mt-radio style="width:100%;" align="right" v-model="timeRadio" :options="timeOptions"></mt-radio>
					</mt-popup>
				</div>

				<div class="select-model" v-if="showBankModel">
					<mt-popup v-model="bankTypeVisible" position="bottom" style="width:100%;">
						<div class="popup-control">
							<span @click="cancel('bank')">取消</span>
							<span @click="determine('bank')">确定</span>
						</div>
						<mt-radio style="width:100%;" align="right" v-model="bankTypeRadio" :options="banktOptions"></mt-radio>

					</mt-popup>
				</div>
				<mt-datetime-picker type="date" ref="picker" year-format="{value} 年" month-format="{value} 月" @confirm="handleConfirm" date-format="{value} 日" :startDate="startDate" :endDate="endDate">
				</mt-datetime-picker>

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
							<span>{{transactionMoney}}亿
								<!-- <span class="money-wy">{{transactionMoneyWan}}万{{transactionMoneyYuan}}元</span> -->
							</span>
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
		<Tel :child-msg="msgdata" v-if="showChild" @newNodeEvent="parentLisen"></Tel>
	</div>
</template>

<script>
import { Toast } from 'mint-ui';
import { DatetimePicker } from 'mint-ui';
import * as global from '../util/js/global';
import Tel from '@/components/tel/Tel';
export default {
	name: 'Home',
	mounted() {
		let that = this;
		// console.log(global.globalUrl)
		let url = global.globalUrl() + '/json/m/pub/v1/draft/platform/data/total';
		that.axios
			.get(url)
			.then(res => {
				console.log(res);
				that.transactionNum = res.data.dbAllTradeNum;
				that.transactionMoney = res.data.strMoneyYiAll;
				that.transactionMoneyWan = res.data.strMoneyWanAll;
				that.transactionMoneyYuan = res.data.strMoneyYuanAll;
			})
			.catch(error => {
				if (error.response) {
					console.log(error.response.data);
					that.$toast({
						message: error.response.data.rsMsg,
						position: 'top',
					});
					console.log(error.response.status);
					console.log(error.response.headers);
				}
			});
	},
	methods: {
		phoneType(a) {
			let v = this.phone;
			if (v) {
				this.phone = v.replace(/\D/g, '');
				if (v.length > 11) {
					this.phone = v.slice(0, 11);
				}
			}
			if (a && a === 3) {
				let v = this.money;
				if (v) {
					this.money = v.replace(/\D/g, '');
					if (v.length > 5) {
						this.money = v.slice(0, 5);
					}
				}
			}
		},
		determine(type) {
			if (this.instance) {
				this.instance.close();
			}
			console.log(type);

			if (type === 'ticket') {
				this.ticketType = this.ticketTypeRadio;
				// if (!this.bankType1) {
				// 	this.instance = Toast({
				// 		message: '请选择票据类型',
				// 		duration: 1000,
				// 		className: 'toast',
				// 	});
				// 	return;
				// }
				this.ticketTypeVisible = false;
				return;
			}
			if (type === 'time') {
				this.time = this.timeRadio;
				if (!this.time) {
					this.instance = Toast({
						message: '请选择汇票剩余天数',
						duration: 1000,
						className: 'toast',
					});
					return;
				}
				this.timeVisible = false;
				return;
			}
			if (type === 'bank') {
				this.bankType = this.bankTypeRadio;
				if (!this.bankType) {
					this.instance = Toast({
						message: '请选择承兑银行',
						duration: 1000,
						className: 'toast',
					});
					return;
				}
				this.bankTypeVisible = false;
				return;
			}
		},
		cancel(type) {
			if (type === 'ticket') {
				this.ticketTypeVisible = false;
			}
			if (type === 'time') {
				this.timeVisible = false;
			}
			if (type === 'bank') {
				this.bankTypeVisible = false;
			}
		},
		parentLisen(e) {
			console.log('子组件传值' + e);
			this.showChild = e;
		},
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
			let that = this;
			this.$refs.picker.open();
		},
		handleConfirm: function(value) {
			console.log(value);
			this.time = this.formatDate(value);
		},
		showTime: function() {
			this.showTimeModel = true;
			this.timeVisible = !this.timeVisible;
			if (!this.timeVisible) {
				this.showTimeModel = false;
			}
			console.log(this.time);
		},
		showBank: function() {
			this.showBankModel = true;
			this.bankTypeVisible = !this.bankTypeVisible;
			if (!this.bankTypeVisible) {
				this.showBankModel = false;
			}
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
			if (this.instance) {
				this.instance.close();
			}

			if (!this.isSubmit) {
				this.instance = Toast({
					message: '请勿重复提交',
					duration: 2000,
					className: 'toast',
				});
				return;
			}

			if (this.istabActive == 1) {
				if (!this.money) {
					this.instance = Toast({
						message: '请输入您要买入的票据金额',
						duration: 2000,
						className: 'toast',
					});
					return;
				}
				if (!/^[0-9]*$/.test(this.money) || this.money.length > 5) {
					this.instance = Toast({
						message: '请输入正确的票据金额',
						duration: 2000,
						className: 'toast',
					});
					return;
				}
				if (!this.time) {
					this.instance = Toast({
						message: '请选择汇票剩余天数',
						duration: 2000,
						className: 'toast',
					});
					return;
				}

				if (!this.bankType) {
					this.instance = Toast({
						message: '请选择期望承兑银行',
						duration: 2000,
						className: 'toast',
					});
					return;
				}

				data.surplus_day = this.timeTypeNum(this.time);
			}

			if (this.istabActive == 2) {
				if (!this.money) {
					this.instance = Toast({
						message: '请输入您要贴现的票面金额',
						duration: 2000,
						className: 'toast',
					});
					return;
				}

				if (!/^[0-9]*$/.test(this.money) || this.money.length > 5) {
					this.instance = Toast({
						message: '请输入正确的票面金额',
						duration: 2000,
						className: 'toast',
					});
					return;
				}

				if (!this.time) {
					this.instance = Toast({
						message: '请选择您的到期日期',
						duration: 2000,
						className: 'toast',
					});
					return;
				}

				if (!this.bankType) {
					this.instance = Toast({
						message: '请选择承兑银行',
						duration: 2000,
						className: 'toast',
					});
					return;
				}
				data.dueDate = this.time;
			}

			var reg = /^1[0-9]{10}$/;
			// var reg = /^[1][3,4,5,7,8][0-9]{9}$/;
			if (!this.phone) {
				this.instance = Toast({
					message: '请输入手机号码',
					duration: 2000,
					className: 'toast',
				});
				return;
			}
			if (!reg.test(this.phone)) {
				this.instance = Toast({
					message: '请输入正确的手机号码',
					duration: 2000,
					className: 'toast',
				});
				return;
			}
			this.isSubmit = false; //按钮禁用
			let t = {};
			t.type = this.ticketTypeNum(this.ticketType);
			data.draftAttr = t.type.draftAttr;
			data.draftType = t.type.draftType;
			data.money = this.money;
			data.acceptorBankName = this.bankType;
			data.mobile = this.phone;
			data.demand_type = 1;
			that.msgdata.formDate = data;
			let url = '';
			if (this.istabActive == 1) {
				//收票
				url = global.globalUrl() + '/json/m/pub/v1/user/draft/receive/demand';
			}
			if (this.istabActive == 2) {
				//贴现
				url = global.globalUrl() + '/json/m/pub/v1/user/draft/discount/demand';
			}
			console.log(data);
			that.axios
				.post(url, data)
				.then(res => {
					console.log(res);
					if (res.data.msg == '今日已提交过5条记录') {
						that.instance = Toast({
							message: '今日已提交过5条记录',
							duration: 2000,
							className: 'toast',
						});
						that.tabActive(1);
						return false;
					}
					if (res.data.result) {
						//已注册
						that.msgdata.showph = 2;
						console.log(that.msgdata);
						console.log(that.msgdata.showph + '已注册-showph');
						that.msgdata.istabActive = that.istabActive;
						that.showChild = true;

						// return false
					}

					if (!res.data.result) {
						//未注册
						that.showChild = true;
						that.msgdata.showph = 1;
						that.msgdata.istabActive = that.istabActive;
						that.msgdata.phoneNum = that.phone;
						that.msgdata.formDate = data;
						console.log(that.msgdata);
						console.log(that.msgdata.showph + '未注册-showph');
						console.log(that.msgdata);
					}
					that.tabActive(that.istabActive);
				})
				.catch(function(error) {
					console.log(error.response);
					that.isSubmit = true;
					that.instance = Toast({
						message: error.response.data.rsMsg,
						duration: 2000,
						className: 'toast',
					});
					return;
				});

			console.log(data);
		},
		tabActive: function(a) {
			let that = this;
			that.istabActive = a;
			that.ticketType = '电子银行承兑汇票';
			that.money = '';
			that.time = '';
			that.bankType = '';
			that.phone = '';
			that.isSubmit = true;

			console.log(that.istabActive);
		},
		onValuesChange: function(picker, values) {
			console.log(values);
			this.value = values[0];
			console.log(this.value);
		},
	},
	data() {
		return {
			timeRadio: null,
			ticketTypeRadio: '电子银行承兑汇票',
			bankTypeRadio: null,
			showChild: false,
			msgdata: {},
			transactionNum: null,
			transactionMoney: null,
			transactionMoneyYuan: null,
			transactionMoneyWan: null,
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
			istabActive: 2,
			timeVisible: false,
			ticketTypeVisible: false,
			bankTypeVisible: false,
			instance: null,
		};
	},
	components: {
		Tel,
	},
};
</script>
<style>
.mint-datetime .picker-toolbar {
	display: flex !important;
	justify-content: center !important;
	align-items: center !important;
	height: 70px !important;
}
.mint-toast {
	background: rgba(0, 0, 0, 0.5) !important;
}
.mint-toast-text {
	font-size: 30px !important;
}
.toast {
	display: flex !important;
	justify-content: center !important;
	align-items: center !important;
	width: 80% !important;
	height: 200px !important;
	box-sizing: border-box;
	font-weight: 600;
}
.transactionMoney {
	font-size: 18px !important;
}
.mint-cell-wrapper {
	font-size: 30px !important;
}
.mint-radiolist-title {
	font-size: 25px !important;
}
.picker-slot {
	font-size: 25px !important;
	font-weight: 700;
}
.mint-datetime-action {
	font-size: 35px !important;
}
</style>
<style scoped>
@import '../util/css/reset.css';
.popup-control {
	width: 100%;
	height: 55px;
	display: flex;
	justify-content: space-around;
	border-bottom: solid 2px #eaeaea;
	align-items: center;
	/* background: red; */
	color: #26a2ff;
}
.popup-control span {
	display: block;
	font-size: 30px;
}
.tab-title-right {
	margin-left: 40px;
}
.fx img {
	width: 45px;
	height: 36px;
}
::-webkit-input-placeholder {
	/* WebKit browsers */
	color: #9999;
	font-size: 24px;
	font-weight: 500;
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
.data-left .money-wy {
	font-size: 24px;
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
	font-size: 24px;
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
	/* padding-left: 36px; */
	margin: 0;
	box-sizing: border-box;
	line-height: 50px;
	font-size: 24px;
	font-weight: 800;
	margin: 0 30px 0 30px !important;
	/* outline: none; */
}
.selected {
	width: 33px;
	height: 33px;
}
.ticket {
	width: 45px;
	height: 36px;
}
ul {
	display: flex;
	width: 100%;
	height: 30px;
	justify-content: center;
}
.tab-title {
	color: #999999;
	font-size: 24px;
	height: 30px;
	/* margin-left: 86px; */
	font-weight: 800;
	line-height: 30px;
}
.tab-active {
	color: #60bcee;
	font-size: 32px;
}
.popup {
	width: 100%;
}
.select-p {
	font-family: Microsoft YaHei UI;
	display: flex;
	width: 100%;
	height: 88px;
	justify-content: space-between;
	align-items: center;
	border-bottom: 1px solid #b0def7;
}
.showPicker {
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
