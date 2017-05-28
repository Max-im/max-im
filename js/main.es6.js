(function($) {

	/*1. HEADER*/
	/*==================================================*/
	
	// topLine
	// --------------------------------------------------
	$('.topLine__menuItem').on('click', mainMenuSwitch);
	$('.topLine__socItem_hide').on('click', menuResizing);
	


	// slider
	// --------------------------------------------------
	$('.slider__circleWrap').on('click', toMainScroll);

		






	/*2. MAIN*/
	/*==================================================*/
	
	// aboutMe
	// --------------------------------------------------	
	tmplMaker('skills.json', '#mainSkillsTmp', '.aboutMe__skillsItems');	
	activeToggle('.aboutMe__selfInfoWrap .fa', 'aboutMe_active');
	$('.aboutMe__skillsControlItem').on('click', toggleMixItUpClass);
	$('.aboutMe__skillsControlItem').on('click', skillsMenuSwitch);
	let pos = 0;
		



	// experience
	// --------------------------------------------------	
	tmplMaker('popup.json', '#popupTmp', '.popupInputTmpl');
	$('.experience__button').fancybox({
		'overlayShow': true,
		'overlayOpacity': .6,
		'overlayColor': '#333',
		'showCloseButton': 'show'
	});
	$('.experience__button').on('click', popupListInit);




	// portfolio
	// --------------------------------------------------
	let mixer = mixitup('.mixItUpWrap');
	slidePortOverlay('.portfolio__imgWrap', '.portfolio__overlay');



	/*3. FOOTER*/
	/*==================================================*/
	tmplMaker('skills.json', '#skillsTmp', '.tmplSkillsInput');
	$('.footer__link_nav').on('click', activeBottomMenu);






	/*4. COMMON*/
	/*==================================================*/
	pageResizing();
	$(window).resize(pageResizing);
	animateScreen('.section__header', 'zoomIn')	


			



	/*5. FUNCTIONS*/
	/*==================================================*/
	function popupListInit(e){
		let elem = $(this).attr('href');
		let textDuties = $(elem).find('.popupDuties').text();
		let target = $(elem).find('.dutiesWrap');
		let arrDuties = textDuties.split(';');
		let len = arrDuties.length -1;
		let list = ' ';
		list += '<ul class="popupDutiesList">';
		for(let i = 0; i < len; i++){
			list += '<li class="popupDutiesListItem">';
			list += '<i class="fa fa-tag" aria-hidden="true"></i>';
			list += arrDuties[i];
			list += '</li>';
		}
		list += '</ul>';

		$(target).empty();
		$(target).append(list);
	}
			

	function pageResizing(){
		// sliderResizing
		let wh = $(window).height();
		let topMenuHeight = $('.topLine').height();
		let sliderHeight;
		if(wh < 768){
			sliderHeight = $('.slider').height(wh - topMenuHeight + 50);
		}else{
			sliderHeight = $('.slider').height(wh - topMenuHeight);
		}



		// skillsMenuResizing
		let btnWidth = $('.aboutMe__skillsControlItem').width();
		$('.aboutMe__skillsItem_line').width(btnWidth).css({
			left: pos * btnWidth || 0
		});

	}


	function skillsMenuSwitch(){
		let leftPosition = $(this).offset().left - $(
			'.aboutMe__skillsControlItem').offset().left;
		$('.aboutMe__skillsItem_line').animate({
			left: leftPosition
		},800);
		let btnWidth = $('.aboutMe__skillsControlItem').width();

		pos = leftPosition / btnWidth;
	}



	function toggleMixItUpClass(){
		var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
		let data = $(this).find('.aboutMe__skillsButton').attr('data-item');
		let visibleEl = $('.aboutMe__skillsItems .'+data);
		$('.aboutMe__skillsItem').addClass('animated flipOutX').one(animationEnd, function(){
			$('.aboutMe__skillsItem').css({
				display: 'none'
			});
			$(visibleEl).removeClass('animated flipOutX').addClass('animated flipInX').css('display','inline-block');
		});
	}




	function animateScreen(elementSelector ,effect){
		$(window).scroll( function(){
			let winHeight = $(window).height();
			let winTop = $(window).scrollTop();
			$(elementSelector).each(
				function(el){
					let elTop = $(this).offset().top;
					if((winTop+winHeight) > elTop && winTop < elTop){
						$(this).addClass('animated '+effect).css('opacity', 1);

					}else{
						$(this).removeClass('animated '+effect).css('opacity', 0);
					}
				}
			);
		});
	}


	function tmplMaker(jsonFile, inputSelector, outputSelector){
		$.getJSON('../json/'+jsonFile, function(data){
			let tmpl = $(inputSelector).html();
			let html = Mustache.to_html(tmpl, data);
			$(outputSelector).html(html);
		});
	}


	function slidePortOverlay(elem, child){
		$(elem).hover(
			function(){
				var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
				$(this).find(child).slideDown(function(){
					$(this).find('.portfolio__linkBlock')
						.css("display", "block")
						.addClass('animated fadeInUp');
					$(this).find('.portfolio__link:first-child')
						.css({
							display: "inlineBlock"
						})
						.addClass('animated bounceInLeft');
					$(this).find('.portfolio__link:last-child')
						.css({
							display: "inlineBlock"
						})
						.addClass('animated bounceInRight');
				});
			},
			function(){
				$(this).find(child).slideUp(function(){
					$(this).find('.portfolio__linkBlock')
						.css("display", "none")
						.removeClass('animated fadeInUp');


					$(this).find('.portfolio__link:first-child')
						.removeClass('animated bounceInLeft');
					$(this).find('.portfolio__link:last-child')
						.removeClass('animated bounceInRight');
				});
			}
		);
	}


	function activeToggle( target, myClass){
		$(target).hover(
			function(){
				$(this).addClass(myClass);
			},
			function(){
				$(this).removeClass(myClass);
			}
		)
	}


	function mainMenuSwitch(e){
		e.preventDefault();
		$(window).scrollTop();
		let selectorId = ($(this).attr('data-menu'));
		$('.main__item').hide();
		$(selectorId).show();
		let faClass = $(this).find('.fa').attr('class');
		let menuTxt = $(this).find('.topLine__linkDisc').text();
		$('.slider__circleFa').fadeOut(function(){
			$(this).removeClass().addClass('slider__circleFa '+ faClass);
		}).fadeIn();
		$('.slider__header').fadeOut(function(){
			$(this).text(menuTxt);	
		}).fadeIn(1500);
	}


	function menuResizing(e){
		e.stopPropagation();
		e.preventDefault();
		let btn = $(this).find('.fa');
		if($(btn).hasClass('fa-chevron-down')){
			$(btn).removeClass('fa-chevron-down');
			$(btn).addClass('fa-chevron-up');
			$('.topLine__socItem').slideDown();
		}
		else{
			$(btn).addClass('fa-chevron-down');
			$(btn).removeClass('fa-chevron-up');	
			$('.topLine__socItem:not(.topLine__socItem_hide)').slideUp();
		}
	}

	function activeBottomMenu(e){
		e.preventDefault();
		$(window).scrollTop(0);
		let data = $(this).attr('data-menu');
		let target = $('.topLine__menuItem[data-menu="'+data+'"]');
		$(target).click();
	}

	function toMainScroll(e){
		e.preventDefault();
		let mainTop = $('.main').offset().top - 50;
		console.log(mainTop);
		$('html, body').animate({
			scrollTop: mainTop
		},1000);
	}


					
					
			


})(jQuery);

