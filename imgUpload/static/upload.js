var tupload = {};

tupload.html5UpLoad=(function(){

	var _idUpload = "uploadBox",
		_classProgress = "progress",
		_classPercentage = "percentage";

	var _tipNoDrag = "put the file at this area,it will upload",
		_tipDragOver = "release your mouth";

	var _upLoadEle = null;
//初始化对象与事件
	function _init(){
		_upLoadEle = document.getElementById(_idUpload);
		_upLoadEle.ondragenter = _onDragEnter;
		_upLoadEle.ondragover = _onDragOver;
		_upLoadEle.ondragleave = _onDragLeave;
		_upLoadEle.ondrop = _onDrop;
		_setStatusNoDrag();
	};
	//拖拽进入目标区域，正在拖拽的状态
	function _setDragOverStatus(){		
		if(_checkContainsElements()) return;
		_upLoadEle.innerText = _tipDragOver;
		_upLoadEle.style.border = "2px dashed #777";
		$(_upLoadEle).css({lineHeight:$(_upLoadEle).height()+"px"});
		
	}

	//为拖拽结束鼠标离开区域时
	function _setStatusNoDrag(){
		if(_checkContainsElements) return ;
		_upLoadEle.innerText = _tipNoDrag ;
		_upload.style.border = "2px dashed #777";
		$(_upLoadEle).css({lineHeight:$(_upLoadEle).height()+"px"});
		document.write(2)
	}

	//松开鼠标，拖拽结束，文件即将开始上传
	function _setDropStatus(){	
		if(_checkContainsElements()) return ;
		_upLoadEle.innerText = "";
		_upLoadEle.style.border = "1px solid #444";
		$(_upLoadEle).css({lineHeight:"1em"});
		$(_upLoadEle).append("<ul></ul>") ;

	}

	//判断文件是否已经上传
	function _checkContainsElements(){
		return !$(_upLoadEle).find("li").size;
	}

	//当触发ondragenter事件时时
	function _onDragEnter(ev){
		_setDragOverStatus();		
	}
	//当ondragmove事件触发，避免冒泡
	function _onDragOver(ev){
		ev.preventDefault() ;
	}

	//当触发ondragleave事件时
	function _onDragLeave(ev){
		_setStatusNoDrag()
	}
	//当触发ondrop事件时
	function _onDrop(ev){		
		ev.preventDefault();
		_setDropStatus()

		var files = ev.dataTransfer.files,
			len = files.length;
		for(var i = 0; i < len; i++){
			_showUploadFile(files[i]) ;
		}
	}

	//页面需要显示的上传文件
	function _showUploadFile(file){
		var reader = new FileReader();
		//判断文件类型
		if(file.type.match(/image*/)){
			reader.onload = function(e){
				var formData = new FormData();

				var li = $("#template li").clone(),
					img = li.find("img"),
					progress = li.find(".progress"),
					percentage = li.find(".percentage");

				percentage.text("0%") ;
				img.attr("src", e.target.result) ;
				$("ul", $(_upLoadEle)).append(li);
				$(_upLoadEle).find("li").size() == 10 && $(_upLoadEle).width(($(_upLoadEle).width()+8) + "px").css("overflow", "auto");
				// formData.append("uploadFile", file);
				// formData.append("action","upload" );
				// formData.append("method","post") ;
				 formData.append("name","masen");

				_uploadServer(formData, li, progress, percentage);

			}
			reader.readAsDataURL(file);
		}else{
			console.log("the"+ file.name + "is not the image!")
		}
	}

	//上传文件到服务器
	function _uploadServer(formData, li, progress, percentage){
		var xhr = new XMLHttpRequest();
		xhr.open("POST", "upload", true);
		xhr.setRequestHeader('X-Requested-Width', 'XMLHttpRequest', "Content-Type", 'multipart/form-data');

		xhr.upload.onprogress = function(e){
			var percent = 0;
			if(e.lengthComputable){
				percent = 100 * e.loaded / e.total;
				progress.height(percent);
				percentage.text(percent + "%") ;
				percent >= 100 && li.addClass("done");
			}
		};
		xhr.send(formData);

		xhr.onreadystatechange = function(){
			if(xhr.readyState == 4 && xhr.status == 200){
				document.write("okokookokokokoko")
			}else{
				document.write('sb')
			}
		}
	}
	return {init: _init}

})();