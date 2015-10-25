
Chart.defaults.global.customTooltips = function(tooltip)
{
	var tooltipEl = $('#chartjs-tooltip-shard');

	if (!tooltip) {
		tooltipEl.css({
			opacity: 0
		});
		return;
	}

	// align to cursor
	tooltipEl.removeClass('above below');
	tooltipEl.addClass('center');

	var shards = Shardalyzer.shards;

	// "text" field is actually [shard, lowerinc, upperex]
	var	shard = tooltip.text[0],
		lower = tooltip.text[1],
		upper = tooltip.text[2];

	var numChunks = (upper-lower);
	var text;

	if(numChunks == 1)
		text = JSON.stringify(shards[shard][lower], null, 2);
	else
	{
		var chunks = {};
		chunks._ids = [];

		for(var i = 0; i < numChunks && i < 10; i++)
			chunks._ids.push(shards[shard][lower+i]._id);

		if(numChunks > 10)
			chunks.more = numChunks-10;

		text = JSON.stringify(chunks, null, 2);
	}

	// set text content
	tooltipEl.html("<pre>" + text + "</pre>");

	// get location of tooltip
	var top = tooltip.y + tooltip.caretHeight + tooltip.caretPadding;
	var left = tooltip.x;

	// reposition tooltip based on parent containers' offsets

	top +=
		tooltip.chart.canvas.offsetTop
		+ tooltip.chart.canvas.offsetParent.offsetTop
		- tooltip.chart.canvas.offsetParent.parentElement.parentElement.scrollTop;

	left +=
		tooltip.chart.canvas.offsetLeft
		+ tooltip.chart.canvas.offsetParent.offsetLeft

	// set position and display
	tooltipEl.css({
		opacity: 1,
		visibility: 'visible',
		left: left + 'px',
		top: top + 'px',
		fontFamily: tooltip.fontFamily,
		fontSize: tooltip.fontSize,
		fontStyle: tooltip.fontStyle,
	});
};