var WorkSpace = Backbone.View.extend({

	initialize: function() {
		this.selectedTile = null;

		this.paintEnabled = true;
		this.isPainting = false;

		this.panEnabled = false;
		this.isPanning = false;

		this.activeTool = 'paint';
		this.previousTool = this.activeTool;

		this.keyMap = {
			32: 		"pan"		//Spacebar
		};
	},

	events: {
		'click .menu .tile': 			'selectTile',

		'mousedown #canvas .tile': 		'startPainting',
		'mouseup #canvas .tile': 		'stopPainting',
		'click #canvas .tile': 			'dispatch',

		'mousedown #canvas': 			'dispatch',
		'mousemove #canvas': 			'move',
		'mouseup': 						'clearMouseAction',

		'keypress': 					'toolSelect',
		//'keyup': 						'toolRelease',
	},

	selectTile: function(e) {
		e.preventDefault();
		var tile = $(e.currentTarget);
		$(".menu .tile").removeClass("selected");
		tile.toggleClass("selected", this.selectedTile !== tile.attr("src"));
		this.selectedTile = (this.selectedTile != null && this.selectedTile.src == tile.attr("src")) ? null : { src: tile.attr("src"), overlay: tile.data("overlay") };
		console.log(this.selectedTile);
	},

	dispatch: function(e) {
		this.x = e.screenX;
		this.y = e.screenY;
		switch (this.activeTool) {
			case "paint": this.isPainting = true; break;
			case "pan": this.isPanning = true; break;
		}
	},

	clearMouseAction: function(e) {
		e.stopPropagation();
		this.isPanning = false;
		this.isPainting = false;
	},

	move: function(e) {
		if (this.panEnabled && this.isPanning) {
			this.pan(e);
		}
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
	},

	toolSelect: function(e) {
		if (e.keyCode in this.keyMap) {
			this.previousTool = this.activeTool;
			this.activeTool = this.keyMap[e.keyCode];
			switch (e.keyCode) {
				case 32: this.enablePanning(); break;
			}
		}
	},

	toolRelease: function(e) {
		if (this.panEnabled) {
			if (this.previousTool != this.activeTool) {
				this.activeTool = this.previousTool;
			}
			this.disablePanning(e);
		}
	},

	enablePanning: function() {
		this.panEnabled = true;
		$("#canvas").addClass("panning");
	},

	disablePanning: function(e) {
		//e.stopPropagation();
		this.panEnabled = false;
		this.isPanning = false;
		$("#canvas").removeClass("panning");	
	},

	pan: function(e) {
		var x = this.x - e.screenX,
			y = this.y - e.screenY;
		this.x = e.screenX;
		this.y = e.screenY;
		$("#canvas").css({
			top: "-=" + y + "px",
			left: "-=" + x + "px",
		});
	}

});

new WorkSpace({ el: $("body") });