class MyTitle extends React.Component {

    constructor(props){
        //Since we are extending the default constructor,
        //handle default activities first.
        super(props);
      
        //Extract the firstname from the prop
        let title = this.props.title
        //Please don't judge me by the way I extract the first name.
        //This is an example.
        
        //In the constructor, feel free to modify the
        //state property on the current context.
        this.state = {
            title: title
        }

    } //Look maa, no comma required in JSX based class defs!

    render() {
        return <h2><span className="badge bg-secondary">{this.state.title}</span></h2>
    }
}

class MyMain extends React.Component {
  
  constructor(props) {
    super(props);
	this.showGraph = this.showGraph.bind(this);
	this.showGraph2 = this.showGraph2.bind(this);
	this.showGraph3 = this.showGraph3.bind(this);
  }
  componentDidMount() {
	  
	  this.showGraph();
	  
  }
  hide_canvas(){
		    $("#graphCanvas1").hide();
			$("#graphCanvas2").hide();
			$("#graphCanvas3").hide();
		}


   showGraph()
   {        
                this.hide_canvas();		
                $.get("/crud/get_data1",
                function (data)
                {
                     var name = [];
                    var marks = [];

                    for (var i in data) {
                        name.push(data[i].bulan);
                        marks.push(data[i].hasil_penjualan);
                    }

                    var chartdata = {
                        labels: name,
                        datasets: [
                            {
                                label: 'Penjualan',
                                backgroundColor: [
                                'rgba(255, 99, 132, 0.2)',
                                'rgba(54, 162, 235, 0.2)',
                                'rgba(255, 206, 86, 0.2)',
                                'rgba(75, 192, 192, 0.2)',
                                'rgba(153, 102, 255, 0.2)',
                                'rgba(255, 159, 64, 0.2)',
                                'rgba(255, 99, 132, 0.2)',
                                'rgba(54, 162, 235, 0.2)',
                                'rgba(255, 206, 86, 0.2)',
                                'rgba(75, 192, 192, 0.2)',
                                'rgba(153, 102, 255, 0.2)',
                                'rgba(255, 159, 64, 0.2)'
                            ],
                            borderColor: [
                                'rgba(255,99,132,1)',
                                'rgba(54, 162, 235, 1)',
                                'rgba(255, 206, 86, 1)',
                                'rgba(75, 192, 192, 1)',
                                'rgba(153, 102, 255, 1)',
                                'rgba(255, 159, 64, 1)',
                                'rgba(255, 99, 132, 0.2)',
                                'rgba(54, 162, 235, 0.2)',
                                'rgba(255, 206, 86, 0.2)',
                                'rgba(75, 192, 192, 0.2)',
                                'rgba(153, 102, 255, 0.2)',
                                'rgba(255, 159, 64, 0.2)'
                            ],
                            borderWidth: 1,
                                hoverBackgroundColor: '#CCCCCC',
                                hoverBorderColor: '#666666',
                                data: marks
                            }
                        ]
                    };
					
					$("#graphCanvas1").show();

                    var graphTarget = $("#graphCanvas1");

                    var barGraph = new Chart(graphTarget, {
                        type: 'bar',
                        data: chartdata,
						options: {
                    scales: {
                        yAxes: [{
                                ticks: {
                                    beginAtZero: true,
									callback: function(value, index, values) {
                                  if(parseInt(value) >= 1000){
									  value = value/1000;
                                    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")+'k';
                                  } else {
                                    return value;
                                  }
                                }
                                }
                            }]
                    }
                }
                    });
                });
           
        }
		
		showGraph2()
        {
		        this.hide_canvas();
                $("#graphCanvas2").show();

                $.get("/crud/get_data1",
                function (data)
                {
                     var name = [];
                    var marks = [];

                    for (var i in data) {
                        name.push(data[i].bulan);
                        marks.push(data[i].hasil_penjualan);
                    }

                    var chartdata = {
                        labels: name,
                        datasets: [
                            {
                                label: 'Penjualan',
                                backgroundColor: '#49e2ff',
                                borderColor: '#46d5f1',
                                hoverBackgroundColor: '#CCCCCC',
                                hoverBorderColor: '#666666',
                                data: marks,
				backgroundColor: [
				'rgba(255, 99, 132, 0.2)',
				'rgba(54, 162, 235, 0.2)'
				],
				borderColor: [
				'rgba(255,99,132,1)',
				'rgba(54, 162, 235, 1)'
				],
				borderWidth: 1
								
                            }
                        ]
                    };

                    var graphTarget = $("#graphCanvas2");

                    var barGraph = new Chart(graphTarget, {
                        type: 'pie',
                        data: chartdata,
						options: {
                    scales: {
                        yAxes: [{
                                ticks: {
                                    beginAtZero: true,
									callback: function(value, index, values) {
                                  if(parseInt(value) >= 1000){
									  value = value/1000;
                                    return value;
                                  } else {
                                    return value;
                                  }
                                }
                                }
                            }]
                    }
                }
                    });
                });
            
        }
		
		showGraph3()
        {        
                this.hide_canvas();		
                $.get("/crud/get_data2",
                function (data)
                {
                     var name = [];
                    var marks = [];

                    for (var i in data) {
                        name.push(data[i].student_name);
                        marks.push(data[i].marks);
                    }

                    var chartdata = {
                        labels: name,
                        datasets: [
                            {
                                label: 'Student Marks',
                                backgroundColor: '#49e2ff',
                                borderColor: '#46d5f1',
                                hoverBackgroundColor: '#CCCCCC',
                                hoverBorderColor: '#666666',
                                data: marks
                            }
                        ]
                    };
					
					$("#graphCanvas3").show();

                    var graphTarget = $("#graphCanvas3");

                    var barGraph = new Chart(graphTarget, {
                        type: 'bar',
                        data: chartdata,
						options: {
                    scales: {
                        yAxes: [{
                                ticks: {
                                    beginAtZero: true,
                                }
                            }]
                    }
                }
                    });
                });
           
        }

	render() {
    return (
	<div>
	<div className="dropdown">
  <nav className="navbar navbar-expand-lg navbar-light bg-light">
  <div className="container-fluid">
    <a className="navbar-brand" href="#"><svg width="15" height="15" fill="currentColor" className="bi bi-layout-text-sidebar" viewBox="0 0 16 16">
  <path d="M3.5 3a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1h-5zm0 3a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1h-5zM3 9.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm.5 2.5a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1h-5z"/>
  <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm12-1v14h2a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1h-2zm-1 0H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h9V1z"/>
</svg> Menu</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle ms-5" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            <svg width="13" height="13" fill="currentColor" className="bi bi-bar-chart-line-fill" viewBox="0 0 16 16">
  <path d="M11 2a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v12h.5a.5.5 0 0 1 0 1H.5a.5.5 0 0 1 0-1H1v-3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3h1V7a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v7h1V2z"/>
</svg> Choose Graph Type
          </a>
          <ul className="btn dropdown-menu ms-5" aria-labelledby="navbarDropdown">
            <li><a href="#" id="index1" className="btn dropdown-item" onClick={this.showGraph}><svg width="16" height="16" fill="currentColor" className="bi bi-check" viewBox="0 0 16 16">
  <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"/>
</svg> Chart JS Type 1</a></li>
			<li><a href="#" id="index2" className="btn dropdown-item" onClick={this.showGraph2}><svg width="16" height="16" fill="currentColor" className="bi bi-check" viewBox="0 0 16 16">
  <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"/>
</svg> Chart JS Type 2</a></li>
			<li><a href="#" id="index3" className="btn dropdown-item" onClick={this.showGraph3}><svg width="16" height="16" fill="currentColor" className="bi bi-check" viewBox="0 0 16 16">
  <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"/>
</svg> Chart JS Type 3</a></li>
          </ul>
        </li>
		<div className="text-end col-xl-12 ms-5">
		  <a href="logout" className="btn btn-outline-success" type="submit"><svg width="16" height="16" fill="currentColor" className="bi bi-box-arrow-in-left" viewBox="0 0 16 16">
  <path fillRule="evenodd" d="M10 3.5a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-2a.5.5 0 0 1 1 0v2A1.5 1.5 0 0 1 9.5 14h-8A1.5 1.5 0 0 1 0 12.5v-9A1.5 1.5 0 0 1 1.5 2h8A1.5 1.5 0 0 1 11 3.5v2a.5.5 0 0 1-1 0v-2z"/>
  <path fillRule="evenodd" d="M4.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H14.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3z"/>
</svg> Logout</a>
        </div>
      </ul>
    </div>
  </div>
</nav>
  <div className="dropdown-content">
    
  </div>
</div>
	<div id="chart-container" style={{
		marginTop:"120px"
	}}>
        <canvas id="graphCanvas1"></canvas>
    </div>
	<div id="chart-container" style={{
		marginTop:"120px"
	}}>
        <canvas id="graphCanvas2"></canvas>
    </div>
	<div id="chart-container" style={{
		marginTop:"120px"
	}}>
        <canvas id="graphCanvas3"></canvas>
    </div>
</div>
    );
  }
}

var theTitle = "Graph React JS Node";

ReactDOM.render(<MyMain/>, 
                document.getElementById('mymain'));		
document.title=theTitle;				