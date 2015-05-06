var WorkSpace = Backbone.View.extend({
	initialize: function() {
		console.log("test");
		this.selectedTile = null;
		this.isPainting = false;
	},

	events: {
		'click #palette .tile': 		'selectTile',

		'mousedown #canvas .tile': 		'startPainting',
		'mouseup #canvas .tile': 		'stopPainting',
		'click #canvas .tile': 			'dispatch',

		'mousemove #canvas .tile': 		'dispatch',
	},

	selectTile: function(e) {
		e.preventDefault();
		var tile = $(e.currentTarget);
		$("#palette .tile").removeClass("selected");
		tile.toggleClass("selected", this.selectedTile !== tile.attr("src"));
		this.selectedTile = (this.selectedTile != null && this.selectedTile.src == tile.attr("src")) ? null : { src: tile.attr("src"), overlay: tile.data("overlay") };
		console.log(this.selectedTile);
	},

	dispatch: function(e) {
		var mode = $("#tools .btn.active").text().toLowerCase();
		this[mode](e);
	},

	startPainting: function() {
		if (this.selectedTile != null) {
			this.isPainting = true;
		}
	},

	stopPainting: function() {
		this.isPainting = false;
	},

	paint: function(e) {
		if ((this.isPainting && this.selectedTile != null) || (e.type == "click" && this.selectedTile != null)) {
			var tile = $(e.target);
			if (tile.parents("#canvas").length > 0 && tile.hasClass("tile")) {
				if (this.selectedTile.overlay == true) {
					tile.html("<img src='" + this.selectedTile.src + "'>");
				} else {
					tile.html("");
					tile.css({
						background: "url('" + this.selectedTile.src + "') center center no-repeat",
						backgroundSize: "cover",
					});
				}
			}
		}
	},

	erase: function(e) {
		var tile = $(e.target);
		tile.css({
			background: "transparent",
		});
	}

});

new WorkSpace({ el: $("body") });