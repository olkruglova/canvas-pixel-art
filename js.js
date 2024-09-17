$("#info").on("mouseover", function() {
    $("#instruction").css("display", "block");
})

$("#info").on("mouseout", function() {
    $("#instruction").css("display", "none");
})

//preventing the page from refreshing
$("#size-picker").on("submit", function(buildGrid) {
    makeGrid();
    buildGrid.preventDefault();
});

//make a start grid
$(function() {
    makeGrid();
});

var canvas = $("#canvas");
var canvasGrid = $("#canvas-grid");

function makeGrid() {
    canvasGrid.children().remove();
    var rows = $("#input-height").val();

    for (var r = 0; r < rows; r++) {
        canvasGrid.append("<tr></tr>");
        var columns = $("#input-width").val();

        for (var c = 0; c < columns; c++) {
            canvasGrid.children().last().append("<td></td>");
        };
    };

    cleanCanvas();

    if (!rows || !columns) {
        canvas.append("<div class='alert-message'></div>").text("Please enter a valid number of width and height");
    };
};

var isMouseDown = false;

// Listen for mousedown event to set isMouseDown to true
canvasGrid.on("mousedown", function() {
    isMouseDown = true;
});

// Listen for mouseup event to set isMouseDown to false
canvasGrid.on("mouseup", function() {
    isMouseDown = false;
});

// change a color of a cell (when it is clicked on or move over)
canvasGrid.on("click", "td", function(){ 
  var colors = $("#color-picker").val();
    $(this).css("background-color", colors);
});

canvasGrid.on("mouseover", "td", function() {
    if (isMouseDown) {
        var colors = $("#color-picker").val();
        $(this).css("background-color", colors);
    }
});

//remove the fill from the cell with double click of a mouse
canvasGrid.on("dblclick", "td", function () {
  $(this).css("background-color", "");
});

//to fill all grid
$(".color-all").click(
	function(){
    $("table, td").css("background-color", $("#color-picker").val())
	}
);

function cleanCanvas(){
    $("table, td").css("background-color", "")
}

//clean a canvas  
$(".clear-all").click(function() {
        cleanCanvas()    
    }
);

//delete a grid
$(".delete-canvas").click(function(){
  $("table, td").children().remove();
});

