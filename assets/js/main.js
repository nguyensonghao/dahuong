$(document).ready(function () {
	$('#prize-container-mobile .intro').slick({
	  	infinite: true,
	  	slidesToShow: 2,
	  	slidesToScroll: 2
	});

	$('.box-question input').keyup(function () {
		var value = $(this).val();
		var id = $(this).data('id');
		var listBoxInput = $('.box-answer-' + id).find('.box-answer-item');
		var suggestIndex = $('.box-answer-' + id).find('.box-answer-item.suggest').index();
		for (var i = 0; i < listBoxInput.length; i++) {
			if (i < value.length) {
				$(listBoxInput[i]).text(value[i].toUpperCase());
				$(listBoxInput[i]).addClass('filled');
			} else {
				$(listBoxInput[i]).text("");
				$(listBoxInput[i]).removeClass('filled');
			}
		}

		var listActive = $('.box-answer > .box-answer-item.active');
		var listResultInput = $('.result-question-container .box-answer-item');
		for (var i = 0; i < listActive.length; i++) {
			$(listResultInput[i]).text($(listActive[i]).text());
		}
	})

	$('.enter-question-mobile input').keyup(function () {
		console.log('test');
		var value = $(this).val();
		var id = $(this).data('id');
		var listBoxInput = $('.box-answer-' + id).find('.box-answer-mobile-item');
		var suggestIndex = $('.box-answer-' + id).find('.box-answer-mobile-item.suggest').index();
		for (var i = 0; i < listBoxInput.length; i++) {
			if (i < value.length) {
				$(listBoxInput[i]).text(value[i].toUpperCase());
				$(listBoxInput[i]).addClass('filled');
			} else {
				$(listBoxInput[i]).text("");
				$(listBoxInput[i]).removeClass('filled');
			}
		}

		var listActive = $('.box-answer-mobile > .box-answer-mobile-item.active');
		var listResultInput = $('.box-result-question-mobile .box-answer-mobile-item');
		for (var i = 0; i < listActive.length; i++) {
			$(listResultInput[i]).text($(listActive[i]).text());
		}
	})

	$("input[onlyNumber]").keydown(function (e) {
        if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
            (e.keyCode === 65 && (e.ctrlKey === true || e.metaKey === true)) || 
            (e.keyCode >= 35 && e.keyCode <= 40)) {
                 return;
        }

        if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
            e.preventDefault();
        }
    });

    function validateEmail(email) {
	    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	    return re.test(String(email).toLowerCase());
	}

    function checkPhoneNumber(phone) {
        var flag = false;
        phone = phone.replace('(+84)', '0');
        phone = phone.replace('+84', '0');
        phone = phone.replace('0084', '0');
        phone = phone.replace(/ /g, '');
        if (phone != '') {
            var firstNumber = phone.substring(0, 2);
            if ((firstNumber == '09' || firstNumber == '08') && phone.length == 10) {
                if (phone.match(/^\d{10}/)) {
                    flag = true;
                }
            } else if (firstNumber == '01' && phone.length == 11) {
                if (phone.match(/^\d{11}/)) {
                    flag = true;
                }
            }
        }
        return flag;
    }

    function checkCMND (cmnd) {
        return cmnd.toString().length == 9 || cmnd.toString().length == 12;
    }

    $('.btn-complete').click(function () {
    	var form = $('.add-information-user');
    	var cmnd = form.find('input[name="cmnd"]').val();
    	var name = form.find('input[name="name"]').val();
    	var email = form.find('input[name="email"]').val();
    	var phone = form.find('input[name="phone"]').val();
    	var address = form.find('input[name="address"]').val();
    	var numberAnswer = $('input[name="number-answer"]').val();
    	var answer = $('.box-result-question .box-answer-item');
    	for (var i = 0; i < answer.length; i++) {
    		if (!$(answer[i]).text().trim()) {
                $('.validate-error').text("Xin vui lòng hoàn thành câu hỏi và để lại thông tin trước.");
    			$('.validate-error').show();
    			return;
    		}
    	}

        var boxItem = $('.box-answer .box-answer-item');
        for (var i = 0; i < boxItem.length; i++) {
            if (!$(boxItem[i]).text().trim()) {
                $('.validate-error').text("Xin vui lòng hoàn thành câu hỏi và để lại thông tin trước.");
                $('.validate-error').show();
                return;
            }
        }

    	if (!cmnd || !name || !email || !phone || !address || !numberAnswer) {
    		$('.validate-error').text("Xin vui lòng hoàn thành câu hỏi và để lại thông tin trước.");
    		$('.validate-error').show();
    		return;
    	} else if (!validateEmail(email)) {
    		$('.validate-error').text("Email không hợp lệ.");
    		$('.validate-error').show();
    		return;
    	} else if (!checkCMND(cmnd)) {
            $('.validate-error').text("Chứng mình nhân dân không hợp lệ.");
            $('.validate-error').show();
            return;
        } else if (!checkPhoneNumber(phone)) {
            $('.validate-error').text("Số điện thoại không hợp lệ.");
            $('.validate-error').show();
            return;
        } else {
    		$('.validate-error').hide();
    	}

    	var currentDate = new Date();
    	var date = currentDate.getDate();
    	var month = currentDate.getMonth() + 1;
    	if (date < 10) {
    		date = '0' + date;
    	}

    	if (month < 10) {
    		month = '0' + month;
    	}

    	var time = date + "/" + month + "/" + currentDate.getFullYear();
    	var listAnswer = $('.box-result-question .box-answer-item');
    	var question7 = "";
    	for (var i = 0; i < listAnswer.length; i++) {
    		question7 += $(listAnswer[i]).text();
    	}

    	var answer = {
			"Câu 1": $('#enter-question-1').val(),
			"Câu 2": $('#enter-question-2').val(),
			"Câu 3": $('#enter-question-3').val(),
			"Câu 4": $('#enter-question-4').val(),
			"Câu 5": $('#enter-question-5').val(),
			"Câu 6": $('#enter-question-6').val(),
			"Câu 7": question7,
			"Câu 8": $('input[name="number-answer"]').val(),
		}
    	

    	$.ajax({
    		url: 'http://dahuong.vn/thau-hieu-da-huong/save-answer.php',
            // url: 'http://localhost:8000/wordpress/thau-hieu-da-huong/save-answer.php',
    		type: 'POST',
    		data: {
    			time: time,
    			name: name,
    			cmnd: cmnd,
    			phone: phone,
    			email: email,
    			address: address,
    			answer: JSON.stringify(answer)
    		},
    		success: function (data) {
    			$('.popup').show();
    		},
    		error: function (err) {
    			console.log(err);
    		}
    	})
    })

    $('.btn-complete-mobile').click(function () {
    	var form = $('.add-form-information-mobile');
    	var cmnd = form.find('input[name="cmnd"]').val();
    	var name = form.find('input[name="name"]').val();
    	var email = form.find('input[name="email"]').val();
    	var phone = form.find('input[name="phone"]').val();
    	var address = form.find('input[name="address"]').val();
    	var numberAnswer = $('input[name="number-user"]').val();
    	var answer = $('.box-result-question-mobile .box-answer-mobile-item');
    	for (var i = 0; i < answer.length; i++) {
    		if (!$(answer[i]).text().trim()) {
                $('.validate-error').text("Xin vui lòng hoàn thành câu hỏi và để lại thông tin trước.");
    			$('.validate-error').show();
    			return;
    		}
    	}

        var boxItem = $('.box-answer-mobile .box-answer-mobile-item');
        for (var i = 0; i < boxItem.length; i++) {
            if (!$(boxItem[i]).text().trim()) {
                $('.validate-error').text("Xin vui lòng hoàn thành câu hỏi và để lại thông tin trước.");
                $('.validate-error').show();
                return;
            }
        }

    	if (!cmnd || !name || !email || !phone || !address || !numberAnswer) {
    		$('.validate-error').text("Xin vui lòng hoàn thành câu hỏi và để lại thông tin trước.");
    		$('.validate-error').show();
    		return;
    	} else if (!validateEmail(email)) {
    		$('.validate-error').text("Email không hợp lệ.");
    		$('.validate-error').show();
    		return;
    	} else if (!checkCMND(cmnd)) {
            $('.validate-error').text("Chứng mình nhân dân không hợp lệ.");
            $('.validate-error').show();
            return;
        } else if (!checkPhoneNumber(phone)) {
            $('.validate-error').text("Số điện thoại không hợp lệ.");
            $('.validate-error').show();
            return;
        } else {
    		$('.validate-error').hide();
    	}

    	var currentDate = new Date();
    	var date = currentDate.getDate();
    	var month = currentDate.getMonth() + 1;
    	if (date < 10) {
    		date = '0' + date;
    	}

    	if (month < 10) {
    		month = '0' + month;
    	}

    	var time = date + "/" + month + "/" + currentDate.getFullYear();
    	var listAnswer = $('.box-result-question-mobile .box-answer-mobile-item');
    	var question7 = "";
    	for (var i = 0; i < listAnswer.length; i++) {
    		question7 += $(listAnswer[i]).text();
    	}

    	var answer = {
			"Câu 1": $('#enter-question-mobile-1').val(),
			"Câu 2": $('#enter-question-mobile-2').val(),
			"Câu 3": $('#enter-question-mobile-3').val(),
			"Câu 4": $('#enter-question-mobile-4').val(),
			"Câu 5": $('#enter-question-mobile-5').val(),
			"Câu 6": $('#enter-question-mobile-6').val(),
			"Câu 7": question7,
			"Câu 8": numberAnswer,
		}
    	
    	$.ajax({
    		url: 'http://dahuong.vn/thau-hieu-da-huong/save-answer.php',
            // url: 'http://localhost:8000/wordpress/thau-hieu-da-huong/save-answer.php',
    		type: 'POST',
    		data: {
    			time: time,
    			name: name,
    			cmnd: cmnd,
    			phone: phone,
    			email: email,
    			address: address,
    			answer: JSON.stringify(answer)
    		},
    		success: function (data) {
    			$('.popup').show();
    		},
    		error: function (err) {
    			console.log(err);
    		}
    	})
    })

    $('.popup .btn-close, .popup .image-close').click(function () {
    	$('.popup').hide();
    })

    $('.popup-mobile .btn-close, .popup-mobile .image-close').click(function () {
    	$('.popup-mobile').hide();
    })
})