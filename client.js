window.onload = function(){
	var url,i,jqxhr;
	i = 21
	
	url = document.URL + 'input_state/' + i;
	console.log(url);
	jqxhr = $.getJSON(url,function(data){
		console.log('recived from api')
		$('#input').append('<p>Pin:' + data['pin']+' with value:'+data['pin_value']+'</p>');
	});
};
