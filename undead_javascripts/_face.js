SYNC_NOTICE.setup_with(View.Notice);

var save_btn = $("#save_face_btn");

function init_form () {
	$("#face_uploader").easy_uploader({
	  text:"选择图片",
	  name:"image",
	  onchange: function() {
			if (! __.is_mobile_phone()){
				$("#form_upload_face").submit_with_iframe_redirect(window.IMG_UPLOAD_ROOT+'/upload',loading_face,__.error);
				$('#displayface').html('<div class="display_face_load"><img src="'+$_.static_url('/images/loading.gif')+'" /></div>');
				$('#displayface').removeClass('hidden');		
				save_btn.loading_mask({html:"上传中..."});
			}else{
				alert("此功能不支持手机浏览器");
			}
		}
	});
}

function init_flash() {
  var timeout = setTimeout(function() {
    $("#form_upload_face").html('<div id="face_uploader" class="face_uploader"></div>');
    init_form();
  },6000*1);
    
  var swfu = new SWFUpload({
    upload_url : window.IMG_UPLOAD_ROOT+"/set",
    flash_url : window.STATIC_ROOT+"/swfupload.swf",
    prevent_swf_caching : true,
    file_post_name : "image",
    file_types : "*.jpg;*.jpeg;*.JPG;*.JPEG;*.gif;*.png;*.bmp",
    file_size_limit : "4MB",
    file_queue_limit: 1,
    file_upload_limit:20,
    button_placeholder_id : "face_uploader",
    button_image_url : window.STATIC_ROOT+"/images/select_file_btn.gif",
    button_text : "",
    button_width : 90,
    button_height : 36,
    button_text_top_padding: 6,
    button_text_left_padding: 14,
    button_window_mode : SWFUpload.WINDOW_MODE.TRANSPARENT,
    swfupload_loaded_handler: function() {
      clearTimeout(timeout);
    },
    file_queued_handler: function(file) {
      var tar = $('<div id="progress_'+file.id+'" class="progress clearfix">'+
					'<div class="progress_bar left round_corner_3" style="background-position-x:-300px"></div>'+
					'<div class="thumb_pic_manage left alR"><p class="progress_data cGray">0%</p></div>'+
				'</div>')
                    
      var file_self = this; 
      var file_ = file;
      tar.find("a").click(__.prevent(function(){
        $(this).closest("li").remove();
        file_self.cancelUpload(file_.id);
      }));
      $('#displayface').empty().append(tar).removeClass('hidden');
	    $('#save_face').removeClass('hidden');
      save_btn.loading_mask({html:"上传中..."});

    
      try { if (this.getStats().files_queued > 0) { this.startUpload(); }} catch (ex) { this.debug(ex);}
    },
    file_queue_error_handler: function(a,b,c) {
      __.error("请选择一个图片文件上传");
    },
    upload_error_handler: function(file, errorCode, message) { 
      if (window.CATCH_ERROR && window.send_crash_org) send_crash_org("swfuploader_face:"+errorCode + message); 
      __.error("图片上传失败<br />请稍后再试");
    },
    upload_start_handler: function(file) {  },
    upload_progress_handler: function(file, bytesLoaded) {
      var tar = $("#progress_"+file.id);
      var percent = Math.ceil((bytesLoaded / file.size) * 100);
      if (percent >= 100) percent = 99;
      tar.find(".progress_bar").css("background-position-x", Math.ceil((percent*2.8)-280.0) + "px" );
      tar.find(".progress_data").html(percent+"%");
    },
    upload_complete_handler: function(file) {
      try { if (this.getStats().files_queued > 0) { this.startUpload(); }} catch (ex) { this.debug(ex);}
    },
    upload_success_handler: function(file, serverData) {
      var tar = self.$("#progress_"+file.id);
      file
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
          __.error(error);
        }else{
          var wh = serverData.match(/r_width = (\d+);.*r_height = (\d+)/);
		      loading_face(mat[1],wh[1],wh[2]);
        }
          
      }else{
        __.error("上传图片格式错误<br />请上传常用格式的图片文件");
      }
    }
  });
}

function createCORSRequest(method) {
  if (window.XMLHttpRequest) {
    var xhr = new XMLHttpRequest();
    if (! ("withCredentials" in xhr)) {
      xhr = null;
    }
    return xhr;
  }else{
    return null;
  }
}
function init_html5() {
  $("#face_uploader").easy_uploader({
    text:"",
    name:"image",
    context: this,
    onchange: function(e) {
      var files = e.target.files || e.dataTransfer.files;
      if (files.length > 1) {
        __.error("请选择一个图片文件上传");
        return;
      }
      var file = files[0];
      if (file.size > 4*1024*1024 || ! /image/.test(file.type)) {
        __.error("上传的文件不是图片或者超过4M");
        return;
      }
        
      var tar = $('<div class="progress clearfix">'+
  					'<div class="progress_bar left round_corner_3" style="background-position:-280px -100px"></div>'+
  					'<div class="thumb_pic_manage left alR"><p class="progress_data cGray">0%</p></div>'+
  				'</div>')
      tar.find("a").click(function() {
        tar.remove();
      });
      
    $('#displayface').empty().append(tar).removeClass("hidden");
	  $('#save_face').removeClass('hidden');
		save_btn.loading_mask({html:"上传中..."});
	  
	  var xhr = createCORSRequest();
			if (xhr.upload) {
				xhr.upload.addEventListener("progress", function(e) {
					var percent = Math.ceil((e.loaded / e.total) * 100);
          if (percent >= 100) percent = 99;
          tar.find(".progress_bar").css("background-position", Math.ceil((percent*2.8)-280.0) + "px -100px" );
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
                __.error(error);
              }else{
                var wh = xhr.responseText.split(",");
      		      loading_face(wh[0],wh[1],wh[2]);
              }
						} else {
              __.error("上传图片格式错误<br />请上传常用格式的图片文件");
						}
					}
				};
				xhr.open("POST", window.IMG_UPLOAD_ROOT+"/put", true);
        xhr.setRequestHeader('Content-Type', file.type);
            
        xhr.send(file);
      };
    }
  });
}

if (createCORSRequest() != null && ! __.sogou) {
  init_html5();
}else if ($.flash.available) {
  init_flash();
}else{
  init_form();
}


function loading_face(pid, r_width, r_height){
	if (pid == "0"){
		__.fail("图片尺寸太大");
		return;
	}
	var src = $_.image(pid, 'X1');
	if (src == ""){
		__.error("上传图片过大！");
		return;
	}
	$('#face_url').val(src);
	$('#displayface').html('<img src="'+src+'" id="cropbox" style="width:450px;height:'+ Math.round(r_height * 450 / r_width) +'px;"/>');
	$('#preview').attr({src : src});
	
	$('#cropbox').Jcrop({
		bgColor:'black',
		bgOpacity:.4,
		aspectRatio: 1,
		minSize: [175,175],
		setSelect: [0,0,175,175],
		onSelect: setCoord,
		onChange: setCoord
	});
	$('#save_face').removeClass('hidden');
  
  save_btn.loading_mask_recover().unbind("click").click(__.prevent(function (){
  	lock();
  	var face_url = $('#face_url').val();
	
  	if (parseInt($("#face_coord").val().match(/\d+$/) ? $("#face_coord").val().match(/\d+$/)+"" : "0") < 170){
  		var w = $('#cropbox').width();
  		var h = $('#cropbox').height();
  		var len = Math.min(w,h);
  		var sx   = Math.floor( (w - len)/2 );
  		var sy   = Math.floor( (h - len)/2 );

  		$("#face_coord").val([sx,sy,sx+len,sy+len,len,len].join(","));
  	}
	
  	$.ajax({
  		url:"/pic/crop/"+face_url.match(/\/(\w+)-X1/)[1]+"?"+$("#form_save_face").serialize()+"&org_widh="+r_width+"&t="+$.now(),
  		success:function(result){
  			save_face_finish(result);
  		},
  		error:function(result){
  			__.error("图片裁剪失败，请检查图片格式！");
  		}
  	});
  }));
}

var lock = __.lock({
	handler: function() {
		save_btn.loading_mask();
	},
	lock:"manage",
	unlock: function() {
		save_btn.loading_mask_recover();
	}
})

function setCoord(c){
	var coords = [c.x, c.y, c.x2, c.y2, c.w, c.h];
	$('#face_coord').val(coords.join(','));
	showPreview(c);
}

function showPreview(coords)
{
	if (parseInt(coords.w) > 0)
	{
		var rx = 175 / coords.w;
		var ry = 175 / coords.h;
		var face_height = $('#cropbox').height();
		$('#preview').css({
			width: Math.round(rx * 450) + 'px',
			height: Math.round(ry * face_height) + 'px',
			marginLeft: '-' + Math.round(rx * coords.x) + 'px',
			marginTop: '-' + Math.round(ry * coords.y) + 'px'
		});
	}
}

function save_face_finish (pid) {
	if (pid){
		$.fetch({
			url:"/users/update",
			data:"user[face]="+pid,
			type: "POST",
			success:function () {
				__.success("更新成功！");
				App.refresh();
			}
		});
	}else{	
		__.fail("更新失败");
	}
}

if (__.is_mobile_phone()){
  alert("编辑头像功能暂不支持此设备，请使用电脑登录后编辑");
}

$("#cancel_face_btn").click(__.prevent(App.refresh));