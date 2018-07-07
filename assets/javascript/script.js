var tag, gifImage, rate, newButton, newDiv;
var topics = ["bunnies", "hamsters", "cats", "bears", "otters", "puppies", "archer", "anime"];
var getTen = 10, randomGif = 0;
var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=BYL0n8m6wTFF5oyVDZTsiQwn6MgOEKDi&q=";

var tagArea = $(".tagArea");
var searchArea = $(".searchArea");
var gifArea = $(".gifArea");
var favArea = $(".favArea");

for(var i = 0; i < topics.length; i++){
	newButton = $("<button>");
	newButton.text(topics[i]).attr("class", "btn btn-info m-1");

	tagArea.append(newButton);
}

$("button").on("click", function(){
	gifArea.empty();
	tag = $(this).text();

	for(var i = 0; i < getTen; i++){
		$.ajax({
			url: queryURL + tag,
			method: "GET"
		}).then(function(response){
			console.log(response);
			randomGif = Math.floor(Math.random()*response.data.length);
			newDiv = $("<div>").attr("class", "float-left border");
			gifImage = $("<img>").attr("src", response.data[randomGif].images.fixed_height.url).attr("class", "p-5");
			rate = $("<p>").text("Rating: " + response.data[randomGif].rating).attr("class", "text-center");
			newDiv.append(gifImage, rate);
			gifArea.append(newDiv);
		});
	}
});