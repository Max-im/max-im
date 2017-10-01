(function($) {
	
	$('.btn__example').on('click', addItem);
	$('.btn__delete').on('click', removeItem);


	$('.btn__create').on('click', createClick);
	$('.btn__read').on('click', readClick);
	$('.btn__update').on('click', updateClick);

	const url = 'http://localhost:8080'

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
            url: url,						
            success: function() {
                cleanInp();
            }
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
            url: url,						
            success: function() {
                console.log('deleted')
            }
        });

	}









	function cleanInp(){
		$('#icon_prefix').val('');
		$('#icon_telephone').val('');
		
	}


	function createClick(e) {
		console.log('create')
	}


	function readClick(e) {
		console.log('read')
	}


	function updateClick(e) {
		console.log('update')
	}


})(jQuery);	
