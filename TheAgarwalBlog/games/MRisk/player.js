
	class Player {
		constructor(color, numPlayers, width, height, name = 'PlayerInstance'){
			assert(color, NotEmpty, 'Color Cannot be Empty');
			assert(color.charAt(0), '#', 'Color must be a hex code');
			final(this, 'color', color);
			final(this, 'name', name);
			// final(this, 'zones', []);
			this.capital = null;
			if(numPlayers === 2)
				this.capital2 = null;
			this.gold = 24;
			this.numZonesOwned = 0;
			this.panelX = width * 0.8;
			this.panelY = 0;
			this.panelWidth = 0.2*width;
			this.panelHeight = height;
		}

		choseCapital(callback) {
			assert(typeof callback, 'function', 'Callback should be function.');
			if(this.capital && this.capital2) return;
			let choices = MAP.zones
				.filter(s => s.master === null)
				.sort(s => 0.5 < Math.random())
				.slice(0, 10);
			choices.forEach(s => { s.highlighted = true; });
			let self = this;
			let f = (z => {
				if(choices.includes(z)){
					if(!this.capital) this.capital = z;
					else if(!this.capital2) this.capital2 = z;
					z.master = self;
					MAP.highlight(z => true, false);
					callback();
				}
				else pickZone(f);
			});
			pickZone(f);
		}

		draw(ctx) {
			ctx.lineWidth = 4;
			if(this.capital){
				ctx.strokeStyle = this.color;
				ctx.strokeRect(this.capital.x, this.capital.y, w, h);
 			}
			if(this.capital2){
				ctx.strokeStyle = this.color;
				ctx.strokeRect(this.capital2.x, this.capital2.y, w, h);
 			}
		}

		drawHUD(ctx) {
			ctx.fillStyle = this.color + "4";
			ctx.fillRect(this.panelX, this.panelY, this.panelWidth, this.panelHeight);
			ctx.fillStyle = "#fff";
			ctx.fillText("Gold: " + this.gold, width * 0.825, height * 0.1);
			if(this.capital)
				ctx.fillText("Capital: " + this.capital.name, width * 0.825, height * 0.15);
			if(this.capital2)
				ctx.fillText("Capital 2: " + this.capital2.name, width * 0.825, height * 0.2);
			ctx.fillText("# of Zones Owned: " + this.numZonesOwned, width * 0.825, height * 0.25);
			ctx.fillText("Cost of Infantry: 1", width * 0.825, height * 0.3);
			ctx.fillText("Cost of Cavalry: 3", width * 0.825, height * 0.35);
			ctx.fillText("Cost of Artillery: 5", width * 0.825, height * 0.4);
		}

		addGold(goldToBeAdded) {
			this.gold = this.gold + goldToBeAdded;
		}

		changeNumZonesOwnedBy(numZonesDiffernce) {
			this.numZonesOwned = this.numZonesOwned + numZonesDiffernce;
		}
	}
