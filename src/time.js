export function msToTime(duration) {
	if (Number.isNaN(duration)) {
		return ""
	}

	var milliseconds = Math.floor(duration % 1000),
	seconds = Math.floor((duration / 1000) % 60),
	minutes = Math.floor((duration / (1000 * 60)) % 60),

	seconds = (seconds < 10 && minutes != "00") ? "0" + seconds : seconds;

	var s = seconds + "." + milliseconds.toString().padStart(3, "0");
	if (minutes == "00") {
		return s
	}
	return minutes + ":" + s;
}
