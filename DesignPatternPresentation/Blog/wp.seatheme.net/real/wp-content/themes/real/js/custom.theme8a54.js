(function($){

    "use strict";
	
	var themeData = [];
	var parallaxImages = [];
	
	//window
	themeData.win                   = $(window);
	themeData.winHeight             = themeData.win.height();
	themeData.winScrollTop          = themeData.win.scrollTop();
	themeData.winHash               = window.location.hash.replace('#', '');
	
	//document
	themeData.doc                   = $(document);
	themeData.docHeight             = themeData.doc.height();
	
	//ID A~Z
	themeData.backTop               = $('#back-top');
	themeData.header                = $('#header');
	themeData.headerMain            = $('#header-main');
	themeData.HiddenPanel           = $('#hidden-panel');
	themeData.HiddenPanelTrigger    = $('#navi-trigger');

	themeData.jplayer               = $('#jquery_jplayer');
	themeData.logo                  = $('#logo');
	themeData.navi                  = $('#navi');
	themeData.naviMenu              = $('#navi .menu');
	themeData.container             = $('#wrap');
	themeData.WrapOurter            = $('#wrap-outer');
	themeData.searchOpen            = $('#search-top-btn');
	themeData.searchOverlay         = $('#search-overlay');
	themeData.searchClose           = $('#search-overlay-close');
	themeData.searchResult          = $('#search-result');
	themeData.socialHeader          = $('#social-header-out');
	themeData.toparea               = $('#top-hot');

	//tag
	themeData.body                  = $('body');
	
	//tag class
	themeData.uxResponsive          = $('body.responsive-ux');
	themeData.headerNaviMenu        = themeData.header.find('#navi ul.menu');
	themeData.galleryCollage        = $('section.Collage');
	
	//class
	themeData.audioUnit             = $('.audio-unit');
	themeData.flexDirectionNav      = $('.flex-direction-nav');
	themeData.lightbox              = $('.lightbox');
	themeData.lightboxParent        = $('.lightbox-parent');
	themeData.Menu                  = $('.menu');
	themeData.pagenumsDefault       = $('.pagenums-default');
	themeData.pageLoading           = $('.page-loading');
	themeData.tooltip               = $('.tool-tip');
	themeData.RelaPostCarousel      = $('.related-posts-carousel');
	themeData.blurFrontImage        = $('.top-hot-img-wrap');
	themeData.blurBgImage           = $('.top-hot-blur-img-wrap');
	themeData.searchForm            = $('.search-overlay-form');
	
	themeData.videoFace             = $('.blog-unit-img-wrap');
	themeData.videoOverlay          = $('.video-overlay');
	
	themeData.blogPagenumsTwitter   = $('.blog-list .pagenums.page_twitter a, .magzine-list .pagenums.page_twitter a');
	themeData.blogPagenumsSelect    = $('.blog-list .pagenums .select_pagination, .magzine-list .pagenums .select_pagination');
	
	//define
	themeData.globalFootHeight      = 0;
	
	var resizeTimer = null;
	
	//condition
	themeData.isResponsive = function(){
		if(themeData.uxResponsive.length){
			return true;
		}else{
			return false;
		}
	}
	
	if( themeData.headerNaviMenu.find('> li').length > 7 ){
		var switchWidth = 979;
	}else{
		var switchWidth = 769;
	}
	
	themeData.isMobile = function(){
		if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || themeData.win.width() < switchWidth){
			return true; 
		}else{
			return false;
		}
	}
	
	
	//function
	//Header social 
	themeData.fnHeaderSocial = function(){
		themeData.socialHeader.hover(function(){
			if(!themeData.headerMain.hasClass('header-inn-hide')) {
				themeData.headerMain.addClass('header-inn-hide');
			}
		},function(){
			if(themeData.headerMain.hasClass('header-inn-hide')) {
				themeData.headerMain.removeClass('header-inn-hide');
			}
		});
	}

	//Top image fill wrap
	themeData.fnTopImgfill = function(){
		
		var _this = themeData.toparea; 

		if(_this.hasClass('top-hot-height-auto')) {
			_this.css('height',themeData.win.height());
		}

		_this.find('img').each(function(){
			if($(this).height() < $(this).parents('.top-hot-img-wrap').height()){
				 
				_this.find('img').css('height','100%').css('width','auto').css('max-width','none').removeClass('middle-ux').addClass('center-ux');
			}
		});
	}

	
	//Scroll Blur 
	themeData.fnBlur  =  function(){

		// Pixastic.process(document.getElementById("img-blur"), "blurfast", {
		// 	amount : 1
		// });

		themeData.win.scroll(function() {
			var 
			ScrollTop  = themeData.win.scrollTop(),
			imgHeight  = themeData.blurBgImage.height();
			opacityVal = (ScrollTop / 200.0);
			if(ScrollTop == imgHeight) {
				var opacityVal = 1;
			}
			themeData.blurBgImage.css('opacity', opacityVal);

		});

	};

	//function submenu 
	function submenu_hover() {
		$('.menu-item-has-children').each(function(){
			$(this).hoverIntent(function(){
					if(!$(this).hasClass('hover-ux')) { 
						$(this).addClass('hover-ux');
					}
			},function(){ 
				if($(this).hasClass('hover-ux')) { 
					$(this).removeClass('hover-ux');
				}
			});
		});
	}
	

	//Search show
	themeData.fnSerchShow = function(){

		themeData.searchOverlay.css('height',themeData.winHeight);

		themeData.searchOpen.click(function(){
			if(!themeData.searchOverlay.hasClass('search-fadein')){
				themeData.searchOverlay.addClass('search-fadein');
				$('body,html').addClass('no-scroll').css('height',themeData.winHeight);
				$('.search-overlay-input-text').focus();
			}
		});
		themeData.searchClose.click(function(){
			if(themeData.searchOverlay.hasClass('search-fadein')){
				themeData.searchOverlay.removeClass('search-fadein');
				$('body,html').removeClass('no-scroll').css('height','auto');
			}
		});
	}
	
	//Search form
	themeData.fnSearchForm = function(){
		themeData.searchForm.submit(function(event){
			var search_result = themeData.searchForm.find('input[name=\"s\"]');
			var search_loading = jQuery('<div id="search-loading"><div class="search-loading">...</div></div>');
			
			event.preventDefault();
			themeData.searchResult.html(search_loading);
			var data = {
				'keywords' : search_result.val(),
				'paged'    : 1
			}
			
			$.post(AJAX_M, {
				'mode': 'search-list',
				'data': data
			}).done(function(content){
				var content = jQuery(content);
				themeData.searchResult.html(content);
				themeData.fnSearchPaged(search_result.val(), search_loading);
				
			});
		});
	}
	
	//Search form paged
	themeData.fnSearchPaged = function(keywords, loading){
		var load_more = themeData.searchResult.find('a.tw-style-a');
		if(load_more.length){
			load_more.click(function(){
				var paged = jQuery(this).attr('data-paged');
				
				jQuery(this).parent().remove();
				themeData.searchResult.append(loading);
				
				var data = {
					'keywords' : keywords,
					'paged'    : paged
				}
				
				$.post(AJAX_M, {
					'mode': 'search-list',
					'data': data
				}).done(function(content){
					var content = jQuery(content);
					themeData.searchResult.append(content);
					themeData.searchResult.find('#search-loading').remove();
					themeData.fnSearchPaged(keywords, loading);
					
				});
			});
		}
	}

	//Responsive Mobile Menu function
	themeData.fnResponsiveMenu = function(){
		 
		if(!themeData.header.length) return;
		
		var 
		menu                 = $('#navi ul.menu'),
		container            = themeData.container,
		mobile_advanced      = menu.clone().attr({id:"mobile-advanced", "class":""}),
		hidden_meun          = $('#hp-menu-wrap'),
		menu_added           = false;

		themeData.HiddenPanelTrigger.click(function(){
			if(themeData.body.is('.show_mobile_menu')){
				setTimeout(function() {themeData.body.removeClass('show_mobile_menu'); },20);
				//jQuery("html, body").css({'height':'auto','overflow-y':'auto'});
			}else{
				setTimeout(function() { themeData.body.addClass('show_mobile_menu'); },10);
				//set_height();
			}
			return false;
        });

  //       if(Modernizr.touch) {
		// 	themeData.body.addClass('ux-mobile');
		// } else {

			if(themeData.win.width() > switchWidth) {
				themeData.body.removeClass('ux-mobile');
				themeData.navi.css('max-height','none');
			} else {
				themeData.body.addClass('ux-mobile');
			}

			themeData.win.resize(function(){
				if(themeData.win.width() > switchWidth) {
					themeData.body.removeClass('ux-mobile');
				} else {
					themeData.body.addClass('ux-mobile');
				}
			});
		// }

		var set_visibility = function(){
			if(themeData.win.width() > switchWidth){
				themeData.body.removeClass('show_mobile_menu');
				jQuery("html, body").css({'height':'auto','overflow-y':'auto'});

			}else{
				if(!menu_added){
					mobile_advanced.appendTo(hidden_meun);
					menu_added = true;
				}
			
				if(themeData.body.is('.show_mobile_menu')){
					set_height();
				}
			}
		},
					
		set_height = function() {
			jQuery("html, body").css({'height':themeData.winHeight,'overflow-y':'hidden'});
		};
		
		if(themeData.body.hasClass('menu-shown')) { 
			themeData.win.on("debouncedresize", set_visibility);
			set_visibility();
		}
    }
	
	
	//audio player function
	themeData.fnJplayerCall = function(){
		if(themeData.jplayer.length){
			themeData.jplayer.jPlayer({
				ready: function(){
					$(this).jPlayer("setMedia", {
						mp3:""
					});
				},
				swfPath: JS_PATH,
				supplied: "mp3",
				wmode: "window"
			});
			
			themeData.audioPlayClick(themeData.body);
			themeData.audioPauseClick(themeData.body);
		}
	}
	
	//call player play
	themeData.audioPlayClick = function(container){
		container.find('.pause').click(function(){
			var thisID = $(this).attr("id");
			container.find('.audiobutton').removeClass('play').addClass('pause');
			$(this).removeClass('pause').addClass('play');
			themeData.jplayer.jPlayer("setMedia", {
				mp3: $(this).attr("rel")
			});
			themeData.jplayer.jPlayer("play");
			themeData.jplayer.bind($.jPlayer.event.ended, function(event) {
				$('#'+thisID).removeClass('play').addClass('pause');
			});
			themeData.audioPauseClick(container);
			themeData.audioPlayClick(container);
		})
	}
	
	//call player pause
	themeData.audioPauseClick = function(container){
		container.find('.play').click(function(){
			$(this).removeClass('play').addClass('pause');
			themeData.jplayer.jPlayer("stop");
			themeData.audioPlayClick(container);
		})
	}
	
	//page loading event
	themeData.fnPageLoadingEvent = function(el){
		var _url = el.attr('href');
		if(_url){
			themeData.pageLoading.fadeIn(300, function(){
				themeData.pageLoading.animate({opacity: 1}, 300, function(){
					themeData.pageLoading.addClass('visible');
				});
				setTimeout(function(){
					window.location.href = _url;
				}, 300);
			});
		}
	}
	
	//video face
	themeData.fnVideoFace = function(arrayVideo){
		arrayVideo.each(function(){
			var videoFace = [];
			var videoOverlay = [];
			
			videoFace.item = $(this);
			videoFace.playBtn = videoFace.item.find('.blog-unit-video-play');
			videoFace.videoWrap = videoFace.item.find('.video-wrap');
			videoFace.videoIframe = videoFace.videoWrap.find('iframe');
			
			videoOverlay.item = themeData.videoOverlay;
			videoOverlay.videoWrap = videoOverlay.item.find('.video-wrap');
			videoOverlay.close = videoOverlay.item.find('.video-close');
			
			videoFace.playBtn.click(function(){
				var src = videoFace.videoIframe.attr('src').replace('autoplay=0', 'autoplay=1');
				videoFace.videoIframe.attr('src', src);
				videoOverlay.close.before(videoFace.videoWrap.removeClass('hidden').attr('style', 'height:100%;padding-bottom:0px;'));
				videoOverlay.item.addClass('video-slidedown');
				
				return false;
			});
			
			videoOverlay.close.click(function(){
				videoOverlay.item.removeClass('video-slidedown');
				videoOverlay.item.find('.video-wrap').remove();
			});
		});
	}
	
	//Module Load Ajax
	themeData.fnModuleLoad = function(data, container){
		$.post(AJAX_M, {
			'mode': 'module',
			'data': data
		}).done(function(content){
			var newElems = $(content); 
			switch(data['mode']){
				case 'pagenums': 
					var this_pagenums = container.find('a[data-post=\"'+data["module_post"]+'\"][data-paged=\"'+data["paged"]+'\"]');
					this_pagenums.text(data["paged"]);
					$('html,body').animate({
						scrollTop: container.parent().offset().top - 80
					},
					1000); 

					container.parent().find('> .post').remove();
					container.before(newElems);
				break;
				case 'twitter': 
					var this_twitter = container.find('a[data-post=\"'+data["module_post"]+'\"]');
					this_twitter.attr('data-paged',Number(data['paged']) + 1).text('...').removeClass('tw-style-loading');
					if(data['paged'] == this_twitter.data('count')){
						this_twitter.fadeOut(300);
						this_twitter.parent('.page_twitter').css('margin-top','0');
					}

					container.before(newElems);
				break;
			}
			
			//Fadein theitems of next page 
			newElems.animate({opacity:1}, 1000); 
			
			//gallery
			themeData.gallerycarousel = $('.blog-gallery-carousel');
			if(themeData.gallerycarousel.length){
				themeData.fnGalleryCarousel();
			}

			//Audio player
			themeData.fnJplayerCall();
			themeData.jplayer.jPlayer("stop");
			themeData.audioPlayClick(newElems);
			themeData.audioPauseClick(newElems);
			
			//Video play
			if(newElems.find('.blog-unit-img-wrap').length){
				themeData.fnVideoFace(newElems.find('.blog-unit-img-wrap'));
			}

			//gallery list
			if(newElems.find('.Collage').length){
				$('.Collage').imagesLoaded(function(){ 
					$('.Collage').removeWhitespace().collagePlus({
						'fadeSpeed'     : 2000,
						'targetHeight'  : 200
					});
				});
			}

			//Lightbox
			if(newElems.find('.lightbox').length){
				$('.lightbox').magnificPopup({
					type:'image',
					removalDelay: 500,
					zoom: {
						enabled: true,
						duration: 300 // don't foget to change the duration also in CSS
					},
					mainClass: 'mfp-with-zoom mfp-img-mobile'
				});
			}
			//Lightbox group
			if(newElems.find('.lightbox-parent').length){
				$('.lightbox-parent').each(function(){
					$(this).magnificPopup({
						delegate: 'a.lightbox-item',
						type: 'image',
						preload: [1,3],
						removalDelay: 300,
						mainClass: 'mfp-fade mfp-img-mobile',
						zoom: {
							enabled: true,
							duration: 300 // don't foget to change the duration also in CSS
						},
				        gallery: { enabled: true }
					});
				});
			}

		});
	}
	
	//Pagenums Click
	themeData.fnPagenums = function(paged){
		var page = [];
		
		page.item = paged;
		page.moduleID = page.item.data('module');
		page.modulePost = page.item.data('post');
		page.postID = page.item.data('postid');
		page.paged = page.item.data('paged');
		
		paged.click(function(){
			page.item.parent().find('.select_pagination').removeClass('current');
			page.item.addClass('current').text('Loading');
			
			var ajax_data = {
				'module_id'   : page.moduleID,
				'module_post' : page.modulePost,
				'paged'       : page.paged,
				'post_id'     : page.postID,
				'mode'        : 'pagenums'
			}
			
			themeData.fnModuleLoad(ajax_data, page.item.parents('.pagenums'));
			return false;
		});	
				
	}
	
	//gallery collage
	themeData.fnGalleryCollage = function(){
		$('section.Collage').removeWhitespace().collagePlus({
			'fadeSpeed'     : 2000,
			'targetHeight'  : 200
		});
	}

	//switching_word
	themeData.UxSwitchWord = function(){
		var animationDelay = 2500,
		//loading bar effect
		barAnimationDelay = 3800,
		barWaiting = barAnimationDelay - 3000, //3000 is the duration of the transition on the loading bar - set in the scss/css file
		//letters effect
		lettersDelay = 50,
		//type effect
		typeLettersDelay = 150,
		selectionDuration = 500,
		typeAnimationDelay = selectionDuration + 800,
		//clip effect 
		revealDuration = 600,
		revealAnimationDelay = 1500;

		initHeadline();

		function initHeadline() { 
			animateHeadline($('.cd-headline'));
		}

		function animateHeadline($headlines) { 
			var duration = animationDelay;
			$headlines.each(function(){
				var headline = $(this);
				var words = headline.find('.cd-words-wrapper b'),
					width = 0;
				words.each(function(){
					var wordWidth = $(this).width();
				    if (wordWidth > width) width = wordWidth;
				});
				headline.find('.cd-words-wrapper').css('width', width);
				setTimeout(function(){ hideWord( headline.find('.is-visible').eq(0) ) }, duration);
			});
		}

		function hideWord($word) {
			var nextWord = takeNext($word);
			switchWord($word, nextWord);
			setTimeout(function(){ hideWord(nextWord) }, animationDelay);
		}

		function takeNext($word) {
			return (!$word.is(':last-child')) ? $word.next() : $word.parent().children().eq(0);
		}

		function switchWord($oldWord, $newWord) {
			$oldWord.removeClass('is-visible').addClass('is-hidden');
			$newWord.removeClass('is-hidden').addClass('is-visible');
		}

	}
	
	//document ready
	themeData.doc.ready(function(){

		//Call submenu
		if($('.menu-item-has-children').length) {
			
			// if( Modernizr.touch ) {
			// 	$( '.menu-item-has-children' ).doubleTapToGo();
			// }else{
				submenu_hover();
			//}
		}
		
		
		//call mobile menu
		if(themeData.isResponsive()){
			themeData.fnResponsiveMenu();
		}
		
		//Call Lightbox 
		if(themeData.lightbox.length){
			themeData.lightbox.magnificPopup({
				type:'image',
				removalDelay: 500,
				zoom: {
					enabled: true,
					duration: 300 // don't foget to change the duration also in CSS
				},
				mainClass: 'mfp-with-zoom mfp-img-mobile'
			});
		}
		
		if(themeData.lightboxParent.length){
			themeData.lightboxParent.each(function(){
				$(this).magnificPopup({
					delegate: 'a.lightbox-item',
					type: 'image',
					preload: [1,3],
					removalDelay: 300,
					mainClass: 'mfp-fade mfp-img-mobile',
					zoom: {
						enabled: true,
						duration: 300 // don't foget to change the duration also in CSS
					},
			        gallery: { enabled: true }
				});
			});
		}
		
		//Call Tip
		if(themeData.tooltip.length){
			themeData.tooltip.tooltip();
		}
		
		// Back top 
		if(themeData.backTop.length){
			themeData.backTop.on({'touchstart click': function(){ 
				$('html, body').animate({scrollTop:0}, 1200);
			}});
		}
		
		//Pagenumber re-layout
		if(themeData.pagenumsDefault.length) {
			themeData.pagenumsDefault.each(function(){
				if($(this).find('.prev').length && $(this).find('.next').length){
					$(this).find('.next').after($(this).find('.prev'));
				}
			});
		}
		
		//Call audio player
		if(themeData.audioUnit.length > 0){
			themeData.fnJplayerCall();
		}
		
		
		//call video popup
		if(themeData.videoFace.length){
			themeData.fnVideoFace(themeData.videoFace);
		}
		
		//twitter style
		if(themeData.blogPagenumsTwitter.length){
			themeData.blogPagenumsTwitter.each(function(){
				var twitterLink = [];
				
				twitterLink.item = $(this);
				twitterLink.moduleID = twitterLink.item.data('module');
				twitterLink.modulePost = twitterLink.item.data('post');
				twitterLink.postID = twitterLink.item.data('postid');
				twitterLink.paged = twitterLink.item.data('paged');
				
				twitterLink.item.click(function(){
					twitterLink.item.html('<span>Loading...</span>');
					
					twitterLink.item.addClass('tw-style-loading');
					twitterLink.paged = twitterLink.item.attr('data-paged');

					var ajax_data = {
						'module_id'   : twitterLink.moduleID,
						'module_post' : twitterLink.modulePost,
						'post_id'     : twitterLink.postID,
						'paged'       : twitterLink.paged,
						'mode'        : 'twitter'
					}
					
					themeData.fnModuleLoad(ajax_data, twitterLink.item.parents('.pagenums'));
					return false;
				});
			})
			
		}
		
		//Pagenums Click
		if(themeData.blogPagenumsSelect.length){
			themeData.blogPagenumsSelect.each(function(){
				themeData.fnPagenums($(this));
			})
		}
		
		//Page Loading
		if(themeData.pageLoading.length){
			//if(!Modernizr.touch){
	
				//sidebar menu
				$('#navi ul.menu li:not(.anchor-in-current-page) a').click(function(){
					if(!$(this).parent().hasClass('current-menu-anchor')){
						themeData.fnPageLoadingEvent($(this));
						return false;
					}
				});
			
				//all search form
				$('.search_top_form_text').parents('form').submit(function(){
					$("html, body").css({height:themeData.winHeight, overflow:"hidden"});
					themeData.pageLoading.fadeIn(300, function(){
						themeData.pageLoading.addClass('visible');
					});
				});
			
				//Logo
				$('#logo a').click(function(){
					themeData.fnPageLoadingEvent($(this));
					return false;
				});
	
				//WPML
				if($('.wpml-language-flags').length) {
					$('.wpml-language-flags a').click(function(){
						themeData.fnPageLoadingEvent($(this));
						return false;
					});
				}
	
				//post navi, Related posts
				$('.post-navi-unit-a,.post-navi-unit-tit a, .related-posts-a,.related-posts-tit a, .page-numbers').click(function(){
					themeData.fnPageLoadingEvent($(this));
					return false;
				});
			
				//cover / archive unit
				$('.top-hot-info a,.blog-unit-tit a,.subscribe-link-a,.article-meta-unit a,.blog-unit-more-a').click(function(){
					themeData.fnPageLoadingEvent($(this));
					return false;
				});
			
				//sidebar widget
				$('.widget_archive a, .widget_recent_entries a, .widget_search a, .widget_pages a, .widget_nav_menu a, .widget_tag_cloud a, .widget_calendar a, .widget_text a, .widget_meta a, .widget_categories a, .widget_recent_comments a, .widget_tag_cloud a').click(function(){
					themeData.fnPageLoadingEvent($(this));
					return false;
				});
			
				/** Module*/
				$('.moudle .iterlock-caption a, .moudle .tab-content a, .moudle .accordion-inner a, .moudle .blog-item a, .moudle .isotope a, .moudle .ux-btn, .moudle .post-carousel-item a, .moudle .caroufredsel_wrapper:not(.portfolio-caroufredsel) a').click(function(){
					if($(this).is('.lightbox')||$(this).is('.tw-style-a')||$(this).is('.lightbox-item')){}else if($(this).is('.liquid_list_image')){}else if($(this).is('.ajax-permalink')){}else{
						themeData.fnPageLoadingEvent($(this));
						return false;
					}
				});
	
				//Porfolio template
				$('.related-post-unit a,.tags-wrap a').click(function(){	
					themeData.fnPageLoadingEvent($(this));
					return false;
				});
		
				//Woocommerce
				$('.prouduct-item-a').click(function(){	
					themeData.fnPageLoadingEvent($(this));
					return false;
				});
		
			//}
		
			$("html, body").css({height: themeData.winHeight});
		
			themeData.win.load(function(){
				themeData.pageLoading.removeClass('visible');
				$("html, body").css({height: "auto"});
			});
			
		}

		//PageCover  Scroll Pushed Effect
		
		// detect if IE : from http://stackoverflow.com/a/16657946		
		var ie = (function(){
			var undef,rv = -1; // Return value assumes failure.
			var ua = window.navigator.userAgent;
			var msie = ua.indexOf('MSIE ');
			var trident = ua.indexOf('Trident/');

			if (msie > 0) {
				// IE 10 or older => return version number
				rv = parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
			} else if (trident > 0) {
				// IE 11 (or newer) => return version number
				var rvNum = ua.indexOf('rv:');
				rv = parseInt(ua.substring(rvNum + 3, ua.indexOf('.', rvNum)), 10);
			}

			return ((rv > -1) ? rv : undef);
		}());


		// disable/enable scroll (mousewheel and keys) from http://stackoverflow.com/a/4770179					
		// left: 37, up: 38, right: 39, down: 40,
		// spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
		var keys = [32, 37, 38, 39, 40], wheelIter = 0;

		function preventDefault(e) {
			e = e || window.event;
			if (e.preventDefault)
			e.preventDefault();
			e.returnValue = false;  
		}

		function keydown(e) {
			for (var i = keys.length; i--;) {
				if (e.keyCode === keys[i]) {
					preventDefault(e);
					return;
				}
			}
		}

		function touchmove(e) {
			preventDefault(e);
		}

		function wheel(e) {
		}

		function disable_scroll() {
			window.onmousewheel = document.onmousewheel = wheel;
			document.onkeydown = keydown;
			//document.body.ontouchmove = touchmove;
		}

		function enable_scroll() {
			window.onmousewheel = document.onmousewheel = document.onkeydown = document.body.ontouchmove = null;  
		}

		var docElem = window.document.documentElement,
			scrollVal,
			isRevealed, 
			noscroll, 
			isAnimating,
			container = jQuery('#wrap-outer'),
			scrollTrigger = jQuery('#scroll-trigger');

		function scrollY() {
			return window.pageYOffset || docElem.scrollTop;
		}
		
		function scrollPage() {
			scrollVal = scrollY();
			
			if( noscroll && !ie ) {
				if( scrollVal < 0 ) return false;
				// keep it that way
				window.scrollTo( 0, 0 );
			}

			if( container.hasClass('notrans') ) {
				container.removeClass('notrans');
				return false;
			}


			if( isAnimating ) {
				return false;
			}
			
			if( scrollVal <= 0 && isRevealed ) {
				toggle(0);
			}
			else if( scrollVal > 0 && !isRevealed ){
				toggle(1);
			}
		}

		function toggle( reveal ) {
			isAnimating = true;
			
			if( reveal ) {
				container.addClass('modify');
			}
			else {
				noscroll = true;
				disable_scroll();
				container.removeClass('modify');
			}

			// simulating the end of the transition:
			setTimeout( function() {
				isRevealed = !isRevealed;
				isAnimating = false;
				if( reveal ) {
					noscroll = false;
					enable_scroll();
				}
			}, 1200 );
		}

		// refreshing the page...
		var pageScroll = scrollY();
		noscroll = pageScroll === 0;
		
		if( pageScroll ) {
			isRevealed = true;
			container.addClass('notrans');
			container.addClass('modify');
		}

		if(jQuery('body').hasClass('cover-push') && !Modernizr.touch) { 
			disable_scroll();
			window.addEventListener( 'scroll', scrollPage );
			scrollTrigger.click(function(){
				toggle( 'reveal' ); 
			});
		}

	});
	
	//win load
	themeData.win.load(function(){

		// Menu shown layout - social icons show/hide
		if(themeData.socialHeader.length) {
			themeData.fnHeaderSocial();
		}
		
		// Call Top image fill wrap
		if($('#top-hot').length) {
			//themeData.fnTopImgfill();
			//themeData.win.on("debouncedresize", themeData.fnTopImgfill);
		}

		if(themeData.searchOverlay.length){
			themeData.fnSerchShow();
		}
		
		if(themeData.searchForm.length){
			themeData.fnSearchForm();
		}

		$("body").removeClass("preload");

		if($('.top-hot-blur-img-wrap').length && !themeData.isMobile()) {
			themeData.fnBlur();
		}
		
		if($('section.Collage').length){
			themeData.win.find('img').imagesLoaded(function(){ 
				themeData.fnGalleryCollage();
			});
		}

		if($('.switching-word').length) { 
			themeData.UxSwitchWord();
		}


		
	});
	
	
	//win resize
	themeData.win.resize(function(){
		if(themeData.galleryCollage.length){
			$('.Collage .Image_Wrapper').css("opacity", 0);
			if (resizeTimer) clearTimeout(resizeTimer);
			resizeTimer = setTimeout(function(){
				if(themeData.galleryCollage.length) {
					themeData.win.find('img').imagesLoaded(function(){ 
						themeData.fnGalleryCollage(themeData.galleryCollage);
					});
				}
			}, 200);
		}
		if(themeData.body.is('.show_mobile_menu')){ 
			setTimeout(function() {themeData.body.removeClass('show_mobile_menu'); },20);
		}
	});
	
})(jQuery);