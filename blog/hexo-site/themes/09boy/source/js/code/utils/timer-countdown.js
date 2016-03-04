/**
 * TimerCountDown
 * @authors 09boy
 * @date    2015-06-03 16:41:44
 * @version 1.0
 */

/*	
	// example:
	var timer = new TimerCountDown(6),
		delegateLoop = function(){
			// this -> timer
			log('delegate loop',this.getMs());
		},
		delegateStop = function(){
			// this -> timer
			log('delegate stop',this);
			this.destroy();
		};
	log(timer);
	// 注册 TimerCountDown.EVENT_STAOP & TimerCountDown.EVENT_LOOP 两个事件
	timer.on(TimerCountDown.EVENT_STAOP,delegateStop);
	timer.on(TimerCountDown.EVENT_LOOP,delegateLoop);
	// 开始计时
	timer.run();
	// 2秒后撤销 TimerCountDown.EVENT_LOOP 事件
	setTimeout(function(){
		timer.off(TimerCountDown.EVENT_LOOP,delegateLoop);
	}, 2000);
*/

(function(){
	'use strict';
	var hasMobileUtils = window.MobileUtils ? true : false,
		log = function(){ if(TimerCountDown.debug) { console.log.apply(console,arguments);}};

	/**
	* 计时器
	* @param sec Number 秒数
	*/
	var TimerCountDown = function(sec){
		this.reset(sec);
	},
	methods = {
		/**
		* @param type String  广播事件类型 TimerCountDown.EVENT_LOOP || TimerCountDown.EVENT_STAOP
		* @param fun Function 注册广播 (* 建议不要指定匿名函数，否则撤销不了注册的事件) 
		*/
		on: function(type,fun){
			if(typeof fun == 'function' && (type == TimerCountDown.EVENT_LOOP || type == TimerCountDown.EVENT_STAOP)){
				this.__delegates__.push({type:type,delegate:fun});
				return;
			}
			log('TimerCountDown->on: 参数不合法!!');
		},
		/**
		* @param type String
		* @param fun Function
		*/
		off: function(type,fun){
			log('TimerCountDown->off: type: ' + type + '; delegate: ' + fun);
			for(var i=0,len = this.__delegates__.length; i<len;i++){
				var delegateObj = this.__delegates__[i];
				if(delegateObj.type == type && delegateObj.delegate == fun){
					this.__delegates__.splice(i,1);
				}
			}
		},
		/**
		* Get Millisecond 毫秒
		* return number
		*/
		getMs: function(){
			return this.__ms__;
		},
		/**
		* Get second 秒
		* return number
		*/
		getSec: function(){
			return this.__sec__;
		},
		/**
		* Get Minutes 分钟
		* return number
		*/
		getMin: function(){
			return this.__min__;
		},
		/**
		* Get hour 小时
		* return number
		*/
		getHr: function(){
			return this.__hr__;
		},
		/**
		* start timer 启动计时器
		*/
		run: function(){
			log('TimerCountDown->run: 启动计时器');
			var that = this,
				_handler = function(){
					that.__ms__ -= 1000;
					that.reset(that.__ms__/1000);
					that.__fire__(TimerCountDown.EVENT_LOOP);
					if(that.__ms__ > 0){ that.__time__ = setTimeout(_handler, 1000);}
					else{ that.stop();}
				};
			that.__time__ = setTimeout(_handler, 0);
		},
		/**
		* stop timer 停止计时器
		*/
		stop: function(){
			log('TimerCountDown->stop: 停止计时器');
			clearTimeout(this.__time__);
			this.__fire__(TimerCountDown.EVENT_STAOP);
		},
		/**
		* @param sec Number 秒数
		*/
		reset: function(sec){

			sec = typeof sec == 'number' ? sec : 0;
			if(sec < 0) { log('TimerCountDown->reset: sec 参数不合法',sec); return;}

			var _sec_ = sec % 60,
				_min_ = parseInt(sec / 60);

			this.__ms__  = sec * 1000;
			this.__sec__ = _sec_ == 0 ? 0 : _sec_;
			this.__min__ = _min_;
			this.__hr__  = parseInt(_min_ / 60);

			log(JSON.stringify({ms:this.__ms__,sec:this.__sec__,min:_min_,hr:this.__hr__}));
		},
		/**
		* destroy 销毁实例对象
		*/
		destroy: function(){

			clearTimeout(this.__time__);
			this.__time__ = 0;
			for(var i=0,len = this.__delegates__.length; i<len;i++){
				var delegateObj = this.__delegates__[i];
				this.__delegates__.splice(i,1);
				delegateObj.type = null;
				delegateObj.delegate = null;
				delete delegateObj.type;
				delete delegateObj.delegate;
				delegateObj = null;
			}
			log('TimerCountDown->destroy: 销毁实例对象;',this.__delegates__);
		},
		__fire__: function(type){

			for(var i=0,len = this.__delegates__.length; i<len;i++){
				var delegateObj = this.__delegates__[i];
				if(delegateObj.type == type){
					delegateObj.delegate.call(this);
				}
			}
		},

		__ms__:   0,
		__sec__:  0,
		__min__:  0,
		__hr__:   0,
		__time__: 0,
		__delegates__: []
	};

	// TimerCountDown Event: Singler
	TimerCountDown.EVENT_LOOP 	= 'event-loop';
	TimerCountDown.EVENT_STAOP 	= 'event-stop';
	// debug true is output msg
	TimerCountDown.debug 		= true;

	if(hasMobileUtils){ TimerCountDown.addMethods(methods);}
	else {
		methods.constructor = TimerCountDown;
		TimerCountDown.prototype = methods;
	}

	if(typeof App != 'undefined'){
		App.addObjClass({name:'TimerCountDown',class:TimerCountDown});
	}
	// support require
	if(typeof define === 'function' && (define.amd || define.cmd)){ define(function(){ return TimerCountDown;});}
})();