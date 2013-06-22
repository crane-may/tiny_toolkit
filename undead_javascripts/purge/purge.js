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

var Default_Ele = {};
//
function SpanEle(purge,str){
  this.purge = purge;
  this.str = str;
  this.ele_type = "span";

  this.style = ( str.match(/ style\s*=\s*"[^"]*"/i) || str.match(/ style\s*=\s*'[^']*'/i) || [""] )[0];
  
  this.color = last_match_sub(this.style, /["'; ]color:\s*(#[0-9a-fA-F]+)/g, 1);  ////////"
  
  this.size = last_match_sub(this.style, /["'; ]font-size:\s*(\d+)px/g, 1);  ////////"
  if (this.size) {
    this.size = parseInt(this.size);
    if (this.size > 16) 
      this.size = 18;
    else
      this.size = 12;
  }
  
  this.weight = last_match_sub(this.style, /["'; ]font-weight:\s*(bolder|normal)/g, 1);  ////////"
  
  this.buf = "";
  this.append = function(s) {
    this.buf += s;
  };
  
  this.will_pop = function() {
    if (this.buf.trim() == "") return;
    if (this.purge.a_stack.not_empty())
      var dis = this.purge.a_stack.last();
    else
      var dis = this.purge.p_stack.last();
    
    console.log(this.purge.span_stack);
    var size  = this.size     || this.purge.span_stack.not_null_prop("size");
    var color = this.color    || this.purge.span_stack.not_null_prop("color");
    var weight = this.weight  || this.purge.span_stack.not_null_prop("weight");
    
    var style = "";
    
    if (size    != Default_Span.size)   style += "font-size:"+size+"px;";
    if (color   != Default_Span.color)  style += "color:"+color+";";
    if (weight  != Default_Span.weight) style += "font-weight:"+weight+";";
    
    if (style == "" || /<[^>]+>/.test(this.buf) )
      dis.append(this.buf);
    else
      dis.append('<span style="'+style+'">'+this.buf+'</span>');
		
		console.log("=="+this.buf);
		this.buf = "";
  };
  
  return this;
}
var Default_Span = new SpanEle(null,'<span style="font-size:12px; color:#000000; font-weight:normal;"></span>');

//
function AEle (purge,str) {
  this.purge = purge;
  this.str = str;
  this.ele_type = "a";
  
  var href = str.match(/ href\s*=\s*"([^"]*)"/i) || str.match(/ href\s*=\s*'([^']*)'/i) || null;
  if (href && href.length == 2){
    this.href = href[1]; 
  }else{
    this.href = null;
  }
  
  this.buf = "";
  this.append = function(s) {
    this.buf += s;
  };
  
  this.will_pop = function() {
    if (this.buf.trim() != "" && this.href != null)
      this.purge.p_stack.last().append('<a href="'+this.href+'">'+this.buf+'</a>');

		this.buf = "";
  };
  
  return this;
}
//
function BlockEle (purge,str) {
  this.purge = purge;
  this.str = str;
  this.ele_type = "p";
  
  this.style = ( str.match(/ style\s*=\s*"[^"]*"/i) || str.match(/ style\s*=\s*'[^']*'/i) || [""] )[0];
  this.align = last_match_sub(str, /align=['"]?(left|right|center)["']?/ig, 1) || last_match_sub(this.style, /align:\s*(left|right|center)/ig, 1);
  
  this.buf = "";
  this.append = function(s) {
    this.buf += s;
  };
  
  this.will_pop = function() {
    if (this.buf.trim() == "") return;
    
    var align = this.align || this.purge.p_stack.not_null_prop("align");
    
    var style = "";
    
    if (align != Default_P.align) style += "text-align:"+align+";";
    
    if (style == "")
      this.purge.append("<p>"+this.buf+"</p>");
    else
      this.purge.append('<p style="'+style+'">'+this.buf+'</p>');

		this.buf = "";
  };
  
  Default_Ele.span = new SpanEle(null,'<span style="font-size:12px; color:#000000; font-weight:normal;"></span>');
    
  this.default_span = function() {
    return new SpanEle(this.purge,'<span style="font-size:12px; color:#000000; font-weight:normal;"></span>');
  }
  
  return this;
}
var Default_P = new BlockEle(null,'<p style="text-align:left;">');
Default_Ele["p"] = Default_P;

//
//
var ele_type = [
  //p
  [/^<(p|div)/i,function(purge,str) {
    purge.span_stack.pop_all();
    purge.a_stack.pop_all();
  	
    purge.p_stack.push(new BlockEle(purge,str));
  }],
  //p close
  [/^<\/\s*(p|div)/i,function(purge,str) {
    purge.span_stack.pop_all();
    purge.a_stack.pop_all();

    purge.p_stack.pop();
  }],
  //span
  [/^<\s*span/i,function(purge, str) {
    purge.span_stack.push(new SpanEle(purge,str));
  }],
  //span close
  [/^<\/\s*span/i,function(purge, str) {
    purge.span_stack.pop();
  }],
  //h
  [/^<\s*h\d/i,function(purge, str) {
    purge.span_stack.push(new SpanEle(purge,'<span style="font-size:18px;">'));
  }],
  //h close
  [/^<\/\s*h\d/i,function(purge, str) {
    purge.span_stack.last().append("<br />");
    purge.span_stack.pop();
  }],
  //strong
  [/^<\s*(strong|b[^\w])/i,function(purge, str) {
    purge.span_stack.push(new SpanEle(purge,'<span style="font-weight:bolder;">'));
  }],
  //strong close
  [/^<\/\s*(strong|b[^\w])/i,function(purge, str) {
    purge.span_stack.pop();
  }],
  //a
  [/^<\s*a /i,function(purge, str) {
    purge.a_stack.pop_all();
    
    purge.a_stack.push(new AEle(purge,str));
    purge.span_stack.push(new SpanEle(purge,'<span>'));
  }],
  //a close
  [/^<\/\s*a/i,function(purge, str) {
    purge.span_stack.pop();
    purge.a_stack.pop_all();
  }],
  //br
  [/^<\s*br/i,function(purge,str) {
    purge.a_stack.pop_all();
    purge.span_stack.last().append("<br />");
  }],
  //img
  [/^<\s*img/i,function(purge,str) {
    purge.a_stack.pop_all();
    
    purge.span_stack.last().append(str);
  }], 
  //all html tag
  [/^</,function(purge,str) {}],
  //TEXT
  [/./,function(purge,str) {
    purge.span_stack.last().append(str);
  }],
  //end
  function(purge) {
    purge.span_stack.pop_all();
    purge.a_stack.pop_all();
    purge.p_stack.pop_all();
  }
];

function Purge (str) {
  this.str = str;
  this.buf = "";
  
  var stacks = ["p","a","span"];
  
  for (var i=0; i < stacks.length ; i++) {
    var stk = [];
    stk._pop = stk.pop;
    stk.pop = function() {
      this.last().will_pop();
      this._pop();
    };
    
    stk._push = stk.push;
    stk.push = function(item) {
      if(this.length > 0)
        this.last().will_pop();
      
      this._push(item);
    };
    
    stk.pop_all = function() {
      for (var j=0; j < this.length; j++) {
        this.pop();
      };
    };
    
    stk._not_null_prop = function(prop) {
      var stack_index = this.length - 1;
      var ret = null;
      
      while(ret == null && stack_index >=0 ){
        ret = this[stack_index][prop];
        stack_index -= 1;
      }
      
      return ret;
    };
    
    this[stacks[i]+"_stack"] = stk;
  };
  
  var purge = this;
  this.p_stack.last = function() {
    if (this.length == 0) this.push(new BlockEle(purge,'<p style="text-align:left;">'));
    return this[this.length - 1];
  };
  
  this.p_stack.not_null_prop = function(prop) {
    return this._not_null_prop() || Default_Ele["p"][prop];
  }
  
  this.span_stack.last = function() {
    if (this.length == 0) this.push(purge.p_stack.last().default_span());
    return this[this.length -1];
  };
  
  this.span_stack.not_null_prop = function(prop) {
    return this._not_null_prop() || Default_Ele["span"][prop];
  }
  
  this.a_stack.not_empty = function() {
    return this.length > 0;
  };
  
  this.a_stack.last = function() {
    if (this.not_empty) 
      return this[this.length -1];
    else
      null;
  };
  
};

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
        console.log(nw+" -- "+ele_type[i][0]);
        ele_type[i][1](this,nw);
        break;
      }
    }
    
    nw = this.next_word();
  }
  
  ele_type[ele_type.length - 1](this);
  
  return this.buf;
};