var tag, gifImage, rate, newButton, newDiv, stillGif, animateGif, newTopic;

var topics = ["bunny", "hamster", "cats", "bears", "otters", "puppies", "archer", "pokemon", "ghibili"];

var getTen = 10, randomGif = 0;

var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=BYL0n8m6wTFF5oyVDZTsiQwn6MgOEKDi&limit=1000&q=";

var favImg = "assets/images/fav.png";
var unfavImg = "assets/images/unfav.png";

var tagArea = $(".tagArea");
var searchArea = $(".searchArea");
var gifArea = $(".gifArea");
var favArea = $(".favArea");

for(var i = 0; i < topics.length; i++){
	newButton = $("<button>");
	newButton.text(topics[i]).attr("class", "btn btn-info m-1");

	tagArea.append(newButton);
}

$(document).on("click", ".tagArea button",function(){
	gifArea.empty();
	tag = $(this).text();

	$.ajax({
		url: queryURL + tag,
		method: "GET"
	}).then(function(response){
		console.log(response);
		for(var i = 0; i < getTen; i++){
		randomGif = Math.floor(Math.random()*response.data.length);
		stillGif = response.data[randomGif].images.original_still.url;
		animateGif = response.data[randomGif].images.original.url;
		newDiv = $("<div>").attr("class", "col-lg-2 col-sm-2 my-2");
		gifImage = $("<img>").attr({
			"src" : stillGif, 
			"data-state" : "still", 
			"data-still" : stillGif, 
			"data-animate" : animateGif,
			"class" : "p-1 fixedHW"
			});
		rate = $("<p>").text("Rating: " + response.data[randomGif].rating).attr("class", "text-center font-weight-bold");
		newDiv.append(gifImage, rate).hide();
		gifArea.append(newDiv);
		$(".gifArea div").each(function(i){
			$(this).delay(400*i).fadeIn(2000);
		});
	}
	});
});

$(document).on("click", "img", function(){
	var state = $(this).attr("data-state");
	if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    } else {
    	$(this).attr("src", $(this).attr("data-still"));
    	$(this).attr("data-state", "still");
    }
});

searchArea.on("click", "button", function(){
	event.preventDefault();

	if($("input").val() !=""){
		newTopic = $("input").val();
		topics.push(newTopic);


		newButton = $("<button>");
		newButton.text(newTopic).attr("class", "btn btn-info m-1");

		tagArea.append(newButton);
	}

	$("input").val("");
});