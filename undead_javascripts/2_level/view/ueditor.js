loadit("View.Ueditor",function(){
function baidu_config_init(){
    var URL= window.location.href.match(/https?:\/\/[^\/]+/)+"/";
    window.UEDITOR_CONFIG = {
        UEDITOR_HOME_URL: URL,
        toolbars: [
            ['FontSize','Bold', 'ForeColor',new baidu.editor.ui.Button({
							uiName: 'link',
							className: 'edui-button',
							title : '添加链接',
							showText: false,
							onclick: function (){
								try{
									var stext = App.views.editor.get_selected_text();
								}catch(e){
									var stext = "";
								}
								
								Dialog.InputLink.open(null,{name: (stext == "[object TextRange]" ? "" : stext) || "" ,callback: function(s) {
									App.views.editor.append(s);
								}})
							}
            }),new baidu.editor.ui.Button({
							uiName: 'at',
							className: 'edui-button',
							title: '提到朋友',
							showText: false,
							onclick: function (){
								Dialog.InputAt.open(null,{callback:function(s){
									App.views.editor.append(s);
								}});
							}
            }),'Emotion', new baidu.editor.ui.Button({
							uiName: 'pic',
							className: 'edui-button',
							title : '添加图片',
							showText: false,
							onclick: function (){
								Dialog.InputPic.open(null,{callback: function(s) {
									App.views.editor.append(s);
								}});
							}
            }), new baidu.editor.ui.Button({
							uiName: 'video',
							title : '添加视频',
							className: 'edui-button',
							showText: false,
							onclick: function (){
								Dialog.InputVideo.open(null,{callback: function(s) {
									App.views.editor.append(s);
								}});
							}
            }), new baidu.editor.ui.Button({
							uiName: 'music',
							title : '添加音乐',
							className: 'edui-button',
							showText: false,
							onclick: function (){
								Dialog.InputMusic.open(null,{callback: function(s) {
									App.views.editor.append(s);
								}})
							}
            }), new baidu.editor.ui.Button({
							uiName: 'preview',
							title : '生成预览',
							className: 'edui-button',
							showText: false,
							onclick: function (){
								Dialog.Preview.open(null,{content: App.views.editor.val() });
							}
            })]
        ],
        labelMap: {
          'bold': '字体加粗',
          'fontfamily': '字体',
          'fontsize': '字体大小',
          'emotion': '添加表情',
          'forecolor' : '字体颜色',
          'backcolor' : '背景色',
          'link' : '添加链接',
          'at' : '提到朋友',
          'pic' : '添加图片',
          'video' : '添加视频',
          'music' : '添加音乐',
          'preview' : '生成预览'
        },
        iframeUrlMap: {
            'emotion': '/smile.html'
        },
        listMap: {
            'fontfamily': ['宋体', '楷体', '隶书', '黑体','andale mono','arial','arial black','comic sans ms','impact','times new roman'],
            'fontsize': [12, 18]
        },
        fontMap: {
            '宋体': ['宋体', 'SimSun']
        },
        initialStyle: 
      		"html{overflow-x:hidden;}"+
      		"body{width:"+(window.UEDITOR_WIDTH || 618)+
      		"px;height:auto;overflow-x:hidden;text-align:left;background-color:#fff;padding:8px;margin:0;font-size:12px; color:#333; line-height:180%; letter-spacing:0.1em;font-family: Arial, Tahoma, Helvetica, STHeiti, '宋体';word-wrap: break-word;}"+
      		"img { display: block;border:0;padding:0;margin:0;}"+
      		"a {word-wrap: break-word; color:#2495ce;cursor:pointer;text-decoration:none;}"+
      		"a:hover {color:#FFA07E;text-decoration: underline;}"+
      		"p{padding:0;margin:0;border: 0;outline: 0;word-wrap: break-word;}"+
      		"span{margin: 0;padding: 0;border: 0;outline: 0;font-size: 100%;vrtical-align: baseline;background: transparent;word-wrap: break-word;}"+
      		"em, i{font-style:normal;}"+
      		"h1{font-size:18px;}"+
			"::-moz-selection{ background: #2495ce; color:#fff; text-shadow: none; }"+
			"::selection { background:#2495ce; color:#fff; text-shadow: none; }",
        initialContent: '',  //初始化编辑器的内容
        autoClearinitialContent:false,                        //是否自动清除编辑器初始内容
        removeFormatTags : 'b,big,code,del,dfn,em,font,i,ins,kbd,q,samp,small,span,strike,strong,sub,sup,tt,u,var',    //清除格式删除的标签
        removeFormatAttributes : 'class,style,lang,width,height,align,hspace,valign',                                  //清除格式删除的属性
        enterTag : 'br',                                       //编辑器回车标签。p或br
        maxUndoCount : 50,                                    //最多可以回退的次数
        maxInputCount : 10,                                   //当输入的字符数超过该值时，保存一次现场
        selectedTdClass : 'selectTdClass',                    //设定选中td的样式名称
        pasteplain : true,                                  //是否纯文本粘贴。false为不使用纯文本粘贴，true为使用纯文本粘贴
        textarea : 'text',                             //提交表单时，服务器获取编辑器提交内容的所用的参数，多实例时请给每个实例赋予不同的名字
        focus : true,                                       //初始化时，是否让编辑器获得焦点true或false
        indentValue : '2em',                                  //初始化时，首行缩进距离
        pageBreakTag : '_baidu_page_break_tag_',              //分页符
        minFrameHeight: (window.UEDITOR_HEIGHT || 164),        //最小高度
        autoHeightEnabled:true,                              //是否自动长高
        autoFloatEnabled: window.__toolbar_float || false,                     //是否保持toolbar的位置不动
        maximumWords:20000,                                  //允许的最大字符数
        tabSize : 4,                                         //tab的宽度
        tabNode : '&nbsp;',                                  //tab时的单一字符
        imagePopup:false,                                    //图片操作的浮层开关，默认打开
        emotionLocalization:true,                           //是否开启表情本地化，默认关闭。若要开启请确保emotion文件夹下包含官网提供的images表情文件夹
        sourceEditor: "codemirror",                          //源码的查看方式，codemirror 是代码高亮，textarea是文本框
        tdHeight : '20',                                    //单元格的默认高度
        messages:{
            pasteMsg:'',//粘贴提示
            wordCountMsg:' ',    //字数统计提示，{#count}代表当前字数，{#leave}代表还可以输入多少字符数。
            wordOverFlowMsg:'', //超出闲置
            pasteWordImgMsg:''
        },
        serialize : function(){
           var X = baidu.editor.utils.extend;
           var inline = {strong:1,em:1,b:1,i:1,u:1,span:1,a:1,img:1,font:1,br:1};
					 var attr = {'class':1,title:1,src:1,href:1,onresizestart:1,ex_image:1,ex_xiami:1,ex_video:1,ex_mp3:1,alt:1,color:1,target:1};
					 var attr_with_style = {style:1,'class':1,title:1,src:1,href:1,onresizestart:1,ex_image:1,ex_xiami:1,ex_video:1,ex_mp3:1,alt:1,color:1,target:1};
           var block = X(inline, {p:1,div:1,'$':attr});
					 var block_with_style = X(inline, {p:1,div:1,'$':attr_with_style});
					 
           return {
               whiteList: {
               	p: block,
							 	br: block,
								img: block,
								a: block_with_style,
								i: block,
								span: block_with_style,
								strong: block,
								font: block,
								div: block,
								h1: block,
								b: block,
								em: block
               },
							blackList: {style:1,script:1,link:1,object:1,applet:1,input:1}
            };
        }(),
        ComboxInitial: {
            FONT_FAMILY: '字体',
            FONT_SIZE: '&nbsp;',
            ROW_SPACING: '',
            PARAGRAPH: '',
            LINE_HEIGHT :''
        }
    };
};
	
	
//Dialog.Input
View.Ueditor = View.Base.extend({
	initialize: function() {
		var self = this;
		
		// $LAB.script($_.static_url(JS_FILES["ueditor_js"])).wait(function() {
		//       if (window.UEDITOR_JS_PIN != 100) alert(window.UEDITOR_JS_PIN);
		//       baidu_config_init();
		//   self.async_initialize();
		// });
    
		yepnope.errorTimeout = 10000;
    
		var ueditor_callback = function() {
		  baidu_config_init();
		  self.async_initialize();
		};
		window.UEDITOR_JS_PIN = -1;
		
		if ($.browser.webkit && $.browser.version == "533.19.4") {
			$LAB.script($_.static_url(JS_FILES["ueditor_js"])).wait(function() {
				ueditor_callback();
			});
		}else{
			yepnope([{
			  load: $_.static_url(JS_FILES["ueditor_js"]),
			  complete: function() {
			    if (window.UEDITOR_JS_PIN != 100) {
			      send_crash_org("ueditor_load_1:"+window.UEDITOR_JS_PIN);
			      window.UEDITOR_JS_PIN = 0;
			      yepnope([{
			        load: $_.static_url(JS_FILES["ueditor_js"]).replace(/cdn\d/g,"static"),
			        complete: function() {
			          if (window.UEDITOR_JS_PIN != 100) {
			            send_crash_org("ueditor_load_2:"+window.UEDITOR_JS_PIN);
			          }else{
			            ueditor_callback();
			          }
			        }
			      }]);
			    }else{
			      ueditor_callback();
			    }
			  }
			}]);
		}
		
		this.ustore_key = "ibooloo2_" + (window.__autosave_scope || 'home') + "_" + window.CURRENT_USER_ID;
	},
	render: function() {},
	async_initialize: function() {
		this.editor = new baidu.editor.ui.Editor();
		var self = this;
		this.editor.addListener('ready',function(){
			App.trigger("editor_ready");
			if (! ($.browser.msie || $.browser.opera) ) self.editor.iframe.contentWindow.document.execCommand("enableObjectResizing",false,false);
		 	if (window.__autosave) self.init_autosave();
		});
		App.views.editor = this;
		this.editor.render('ueditor');
	},
	init_autosave: function() {
		this.support_ustore = USTORE.init();
		if (this.support_ustore){
			if (window.__draft){
				var s = __draft;
				if (! _.isString(s)) s="";
				this.val(s);
			}
			else{
				var s = USTORE.getValue(this.ustore_key);
				if (! _.isString(s)) s="";
				this.val(s);
			}
				
			
			var self = this;
			var delay_save = _.debounce(function() {
				self.draft_save();
			},200)
		
			$(document).keydown(delay_save);
			$(this.editor.document).keydown(delay_save);
		
			window.onbeforeunload = function () {
			  self.draft_save();
			};
		
			$(document).keydown(function(e) {
				if (e.keyCode != 8) return;
		    var d = e.srcElement || e.target;
		    if ( (d.tagName.toUpperCase() != 'INPUT' && d.tagName.toUpperCase() != 'TEXTAREA') ||
							(d.tagName.toUpperCase() == 'INPUT' || d.tagName.toUpperCase() == 'TEXTAREA' ) && (d.readOnly || d.disabled))
						e.preventDefault();
			});
		}
	},
	draft_save: function() {
		if (this.support_ustore){
			var s = this.raw_val();
			USTORE.setValue(this.ustore_key,(s == "") ? "" : s );
		}
    
    App.trigger("draft_save");
	},
	val: function(s) {
		if (_.isUndefined(s)){
			var pur = new Widget.Purge(this.editor.getContent().trim());
			return pur.pur().serialize();
		}else{
			this.editor.setContent(s);
			this.draft_save();
			App.trigger("editor_change");
		}
	},
	raw_val: function(s) {
		if (_.isUndefined(s)){
			return this.editor.window.document.body.innerHTML;
		}else{
			throw "not implement";
		}
	},
	is_empty: function() {
		return this.val().is_html_blank();
	},
	count: function() {
		return this.val().length;
	},
	append: function(s) {
		this.editor.execCommand("inserthtml",s);
		this.draft_save();
		App.trigger("editor_change");
	},
	get_selected_text: function() {
		return this.editor.selection.getText();
	}
});

View.TextAreaEditor = View.Base.extend({
	initialize: function() {
		this.editor = $("#ueditor").css({"border":"1px solid #DDDDDD",
            "width":(window.UEDITOR_WIDTH ? window.UEDITOR_WIDTH + 6 : 626)+"px",
            "height":(window.UEDITOR_HEIGHT ? window.UEDITOR_HEIGHT + 30 : 190)+"px"
        }).addClass("textarea_mobile");
		App.views.editor = this;
		this.ustore_key = "ibooloo2_" + (window.__autosave_scope || 'home') + "_" + window.CURRENT_USER_ID;
		if (window.__autosave) this.init_autosave();
		
		App.trigger("editor_ready");
	},
	init_autosave: function() {
		this.support_ustore = USTORE.init();
		if (this.support_ustore){
			if (window.__draft)
				this.val(__draft);
			else
				this.val(USTORE.getValue(this.ustore_key));

			var self = this;
			var delay_save = _.debounce(function() {
				self.draft_save();
			},200)
			$(document).keydown(delay_save);
			window.onbeforeunload = function () {
			  self.draft_save();
			};
			$(document).keydown(function(e) {
				if (e.keyCode != 8) return;
		    var d = e.srcElement || e.target;
		    if ( (d.tagName.toUpperCase() != 'INPUT' && d.tagName.toUpperCase() != 'TEXTAREA') ||
							(d.tagName.toUpperCase() == 'INPUT' || d.tagName.toUpperCase() == 'TEXTAREA' ) && (d.readOnly || d.disabled))
						e.preventDefault();
			});
		}
	},
	draft_save: function() {
		if (this.support_ustore){
			var s = this.raw_val();
			USTORE.setValue(this.ustore_key, s );
		}
	},
	val: function(s) {
		if (_.isUndefined(s)){
			return _$.plain_html(this.editor.val());
		}	else{
			this.editor.val(s);
			this.draft_save();
		}
			
	},
	raw_val: function(s) {
		if (_.isUndefined(s))
			return this.editor.val();
		else
			this.editor.val(s);
	},
	is_empty: function() {
		return this.val().trim() == "";
	},
	count: function() {
		return this.val().length;
	}
});
});//end of loadit
