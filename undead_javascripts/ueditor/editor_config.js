(function (){
    var URL= window.location.href.match(/https?:\/\/[^\/]+/)+"/";
    UEDITOR_CONFIG = {
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
							className: 'edui-button-wide',
							title: '提到朋友',
							showText: false,
							onclick: function (){
								Dialog.InputAt.open(null,{callback:function(s){
									App.views.editor.append(s);
								}});
							}
            }),'Emotion', new baidu.editor.ui.Button({
							uiName: 'pic',
							className: 'edui-button-wide',
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
							className: 'edui-button-wide',
							showText: false,
							onclick: function (){
								Dialog.InputVideo.open(null,{callback: function(s) {
									App.views.editor.append(s);
								}});
							}
            }), new baidu.editor.ui.Button({
							uiName: 'music',
							title : '添加音乐',
							className: 'edui-button-wide',
							showText: false,
							onclick: function (){
								Dialog.InputMusic.open(null,{callback: function(s) {
									App.views.editor.append(s);
								}})
							}
            }), new baidu.editor.ui.Button({
							uiName: 'preview',
							title : '生成预览',
							className: 'edui-button-wide',
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
            '宋体': ['宋体', 'SimSun'],
            '楷体': ['楷体', '楷体_GB2312', 'SimKai'],
            '黑体': ['黑体', 'SimHei'],
            '隶书': ['隶书', 'SimLi'],
            'andale mono' : ['andale mono'],
            'arial' : ['arial','helvetica','sans-serif'],
            'arial black' : ['arial black','avant garde'],
            'comic sans ms' : ['comic sans ms'],
            'impact' : ['impact','chicago'],
            'times new roman' : ['times new roman']
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
		"h1{font-size:18px;}",
        initialContent: '',  //初始化编辑器的内容
        autoClearinitialContent:false,                        //是否自动清除编辑器初始内容
        removeFormatTags : 'b,big,code,del,dfn,em,font,i,ins,kbd,q,samp,small,span,strike,strong,sub,sup,tt,u,var',    //清除格式删除的标签
        removeFormatAttributes : 'class,style,lang,width,height,align,hspace,valign',                                  //清除格式删除的属性
        enterTag : 'br',                                       //编辑器回车标签。p或br
        maxUndoCount : 20,                                    //最多可以回退的次数
        maxInputCount : 10000000,                                   //当输入的字符数超过该值时，保存一次现场
        selectedTdClass : 'selectTdClass',                    //设定选中td的样式名称
        pasteplain : true,                                  //是否纯文本粘贴。false为不使用纯文本粘贴，true为使用纯文本粘贴
        textarea : 'text',                             //提交表单时，服务器获取编辑器提交内容的所用的参数，多实例时请给每个实例赋予不同的名字
        focus : false,                                       //初始化时，是否让编辑器获得焦点true或false
        indentValue : '2em',                                  //初始化时，首行缩进距离
        pageBreakTag : '_baidu_page_break_tag_',              //分页符
        minFrameHeight: (window.UEDITOR_HEIGHT || 164),        //最小高度
        autoHeightEnabled:true,                              //是否自动长高
        autoFloatEnabled: false,                              //是否保持toolbar的位置不动
        maximumWords:20000,                                  //允许的最大字符数
        tabSize : 4,                                         //tab的宽度
        tabNode : '&nbsp;',                                  //tab时的单一字符
        imagePopup:false,                                    //图片操作的浮层开关，默认打开
        emotionLocalization:true,                           //是否开启表情本地化，默认关闭。若要开启请确保emotion文件夹下包含官网提供的images表情文件夹
        sourceEditor: "codemirror",                          //源码的查看方式，codemirror 是代码高亮，textarea是文本框
        tdHeight : '20',                                    //单元格的默认高度
        messages:{
            pasteMsg:'编辑器将过滤掉您粘贴内容中的不支持格式！',//粘贴提示
            wordCountMsg:'当前已输入 {#count} 个字符，您还可以输入{#leave} 个字符 ',    //字数统计提示，{#count}代表当前字数，{#leave}代表还可以输入多少字符数。
            wordOverFlowMsg:'您输入的字符个数已经超出最大允许值，服务器可能会拒绝保存！', //超出闲置
            pasteWordImgMsg:'您粘贴的内容中包含本地图片，需要转存后才能正确显示！'
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
            FONT_SIZE: '小号',
            ROW_SPACING: '段间距',
            PARAGRAPH: '段落格式',
            LINE_HEIGHT :'行间距'
        }
    };
	
	window.UEDITOR_CONFIG_OVER = true;
})();
