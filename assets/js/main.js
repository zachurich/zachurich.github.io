GitHubActivity.feed({
    username: "zachurich",
    selector: "#feed",
    limit: 5, // optional
    clientId: '5dcb640cf13fad8be8a6',
    clientSecret: 'eb7e52cc1957176d76bf9711fbb5f12f4776cf69',
});

$(document).ready(function() {
  document.addEventListener("touchstart", function(){}, true);
	$(function() {
    iconSlider();
    fadeInOnLoad();
		smoothScroll(200);
    workLoad();
	});

  function fadeInOnLoad() {
    const elem = document.getElementById('load');
    elem.style.opacity = 0;
    elem.style.transform = "translateY(100px)";
    window.requestAnimationFrame(function() {
        elem.style.transition = "all 500ms";
        elem.style.opacity = 1;
        elem.style.transform = "translateY(0px)";
    });
  }

	function smoothScroll (duration) {
		// find target element
		$('a[href^="#"]').on('click', function(event) {
			// targets href attr
			var target = $( $(this).attr('href') );
			if( target.length ) {
				event.preventDefault();
				$('html, body').animate({
					scrollTop: target.offset().top -80
			}, duration);
			}
		});
	};
  // Scroll Animation Detection
  $(window).scroll(function() {
    var scroll = $(window).scrollTop();
    if(scroll > 100) {
      $('header').addClass('solid-header');
      $('header').removeClass('trans-header');
    } else {
      $('header').addClass('trans-header');
      $('header').removeClass('solid-header');
    }
    if(scroll >= 200) {
      $(".content-bubble.hideOnLoad").addClass("popIn");
    }
});
  // Close menu when click outside if open
  $(document).on('click', function(event) {
    if (!$(event.target).closest('.mobile-menu').length && $('.menu-mobile').hasClass('slideOut')) {
      $('.menu-mobile').removeClass('popIn');
      $('.menu-mobile').addClass('slideDown');
      $('.menu-button').removeClass('animate');
    }
  });

  // Mobile Menu click function
  $('.menu-button').on('click', function() {
    if($('.menu-mobile').hasClass('popIn')) {
      $('.menu-mobile').removeClass('popIn').hide(400);
      $('.menu-mobile').addClass('slideDown');
      // Hide after certain amount of time
      $('.menu-button').removeClass('animate');
    } else {
      $('.menu-mobile').show().addClass('popIn');
      $('.menu-mobile').removeClass('slideDown');
      $('.menu-button').addClass('animate');
    }
  });

  // Listener for about section
    $('.button.blue-ghosted').on('click', function() {
      if($('.about-section').hasClass('slideLeft')) {
        $('.extended').hide(400);
        $('.about-section').addClass('slideRight');
        $('.about-section').removeClass('slideLeft');
      } else {
        $('.extended').show(100);
        $('.about-section').removeClass('slideRight');
        $('.about-section').addClass('slideLeft');
      }
    //  $('.flex-row').hide(2000);
    });

// Listener for work section
  var thumbs = $('.work-thumb');
  thumbs.on('click', function() {
    // console.log('Hello');
    $('.project-container').show();
    $('.work-section').removeClass('slideRight');
    $('.work-section').addClass('slideLeft');
   $('.flex-row > .work-thumb').hide(400);
  });
  $('.back-button').on('click', function() {
      $('.work-section').removeClass('slideLeft');
      $('.work-section').addClass('slideRight');
      $('.flex-row > .work-thumb').show(100);
      $('.project-container').hide(300);
  });

function workLoad() {
  $.ajaxSetup({ cache: true });
  thumbs.on('click', function() {
    var $this = $(this),
        // get proj title from thumb img alt text
        title = $(this).children("img").attr("alt"),
        // get proj folder from thumb data attr
        folder = $this.data('folder'),
        // get appropriate folder
        newHTML = 'projects/' + folder + '.html';
    // Load all the stuff
    $('.content-content').load(newHTML);
    $('.content-title').children('h1').html(title);
  })
};

function scrollSection() {
  var section = $('.contact-section');
  if((section).hasClass('slideLeft')) {
    $(section).addClass('slideRight');
    $(section).removeClass('slideLeft');
  } else {
    $(section).removeClass('slideRight');
    $(section).addClass('slideLeft');
  }
}

function formValidation() {
  var form = $('form');
  form.children().not('button').addClass('shake');
  setTimeout(function() {
      form.children().not('button').removeClass('shake');
  }, 1000);
}

var form = $('form');
var inputName = $("input[name='name']");
var inputEmail = $("input[type='email']");
var inputText = $("textarea");
  form.submit(function(e) {
    e.preventDefault();
    if(inputName.val().length > 0 && inputEmail.val().length > 0 && inputText.val().length > 0) {
      $.ajax({
        url: "https://formspree.io/re.jo@live.com",
        method: "POST",
        data: $(this).serialize(),
        dataType: "json",
        error: function(XMLHttpRequest, textStatus, errorThrown){
          formValidation();
        },
        success: function(data){
          if(success = 'email sent'){
              console.log('Success!');
              scrollSection();
          }
        },
      });
    } else {
      formValidation();
    }
})


////////
var count  = 0,
    circle = document.getElementById('icon-container'),
    icon1  = document.getElementById('icon1'),
    icon2  = document.getElementById('icon2'),
    icon3  = document.getElementById('icon3'),
    logo = $("a[href='#top']");

// Delays for fading logo
function iconSlider() {
  setTimeout(function() {
    logo.addClass('fadeOut');
  }, 3500);
  timing(500);
}

// Calling this will start the interval
function timing(interval) {
  // Interval calls the showHide function every 3 seconds
  setTimeout(function() {
    setInterval(showHide, 3000);
  }, interval);
}

// Function for showing/hiding elements depending on count
function showHide() {
  count++;
  if(count === 1) {
    circle.style.display = "block"
    icon1.style.display = "block";
  } else
  if(count === 2) {
    icon1.style.display = "none";
    icon2.style.display = "block";
  } else
  if(count === 3) {
    icon2.style.display = "none";
    icon3.style.display = "block";
  } else
  if(count === 4){
    circle.style.display = "none";
    icon3.style.display = "none";
    logo.addClass('fadeIn');
  } else
  if(count === 5 || count === 6){
    circle.style.display = "none";
    icon3.style.display = "none";
  }
  else {
    circle.style.display = "block";
    logo.removeClass('fadeIn').addClass('fadeOut');
    icon1.style.display = "block";
    count = 1;
  }
  // console.log(count);
}
});
