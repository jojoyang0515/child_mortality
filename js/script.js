//chart 2
var world = [];
var east_asia_pacific = [];
var europe = [];
var latin = [];
var middle_east = [];
var north_america = [];
var south_asia = [];
var sub_saharan = [];

//chart 3
var child_world = [];
var child_east_asia_pacific = [];
var child_europe = [];
var child_latin = [];
var child_middle_east = [];
var child_north_america = [];
var child_south_asia = [];
var child_sub_africa = [];

//chart 4
var respiratory = [];
var preterm = [];
var diarrheal = [];
var neonatal = [];
var congenital = [];
var malaria = [];
var other = [];
var sepsis = [];
var meningitis = [];
var nutritional = [];
var cough = [];
var measles = [];
var hiv_aids = [];
var drowning = [];
var tuberculosis = [];

//chart 5
var expectation = [];
var reality = [];

//load data...
$(document).ready(function () {
	loadData();
});

function loadData() {
	/*map 1 data from https://docs.google.com/spreadsheets/d/1CMnm7UAKIdCvE0MIZbXAd09O58kmzuJOSTW7tZivLOI/pubhtml*/

	//chart 2
	$.getJSON("data/InfantMortalityByRegions.json", function (data) {
		console.log(data);
		parseData(data);
	});

	//chart 3
	$.getJSON("data/CausesOfChildMortality.json", function (data) {
		console.log(data);
		parseData2(data);
	});

	//chart 4
	$.getJSON("data/ChildMortalityByRegions.json", function (data) {
		console.log(data);
		parseData3(data);
	});

	//chart 5
	$.getJSON("data/childmortalityprojection.json", function (data) {
		console.log(data);
		parseData4(data);
	});
}

//parse data

//chart 2 parsing...
function parseData(data) {
	for (var i = 0; i < data.length; i++) {
		world.push(Number(data[i].world));
		east_asia_pacific.push(Number(data[i].east_asia_pacific));
		europe.push(Number(data[i].europe));
		latin.push(Number(data[i].latin));
		middle_east.push(Number(data[i].middle_east));
		north_america.push(Number(data[i].north_america));
		south_asia.push(Number(data[i].south_asia));
		sub_saharan.push(Number(data[i].sub_saharan));
	}
	createCharts();
}

//chart 3 parsing...
function parseData2(data) {
	for (var n = 0; n < data.length; n++) {
		respiratory.push(Number(data[n].respiratory));
		preterm.push(Number(data[n].preterm));
		diarrheal.push(Number(data[n].diarrheal));
		neonatal.push(Number(data[n].neonatal));
		congenital.push(Number(data[n].congenital));
		malaria.push(Number(data[n].malaria));
		other.push(Number(data[n].other));
		sepsis.push(Number(data[n].sepsis));
		meningitis.push(Number(data[n].meningitis));
		nutritional.push(Number(data[n].nutritional));
		cough.push(Number(data[n].cough));
		measles.push(Number(data[n].measles));
		hiv_aids.push(Number(data[n].hiv_aids));
		drowning.push(Number(data[n].drowning));
		tuberculosis.push(Number(data[n].tuberculosis));
	}
	createCharts();
}

//chart 4 parsing...
function parseData3(data) {
	for (var m = 0; m < data.length; m++) {
		child_world.push(Number(data[m].child_world));
		child_east_asia_pacific.push(Number(data[m].child_east_asia_pacific));
		child_europe.push(Number(data[m].child_europe));
		child_latin.push(Number(data[m].child_latin));
		child_middle_east.push(Number(data[m].child_middle_east));
		child_north_america.push(Number(data[m].child_north_america));
		child_south_asia.push(Number(data[m].child_south_asia));
		child_sub_africa.push(Number(data[m].child_sub_africa));
	}
	createCharts();
}

//chart 5 parsing...
function parseData4(data) {
	for (var m = 0; m < data.length; m++) {
		expectation.push(Number(data[m].expectation));
		reality.push(Number(data[m].reality));
	}
	createCharts();
}

//create charts
function createCharts() {
	/*map 1 https://docs.google.com/spreadsheets/d/1CMnm7UAKIdCvE0MIZbXAd09O58kmzuJOSTW7tZivLOI/pubhtml */
	Highcharts.data({
		googleSpreadsheetKey: '1CMnm7UAKIdCvE0MIZbXAd09O58kmzuJOSTW7tZivLOI',
		parsed: function (columns) {
			// Read the columns into the data array
			var data = [];
			Highcharts.each(columns[0], function (code, i) {
				data.push({
					code: code.toUpperCase(),
					value: parseFloat(columns[2][i]),
					name: columns[1][i]
				});
			});
			Highcharts.mapChart('container', {
				chart: {
					map: 'custom/world',
					height: 650, //resize the map
					style: {
						font: '12px "Poppins", sans-serif'
					},
				},
				title: {
					text: ''
				},
				mapNavigation: {
					enabled: true
				}, //zoom in
				legend: {
					title: {
						text: 'Deaths per 1,000 live births',
					},
					align: 'left',
					verticalAlign: 'bottom',
					floating: true,
					layout: 'vertical',
					valueDecimals: 0,
					symbolRadius: 0,
					symbolHeight: 20,
				},

				//shades
				colorAxis: {
					dataClasses: [{
						to: 5,
						color: '#D8F3DC',
                }, {
						from: 5,
						to: 15,
						color: '#B7E4C7',
                }, {
						from: 15,
						to: 30,
						color: '#95D5B2',
                }, {
						from: 30,
						to: 45,
						color: '#74C69D',
                }, {
						from: 45,
						to: 60,
						color: '#52B788',
                }, {
						from: 60,
						to: 75,
						color: '#40916C',
                }, {
						from: 75,
						color: '#2D6A4F',
                }]
				},
				//hover data
				series: [{
					data: data,
					joinBy: ['iso-a3', 'code'],
					animation: true,
					name: 'Infant Mortality Rate',
					states: {
						hover: {
							color: '#608caa'
						}
					},
					tooltip: {
						valueSuffix: ' deaths per 1,000 newborns'
					},
            }]
			});
		},
		//responsive
		responsive: {
			rules: [{
				condition: {
					maxWidth: 1300
				},
				chartOptions: {
					legend: {
						align: 'center',
						verticalAlign: 'bottom',
						layout: 'horizontal'
					}
				}
        }]
		}
	});

	//chart 2
	Highcharts.chart('container2', {
		chart: {
			height: 500, //resize chart
			style: {
				font: '12px "Poppins", sans-serif'
			},
		},
		title: {
			text: ''
		},
		xAxis: {
			crosshair: {
				enabled: true
			}
		},
		yAxis: {
			title: {
				text: 'Deaths per 1,000 live newborns'
			},
			resize: {
				enabled: true
			}
		},
		legend: {
			enabled: true,
			layout: 'horizontal',
			align: 'right',
			verticalAlign: 'bottom',
			borderWidth: 1
		},
		plotOptions: {
			series: {
				marker: {
					symbol: 'circle'
				},
				pointStart: 1990
			}
		},
		tooltip: {
			shared: true,
			crosshairs: true,
			//split: true,
		},
		series: [{
			name: "Sub-Saharan Africa",
			color: '#2D6A4F',
			data: sub_saharan
		}, {
			name: "South Asia",
			color: '#40916C',
			data: south_asia,
		}, {
			name: "World",
			color: '#608CAA',
			lineWidth: 3,
			data: world,
		}, {
			name: "Middle East & North Africa",
			color: '#52B788',
			data: middle_east,
		}, {
			name: "Latin America & Caribbean",
			color: '#95D5B2',
			data: latin,
		}, {
			name: "East Asia & Pacific",
			color: '#74C69D',
			data: east_asia_pacific,
		}, {
			name: "Europe & Central Asia",
			color: '#B7E4C7',
			data: europe,
		}, {
			name: "North America",
			color: '#D8F3DC',
			data: north_america,
		}],
		responsive: {
			rules: [{
				condition: {
					maxWidth: 500
				},
				chartOptions: {
					legend: {
						align: 'center',
						verticalAlign: 'bottom',
						layout: 'horizontal'
					}
				}
        }]
		}
	});

	//chart 3
	Highcharts.chart('container3', {
		chart: {
			height: 500,
			style: {
				font: '12px "Poppins", sans-serif'
			},
		},
		title: {
			text: ''
		},
		xAxis: {
			crosshair: {
				enabled: true
			}
		},
		yAxis: {
			title: {
				text: 'Deaths per 1,000 live newborns'
			},
			resize: {
				enabled: true
			}
		},
		rangeSelector: {
			selected: 4
		},
		legend: {
			enabled: true,
			layout: 'horizontal',
			align: 'right',
			verticalAlign: 'bottom',
			borderWidth: 1
		},
		plotOptions: {
			series: {
				marker: {
					symbol: 'circle'
				},
				pointStart: 1990
			}
		},
		tooltip: {
			shared: true,
			crosshairs: true,
			//split: true,
		},
		series: [{
			name: "Sub-Saharan Africa",
			color: '#2D6A4F',
			data: child_sub_africa
		}, {
			name: "South Asia",
			color: '#40916C',
			data: child_south_asia,
		}, {
			name: "World",
			color: '#608CAA',
			lineWidth: 3,
			data: child_world,
		}, {
			name: "Middle East & North Africa",
			color: '#52B788',
			data: child_middle_east,
		}, {
			name: "Latin America & Caribbean",
			color: '#95D5B2',
			data: child_latin,
		}, {
			name: "East Asia & Pacific",
			color: '#74C69D',
			data: child_east_asia_pacific,
		}, {
			name: "Europe & Central Asia",
			color: '#B7E4C7',
			data: child_europe,
		}, {
			name: "North America",
			color: '#D8F3DC',
			data: child_north_america,
		}],
		responsive: {
			rules: [{
				condition: {
					maxWidth: 500
				},
				chartOptions: {
					legend: {
						layout: 'horizontal',
						align: 'center',
						verticalAlign: 'bottom'
					}
				}
        }]
		}
	});

	//chart 4
	Highcharts.chart('container4', {
		chart: {
			type: 'bar',
			height: 550,
			style: {
				font: '12px "Poppins", sans-serif'
			},
		},
		responsive: {
			rules: [{
				condition: {
					maxWidth: 500
				},
				chartOptions: {
					legend: {
						layout: 'horizontal',
						align: 'center',
						verticalAlign: 'bottom'
					}
				}
        }]
		},
		title: {
			text: ''
		},
		xAxis: {
			categories: ['Lower Respiratory Infections', 'Neonatal Preterm Birth Complications', 'Diarrheal Diseases', 'Birth Asphyxia and Trauma', 'Congenital Birth Defects', 'Malaria', 'Other Neonatal Disorders', 'Neonatal Infections', 'Meningitis', 'Nutritional Deficiencies'
						],
		},
		yAxis: {
			title: {
				text: '',
				align: 'high'
			},
			min: 0,
			labels: {
				enabled: false,
			},
			gridLineWidth: 0, //no gridlines
		},
		tooltip: {
			valueSuffix: ' cases of deaths'
		},
		plotOptions: {
			bar: {
				dataLabels: {
					enabled: true
				}
			}
		},
		legend: {
			enabled: false
		},
		credits: {
			enabled: false
		},
		series: [{
			data: [respiratory, preterm, diarrheal, neonatal, congenital, malaria, other, sepsis, meningitis, nutritional],
			color: '#52B788' //change colors of bars
    }]
	});

	//child mortality projections
	Highcharts.chart('container5', {
		chart: {
			height: 400, //resize chart
			style: {
				font: '12px "Poppins", sans-serif'
			},
		},
		title: {
			text: ''
		},
		xAxis: {
			crosshair: {
				enabled: true
			},
			categories: ['2015', '2030']
		},
		yAxis: {
			title: {
				text: 'Million Deaths'
			},
			resize: {
				enabled: true
			}
		},
		legend: {
			enabled: true,
			layout: 'horizontal',
			align: 'right',
			verticalAlign: 'bottom',
			borderWidth: 1
		},
		plotOptions: {
			series: {
				marker: {
					symbol: 'circle'
				}
			}
		},
		tooltip: {
			valueSuffix: ' millions deaths per year'
		},
		series: [{
			name: "United Nations Projection",
			color: '#2D6A4F',
			data: reality
		}, {
			name: "Achieving the Sustainable Goal",
			color: '#52B788',
			data: expectation
		}],
		responsive: {
			rules: [{
				condition: {
					maxWidth: 500
				},
				chartOptions: {
					legend: {
						align: 'center',
						verticalAlign: 'bottom',
						layout: 'horizontal'
					}
				}
        }]
		}
	});
}

//infant mortality table
$('#myTable').DataTable({
	"scrollX": true, //scroll left and right
	ajax: {
		url: 'data/InfantMortalityAllData.json',
		dataSrc: ''
	},
	columns: [
		{data: 'Country Name'}, 
		{data: '1990'}, 
		{data: '1991'}, 
		{data: '1992'}, 
		{data: '1993'}, 
		{data: '1994'}, 
		{data: '1995'}, 
		{data: '1996'}, 
		{data: '1997'}, 
		{data: '1998'}, 
		{data: '1999'}, 
		{data: '2000'}, 
		{data: '2001'}, 
		{data: '2002'}, 
		{data: '2003'},
		{data: '2004'}, 
		{data: '2005'}, 
		{data: '2006'},
		{data: '2007'}, 
		{data: '2008'}, 
		{data: '2009'}, 
		{data: '2010'}, 
		{data: '2011'}, 
		{data: '2012'}, 
		{data: '2013'}, 
		{data: '2014'}, 
		{data: '2015'}, 
		{data: '2016'}, 
		{data: '2017'},
		{data: '2018'}, 
		{data: '2019'}
		]
});

//child mortality table
$('#myTable2').DataTable({
	"scrollX": true, //scroll left and right
	ajax: {
		url: 'data/ChildMortalityAllData.json',
		dataSrc: ''
	},
	columns: [
		{data: 'Country Name'}, 
		{data: '1990'}, 
		{data: '1991'}, 
		{data: '1992'}, 
		{data: '1993'}, 
		{data: '1994'}, 
		{data: '1995'}, 
		{data: '1996'}, 
		{data: '1997'}, 
		{data: '1998'}, 
		{data: '1999'}, 
		{data: '2000'}, 
		{data: '2001'}, 
		{data: '2002'}, 
		{data: '2003'},
		{data: '2004'}, 
		{data: '2005'}, 
		{data: '2006'},
		{data: '2007'}, 
		{data: '2008'}, 
		{data: '2009'}, 
		{data: '2010'}, 
		{data: '2011'}, 
		{data: '2012'}, 
		{data: '2013'}, 
		{data: '2014'}, 
		{data: '2015'}, 
		{data: '2016'}, 
		{data: '2017'},
		{data: '2018'}, 
		{data: '2019'}
		]
});