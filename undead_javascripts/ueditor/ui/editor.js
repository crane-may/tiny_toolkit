(function (){
    var utils = baidu.editor.utils,
        uiUtils = baidu.editor.ui.uiUtils,
        UIBase = baidu.editor.ui.UIBase;

    function EditorUI(options){
        this.initOptions(options);
        this.initEditorUI();
    }
    EditorUI.prototype = {
        uiName: 'editor',
        initEditorUI: function (){
            this.editor.ui = this;
            this._dialogs ={};
            this.initUIBase();
            this._initToolbars();
            var editor = this.editor;
            editor.addListener('ready', function (){
                baidu.editor.dom.domUtils.on(editor.window, 'scroll', function (){
                    baidu.editor.ui.Popup.postHide();
                });

                //display bottom-bar label based on config
                if(editor.options.elementPathEnabled){
                    editor.ui.getDom('elementpath').innerHTML = '<div class="edui-editor-breadcrumb">path:</div>';
                }
                if(editor.options.wordCount){
                    editor.ui.getDom('wordcount').innerHTML = '字数统计';
                }
                if(editor.selection.getNative())
                    editor.fireEvent('selectionchange', false, true);
            });
            editor.addListener('mousedown', function (t, evt){
                var el = evt.target || evt.srcElement;
                baidu.editor.ui.Popup.postHide(el);
            });
            editor.addListener('contextmenu', function (t, evt){
                baidu.editor.ui.Popup.postHide();
            });
            var me = this;
            editor.addListener('selectionchange', function (){
                me._updateElementPath();
                //字数统计
                me._wordCount();
            });
            editor.addListener('sourcemodechanged', function (t, mode){
                if(editor.options.elementPathEnabled){
                    if (mode) {
                        me.disableElementPath();
                    } else {
                        me.enableElementPath();
                    }
                }
                if(editor.options.wordCount){
                     if (mode) {
                        me.disableWordCount();
                    } else {
                        me.enableWordCount();
                    }
                }


            });
        },
        _initToolbars: function (){
            var editor = this.editor;
            var toolbars = this.toolbars || [];
            var toolbarUis = [];
            for (var i=0; i<toolbars.length; i++) {
                var toolbar = toolbars[i];
                var toolbarUi = new baidu.editor.ui.Toolbar();
                for (var j=0; j<toolbar.length; j++) {
                    var toolbarItem = toolbar[j];
                    var toolbarItemUi = null;
                    if (typeof toolbarItem == 'string') {
                        if (toolbarItem == '|') {
                            toolbarItem = 'Separator';
                        }

                        if (baidu.editor.ui[toolbarItem]) {
                            toolbarItemUi = new baidu.editor.ui[toolbarItem](editor);
                        }
                        
                        //todo fullscreen这里单独处理一下，放到首行去
                        if(toolbarItem == 'FullScreen'){
                            if(toolbarUis && toolbarUis[0]){
                                toolbarUis[0].items.splice(0,0,toolbarItemUi);
                            }else{
                                 toolbarUi.items.splice(0,0,toolbarItemUi);
                            }

                                continue;
                            

                        }
                    } else {
                        toolbarItemUi = toolbarItem;
                    }
                    if (toolbarItemUi) {
                        toolbarUi.add(toolbarItemUi);
                    }
                }
                toolbarUis[i] = toolbarUi;
            }
            this.toolbars = toolbarUis;
        },
        getHtmlTpl: function (){
            return '<div id="##" class="%%">' +
                '<div id="##_toolbarbox" class="%%-toolbarbox">' +
                 '<div id="##_toolbarboxouter" class="%%-toolbarboxouter"><div class="%%-toolbarboxinner">' +
                  this.renderToolbarBoxHtml() +
                 '</div></div>' +
                 '<div id="##_toolbarmsg" class="%%-toolbarmsg" style="display:none;">' +
                  '<div id = "##_upload_dialog" class="%%-toolbarmsg-upload" onclick="$$.showWordImageDialog();">点此上传</div>' +
                  '<div class="%%-toolbarmsg-close" onclick="$$.hideToolbarMsg();">x</div>' +
                  '<div id="##_toolbarmsg_label" class="%%-toolbarmsg-label"></div>' +
                  '<div style="height:0;overflow:hidden;clear:both;"></div>' +
                 '</div>' +
                '</div>' +
                '<div id="##_iframeholder" class="%%-iframeholder"></div>' +
                //modify wdcount by matao
                '<div id="##_bottombar" class="%%-bottomContainer"><table><tr>' +
                '<td id="##_elementpath" class="%%-bottombar"></td>' +
                '<td id="##_wordcount" class="%%-wordcount"></td>' +
                '</tr></table></div>' +
                '</div>';
        },
        showWordImageDialog:function(){
            this.editor.execCommand("checkimage","_localImages");
            this._dialogs['wordImageDialog'].open();
        },
        renderToolbarBoxHtml: function (){
            var buff = [];
            for (var i=0; i<this.toolbars.length; i++) {
                buff.push(this.toolbars[i].renderHtml());
            }
            return buff.join('');
        },
        _wordCount:function(){
            var wdcount = this.getDom('wordcount');
            if(!this.editor.options.wordCount) {
                wdcount.style.display="none";
                return;
            }
            wdcount.innerHTML = this.editor.queryCommandValue("wordcount");
        },
        disableWordCount: function (){
            var w = this.getDom('wordcount');
            w.innerHTML = '';
            w.style.display = 'none';
            this.wordcount = false;

        },
        enableWordCount: function (){
            var w = this.getDom('wordcount');
            w.style.display = '';
            this.wordcount = true;
            this._wordCount();
        },
        _updateFullScreen: function (){
            if (this._fullscreen) {
                var vpRect = uiUtils.getViewportRect();
                this.getDom().style.cssText = 'border:0;position:absolute;left:0;top:0;width:'+vpRect.width+'px;height:'+vpRect.height+'px;';
                uiUtils.setViewportOffset(this.getDom(), { left: 0, top: 0 });
                this.editor.setHeight(vpRect.height - this.getDom('toolbarbox').offsetHeight - this.getDom('bottombar').offsetHeight);
            }
        },
        _updateElementPath: function (){
            var bottom = this.getDom('elementpath');
            if (this.elementPathEnabled) {
                var list = this.editor.queryCommandValue('elementpath');
                var buff = [];
                for(var i=0,ci;ci=list[i];i++){
                    buff[i] = this.formatHtml('<span unselectable="on" onclick="$$.editor.execCommand(&quot;elementpath&quot;, &quot;'+ i +'&quot;);">' + ci + '</span>');
                }
                bottom.innerHTML = '<div class="edui-editor-breadcrumb" onmousedown="return false;">path: ' + buff.join(' &gt; ') + '</div>';
                
            }else{
                bottom.style.display = 'none'
            }
        },
        disableElementPath: function (){
            var bottom = this.getDom('elementpath');
            bottom.innerHTML = '';
            bottom.style.display = 'none';
            this.elementPathEnabled = false;

        },
        enableElementPath: function (){
            var bottom = this.getDom('elementpath');
            bottom.style.display = '';
            this.elementPathEnabled = true;
            this._updateElementPath();
        },
        isFullScreen: function (){
            return this._fullscreen;
        },
        postRender: function (){
            UIBase.prototype.postRender.call(this);
            for (var i=0; i<this.toolbars.length; i++) {
                this.toolbars[i].postRender();
            }
            var me = this;
            var timerId,
                domUtils = baidu.editor.dom.domUtils,
                updateFullScreenTime = function(){
                    clearTimeout(timerId);
                    timerId = setTimeout(function (){
                        me._updateFullScreen();
                    });
                };
            domUtils.on(window, 'resize',updateFullScreenTime);

            me.addListener('destory',function(){
                domUtils.un(window,'resize',updateFullScreenTime);
                clearTimeout(timerId);
            })
        },
        showToolbarMsg: function (msg,flag){
            this.getDom('toolbarmsg_label').innerHTML = msg;
            this.getDom('toolbarmsg').style.display = '';
            //
            if(!flag){
                var w = this.getDom('upload_dialog');
                w.style.display = 'none';
            }
        },
        hideToolbarMsg: function (){
            this.getDom('toolbarmsg').style.display = 'none';
        },
        mapUrl: function (url){
            return url.replace('~/', this.editor.options.UEDITOR_HOME_URL || '');
        },
        triggerLayout: function (){
            var dom = this.getDom();
            if (dom.style.zoom == '1') {
                dom.style.zoom = '100%';
            } else {
                dom.style.zoom = '1';
            }
        }
    };
    utils.inherits(EditorUI, baidu.editor.ui.UIBase);

    baidu.editor.ui.Editor = function (options){
        
        var editor = new baidu.editor.Editor(options);
        editor.options.editor = editor;
        new EditorUI(editor.options);
        
        
        var oldRender = editor.render;
        editor.render = function (holder){
           if(holder){
                if (holder.constructor === String) {
                    holder = document.getElementById(holder);
                }

                if(holder && /script|textarea/ig.test(holder.tagName)){
                    var newDiv = document.createElement('div');
                    holder.parentNode.insertBefore(newDiv,holder);
                    editor.options.initialContent = holder.value || holder.innerHTML;
                    newDiv.id = holder.id;
                    newDiv.className = holder.className;
                    newDiv.style.cssText = newDiv.style.cssText;
                    holder.parentNode.removeChild(holder);
                    holder = newDiv;
                    holder.innerHTML = '';
                }
            }


            editor.ui.render(holder);
            var iframeholder = editor.ui.getDom('iframeholder');
            //给实例添加一个编辑器的容器引用
            editor.container = editor.ui.getDom();
            oldRender.call(editor, iframeholder);
        };
        return editor;
    };
})();