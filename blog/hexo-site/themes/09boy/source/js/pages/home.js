/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2016-02-29 13:22:58
 * @version $Id$
 */

(function(){
	
	console.log($);

	var headH = 70;
	var body = $('body');
	var main = $('#main');
	var foot = $('#foot');

	console.log(main.height(),body.height());

	// function onResize(){
	// 	if(main.height() + headH <= body.height()){
	// 		foot.addClass('b-foot');
	// 	}else{
	// 		foot.removeClass('b-foot');
	// 		console.log(';remove');
	// 	}
	// }
	// onResize();
	// window.addEventListener('resize',onResize);

	
	var articleWrap = $('#article-detail');

	function getEl(selector){
		return document.querySelector(selector);
	}

	function warpPostContents(){

		var title = getEl('#contents-wraper #Contents-目录');
		if(title){
			var contentWrap = getEl('#contents-wraper #contents');
			var ol = title.nextSibling;
			if(ol.nodeType == 1 && ol.tagName.toLowerCase() == 'ol'){
				console.log(ol.nodeType,ol.tagName);
				contentWrap.appendChild(title);
				contentWrap.appendChild(ol);
			}
				
		}
	}

	if(articleWrap.length){
		warpPostContents();
	}
	

})();