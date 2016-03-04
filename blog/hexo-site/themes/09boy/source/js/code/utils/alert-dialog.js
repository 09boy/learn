/**
 * AlertDialog
 * @authors 09boy
 * @date    2015-3-28 14:41:48
 * @version 1.0
 */

(function(){
	'use strict';
 	var hasMobileUtils = window.MobileUtils ? true : false,
		log = function(){ if(AlertDialog.debug) { console.log.apply(console,arguments);}};

	var defaultConfig = {name:'知道了'};
	var methods = {
		/**
		* @param type String  广播事件类型 AlertDialog.EVENT_HIDE || AlertDialog.EVENT_SHOW
		* @param fun Function 注册广播 (* 建议不要指定匿名函数，否则撤销不了注册的事件) 
		*/
		on: function(type,fun){
			if(typeof fun == 'function' && (type == AlertDialog.EVENT_HIDE || type == AlertDialog.EVENT_SHOW)){
				this.__delegates__.push({type:type,delegate:fun});
				return;
			}
			log('AlertDialog->on: 参数不合法!!');
		},
		/**
		* @param type String
		* @param fun Function
		*/
		off: function(type,fun){
			log('AlertDialog->off: type: ' + type + '; delegate: ' + fun);
			for(var i=0,len = this.__delegates__.length; i<len;i++){
				var delegateObj = this.__delegates__[i];
				if(delegateObj.type == type && delegateObj.delegate == fun){
					this.__delegates__.splice(i,1);
				}
			}
		},
		/**
		* @param msg String 显示的消息
		*/
		show: function(msg){

			msg = typeof msg == 'string' ? msg : '这里是你的提示语!';
			this.infoEl.innerHTML = msg;
			this.wrap.classList.remove('hide');
			this.__resize__();
			this.__fire__(AlertDialog.EVENT_SHOW);
			var that = this,
				handler = function(e){
					e.preventDefault();
					that.hide();
					that.wrap.removeEventListener('click',handler);
				};
			setTimeout(function(){that.wrap.addEventListener('click',handler);}, 100);
		},
		/**
		* 隐藏
		*/
		hide: function(){
			this.wrap.classList.add('hide');
			this.con.style.cssText += 'transform: translate(0px,0px) translateZ(0px); -webkit-transform: translate(0px,0px);';
			this.__fire__(AlertDialog.EVENT_HIDE);
		},
		__resize__: function(){
			var size = this.con.getBoundingClientRect(),
				referenceW = document.body.offsetWidth,
				referenceH = document.body.offsetHeight,
				left = (referenceW - size.width) * .5 - size.left,
				top = (referenceH - size.height) * .5 - size.top;
			this.con.style.cssText += 'transform: translate(' + left + 'px,' + top + 'px) translateZ(0px); -webkit-transform: translate(' + left + 'px,' + top + 'px);';
		},
		__initUI__: function(config){

			var wrap = document.createElement('div');
			wrap.className = 'page hide';
			wrap.setAttribute('id','alert-page');

			var htmlStr ='<div class="alert-con">'+
							'<div class="alert-info">'+
								'<p>您的信息已登记成功</p>'+
							'</div>'+
							'<div class="alert-bottom">'+
								'<p>' + config.name + '</p>'+
							'</div>'+
						'</div>';
			wrap.innerHTML = htmlStr;

			var firstScriptEl = document.querySelector('body>script');
			document.body.insertBefore(wrap,firstScriptEl);

			this.wrap = wrap;
			this.con = wrap.querySelector('div.alert-con');
			this.infoEl = this.con.querySelector('div.alert-info p');
		},
		__fire__: function(type){

			for(var i=0,len = this.__delegates__.length; i<len;i++){
				var delegateObj = this.__delegates__[i];
				if(delegateObj.type == type){
					delegateObj.delegate.call(this);
				}
			}
		}
	};

	var AlertDialog = function(config){

		config = config || {};
		if(hasMobileUtils){
			config = $.mergeObj(defaultConfig,config);
		}else{
			config = defaultConfig;
		}
		this.wrap = null;
		this.infoEl = null;
		this.con = null;
		this.__delegates__ = [];
		this.__initUI__(config);
	};

	// TimerCountDown Event: Singler
	AlertDialog.EVENT_HIDE 	= 'event-hide';
	AlertDialog.EVENT_SHOW 	= 'event-show';

	AlertDialog.debug = true;

	if(hasMobileUtils){ AlertDialog.addMethods(methods);}
	else {
		methods.constructor = AlertDialog;
		AlertDialog.prototype = methods;
	}
	if(typeof App != 'undefined'){
		App.addObjClass({name:'AlertDialog',class:AlertDialog});
	}

	// support require
	if(typeof define === 'function' && (define.amd || define.cmd)){ define(function(){ return AlertDialog;});}
})();