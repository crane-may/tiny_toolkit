///import core
///commands 为非ie浏览器自动添加a标签
/**
 * @description 为非ie浏览器自动添加a标签
 * @author zhanyi
 */
(function() {

    var editor = baidu.editor,
        browser = editor.browser,
        domUtils = editor.dom.domUtils;

    baidu.editor.plugins['autolink'] = function() {
        var cont = 0;


        if (browser.ie) {
            return;
        }

        var me = this;
        me.addListener('reset',function(){
           cont = 0;
        });
        me.addListener('keydown', function(type, evt) {
            var keyCode = evt.keyCode || evt.which;

            if (keyCode == 32 || keyCode == 13) {

                var sel = me.selection.getNative(),
                    range = sel.getRangeAt(0).cloneRange(),
                    offset,
                    charCode;

                var start = range.startContainer;
                while (start.nodeType == 1 && range.startOffset > 0) {
                    start = range.startContainer.childNodes[range.startOffset - 1];
                    if (!start)
                        break;

                    range.setStart(start, start.nodeType == 1 ? start.childNodes.length : start.nodeValue.length);
                    range.collapse(true);
                    start = range.startContainer;
                }

                do{
                    if (range.startOffset == 0) {
                        start = range.startContainer.previousSibling;

                        while (start && start.nodeType == 1) {
                            start = start.lastChild;
                        }
                        if (!start || domUtils.isFillChar(start))
                            break;
                        offset = start.nodeValue.length;
                    } else {
                        start = range.startContainer;
                        offset = range.startOffset;
                    }
                    range.setStart(start, offset - 1);
                    charCode = range.toString().charCodeAt(0);
                } while (charCode != 160 && charCode != 32);

                if (range.toString().replace(new RegExp(domUtils.fillChar, 'g'), '').match(/^(\s*)(?:https?:\/\/|ssh:\/\/|ftp:\/\/|file:\/|www\.)/i)) {

                    var a = me.document.createElement('a'),text = me.document.createTextNode(' '),href;
                    //去掉开头的空格
                    if (RegExp.$1.length) {
                        range.setStart(range.startContainer, range.startOffset + RegExp.$1.length);
                    }
                    a.appendChild(range.extractContents());
                    a.href = a.innerHTML = a.innerHTML.replace(/<[^>]+>/g,'');
                    href = a.getAttribute("href").replace(new RegExp(domUtils.fillChar,'g'),'');

                    a.href = /^(?:https?:\/\/)/ig.test(href) ? href : "http://"+href;

                    range.insertNode(a);
                    a.parentNode.insertBefore(text, a.nextSibling);
                    range.setStart(text, 0);
                    range.collapse(true);
                    sel.removeAllRanges();
                    sel.addRange(range)
                }
            }


        })
    }

})();
