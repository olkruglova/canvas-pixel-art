//preventing the page from refreshing
$("#sizePicker").on("submit", function(buildGrid) {
 makeGrid();
  buildGrid.preventDefault();
});

//make a start grid
$(function() {
  makeGrid(5, 5);
});
var canvas = $("#pixel_canvas");
//build a table with a function makeGrid(), using a For Loop;
function makeGrid() {
  canvas.children().remove(); //empty the grid for each submit
  var rows = $("#input_height").val();
   for (var r = 0; r < rows; r++) {
     canvas.append("<tr></tr>");
  var columns = $("#input_width").val();
   for (var c = 0; c < columns; c++) {
     canvas.children().last().append("<td></td>");
  };
 };
}
// change a color of a cell (when it is clicked on) in a  color which is selected from #colorPicker 
canvas.on("click", "td", function(){ 
  var colors = $("#colorPicker").val();
    $(this).css("background-color", colors);
});
//remove the fill from the cell with double click of a mouse
canvas.on("dblclick", "td", function () {
  $(this).css("background-color", "");
});
//to fill a grid (all cells)
$(".colorAll").click(
	function(){
    $("table, td").css("background-color", $("#colorPicker").val())
	}
);
//clean a canvas  
$(".clearAll").click(
	function(){
		$("table, td").css("background-color", "")
	}
);  
//delete a grid
$(".delCanvas").click(function(){
  $("table, td").children().remove();
});

