$(document).ready(function () {
	var suggestText = [{
		id: 1,
		text: 'N'
	}, {
		id: 2,
		text: 'I'
	}, {
		id: 3,
		text: 'Â'
	}, {
		id: 4,
		text: 'N'
	}, {
		id: 5,
		text: 'Ư'
	}, {
		id: 6,
		text: 'N'
	}]

	$('.box-question input').keyup(function () {
		var value = $(this).val();
		var id = $(this).data('id');
		var listBoxInput = $('.box-answer-' + id).find('.box-answer-item');
		var suggestIndex = $('.box-answer-' + id).find('.box-answer-item.suggest').index();
		if (value.length < suggestIndex + 1) {
			for (var i = 0; i < listBoxInput.length; i++) {
				if (i < value.length) {
					$(listBoxInput[i]).text(value[i].toUpperCase());
				} else {
					if (!$(listBoxInput[i]).hasClass('suggest')) {
						$(listBoxInput[i]).text("");
					} else {
						for (var m = 0; m < suggestText.length; m++) {
							if (id == suggestText[m].id) {
								$(listBoxInput[i]).text(suggestText[m].text);
								break;
							}
						}
					}
				}
			}
		} else {
			for (var i = 0; i < listBoxInput.length; i++) {
				if (i < value.length) {
					$(listBoxInput[i]).text(value[i].toUpperCase());
				} else {
					$(listBoxInput[i]).text("");
				}
			}
		}

		var listActive = $('.box-answer > .box-answer-item.active');
		var listResultInput = $('.result-question-container .box-answer-item');
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
    			$('.validate-error').show();
    			return;
    		}
    	}

    	if (!cmnd || !name || !email || !phone || !address || !numberAnswer) {
    		$('.validate-error').show();
    	} else {
    		$('.validate-error').hide();
    	}
    })
})