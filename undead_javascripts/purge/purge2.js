function last_match_sub (str, rex, sub_idx) {
  var arr = rex.exec(str);
  var ret = null;
  
  while (arr != null){
    if (arr.length > sub_idx)
      ret = arr[sub_idx];
    
    arr =  rex.exec(str);
  }
  return ret;
}

//
function TextEle (purge, str, parent) {
  this.purge = purge;
  this.str = str;
  this.ele_type = "text";
  this.parent = parent;
  this.is_leaf = true;
  
  this.serialize = function() {
		if (/^</.test(this.str))
			return this.str;
		else
    	return this.parent.wrapper(this.str);
  };
}

function ImgEle (purge, str, parent) {
  this.purge = purge;
  this.str = str;
  this.ele_type = "img";
  this.parent = parent;
  this.is_leaf = true;
  
  this.serialize = function() {
		return this.str;
	};
}

function SpanEle (purge, str, parent) {
  this.purge = purge;
  this.str = str || "<span>";
  this.ele_type = "span";
  this.parent = parent;
  
  this.default_size   = 12;
  this.default_color  = "#000000";
  this.default_weight = "normail";
  
  this.style = ( this.str.match(/ style\s*=\s*"[^"]*"/i) || this.str.match(/ style\s*=\s*'[^']*'/i) || [""] )[0];

  this.color = last_match_sub(this.str, /color=['"]?(#[0-9a-fA-F]+)["']?/ig, 1) || last_match_sub(this.style, /["'; ]color:\s*(#[0-9a-fA-F]+)/g, 1);  ////////"
  this.size = last_match_sub(this.style, /font:\s*(\d+)px/ig,1) || last_match_sub(this.style, /["'; ]font-size:\s*(\d+)px/g, 1);  ////////"
  if (this.size)  this.size = (parseInt(this.size) > 16) ? 18 : 12;
  this.weight = last_match_sub(this.style, /["'; ]font-weight:\s*(bolder|normal)/g, 1);  ////////"
  
  
  
  this.children = [];
  
  this.wrapper = function(s) {
    var size   = this.tree_prop("size");
    var color  = this.tree_prop("color");
    var weight = this.tree_prop("weight");
    
    var style = "";
    if (size && size != this.default_size) style += "font-size:"+size+"px;";
    if (color && color != this.default_color) style += "color:"+color.toUpperCase()+";";
    if (weight && weight != this.default_weight) style += "font-weight:"+weight+";";
    
    if (style)
      return '<span style="'+style+'">'+s+'</span>';
    else
      return s;
  };
  
  this.serialize = function() {
    var buf = "";
    for (var i=0; i < this.children.length; i++) {
      buf += this.children[i].serialize();
    }
    
    return buf;
  };
}

function AEle (purge, str, parent) {
  this.purge = purge;
  this.str = str || "<a>";
  this.ele_type = "a";
  this.parent = parent;
  
  var href = this.str.match(/ href\s*=\s*"([^"]*)"/i) || this.str.match(/ href\s*=\s*'([^']*)'/i) || null;
  if (href && href.length == 2) this.href = href[1]; 
  
  this.children = [];
  
  this.serialize = function() {
    var buf = "";
    for (var i=0; i < this.children.length; i++) {
      buf += this.children[i].serialize();
    }
    
    if (buf.trim() != "" && this.href != null)
      return '<a href="'+this.href+'">'+buf+'</a>';
    else
      return buf;
  };
}

function PEle (purge, str, parent) {
  this.purge = purge;
  this.str = str || "<p>";
  this.ele_type = "p"; 
  this.parent = parent;
  this.default_align = "left";
  this.default_indent = 0;
  
  this.style = ( this.str.match(/ style\s*=\s*"[^"]*"/i) || this.str.match(/ style\s*=\s*'[^']*'/i) || [""] )[0];
  this.align = last_match_sub(this.str, /align=['"]?(left|right|center)["']?/ig, 1) || last_match_sub(this.style, /align:\s*(left|right|center)/ig, 1);
  this.indent = last_match_sub(this.style, /["'; ]text-indent:\s*(\d+)px/g, 1);  ////////"
  if (this.indent)  this.indent = Math.floor( parseInt(this.indent) / 12 );
  
  this.children = [];
  
  this.wrapper = function(s) {
    var align  = this.tree_prop("align");
    var indent = this.tree_prop("indent");
    
    var style = "";
    if (align && align != this.default_align) style += "text-align:"+align+";";
    
    var indent_str = "";
    indent = indent || this.default_indent;
    for (var i=0; i < indent; i++) {
      indent_str += "　";
    };
    
    
    if (style)
      return '<p style="'+style+'">'+indent_str+s+'</p>';
    else
      return "<p>"+indent_str+s+"</p>";
  };
  
  this.serialize = function() {
    var buf = "";
    var will_wrapper = "";
    for (var i=0; i < this.children.length; i++) {
      var child_buf = this.children[i].serialize();
      if (this.children[i].ele_type == "p" && will_wrapper != "") {
          buf += this.wrapper(will_wrapper);
          will_wrapper = "";
      }
      
      if (/^<p/.test(child_buf)){
        buf += child_buf;
      }
      else{
        will_wrapper += child_buf;
      }
    }
    
    if (will_wrapper != ""){
      buf += this.wrapper(will_wrapper);
      will_wrapper = "";
    }
    
    return buf;
  };
}

function BodyEle (purge, str, parent) {
  this.purge = purge;
  this.str = str || "";
  this.ele_type = "body"; 
  this.parent = parent;
  
  this.children = [];
  
  this.serialize = function() {
    var buf = "";
    for (var i=0; i < this.children.length; i++) {
      buf += this.children[i].serialize();
    }
    return buf;
  };
}

//
var ele_chain = {
  p : {
    parent_is_that_then_close : ["a","span"],
    parent_must_be : ["p","body"],
    cls : PEle
  },
  a : {
    parent_is_that_then_close : ["a","span"],
    parent_must_be : ["p"],
    cls : AEle
  },
  span : {
    parent_must_be : ["p","a","span"],
    cls : SpanEle
  },
  text : {
    parent_must_be : ["span"],
    cls : TextEle
  },
  img : {
    parent_is_that_then_close : ["a","span"],
    parent_must_be : ["p"],
    cls : ImgEle
  }
};

function Purge (str) {
  this.str = str;
  this.buf = "";
  
  this.tree_top = new BodyEle(this);
  this.tree_ptr = this.tree_top;
}

Purge.prototype.tree_log = function() {
  var log_p = this.tree_ptr, log_buf = "";
  while (log_p){
    log_buf += log_p.ele_type + "<=";
    log_p = log_p.parent;
  }
  console.log(log_buf);
}

Purge.prototype.add = function(ele_cls_or_ins, str) {
  console.log(ele_cls_or_ins);
  
  var ele = ele_cls_or_ins.ele_type ? ele_cls_or_ins : (new (ele_chain[ele_cls_or_ins].cls)(this, str));
  var chain = ele_chain[ele.ele_type];
  
  if (chain.parent_is_that_then_close){
    while (chain.parent_is_that_then_close.indexOf(this.tree_ptr.ele_type) >= 0){
      this.tree_ptr = this.tree_ptr.parent;
    }
  }
  
  if (chain.parent_must_be.indexOf(this.tree_ptr.ele_type) < 0){
    var ele_create = new (ele_chain[chain.parent_must_be[0]].cls)(this);
    this.add(ele_create);
  }
  
  this.tree_log();
  
  this.tree_ptr.children.push(ele);
  ele.parent = this.tree_ptr;
  if (! ele.is_leaf) this.tree_ptr = ele;
  
  //util func
  ele.tree_prop = function(prop) {
    var tar = this;
    while (tar && ! tar[prop]) tar = tar.parent;
    return tar ? tar[prop] : null;
  };
};

Purge.prototype.close = function(ele_type) {
  var ptr = this.tree_ptr;
  while (ptr && ptr.ele_type != ele_type){
    ptr = ptr.parent;
  }
  
  if (ptr) this.tree_ptr = ptr.parent;
  
  this.tree_log();
}

Purge.prototype.append = function(s) {
  this.buf += s;
};

Purge.prototype.next_word = function() {
  var m = this.str.match(/^[^<]+|^<[^>]+>/);
  if (m){
    m = m[0];
    this.str = this.str.substr(m.length);
    return m;   
  }else{
    return null;
  }
};

Purge.prototype.pur = function() {
  var nw = this.next_word();
  while (nw != null){
    var i=0;
    for (var i=0;i<ele_type.length - 1;i++ ){
      if (ele_type[i][0].test(nw)){
        console.log("=======")
        console.log(nw+" -- "+ele_type[i][0]);
        ele_type[i][1](this,nw);
        break;
      }
    }
    
    nw = this.next_word();
  }
  
  ele_type[ele_type.length - 1](this);
  return this;
};

Purge.prototype.serialize = function() {
  return this.tree_top.serialize();
}

//
//
var ele_type = [
  //p
  [/^<(p|div)/i,function(purge,str) {
    purge.add("p",str);
  }],
  //p close
  [/^<\/\s*(p|div)/i,function(purge,str) {
    purge.close("p");
  }],
  //span
  [/^<\s*(span|font)/i,function(purge, str) {
    purge.add("span",str);
  }],
  //span close
  [/^<\/\s*(span|font)/i,function(purge, str) {
    purge.close("span");
  }],
  //h
  [/^<\s*h\d/i,function(purge, str) {
    purge.add("span",'<span style="font-size:18px;">');
  }],
  //h close
  [/^<\/\s*h\d/i,function(purge, str) {
    purge.close("span");
    purge.add("text","<br />");
  }],
  //strong
  [/^<\s*(strong|b[^\w])/i,function(purge, str) {
    purge.add("span",'<span style="font-weight:bolder;">');
  }],
  //strong close
  [/^<\/\s*(strong|b[^\w])/i,function(purge, str) {
    purge.close("span");
  }],
  //a
  [/^<\s*a /i,function(purge, str) {
    purge.add("a",str);
  }],
  //a close
  [/^<\/\s*a/i,function(purge, str) {
    purge.close("a");
  }],
  //br
  [/^<\s*br/i,function(purge,str) {
    purge.add("text","<br />");
  }],
  //img
  [/^<\s*img/i,function(purge,str) {
    purge.add("img",str);
  }], 
  //all html tag
  [/^</,function(purge,str) {}],
  //TEXT
  [/./,function(purge,str) {
    purge.add("text",str);
  }],
  //end
  function(purge) {
  }
];