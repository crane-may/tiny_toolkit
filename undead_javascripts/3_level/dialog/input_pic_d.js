loadit("Dialog.Input-pic",function(){
var upload_id = 1000;

Dialog.InputPic = Dialog.Base.extend({
  template: DialogTempl["input_pic"],
  height:425,
  modal_option:{
    focus: false
  },
  events:{
    "click .yes":"on_yes"
  },
  onShow: function() {
    if (this.createCORSRequest() != null && ! __.sogou) {
      this.init_html5();
    }else if ($.flash.available) { //flash(
      this.init_flash();
    }else{
      this.init_form();
    }
  },
  
  init_form: function() {
    this.$("form").html('<div id="image_uploader" class="image_uploader"></div>').find("div").easy_uploader({
      text:"",
      name:"image",
      context: this,
      onchange: function() {
        if (this.is_enough_img()) {
          __.fail("一篇日记最多上传40个图片");
          __.unlock("upload_img");
          return;
        }
    
        __.lock({
          handler: function() {
            this.loading.show();
            this.form.submit_with_iframe_redirect(window.IMG_UPLOAD_ROOT+'/upload',function(result) {
              if (!this.is_close){
                this.img_index++;
                var tar = $('<li>'+
                              '<span class="thumb_pic left"><img data-pid="'+result+'" src="'+$_.image(result, 'S1')+'" /></span>'+
                              '<span class="thumb_pic_manage right alL">&nbsp;<a href="javascript:void(0)" title="删除" class="thumb_pic_del">&nbsp;</a></span>'+
                            '</li>');
                
                tar.find("a").click(__.prevent(function(){
                  tar.remove();
                }));
                this.ul.append(tar);
              }
            },__.error,"upload_img",this);
          },
          lock: "upload_img",
          unlock: function() {
            this.loading.hide();
          }
        }).call(this);
      }
    });
    this.$(".image_uploader_load").remove();
    this.form = this.$("form");
    this.form[0].reset();
    this.ul = this.$("ul");
    this.ul.empty();
    this.loading = this.$(".loading_span");
    this.img_index = 0;
  },
  
  init_flash: function() {
    var self = this;
    
    var timeout = setTimeout(function() {
      self.init_form();
    },6000*1);
    
    var swfu = new SWFUpload({
      upload_url : window.IMG_UPLOAD_ROOT+"/set",
      flash_url : window.STATIC_ROOT+"/swfupload.swf",
      prevent_swf_caching : true,
      file_post_name : "image",
      file_types : "*.jpg;*.jpeg;*.JPG;*.JPEG;*.gif;*.png;*.bmp",
      file_size_limit : "4MB",
      button_placeholder_id : "image_uploader",
      button_image_url : window.STATIC_ROOT+(window.__topic_id ? "/images/select_file_btn_grey.gif" : "/images/select_file_btn.gif"),
      button_text : "",
      button_width : 90,
      button_height : 36,
      button_text_top_padding: 6,
      button_text_left_padding: 14,
      button_window_mode : SWFUpload.WINDOW_MODE.TRANSPARENT,
      custom_settings : {
        progressTarget : "thumb_list"
      },
      swfupload_loaded_handler: function() {
        clearTimeout(timeout);
        self.$(".image_uploader_load").remove();
      },
      file_dialog_complete_handler: function (numFilesSelected, numFilesQueued) {
      //         if (numFilesQueued > 0) {
      //           this.startUpload();
      //         }
      },
      file_queued_handler: function(file) {
        if (self.is_enough_img()) {
          __.fail_continue("一篇日记最多上传40个图片");
          this.cancelUpload(file.id);
          return;
        }
    
        var tar = $('<li id="progress_'+file.id+'">'+
                      '<span class="thumb_pic thumb_default_pic left"></span>'+
                      '<span class="progress_bar left round_corner_3" style="background-position:-280px -100px"></span>'+
                      '<span class="thumb_pic_manage left alL"><span class="progress_data cGray">0%</span>&nbsp;&nbsp;<a href="javascript:void(0)" title="删除" class="thumb_pic_del">&nbsp;</a></span>'+
                    '</li>');
                    
        var file_self = this; 
        var file_ = file;
        tar.find("a").click(__.prevent(function(){
          $(this).closest("li").remove();
          file_self.cancelUpload(file_.id);
        }));
        self.$("ul").append(tar);
    
        try { if (this.getStats().files_queued > 0) { this.startUpload(); }} catch (ex) { this.debug(ex);}
      },
      file_queue_error_handler: function() { },
      upload_error_handler: function(file, errorCode, message) { 
        if (window.CATCH_ERROR && window.send_crash_org) send_crash_org("swfuploader:"+errorCode + message); 
      
        var tar = self.$("#progress_"+file.id);
            tar.find(".progress_bar").removeClass("progress_bar").addClass("progress_error").html("图片上传失败<br />请稍后再试");
            tar.find(".progress_data").html("");
      },
      upload_start_handler: function(file) {  },
      upload_progress_handler: function(file, bytesLoaded) {
        var tar = self.$("#progress_"+file.id);
        var percent = Math.ceil((bytesLoaded / file.size) * 100);
        if (percent >= 100) percent = 99;
        tar.find(".progress_bar").css("background-position", Math.ceil((percent*1.80)-280.0) + "px -100px" );
        tar.find(".progress_data").html(percent+"%");
      },
      upload_complete_handler: function(file) {
        try { if (this.getStats().files_queued > 0) { this.startUpload(); }} catch (ex) { this.debug(ex);}
      },
      upload_success_handler: function(file, serverData) {
        var tar = self.$("#progress_"+file.id);
        
        var mat = serverData.match(/result\s*=\s*['"]([0-9a-fA-F]+)['"]/);
        if (mat && mat.length == 2) {
          var error = null;
          if (mat[1] == "1"){
            error = "图片上传失败<br />请检查图片的大小";
          }else if (mat[1] == "2"){
            error = "上传的图片格式错误<br />请上传常用格式图片文件";
          }else if (mat[1] === "0"){
            error = "上传的图片格式错误<br />请上传常用格式的图片文件";
          }else if (mat[1] === undefined){
            error = "图片上传失败<br />请检查图片大小";
          }
          
          if (error != null) {
            tar.find(".progress_bar").removeClass("progress_bar").addClass("progress_error").html(error);
            tar.find(".progress_data").html("");
          }else{
            tar.find(".thumb_pic").removeClass("thumb_default_pic").html('<img data-pid="'+mat[1]+'" src="'+$_.image(mat[1], 'S1')+'" />');
            tar.find(".progress_bar").css("background-position", "-100px -100px");
            tar.find(".progress_data").html("完成");
          }
          
        }else{
          tar.find(".progress_bar").removeClass("progress_bar").addClass("progress_error").html("上传图片格式错误<br />请上传常用格式的图片文件");
          tar.find(".progress_data").html("");
        }
      }
    });
  },
  
  createCORSRequest: function(method, url) {
    if (window.XMLHttpRequest) {
      var xhr = new XMLHttpRequest();
      if (! ("withCredentials" in xhr)) {
        xhr = null;
      }
      return xhr;
    }else{
      return null;
    }
  },
  init_html5: function() {
    var self = this;
    this.$("form").html('<div id="image_uploader" class="image_uploader"></div>').find("div").easy_uploader({
      text:"",
      name:"image",
      context: this,
      onchange: function(e) {
        var files = e.target.files || e.dataTransfer.files;
        var not_allow = 0;
        
        if (self.is_enough_img(files.length)) {
          __.error("一篇日记最多上传40个图片");
          return;
        }
        
        _(files).each(function(file) {
          if (file.size > 4*1024*1024 || ! /image/.test(file.type)) not_allow++;
          file.upload_id = upload_id++;
        });
        
        if(not_allow > 0) {
          __.error("上传的文件不是图片或者超过4M");
          return;
        }
        
        _(files).each(function(file) {
          var tar = $('<li id="html5_upload_'+file.upload_id+'">'+
                        '<span class="thumb_pic thumb_default_pic left"></span>'+
                        '<span class="progress_bar left round_corner_3" style="background-position:-280px -100px"></span>'+
                        '<span class="thumb_pic_manage left alL"><span class="progress_data cGray">0%</span>&nbsp;&nbsp;<a href="javascript:void(0)" title="删除" class="thumb_pic_del">&nbsp;</a></span>'+
                      '</li>');
          tar.find("a").click(function() {
            tar.remove();
          })
          
          self.$("ul").append(tar);
  				var xhr = self.createCORSRequest();
  				if (xhr.upload) {
  					xhr.upload.addEventListener("progress", function(e) {
  						var percent = Math.ceil((e.loaded / e.total) * 100);
              if (percent >= 100) percent = 99;
              tar.find(".progress_bar").css("background-position", Math.ceil((percent*1.80)-280.0) + "px -100px" );
              tar.find(".progress_data").html(percent+"%");
  					}, false);
		        
  					xhr.onreadystatechange = function(e) {
  						if (xhr.readyState == 4) {
  							if (xhr.status == 200) {
                  // console.log(xhr.responseText);
                  var ret = xhr.responseText.split(",")[0];
                  var error = null;
                  if (ret == "1"){
                    error = "图片上传失败<br />请检查图片的大小";
                  }else if (ret == "2"){
                    error = "上传的图片格式错误<br />请上传常用格式图片文件";
                  }else if (ret === "0"){
                    error = "上传的图片格式错误<br />请上传常用格式的图片文件";
                  }else if (ret === ""){
                    error = "图片上传失败<br />请检查图片大小";
                  }
          
                  if (error != null) {
                    tar.find(".progress_bar").removeClass("progress_bar").addClass("progress_error").html(error);
                    tar.find(".progress_data").html("");
                  }else{
                    tar.find(".thumb_pic").removeClass("thumb_default_pic").html('<img data-pid="'+ret+'" src="'+$_.image(ret, 'S1')+'" />');
                    tar.find(".progress_bar").css("background-position", "-100px -100px");
                    tar.find(".progress_data").html("完成");
                  }
  							} else {
                  // console.log(xhr.responseText);
                  tar.find(".progress_bar").removeClass("progress_bar").addClass("progress_error").html("上传图片格式错误<br />请上传常用格式的图片文件");
                  tar.find(".progress_data").html("");
  							}
  						}
  					};
  					xhr.open("POST", window.IMG_UPLOAD_ROOT+"/put", true);
            xhr.setRequestHeader('Content-Type', file.type);
            
            xhr.send(file);
  				}
        });
      }
    });
    this.$(".image_uploader_load").remove();
    this.form = this.$("form");
    this.form[0].reset();
    this.ul = this.$("ul");
    this.ul.empty();
    this.loading = this.$(".loading_span");
  },
  
  is_enough_img: function(n) {
    var count = this.$("ul li").length;
    if (App.views.editor && App.views.editor.editor && App.views.editor.editor.document) {
      count += $(App.views.editor.editor.document.body).find("img[ex_image=true]").length;
    }
    return count + (n ? n : 0) >= 40;
  },
  on_yes: function() {
    var not_finish = false;
    this.$(".progress_data").each(function(){
      if (/[%]/.test($(this).html())) not_finish = true;
    });
    if (not_finish){
      __.fail("图片正在上传中，请稍后");
      return;
    }
    
    var imgs = this.$("ul img");
    if (imgs.length > 0){
      var s = _(imgs).map(function(img){
        var id = $(img).attr("data-pid");
        return ' <img src="'+$_.image(id,"L3")+'" ex_image="true" onresizestart="cannot_resize_img(event);"/> <br /> ';
      }).join("");

      if(this.callback){
        this.callback(s);
      }
      
      App.trigger("insert_img");
    }
    $.modal.close();
  }
})
});//end of loadit