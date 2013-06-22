loadit("Dialog.AddTags",function(){
Dialog.AddTags = Dialog.Base.extend({
	template: DialogTempl['tag'],
	height:270,
	events :{
		"click .yes": "on_yes"
	},
	initialize: function() {},
	onShow: function() {
		this.name = this.$("#tag_input").valid_view(Valid.Base);
	},
	on_yes: function() {
		ValidCenter(
			[
				this.name,
				function(){
					if (this.name.val().split(/[，,]/).length + this.model.get("tags").split(/[，,]/).length > 10){
						__.fail("标签总数不能超过10个");
						return false;
					}else{
						return true;
					};
				},
				function() {
					var new_ = this.name.val().split(/[，,]/);
					var old_ = this.model.get("tags").split(",");
					var inter = _.intersection(new_,old_);
					if (new_.length > _.uniq(new_).length){
						__.fail("包含重复的标签");
						return false;
					}
					
					if (inter.length > 0){
						__.fail("您已经拥有“"+inter[0]+"”标签");
						return false;
					}
					
					for (var i=0;i<new_.length;i++){
						if (new_[i].eng2len() < 2){
							__.fail("每个标签的长度需要大于1个中文，或2个英文");
							return false;
						}
						if (new_[i].eng2len() > 14){
							__.fail("每个标签的长度需要小于7个中文，或14个英文");
							return false;
						}
					}
					
					return true;
				}
			],
			function(){
				this.view_tag.add_tags(this.name.val());
			}
		,this)
	}
})
});//end of loadit