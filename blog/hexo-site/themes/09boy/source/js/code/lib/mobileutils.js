/**
 * 
 * @authors 09boy (www.09boy.cn)
 * @date    2015-03-14 15:34:20
 # only mobile
 * @version 1.0
 * @javascript ES5
 */
 var mobileUtils = (function(root,factory){

	'use strict';
	if (typeof define === 'function' && (define.amd || define.cmd)) {
        define(factory);
        root.MobileUtils = root.$ = factory(root);
    } else {
        root.MobileUtils = root.$ = factory(root);
    }

})(window,function(){
	'use strict';

	var fragmentRE = /^\s*<(\w+|!)[^>]*>/,
		singleTagRE = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,
		tagExpanderRE = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/ig,
		cssNumber = { 'column-count': 1, 'columns': 1, 'font-weight': 1, 'line-height': 1,'opacity': 1, 'z-index': 1, 'zoom': 1 },
		readyRE = /interactive|complete|loaded/,
		emptyArray = [],utils,_fn_,M,_$,

		_fragmentRE = function(html,name){
			var dom;
			if(singleTagRE.test(html)){ dom = document.createElement(RegExp.$1);}
			if(!dom){
		      	if(html.replace){ html = html.replace(tagExpanderRE, "<$1></$2>");}
		      	if(name === undefined){
		      		//name = fragmentRE.test(html) && RegExp.$1
		      		name = 'div';
		      	}
		      	var container = document.createElement(name);
		  	  	container.innerHTML = '' + html;
				dom = container.removeChild(container.firstChild);
				container = null;
		    }
		    return dom ? dom : html;
		},
		matchesSelector = function(el,selector){
			if(el.matchesSelector){ return el.matchesSelector(selector);}
			else if(el.webkitMatchesSelector) { return el.webkitMatchesSelector(selector);}
			else if(el.mozMatchesSelector) { return el.mozMatchesSelector(selector);}
			else if(el.msMatchesSelector) { return el.msMatchesSelector(selector);}
		},
		containProperty = function(property,propertyList){
			var isContain = false;
			if(utils.isArray(propertyList)){ return propertyList.indexOf(property) > -1;}
			return isContain;
		},
		delPorperty = function(obj,propertyList){
			for( var k in obj){
				if(utils.isObject(obj) && containProperty(k,propertyList)){
					delete obj[k];
					continue;
				}else if(typeof obj == 'object') { delPorperty(obj[k],propertyList);}
			}

			return obj;
		},
	 	attribute = function(property,value,data){
	 		//if(!this.length) return this;
			data = data || '';
			var _isKeyStr = _$.isString(property), _isKeyObj = _$.isObject(property);
				return !value && _isKeyStr && !_isKeyObj ? /*property.trim().indexOf(' ') < 0 ? */this[0].getAttribute(data + property) :
					   _isKeyStr || _isKeyObj ?
					   this.each(function(){
					   		var el = this;
							if(_isKeyStr && property != ''){ el.setAttribute(data + property,value);} 
							else if(_isKeyObj){ for(var k in property){ el.setAttribute(data + k,property[k]);}}
					   }) : undefined;
		},
		children = function(element) {
 
	    	return element.children;
	  	},
	  	dasherize = function(str) {
        	return str.replace(/::/g, '/')
                      .replace(/([A-Z]+)([A-Z][a-z])/g, '$1_$2')
                      .replace(/([a-z\d])([A-Z])/g, '$1_$2')
                      .replace(/_/g, '-')
                      .toLowerCase()
      	},
      	maybeAddPx = function(name, value) {
		    return (typeof value == "number" && !cssNumber[dasherize(name)]) ? value + "px" : value
		},
		triggerHandler =  function(el,type,handler,method){

			var typeList = type.split(' ');
			typeList.forEach(function(type){
				el[method](type, handler);
			});
		};

	utils = {

		getType: function(object,simple){
			return Object.prototype.toString.call(object);
		},

		isFunction: function(object){
			return this.getType(object) === '[object Function]';
		},

		isArray: function(object){
			return this.getType(object) === '[object Array]';
		},
		likeArray: function(object){
			return typeof object.length == 'number';
		},
		isString: function(object){
			return this.getType(object) === '[object String]';
		},
     
		isNumber: function(object){
			return this.getType(object) === '[object Number]';
		},

		isBoolean: function(object){
			return this.getType(object) === '[object Boolean]';
		},

		isObject: function(object){
			return this.getType(object) === '[object Object]';
		},

		isEl: function(el){
			return (el && el.nodeType === 1);
		},

		/**
		* 是否为一个空对象 {};
		* @param obj Object
		* return Boolean: true 空对象 || 非{}对象返回 false;
		*/
		isEmptyObj: function(obj){

			var isEmpty = utils.isObject(obj) || utils.isArray(obj) ? true : false;
			for(var k in obj){
				isEmpty = false;
				break;
			}
			return isEmpty;
		},

		/**
		* 深度复制一个对象;
		* @param target  Object  非基础类型对象
		* @param delete  Array   过滤掉和集合里同名的所有的属性。如果索引是一个数字类型将跳过: ['key','key2',1,'2'] 过滤掉属性名为 key,key2和'2' 的所有对象
		* return 返回一个新的副本 || [];
		*/
		clone: function(target,deleteObj){

			if($.isEl(target)){ return target;}

			var obj,value;
			obj = utils.isObject(target) ? {} : [];

			for(var k in target){
				if( utils.isObject(target) && containProperty(k,deleteObj)){ continue;}
				value = target[k];
				value = typeof value !== 'object' ? value : utils.clone(value,deleteObj);
				if(!utils.isEmptyObj(value)){ obj[k] = typeof value !== 'object' ? value : utils.clone(value,deleteObj);}
			}
			return obj;
		},
		/**
		* 通过源对象扩展目标对象的属性，源对象属性将覆盖目标对象属性
		* @param target  Object
		* @param source  Object 
		* @param deep  	 Boolean 默认情况下为浅拷贝（浅复制）。如果deep参数为true表示深度拷贝（深度复制）
		*/
		extendObj: function(target,source,deep){
			
			if(!utils.isObject(source)){ return target;}
			var value;
			for(var k in source){
				value = source[k];
				target[k] = !utils.isBoolean(deep) ? value : typeof value == 'object' && deep ? utils.clone(value) : value;
			}
			return target;
		},
		/**
		* 
		* @param target  Object
		* @param source  Object
		* @param delete  Array   过滤掉和集合里同名的所有的属性。如果索引是一个数字类型将跳过: ['key','key2',1,'2'] 过滤掉属性名为 key,key2和'2' 的所有对象
		* return 返回一个新对象
		*/
		mergeObj: function(target,source,deleteObj){

			var obj = {},value;
			if(utils.isObject(source)){

				obj = (typeof target === 'object') ? utils.clone(target) : {};
				for(var k in source){
					value = source[k];
					obj[k] = typeof value !== 'object' ? value : utils.clone(value);
				}
				return !utils.isArray(deleteObj) ? obj : utils.delPorperty(obj,deleteObj);
			}
			return obj;
		},

		/**
		* 
		* @param arr Array
		* @param arr callBack(item,index) Function
		* return Array
		*/
		map: function(arr,callBack){

			var value,values = [];
			if(utils.likeArray(arr)){
				for(var i = 0,len = arr.length; i < len; i++){
					value = callBack(arr[i],i);
					if(value != null){ values.push(value);}
				}	
			}else{
				
				for(var k in arr){
					value = callBack(arr[k],k);
					if(value != null){ values.push(value);}
				}
			}
			return values;
		}

	};

	/**
	* addMethod  向原型列中添加一个新方法
	* @param name:  type String    *  方法名称
	* @param fun:   type Function  *  一个方法
	* @isOverride : type Boolean   -  一个布尔值：是否覆盖已有的同名方法。 true为覆盖. Default true;
	*/
	Function.prototype.addMethod = function(name,fun,isOverride){

		isOverride = isOverride || true;

		if(this.prototype[name] && isOverride || !this.prototype[name]){
			this.prototype[name] = fun;
		}
		
	}
	/**
	* addMethods  向原型列中添加一个或者多个新方法
	* @param methodObj:  type Object    *  一个key键为name,值为function的Object对象。{name:function(){}}
	* @isOverride :      type Boolean   -  一个布尔值：是否覆盖已有的所有同名方法。 true为覆盖. Default true;
	*/
	Function.prototype.addMethods = function(methodObj,isOverride){

		isOverride = isOverride || true;
		methodObj = utils.isObject(methodObj) ? methodObj : {};

		for(var name in methodObj){
			if(this.prototype[name] && isOverride || !this.prototype[name]){
				this.prototype[name] = methodObj[name];
			}	
		}

	}

	window.debug = true;
	//Debugger Global in root
	window.Logger = {
		log: function(){},
		alert: function(){}
	};

	if(window.document.location.hash === '#debug' || window.debug === true){

		Logger.log = function(type,message){
			console.log.apply(console,arguments);
		}

		Logger.alert = function(type,message){
			alert(type + JSON.stringify(message));
		}
	}


	// constructor
	M = function(dom,selector){

		var i, len = dom ? dom.length : 0;
	    for (i = 0; i < len; i++){
	    	this[i] = dom[i];
	    }
	    this.length = len;
	    this.selector = selector || '';
	};

	_$ = function(selector, context){
		return _$.init(selector,context);
	};

	_$.M = function(dom,selector){

		return new M(dom,selector);
	};
	_$.isM = function(obj){
		return obj instanceof _$.M;
	}

	_$.init = function(selector,context){

		var dom;
		if(!selector){
			return _$.M(dom,selector);
		}else if(_$.isString(selector)){

			selector = selector.trim();
			if(isNaN(selector)){
				context = context ? _$.isString(context) ? document.querySelector(context)  : context : document;
				if(fragmentRE.test(selector)){
					// htmlstr '<p> text</p> || <p>'
					selector = '';
				}else{
					dom = context.querySelectorAll(selector);
				}
			}

		}else if(_$.isFunction(selector)){
			// ready onloaded
			return _$(document).ready(selector);

		}else if(_$.isM(selector)){ return selector;}
		else{
			// element || document
			if(_$.isEl(selector) || (selector.nodeType == 9)){
				dom = [selector];
				selector = '';
			}else{
				// array
				dom = selector;

			}
		}

		return _$.M(dom,selector);

	};

	_$.fn = {

		constructor: _$.M,
		length: 0,
		// Because a collection acts like an array
	    // copy over these useful array functions.
	    forEach: emptyArray.forEach,
	    reduce: emptyArray.reduce,
	    push: emptyArray.push,
	    sort: emptyArray.sort,
	    splice: emptyArray.splice,
	    indexOf: emptyArray.indexOf,

	    /**
	    * each
	    * 遍历一个对象集合每个元素。在迭代函数中，this关键字指向当前项(作为函数的第二个参数传递)。如果迭代函数返回 false，遍历结束
	    * @param callBack Function
	    * return _$;
	    */
		each: function(callBack){
			emptyArray.every.call(this, function(el, idx){
		      return callBack.call(el, idx, el) !== false;
		    });
		    return this;
		},

		/**
	    * empty
	    * 清空对象集合中每个元素的DOM内容
	    * return _$;
	    */
		empty: function(){
			return this.each(function(idx){ this.innerHTML = '';});
		},

		/**
	    * clone
	    * 通过深度克隆来复制集合中的所有元素
	    * 此方法不会将数据和事件处理程序复制到新的元素。这点和jquery中利用一个参数来确定是否复制数据和事件处理不相同。
	    * return _$;
	    */
		clone: function(){
			return this.each(function(){
				this.cloneNode(true);
			});
		},	

		/**
	    * children
	    * 获得每个匹配元素集合元素的直接子元素，如果给定selector，那么返回的结果中只包含符合css选择器的元素。
	    * return _$;
	    */
		children: function(selector){

			var c = [],childs,hasSelector = _$.isString(selector);

			this.each(function(){

				childs = this.children || this.childNodes;
				
				emptyArray.forEach.call(childs,function(node){
					if(hasSelector && matchesSelector(node,selector)){ c.push(node);}
					else if(!hasSelector){ c.push(node);}
				})
			});
			return _$(c);
		},

		/**
		* css
		* set: css(property,value),css(property,''),css({property:value,property:''});
		* get: css(property),css('property1 property2 ....') = {};
		*
		*   c.css('background-color','red');
			c.css({fontSize:'20px',color:'yellow'});
			console.log(c.css('backgroundColor'));
			console.log(c.css('backgroundColor fontSize'));
		*/
		css: function(property,value){

			if(!this.length) return;

			if(!_$.isString(value) && _$.isString(property)){
				// get property
				var value,targetEl,computedStyle;
				if(_$.isString(property)){

					value = {};
					targetEl = this[0];
					computedStyle = getComputedStyle(targetEl, '');
					property = property.trim().split(' ');
					property.forEach(function(pty,idx){
						value[pty] = targetEl.style[pty] || computedStyle.getPropertyValue(dasherize(pty));
					});
					
					value = property.length == 1 ? value[property[0]] : value;
				}
				return value;
			}
			
			var css = '';
			if(_$.isString(property)){
				property = property.trim();
				if(!value){
					this.each(function(){ this.style.removeProperty(dasherize(property)); });
				}else{
					css = dasherize(property) + ':' + maybeAddPx(dasherize(property),value) + ';';
				}
			}else if(_$.isObject(property)){

				for(var key in property){
					if (!property[key]/* && property[key] !== 0*/){
						this.each(function(){ this.style.removeProperty(dasherize(key));});
					}else{
						css += dasherize(key) + ':' + maybeAddPx(dasherize(key), property[key]) + ';';
					}
			            
				}
			}
			return css != '' ? this.each(function(){ this.style.cssText += ';' + css;}) : this;

		},

		/**
		* 删除自身及子元素
		*/
		remove: function(){
			
			return this.each(function(){
	        	if (this.parentNode != null){
	        		this.parentNode.removeChild(this);
	        	}	
	      	});
		},

		/**
		* 当document文档正在加载时,返回"loading",当文档结束渲染但在加载内嵌资源时,返回"interactive",当文档加载完成时,返回"complete".
		*
		*/
		ready: function(callBack){

			if (readyRE.test(document.readyState) && document.body){ callBack(_$);}
		    else { document.addEventListener('DOMContentLoaded', function(){ callBack(_$)}, false);}
		    return this;
		},

		/**
		* 是否包含 names 类名集合；多个类名用空格; 
		* names String
		* return 集合中只要包含其中一个就返回 true 否则 false
		*/
		hasClass: function(names){

			if(!_$.isString(names)){ return this;}
			names = names.trim().split(' ');
			if(names.length == 1 && names[0] == ''){ return this;}
			return emptyArray.some.call(this,function(el){
				var classStr = el.getAttribute('class'),
					classList = classStr ? classStr.split(' ') : [];
				return emptyArray.some.call(names,function(name){
					return classList.indexOf(name) !=-1;
				});
			});
		},
		/**
		* 获取／设置 data- 属性值; 第二个参数 value 为空即为获取;
		* property 	String || Object {}
		* value String
		* return 获取返回字符串值; 如果字符串是 'false' | 'true' 将转换为 Boolean 类型 false | true;
		*/
		data: function(property,value){

			value = value || null;
			var data = attribute.call(this,property,value,'data-');
			return data;
			//return data ? data == this ? data : data =='true' ? true : data == 'false' ? false : isNaN(data) ? data : parseInt(data) : undefined;
		},
		/**
		* 获取/设置 el 属性值; 第二个参数 value 为空即为获取;
		* property  String || Object {}
		* value     String
		* return    获取返回字符串值 || undefined
		*/
		attr: function(property, value){

			value = value || null;
			return attribute.call(this,property,value);
		},
		
		/**
		* 删除一个或者多个 property 属性；多个属性用空格隔开
		* property
		*/
		removeAttr: function(property){
			if(!_$.isString(property)) { return this;}

			property = property.trim().split(' ');
			return this.each(function(){
				var that = this;
				property.forEach(function(name){
					that.removeAttribute(name);
				});
			});
		},

		/**
		* 
		* return 包含有 top,left,width,height 属性对象
		*/
		offset: function(){

			var obj = this[0].getBoundingClientRect();
			return {
		        left: obj.left + window.pageXOffset,
		        top: obj.top + window.pageYOffset,
		        width: Math.round(obj.width),
		        height: Math.round(obj.height)
		    };
		},

		/**
		* 获取/设置 表单元素值; value 为空即为获取;
		* value  String
		* return  获取返回字符串值，设置返回undefined
		*/
		val: function(value){
			
			return /*_$.isString(value)*/ value ? this.each(function(){ this.value = value;}) : 
				   this[0].value;
		},
		/**
		* 获取/写入 dom 字符串包含tag标签; 参数为空即为获取;
		* value String
		* return String | undefined
		*/
		html: function(value){

			return _$.isString(value) || _$.isNumber(value) ? this.each(function(){ this.innerHTML = value;}) : 
				   this[0].innerHTML;
		},
		/**
		* 获取/写入 dom 文本; 参数为空即为获取;
		* value String
		* return String | undefined 
		*/
		text: function(value){

			return _$.isString(value) || _$.isNumber(value) ? this.each(function(){ this.innerText = value;}) : 
				   this[0].innerText;
		},

		/**
		* 添加事件
		* 
		*/
		on: function(type,handler){
			//el,type,handler,method
			return this.each(function(){
				triggerHandler.call(this,this,type,handler,'addEventListener');
			});
		},
		/**
		* 移除事件
		*
		*
		*/
		off: function(type,handler){

			return this.each(function(){
				triggerHandler.call(this,this,type,handler,'removeEventListener');
			});
		}

	};

	['width', 'height'].forEach(function(method){

		_$.fn[method] = function(value){

			return value && !isNaN(value) ? this.each(function(){ this.style[method] = value + 'px';}) :
				   this.offset()[method];
		}
	});

	/**
	* @param names
	*/
	['addClass', 'removeClass'].forEach(function(method,index){

		_$.fn[method] = function(names){

			if(!_$.isString(names)){ return this;}
			names = names.trim();
			if(names == '') { return this;}
			names = this[0].classList ? names.split(' ') : names;
			var mtd = method.slice(0,-5);
			return this.each(function(){
				var target = this;
					names.forEach(function(name){
						target.classList[mtd](name);
					})
			});
		}
	});

	['after', 'prepend', 'before', 'append'].forEach(function(method,index){


		var inside = index % 2;
		_$.fn[method] = function(){

			var nodes = _$.map(arguments,function(value){
				return !_$.isArray(value) && !_$.isObject(value) && value != '' ? _fragmentRE(value) : null;
			});

			if(nodes.length < 1){ return this;}
			return this.each(function(_,target){
				var parent = inside ? target : target.parentNode;
					target = index == 0 ? target.nextSibling :
							 index == 1 ? target.firstChild :
							 index == 2 ? target : null;
				
				nodes.forEach(function(node){
					if(_$.isEl(node)){
						node = node.cloneNode(true);
						parent.insertBefore(node,target);
						if(node.nodeName.toUpperCase() === 'SCRIPT' && (!node.type || node.type === 'text/javascript') && !node.src){
							window['eval'].call(window, node.innerHTML);
						}
					}
				})
			});
		}
	});

	utils.extendObj(_$,utils);
	_$.M.prototype = M.prototype = _$.fn;

	/**
	* $()
	* 1. css selector  -> div || div:first-child || div[class="circle"] || ...
	* 2. Dom nodes     -> elements
	* 3. Function
	* 4.
	* no fond: [selector:'']
	*/

	return _$;

});

// Ajax
(function(){
	'use strict';

	/* AjaxHandler interface ['request','createXhrObject']*/

	// reset 
	var empty = function(){};

	var default_config = {
		url: '',			 
		type: 'get',        // GET | POST
		dataType: 'unkonw', // JSON | JSONP | XML | UNKONW
		data: {},
		timeout: 0,
		async: true,
		username: '',
		password: '',
		success: empty,
		error: empty,
		ontimeout: empty,
	};

	// implements AjaxHandler
	var SimpleHandler = function(){};
	SimpleHandler.addMethods({

				request: function(config){

					if(!$.isObject(config)){ throw new Error('XHR-Request Argument Error: is not a object: {}.');}

					var tmpConfig = $.mergeObj(default_config,$.extendObj(config,$.ajaxSettings)),
						xhr = this.createXhrObject();
					
					var clearXhr = function(){
						// 用于停止正在进行的请求
						xhr.abort();
						xhr.onload = empty;
						xhr.onerror = empty;
						xhr.ontimeout = empty;
					};
					
					// 用于代替 onreadystatechange 检测成功
					xhr.onload = function(){

						if(xhr.readyState !== 4) return;

						var status = xhr.status;
						if(status >= 200 && status < 300 || status == 304){

							var response;
							try{
								if(tmpConfig.dataType.toLowerCase() == 'json'){
									response = JSON.parse(xhr.responseText);
								}else if(tmpConfig.dataType.toLowerCase() == 'xml'){
									response = xhr.responseXML;
								}else{
									// dataType nukonw html or other file; or  dataType error : the file of json type ,dataType is not 'json';
									// response = JSON.parse(xhr.responseText);
									// response = response ? response : xhr.responseText;
									response = xhr.responseText;
								}

							}catch(e){
								response = xhr.responseText;
							}

							tmpConfig.success(response);

						}else{
							tmpConfig.error(xhr);
							Logger.log('XHR-Onload Error: Request was unsuccessful. status ', xhr.status);
						}

					};

					// 用于代替 onreadystatechange 检测错误
					xhr.onerror = function(){
						Logger.log('xhr error');
						clearXhr();
						tmpConfig.error({message:'检测错误',type:'error'});
						// other code
						Logger.log('XHR-Onerror Error: Request was unsucessful. status: ' + xhr.status);
					};

					xhr.ontimeout = function(data){
						
						alert('XHR: 接口地址超时:' + JSON.stringify(data));
						clearXhr();
						if(tmpConfig.error){tmpConfig.error({message:'操作超时',type:'timeout'});}
						tmpConfig.ontimeout(this);
					};

					// xhr.progress = function(e){
					// 	Logger.log(e);
					// }

					xhr.open(tmpConfig.type, tmpConfig.url, tmpConfig.async, tmpConfig.username, tmpConfig.password);
					xhr.timeout = tmpConfig.timeout;

					if( tmpConfig.type.toLowerCase() !== 'get'){
						var tmpData = tmpConfig.data,data = '';

						if(!$.isObject(tmpData)){
							throw new Error('XHR-Config DATA Error: is not a object : {}.');
						}

						for(var key in tmpData){
							data += key + '=' + tmpData[key] + '&';
						}
						data = data.substr(data,data.length-1);
						Logger.log(data);
						// 表单提交时候的内容类型
						xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
					}

					// xhr.setRequestHeader('Access-Control-Allow-Origin','*');
					// xhr.setRequestHeader('X-Requested-With','XMLHttpRequest');
					// xhr.setRequestHeader('Accept','*/*');
					// xhr.setRequestHeader('From','mobileutils-09boy');
					// get =  getResponseHeader('myHeader');  allHeads = getResponseHeaders();
					xhr.send(data || null);

					return xhr;
				},
				// factory method
				createXhrObject: function(){

					var methods = [
						function(){return new XMLHttpRequest();},
						// IE7 before
						function(){return new ActiveXObject('Msxml2.XMLHTTP');},
						function(){return new ActiveXObject('Microsoft.XMLHTTP');}
					];

					var method;
					for(var i = 0, len = methods.length; i<len; i++){

						try{
							method = methods[i];
							method();
						}catch(e){
							continue;
						}
						// 第二次调用工厂方法时候将执行这个代理，因只会执行一次检测，所提高代码执行效率.
						this.createXhrObject = method;
						return method();
					}

					Logger.log('XHR-SimpleHandler:','Could not create an XHR object!');
					throw new Error('XHR-SimpleHandler: Could not create an XHR object!');
				}
	});

	/* ajax getJson post get */
	// 队列链接 离线链接 jsonp

	var sxhr = new SimpleHandler();
	$.ajaxSettings = {
		timeout: 8000
	};
	

	$.ajax = function(config){
		return sxhr.request(config);
	};
	$.getJSON = function(url,success,error){
		return sxhr.request({url:url,success:success,error: error,type:'get',dataType:'json'});
	}
	// $.ajaxJSONP = function(url,success,error){
	// 	return sxhr.request({url:url,success:success,error: error,type:'get',dataType:'jsonp'});
	// }
	$.post = function(url,data,success,error){
		data = $.isObject(data) ? data : {};
		return sxhr.request({url:url,data:data,success:success,error: error,type:'post'});
	}
	$.get = function(url,success,error){
		return sxhr.request({url:url,success:success,error: error,type:'get'});
	}

})();

(function(){

	/* Math */
	var math =  {
		/**
		 * get the center of all the pointers
		 * @param {Array} pointers
		 * @return {Object} center contains `x` and `y` properties
		 */
		getCenter: function(pointers) {
		    var pointersLength = pointers.length;

		    // no need to loop when only one touch
		    if (pointersLength === 1) {
		        return {
		            x: round(pointers[0].clientX),
		            y: round(pointers[0].clientY)
		        };
		    }

		    var x = 0, y = 0, i = 0;
		    while (i < pointersLength) {
		        x += pointers[i].clientX;
		        y += pointers[i].clientY;
		        i++;
		    }
		    
		    return {
		        x: round(x / pointersLength),
		        y: round(y / pointersLength)
		    };
		},

		/**
		 * calculate the velocity between two points. unit is in px per ms.
		 * @param {Number} deltaTime
		 * @param {Number} x
		 * @param {Number} y
		 * @return {Object} velocity `x` and `y`
		 */
		getVelocity: function(deltaTime, x, y) {
		    return {
		        x: x / deltaTime || 0,
		        y: y / deltaTime || 0
		    };
		},

		/**
		 * get the direction between two points
		 * @param {Number} x
		 * @param {Number} y
		 * @return {Number} direction
		 */
		getDirection: function(x, y) {
		    if (x === y) {
		        return DIRECTION_NONE;
		    }

		    if (abs(x) >= abs(y)) {
		        return x > 0 ? DIRECTION_LEFT : DIRECTION_RIGHT;
		    }
		    return y > 0 ? DIRECTION_UP : DIRECTION_DOWN;
		},

		/**
		 * calculate the absolute distance between two points
		 * @return {Number} distance
		 */
		getDistance: function(p1, p2) {
		   var dx = p2.x - p1.x,
	       	   dy = p2.y - p1.y;
	      return Math.sqrt((dx * dx) + (dy * dy));
		},

		/**
		 * calculate the angle between two coordinates
		 * @param {Object} p1
		 * @param {Object} p2
		 * @return {Number} angle
		 */
		getAngle: function(p1, p2) {

		    return Math.atan2(p2.y - p1.y, p2.x - p1.x) * 180 / Math.PI;
		},

		/**
		 * calculate the rotation degrees between two pointersets
		 * @param {Array} start array of pointers
		 * @param {Array} end array of pointers
		 * @return {Number} rotation
		 */
		getRotation: function(start, end) {
		  	//return  math.getAngle(end[1], end[0]) - math.getAngle(start[1], start[0]);
		  	var a = start[1].x - start[0].x;
		    var b = start[1].y - start[0].y;
		    var c = end[1].x - end[0].x;
		    var d = end[1].y - end[0].y;
		 	
		    var atanA = Math.atan2(a, b);
		    var atanB = Math.atan2(c, d);
		 
		    // convert radiants to degrees
		    return (atanA - atanB) * 180 / Math.PI;
		},
		/**
		* el targe
		*/
		getXYByElement: function(el) {

			var left = 0,
	        top = 0;

		    while (el.offsetParent) {
		        left += el.offsetLeft;
		        top += el.offsetTop;
		        el = el.offsetParent;

		    }
		    el = null;
		    return {
		        left: left,
		        top: top
		    };
		},
		/**
		* @agl {number}
		*/
		getDirectionFromAngle: function(agl) {
		    var directions = {
		        up: agl < -45 && agl > -135,
		        down: agl >= 45 && agl < 135,
		        left: agl >= 135 || agl <= -135,
		        right: agl >= -45 && agl <= 45
		    };
		    for (var key in directions) {
		        if (directions[key]) return key;
		    }
		    return null;
		},
		getPoints: function(e){

			var plist = [];
			if(e.touches){
				[].forEach.call(e.touches,function(p){
					plist.push({x:p.pageX,y:p.pageY});
				});
			}else{
				return plist.push({x:e.pageX,y:e.pageY});
			}
			e = null;
			return plist;
		}
	};

	$.extendObj(Math,math);
})();

(function(){

	'use strict';

	var Engine = {

		dispatch: function(type,event,detail){

			var ev = document.createEvent('Event');
			$.extendObj(ev,detail);
			ev.initEvent(type, true, true);
			
			if(event.target){
			   	event.target.dispatchEvent(ev);
			}
		}
	};

	var config = {
		tapTime: 260,
		tapMaxDistance: 10,
		longTapTime: 650,
		holdTime: 950,
		maxDoubleTapInterval: 250,

		swipeTime: 220,
    	swipeMinDistance: 18,
    	swipeFactor: 5,

    	minScaleRate: 0,
    	minRotationAngle: 0
	};
	var GestureType = {
		TAP: 'tap',
		LONG_TAP: 'long-tap',
		DOUBLE_TAP: 'double-tap',
		HOLD: 'hold',
		
		PINCH: 'pinch',
		PINCH_START: 'pinch-start',
		PINCH_END: 'pinch-end',
		PINCH_IN: 'pinch-in',
		PINCH_OUT: 'pinch-out',
		SCALE: 'scale',
		SWIPE: 'swipe',
		SWIPE_LEFT: 'swipe-left',
		SWIPE_RIGHT: 'swipe-right',
		SWIPE_UP: 'swipe-up',
		SWIPE_DOWN: 'swipe-down',
		DRAG: 'drag',
		DRAG_START: 'drag-start',
		DRAG_MOVING: 'drag-moving',
		DRAG_END: 'drag-end',

		ROTATION: 'rotation',
		ROTATION_LEFT: 'rotation-left',
		ROTATION_RIGHT: 'rotation-right',
		SINGLE_FINGER_ROTATE: 'single-finger-rotate'

	};

	var Gestures = {

		tap: function(e){

			var et = e.changedTouches[0],
				endPoint = {x:et.pageX,y:et.pageY},
				distance = Math.getDistance(__firstPoint__,endPoint),

				isTap = __nowTime__ < config.tapTime,
				isLongTap = __nowTime__ > config.longTapTime && __nowTime__ < config.holdTime,
				isDoubleTap = (__endTime__ -  __prev_tapped_end_time__) < config.maxDoubleTapInterval;

			if(isDoubleTap){
				
				clearTimeout(__tapTimer__);
				Engine.dispatch(GestureType.DOUBLE_TAP,e,endPoint);
				console.log('double-tap');
				return;
			}
			
			if(distance <= config.tapMaxDistance){
				
				__tapTimer__ = setTimeout(function(){
					if(isTap){
						Engine.dispatch(GestureType.TAP,e,endPoint);
						console.log('tap');
					}else if(isLongTap){
						Engine.dispatch(GestureType.TONG_TAP,e,endPoint);
						console.log('long-tap');
					}

				}, config.tapTime);
			}
			__prev_tapped_end_time__ = __endTime__;
			
		},
		swipe: function(e){

			var now = Date.now(),
				touchTime = now - __startTime__;
	        
	        var position = {
	            x: __firstMvPoint__.x - __offset__.x,
	            y: __firstMvPoint__.y - __offset__.y
	        };
	        var angle = Math.getAngle(__firstPoint__, __firstMvPoint__);
	        var direction = Math.getDirectionFromAngle(angle);
	        var touchSecond = touchTime / 1000;
	        var factor = ((10 - config.swipeFactor) * 10 * touchSecond * touchSecond);
	        var hasSwip = touchTime < config.swipeTime && __moveDistance__ >= config.swipeMinDistance;
	        var eventObj = {

	            position: position,
	            direction: direction,
	            distance: __moveDistance__,
	            distanceX: __firstMvPoint__.x - __firstPoint__.x,
	            distanceY: __firstMvPoint__.y - __firstPoint__.y,
	            x: __firstMvPoint__.x - __firstPoint__.x,
	            y: __firstMvPoint__.y - __firstPoint__.y,
	            angle: angle,
	            duration: touchTime,
	            hasSwip: hasSwip,
	            factor: factor
	        };

	        if(__touchMove__ && !__touchEnd__){
	        	
	        	Engine.dispatch(GestureType.DRAG,e,eventObj);

	        	if(!__isDragStart__){
	        		console.log('drag-start');
	        		Engine.dispatch(GestureType.DRAG_START,e,eventObj);
	        		__isDragStart__ = true;
	        	}else{
	        		console.log('drag-moving');
	        		Engine.dispatch(GestureType.DRAG_MOVING,e,eventObj);
	        	}

	        }else if(__touchEnd__){
	        	
	        	console.log('drag-end',touchTime);
	        	Engine.dispatch(GestureType.DRAG_END,e,eventObj);

	        	if(hasSwip){

		        	Engine.dispatch(GestureType.SWIPE,e,eventObj);
		        	console.log('swipe');
		        	var swipeEvent = function(){
						if(direction == 'left'){
							console.log('swipe-left');
				        	Engine.dispatch(GestureType.SWIPE_LEFT,e,eventObj);
				        }else if(direction == 'right'){
				        	console.log('swipe-right');
				        	Engine.dispatch(GestureType.SWIPE_RIGHT,e,eventObj);
				        }else if(direction == 'up'){
				        	console.log('swipe-up');
				        	Engine.dispatch(GestureType.SWIPE_UP,e,eventObj);
				        }else if(direction == 'down'){
				        	console.log('swipe-down');
				        	Engine.dispatch(GestureType.SWIPE_DOWN,e,eventObj);
				        }
		        	};
		        	
		        	swipeEvent();
		        }
	        } 
		},
	    singleRotate: function(e){

	       	var box = Math.getXYByElement(e.target),//el.getBoundingClientRect();
	       		mvPoint = {x:__firstMvPoint__.x - box.left,y:__firstMvPoint__.y - box.top},
	       		distance = Math.getDistance(__targetMidPoint__,mvPoint);

	      	
	       	if(__innerRadius__ < distance && distance < __outerRadius__){
	       			

	       		var tempStartPoint = {x:__firstPoint__.x - box.left,y:__firstPoint__.y - box.top};
	       		var angle = Math.getRotation([__targetMidPoint__,tempStartPoint],[__targetMidPoint__,mvPoint]);

				var diffAngle = function(){
	       			var count = 0;
	       			while (Math.abs(angle - __rotation__) > 90 && count++ < 50) {
			            if (__rotation__ < 0) {
			                angle -= 180;
			            } else {
			                angle += 180;
			            }
			        }
			        __rotation__ = parseInt(angle, 10);
	       		};


	       		var ina = Math.getAngle(__targetMidPoint__,tempStartPoint),
	       			ena = Math.getAngle(__targetMidPoint__,mvPoint),
	       			toa = ena - ina;

	       		if(angle > 180){
	       			console.log('>180'); //,angle-360
	       			angle -= 360;
	       		}else if(angle < -180){
	       			console.log('<180');
	       			angle += 360;
	       		}

	       		__rotation__ = angle;
	       		
	       		console.log(angle);
	       		//diffAngle();

	   //     		var getAngle180 = function(p1, p2) {
				//     var agl = Math.atan((p2.y - p1.y) * -1 / (p2.x - p1.x)) * (180 / Math.PI);
				//     return (agl < 0 ? (agl + 180) : agl);
				// };

				// ena = ena < 0 ? ena + 180 : ena;
				// var t = ena - ina;

		        // __rotation__ = angle;
		       // console.log(ina,ena,t);
	  
	       		var eventObj = {
	                rotation: __rotation__,
	                direction: (__rotation__ > 0 ? 'right' : 'left')
	            };

	       		if (__touchMove__ && !__touchEnd__) {
	                eventObj.fingerStatus = "moving";
	            } else if (__touchEnd__) {
	                eventObj.fingerStatus = "end";
	                //utils.reset();
	            }

	            Engine.dispatch(GestureType.SINGLE_FINGER_ROTATE,e,eventObj);
	       	}
	    },
	    pinch: function(e){

	    	
	    	var calScale = function(pstart, pmove) {
			    if (pstart.length >= 2 && pmove.length >= 2) {
			        var disStart = Math.getDistance(pstart[1], pstart[0]);
			        var disEnd = Math.getDistance(pmove[1], pmove[0]);

			        return disEnd / disStart;
			    }
			    return 1;
			};

	    	var scale = calScale(__pos__.starts, __pos__.moves);
            var rotation = 0;//this.getAngleDiff(__pos__.moves);
            var eventObj = {
                scale: scale,
                rotation: rotation,
                direction: (rotation > 0 ? 'right' : 'left')
            };
            if (!__isPinchStart__) {
                __isPinchStart__ = true;
                eventObj.fingerStatus = "start";
               	Engine.dispatch(GestureType.PINCH_START,e,eventObj);
            } else if (__touchMove__ && !__touchEnd__) {
                eventObj.fingerStatus = "moving";
                Engine.dispatch(GestureType.PINCH,e,eventObj);
            } else if (__touchEnd__) {
                eventObj.fingerStatus = "end";
               	Engine.dispatch(GestureType.PINCH_END,e,eventObj);
                // utils.reset();
            }


            if (Math.abs(1 - scale) > config.minScaleRate) {
                // var scaleEv = utils.simpleClone(eventObj);

                //手势放大, 触发pinchout事件
                var scale_diff = 0.00000000001; //防止touchend的scale与__scale_last_rate相等，不触发事件的情况。
                if (scale > __scale_last_rate) {
                    __scale_last_rate = scale - scale_diff;
                    Engine.dispatch(GestureType.PINCH_OUT,e,eventObj);
                } //手势缩小,触发pinchin事件
                else if (scale < __scale_last_rate) {
                    __scale_last_rate = scale + scale_diff;
                    Engine.dispatch(GestureType.PINCH_IN,e,eventObj);
                }

                if (__touchEnd__) {
                    __scale_last_rate = 1;
                }
            }

            if (Math.abs(rotation) > config.minRotationAngle) {
                var rotationEv = eventObj,//utils.simpleClone(eventObj),
                    eventType;

                eventType = rotation > 0 ? GestureType.ROTATION_RIGHT : GestureType.ROTATION_LEFT;
                Engine.dispatch(eventType,e,eventObj);
                Engine.dispatch(GestureType.ROTATION,e,eventObj);
            }

	    }

	};

	/*
	hasTransform: _transform !== false,
		hasPerspective: _prefixStyle('perspective') in _elementStyle,
		hasTouch: 'ontouchstart' in window,
		hasPointer: window.PointerEvent || window.MSPointerEvent, // IE10 is prefixed
		hasTransition: _prefixStyle('transition') in _elementStyle,
	*/


	var SUPPORT_TOUCH = 'ontouchstart' in window;

	var __scale_last_rate = 1;

	var __dfPoint__ = {x:0,y:0};

	var __touchStart__ = false,
		__touchMove__ = false,
		__touchEnd__ = false,
		__isPinchStart__ = false,
		__isSingleRotate__ = false,
		__isSwipStart__ = false,
		__isDragStart__ = false;

	var __firstPoint__ = __dfPoint__,
		__firstMvPoint__ = __dfPoint__,
		__endPoint__ = __dfPoint__,
		__offset__ = __dfPoint__;

	var __pos__ = {starts:[],moves:[]};

	var __targetMidPoint__ = __dfPoint__,
		__innerRadius__,
		__outerRadius__;

	var __rotation__ = 0,
		__prev_tapped_end_time__ = 0,
		__startTime__ = 0,
		__endTime__ = 0,
		__nowTime__ = 0;

	var __tapTimer__ = 0;

	var __moveDistance__ = 0;


	var reset = function(){

		__touchStart__ = false;
		__touchMove__ = false;
		__touchEnd__ = false;
		__rotation__ = 0;
		__moveDistance__ = 0;

		__isSwipStart__ = false;
		__isDragStart__ = false;
		__isSingleRotate__ = false;
		__isPinchStart__ = false;

	};

	function handler(e){

		var el = e.target;

		switch ( e.type ) {
			case 'touchstart':
			case 'pointerdown':
			case 'MSPointerDown':
			case 'mousedown':

				__touchStart__ = true;
				
				__pos__.starts = Math.getPoints(e);
				
				var	box = Math.getXYByElement(el);//el.getBoundingClientRect();
				
				__startTime__ = Date.now();
				__firstPoint__ = __pos__.starts[0];
				__targetMidPoint__ = {x:el.offsetWidth/2,y:el.offsetHeight/2};
				__outerRadius__ = el.offsetWidth/2;
				__innerRadius__ = __outerRadius__ /3;

				__offset__ = {x:box.left,y:box.top};

				break;
			case 'touchmove':
			case 'pointermove':
			case 'MSPointerMove':
			case 'mousemove':
				
				if(!__touchStart__){
					return;
				}

				__touchMove__ = true;

				__pos__.moves = Math.getPoints(e);
				var finglers = e.touches.length;

				__firstMvPoint__ = __pos__.moves[0];
				__moveDistance__ = Math.getDistance(__firstPoint__, __firstMvPoint__);

				if(finglers >1){
					trace('pich');
					Gestures.pinch(e);
				}else if(__isSingleRotate__){
					Gestures.singleRotate(e);
				}else{
					Gestures.swipe(e);
				}
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             
				break;
			case 'touchend':
			case 'pointerup':
			case 'MSPointerUp':
			case 'mouseup':
			case 'touchcancel':
			case 'pointercancel':
			case 'MSPointerCancel':
			case 'mousecancel':
				// trace(e.type );
				
				if(!__touchStart__){
					return;
				}

				__touchEnd__ = true;

				__endTime__ = Date.now();
				__nowTime__ = __endTime__ - __startTime__;

				__endPoint__ = e.changedTouches[0];

				if(__isPinchStart__){
					Gestures.pinch(e);
				}else if(__isSingleRotate__){
					Gestures.singleRotate(e);
				}else if(__isDragStart__){
					Gestures.swipe(e);
				}else{
					Gestures.tap(e);
				}

				reset();

				break;
		}
	}

	var target = document;


	if ( SUPPORT_TOUCH ) {

		target.addEventListener('touchstart', handler);
		target.addEventListener('touchmove', handler);
		target.addEventListener('touchcancel', handler);
		target.addEventListener('touchend', handler);

	}else{

		target.addEventListener('mousedown', handler);
		target.addEventListener('mousemove', handler);
		target.addEventListener('mousecancel', handler);
		target.addEventListener('mouseup', handler);
	}

	// $('div').on('tap',function(e){
	// 	console.log(e,this);
	// });

})();