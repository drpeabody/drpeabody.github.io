
class Solver {

	constructor(canvas, min, max, V_drawn, D, dx) {
		this.V = [];
		this.X = [];
		this.psi = []; 
		this.phi = []; // phi = d/dx psi
		this.Xmin = min; 
		this.Xmax = max;
		this.chartID = canvas;
		this.V_drawn = V_drawn;
		this.dx = dx;
		if(isNaN(this.dx)) {
			this.dx = 0.001;
		}
		this.D = D;
		this.N = (this.Xmax - this.Xmin) / this.dx;
		for (let x = this.Xmin, idx = 0; idx <= this.N; idx++, x += this.dx) {
			this.psi.push(0);
			this.phi.push(0);
			this.X.push(parseFloat(x).toFixed(2));
			this.V.push(this.V_drawn(x));
		}
	}

	calculate(start, end, dir) {
		let d_x = this.dx * dir;
		for (let idx = start + dir; idx != end; idx += dir) {
			let p_idx = idx - dir;
			let x = this.Xmin + (idx / this.N) * (this.Xmax - this.Xmin);
			this.phi[idx] = this.phi[p_idx] + this.D(x, this.psi[p_idx], this.phi[p_idx]) * d_x;
			this.psi[idx] = this.psi[p_idx] + this.phi[p_idx] * d_x;
			if (isNaN(this.psi[idx])) {
				console.log("NaN Value encountered");
				return;
			}
		}
	}

	draw = function(arg){
		let canvas = document.getElementById(this.chartID);
		let parent = canvas.parentElement;
		canvas.remove();
		canvas = document.createElement("canvas");
		canvas.id = this.chartID;
		parent.append(canvas);
		// canvas = document.getElementById(this.chartID);
		// canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
		this.chart = new Chart(canvas, {
		    type: 'line',
		    data: {
		    	labels: this.X,
		    	datasets: [{
			    		data: this.psi,
			    		label: "Psi",
			    		fill: false,
			    		showLine: false
			    	},
			    	{
			    		data: this.V,
			    		label: "Potential",
			    		fill: false,
			    		borderColor: "#881111",
			    		fill: "#881111",
			    	}
		    	]
		    },
		    options: {
		    	responsive: true,
		    	animation: {duration: 0 },
		        hover: { animationDuration: 0 },
		        responsiveAnimationDuration: 0,
		        elements: {
	            	line: { tension: 0 }
	    		},
	    		scales: {
		            yAxes: [{
		                ticks: arg
		            }]
		        }
		    }
		});
	}
}