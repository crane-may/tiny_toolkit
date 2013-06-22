///import core
///commands 当输入内容超过编辑器高度时，编辑器自动增高
/**
 * @description 自动伸展
 * @author zhanyi
 */
(function() {

    var domUtils = baidu.editor.dom.domUtils;

    baidu.editor.plugins['autoheight'] = function() {
	    var me = this;
	    //提供开关，就算加载也可以关闭
	    me.autoHeightEnabled = me.options.autoHeightEnabled;
	    if (!me.autoHeightEnabled)return;

	    var bakOverflow,
	        span, tmpNode,
	        lastHeight = 0,
	        currentHeight,
	        timer;
	
			var editor_body,
			is_ie_7 = /MSIE 7/.test(navigator.userAgent),
			is_sogou = /Safari\/535\.1.*MetaSr/.test(navigator.userAgent);
			
	    function adjustHeight() {
        clearTimeout(timer);
				if (baidu.editor.browser.webkit && ! is_sogou){
           timer = setTimeout(function(){
             var last_scrollHeight = (editor_body || $(me.document.body)).height() + 20;
             var opHeight = me.options.minFrameHeight;

             me.setHeight(Math.max(last_scrollHeight, opHeight));
           },50);
         }else{
	        timer = setTimeout(function () {
	            if (me.queryCommandState('source') != 1) {
	                if (!span) {
	                    span = me.document.createElement('span');
	                    //trace:1764
	                    span.style.cssText = 'display:block;width:0;margin:0;padding:0;border:0;clear:both;';
	                    span.innerHTML = '.';
	                }
	                tmpNode = span.cloneNode(true);
	                me.body.appendChild(tmpNode);

	                currentHeight = Math.max(domUtils.getXY(tmpNode).y + tmpNode.offsetHeight, me.options.minFrameHeight);

	                if (currentHeight != lastHeight) {

	                    me.setHeight(currentHeight);

	                    lastHeight = currentHeight;
	                }

	                domUtils.remove(tmpNode);

	            }
							if(is_ie_7 || is_sogou) $(editor_body).css("height","auto");
	        }, 50)
				}
	    }
	    me.addListener('destroy', function () {
	        me.removeListener('contentchange', adjustHeight);
	        me.removeListener('keyup', adjustHeight);
	        me.removeListener('mouseup', adjustHeight);
	    });
	    me.enableAutoHeight = function () {
	        if(!me.autoHeightEnabled)return;
	        var doc = me.document;
	        me.autoHeightEnabled = true;
	        bakOverflow = doc.body.style.overflowY;
	        doc.body.style.overflowY = 'hidden';
	        me.addListener('contentchange', adjustHeight);
	        me.addListener('keyup', adjustHeight);
	        me.addListener('mouseup', adjustHeight);
	        //ff不给事件算得不对
	        setTimeout(function () {
	            adjustHeight();
	        }, baidu.editor.browser.gecko ? 100 : 0);
	        me.fireEvent('autoheightchanged', me.autoHeightEnabled);
	
					editor_body = $(me.document.body);
	    };
	    me.disableAutoHeight = function () {

	        me.body.style.overflowY = bakOverflow || '';

	        me.removeListener('contentchange', adjustHeight);
	        me.removeListener('keyup', adjustHeight);
	        me.removeListener('mouseup', adjustHeight);
	        me.autoHeightEnabled = false;
	        me.fireEvent('autoheightchanged', me.autoHeightEnabled);
	    };
	    me.addListener('ready', function () {
	        me.enableAutoHeight();
	        //trace:1764
	        var timer;
	        domUtils.on(baidu.editor.browser.ie ? me.body : me.document,baidu.editor.browser.webkit ? 'dragover' : 'drop',function(){
	            clearTimeout(timer);
	            timer = setTimeout(function(){
	                adjustHeight()
	            },100)
	        });
	    });
	
			//crane
			App.on("editor_change",function() {
				adjustHeight();
				setTimeout(adjustHeight,1*1000);
				setTimeout(adjustHeight,3*1000);
			});
			
			var insert_img_interval = 0;
			App.on("insert_img",function() {
				if (insert_img_interval) clearInterval(insert_img_interval);
				
				insert_img_interval = setInterval(adjustHeight,100);
				setTimeout(function(){
					if (insert_img_interval) clearInterval(insert_img_interval);
					insert_img_interval = 0;
				},10*1000);
			});
    }

})();
