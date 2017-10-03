(function($) {
	
	$('.btn__read').on('click', getItems);
	$('.btn__create').on('click', addItem);


	


	const url = 'http://localhost:8080'
	

	function getItems(e){
		const arr = [];
		$('.myElement:not(.hide)').remove();

		$.ajax({
			type: 'GET',
	        contentType: 'application/json',
            url: url+'/getData',
            success: function(data){
            	data.map( function(item, index) {
            		
            		$('.tmpl')
            			.clone()
            			.removeClass('hide tmpl')
            			.addClass('myElement')
            			.appendTo('.myContent');


            		arr.push({
            			id: item._id,
            			name: item.name,
            			val: item.val
            		});
            	});

            	$('.myElement').each( function(elem){

            		this.setAttribute('data-id', arr[elem].id)
            		$(this).find('.card-title').text(arr[elem].name);
            		$(this).find('.card-val').text(arr[elem].val);
            	});

				$('.btn__delete').on('click', removeItem);
				$('.btn__update').on('click', updateItem);
            }						
        });
	}


	function addItem(e) {
		e.preventDefault();
		let inpName = $('#icon_prefix').val();
		let inpPhone = $('#icon_telephone').val();

		const data = {
			name: inpName,
			val: inpPhone
		};
		
		$.ajax({
			type: 'POST',
			data: JSON.stringify(data),
	        contentType: 'application/json',
            url: url						
        }).done(function(){
			$('#icon_prefix').val('');
			$('#icon_telephone').val('');
			getItems();
        });
	}


	function removeItem(e){
		e.preventDefault();
		const target = e.target.closest('.myElement');
		const id = $(target).data('id');

		const data = {
			id: id
		}

		$.ajax({
			type: 'DELETE',
			data: JSON.stringify(data),
	        contentType: 'application/json',
            url: url						
        }).done(function(result){
        	getItems();
        });
	}


	function updateItem(e){
		e.preventDefault();
		const target = e.target.closest('.card');
		const data = {
			id: $(e.target).closest('.myElement').data('id')
		};
		const modal = $(`<div class="updateModal">
			  <form class="col s12">
			    <div class="row">
			      <div class="input-field col s6">
			        <i class="material-icons prefix">account_circle</i>
		        	<input type="text" tabindex="1" class="validate modalName">
			      </div>
			      <div class="input-field col s6">
			        <i class="material-icons prefix">phone</i>
			        <input type="email" tabindex="2" class="validate modalPhone">
			      </div>
			    </div>
			  	<a type="submit" tabindex="3" class="waves-effect waves-light btn btn__ok">ok</a>
			  </form>
			</div>`);
		const nameVal = $(target).find('.card-title').text();
		const phoneVal = $(target).find('.card-val').text();


		$(target).append(modal).find('.modalName').select();
		$(target).find('.modalName').val(nameVal);
		$(target).find('.modalPhone').val(phoneVal);
		$('.btn__ok').on('click', okClick);


		function okClick(e){
			e.preventDefault();
			data.name = $(target).find('.modalName').val();
			data.phone = $(target).find('.modalPhone').val();
			$(target).closest('.myElement').find('.updateModal').remove();
			
			$.ajax({
				type: 'PUT',
				data: JSON.stringify(data),
		        contentType: 'application/json',
	            url: url						
	        }).done(function(result){
	        	getItems();
	        });
		}
	}









})(jQuery);	
