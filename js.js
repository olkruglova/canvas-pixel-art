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

function addLoader() {
    canvas.append("<div class='loader'><i class='fa-solid fa-spinner fa-spin-pulse fa-2x'></i></div>");
    
    const width = canvasGrid.width();
    $(".loader").css("width", width || 220);
}

function removeLoader() {
    $(".loader").remove();
}


function makeGrid() {
    addLoader();
    setTimeout(function() {
        canvasGrid.children().remove();
        var rows = $("#input-height").val();

        for (var r = 0; r < rows; r++) {
            canvasGrid.append("<tr></tr>");
            var columns = $("#input-width").val();

            for (var c = 0; c < columns; c++) {
                canvasGrid.children().last().append("<td></td>");
            }
        }

        cleanCanvas();

        if (!rows || !columns) {
            canvas.append("<div class='alert-message'></div>").text("Please enter a valid number of width and height");
        }

        removeLoader();
    }, 100);
}


function checkIfAnyCellIsColored() {
    let isColored = false;
    
    $("td").each(function() {
        if ($(this).css("background-color") !== "rgba(0, 0, 0, 0)" && $(this).css("background-color") !== "transparent") {
            isColored = true;
            return false;
        }
    });
    
    if (isColored) {
        $(".download-canvas").prop("disabled", false);
    } else {
        $(".download-canvas").prop("disabled", true);
    }
}


var isMouseDown = false;

canvasGrid.on("mousedown", function() {
    isMouseDown = true;
});

canvasGrid.on("mouseup", function() {
    isMouseDown = false;
});

// change a color of a cell (when it is clicked on or move over)
canvasGrid.on("click", "td", function(){ 
  var colors = $("#color-picker").val();
    $(this).css("background-color", colors);

    checkIfAnyCellIsColored();
});

canvasGrid.on("mouseover", "td", function() {
    if (isMouseDown) {
        var colors = $("#color-picker").val();
        $(this).css("background-color", colors);

        checkIfAnyCellIsColored();
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
    $("table, td").css("background-color", "");
    checkIfAnyCellIsColored();
}

//clean a canvas  
$(".clear-all").click(function() {
        cleanCanvas();
    }
);

//delete a grid
$(".delete-canvas").click(function(){
  $("table, td").children().remove();

  canvas.append("<div class='alert-message'>Start by creating a new grid.</div>")
});

//download canvas
$(".download-canvas").click(function() {
    addLoader();
    html2canvas(document.querySelector("#canvas-grid")).then(function(canvas) {
        var imgData = canvas.toDataURL('image/png');
        var pdf = new jspdf.jsPDF();

        pdf.addImage(imgData, 'PNG', 10, 10, 190, 0);
        pdf.save("canvas.pdf");

        removeLoader();
    });
});
