//////CONTACT FORM VALIDATION

function validateField(field, regex) {
    var value = field.val().trim();

    if (value === '') {
        field.addClass('error');
        return true;
    } else {
        field.removeClass('error');
    }

    // Si hay una expresión regular y el valor no coincide, marca como error
    if (regex && !regex.test(value)) {
        field.addClass('error');
        return true;
    } else {
        field.removeClass('error');
    }

    return false;
}

$(document).ready(function() {
	
	$('#submit').click(function () {

		var name = $('input[name=name]');
		var email = $('input[name=email]');
		var regx = /^([a-z0-9_\-\.])+\@([a-z0-9_\-\.])+\.([a-z]{2,4})$/i;
		var comment = $('textarea[name=comment]');

		var nameError = validateField(name);
		var emailError = validateField(email, regx);
		var commentError = validateField(comment);
		
		if (nameError || emailError || commentError) {
			return false;
		}

		overlay.style.display = 'block';

		var dataObject = {
			name: name,
			email: email,
			comment: comment,
			// token: tokenValue
		};
		
		// $('.text').attr('disabled','true');
		// $('.loading').show();
		
		$.ajax({
			url: "contact.php",    
			type: "POST",
			data: dataObject,        
			cache: false,
			success: function (msg) {
				if(msg === "OK"){
					$('#overlay').text('Gracias, recibimos tu mensaje');
					setTimeout(function () {
						clearForm();
						overlay.style.display = 'none';
					}, 1000);
				}
				
			},
			error: function (error) {
				$('#overlay').text('Lo sentimos, ocurrió un error :(');
				setTimeout(function () {
					overlay.style.display = 'none';
				}, 1000);
			}
		});

		// grecaptcha.ready(function() {
		// 	grecaptcha.execute('6LfmfMgoAAAAABGo9lwnXrba-RWtAsy7V2OeWXOn', {action: 'contact'}).then(function(token) {
		// 		// Include the token in your form submission
				
		// 	});
		// });
		
		// return false;
	});	
});	

function clearForm() {
    $('input[name=name]').val('');
    $('input[name=email]').val('');
    $('textarea[name=comment]').val('');
}

setTimeout(function(){
	$('body').addClass('loaded')
}, 1000);

$(window).on("resize", function () {
	var positionTop = window.innerHeight / 2;
	$('nav ul').css('top', positionTop);
	var marginTop = $('nav ul').height() / 2;
	$('nav ul').css('margin-top', -marginTop);
}).resize();