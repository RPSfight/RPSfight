/*
 * This  function is for orientation
 */
function doOnOrientationChange() {
	switch(window.orientation) {
		case -90:
		case 90:
			if (screen.width < 700) {
				$("#life").css({
					"top" : "10px",
					"left" : "120px"
				});
				$("#rps").css({
					"top" : "30px",
					"left" : "-80px"
				});
				$("#compare").css({
					"top" : "30px",
					"left" : "-180px"
				});
				$("#motion").css({
					"top" : "100px",
					"right" : "-120px"
				});
				$("#explode").css({
					"top" : "100px",
					"right" : "-120px"
				});
				$("#menu").css({
					"left" : "120px",
					"top" : "-10px"
				});
			} else {
				$("#life").css({
					"top" : "10px",
					"left" : "200px"
				});
				$("#rps").css({
					"top" : "100px",
					"left" : "-240px"
				});
				$("#compare").css({
					"top" : "100px",
					"left" : "-240px"
				});
				$("#motion").css({
					"top" : "200px",
					"right" : "-200px"
				});
				$("#explode").css({
					"top" : "200px",
					"right" : "-200px"
				});
				$("#menu").css({
					"left" : "200px",
					"top" : "-19px"
				});
			}
			$("body").css({
				"background-size" : "cover",
				"background-position" : "bottom"
			});
			//contain/cover
			break;
		default:
			if (screen.width < 700) {
				$("#rps").css({
					"top" : "100px",
					"left" : "60px"
				});
				$("#compare").css({
					"top" : "100px",
					"left" : "auto"
				});
				$("#motion").css({
					"top" : "300px",
					"right" : "auto"
				});
				$("#explode").css({
					"top" : "300px",
					"right" : "auto"
				});
				$("#menu").css({
					"left" : "auto",
					"top" : "-21px"
				});
			} else {
				$("#rps").css({
					"top" : "150px",
					"left" : "60px"
				});
				$("#compare").css({
					"top" : "150px",
					"left" : "auto"
				});
				$("#motion").css({
					"top" : "500px",
					"right" : "auto"
				});
				$("#explode").css({
					"top" : "500px",
					"right" : "auto"
				});
				$("#menu").css({
					"left" : "auto",
					"top" : "-29px"
				});
			}
			$("#life").css({
				"top" : "auto",
				"left" : "auto"
			});
			$("body").css({
				"background-size" : "cover",
				"background-position" : "right"
			});
			//contain/cover
			break;
	}
}
