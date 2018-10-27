$(document).ready(function(){

var bands = ["Tool", "311", "Sublime", "Deftones", "Metallica", "Nirvana", "Hed Pe", "Soundgarden", "Pearl Jam", "Rage Against the Machine"]
gifArea = " "

//Display band data
function renderButtons() {

	$("#bands-view").empty();

	for (var i=0; i < bands.length; i++) {
		var button = $('<button>');
		button.addClass('band');
		button.attr('data-name', bands[i]);
		button.text(bands[i]);
		$("#bands-view").append(button);
	}

	$("#band-input").focus();
}

renderButtons();

//Keep button from submitting itself & add button from user text
$("#add-band").on('click', function() {

	event.preventDefault();
	var band = $("#band-input").val().trim();
	bands.push(band);
	renderButtons();

});
	//
	$(document).on('click', 'button',  function() {
		$('#gifArea').empty(); 
        var a = $(this).attr('data-name');		
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + a + "&api_key=1o6aRZX3hd6FD8qrTeX8Dhiu1rMpCPdL&limit=10";  
        console.log(queryURL); 
	    // Ajax call to Giphy for info
        $.ajax({
                url: queryURL,
                method: 'GET'
            })
        
            .then(function(response) {
            	console.log(response);
		
            	var results = response.data;
            	//Create div for gif to pop & show rating
                for (var i = 0; i < results.length; i++) {
	        	        var gifDiv = $('<div class="item">');
	                    var rating = results[i].rating;
	           			var rInput = $('<p>').text("Rating: " + rating);
	    	   			var gifImage = $('<img>');
    				//Provide src attribute to property rec'd from Giphy
    				gifImage.attr('src', results[i].images.fixed_height_still.url)
	                    	.attr('data-still', results[i].images.fixed_height_still.url)
	                    	.attr('data-animate', results[i].images.fixed_height.url)
	                    	.attr('data-state', "still")
	                    	.addClass("showImage");

                    gifDiv.append(rInput)
                    	  .append(gifImage);	                    
        	  
                    $('#gifArea').prepend(gifDiv);
            	}
        	});
    	});
		//animate and stop gifs when clicked
		$(document).on('click', '.showImage',  function() {

		    var state = $(this).data('state');

		    if (state == "still") {
		        console.log("still is working");
		        $(this).attr('src', $(this).data('animate'))
		               .data('state', 'animate');
		    } else {
		        console.log("animated is working");
		        $(this).attr('src', $(this).data('still'))
		               .data('state', 'still');               
	    }
	});
});