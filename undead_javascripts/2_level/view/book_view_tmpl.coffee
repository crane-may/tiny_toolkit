loadit("View.BookView-tmpl",()->
  Template.BookView = """
  	<div class="book_index clearfix">
	<# if (is_mine) {#><a class="book_add_index" href="javascript:void(0)">添加目录</a><# } #>
	<# if (is_mine) {#><a class="book_add_diary" href="/books/arrange/<#= channel_id #>">整理日记</a><# } #>
	<h2 class="mb15">目录</h2>
	<ul>
	</ul>
	</div>
""")


