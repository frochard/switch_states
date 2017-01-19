$(function () {

    var data = [];
    function readTextFile(file, callback) {
        var rawFile = new XMLHttpRequest();
        rawFile.overrideMimeType("application/json");
        rawFile.open("GET", file, true);
        rawFile.onreadystatechange = function() {
            if (rawFile.readyState === 4 && rawFile.status == "200") {
                callback(rawFile.responseText);
            }
        }
        rawFile.send(null);
    }

    //usage:
    readTextFile("json/data3.json", function(text){
        data = JSON.parse(text);
        console.log(data);
        // Make codes uppercase to match the map data
        $.each(data, function () {
            this.code = this.code.toUpperCase();
        });

        // Instanciate the map
        Highcharts.mapChart('container', {

            chart: {
                borderWidth: 1
            },

            title: {
                text: 'Swing states'
            },

            legend: {
                layout: 'horizontal',
                borderWidth: 0,
                backgroundColor: 'rgba(255,255,255,0.85)',
                floating: true,
                verticalAlign: 'top',
                y: 25
            },

            mapNavigation: {
                enabled: true
            },

            colorAxis: {
                min: 0,
                type: 'linear',//linear or logarithmic
                minColor: '#FFFFFF',
                maxColor: '#000022',
                stops: [
                    [0, '#FFFFFF'],
                    [0.70, '#4444FF'],
                    [1, '#000022']
                ]
            },

            series: [{
                animation: {
                    duration: 1000
                },
                data: data,
                mapData: Highcharts.maps['countries/us/us-all'],
                joinBy: ['postal-code', 'code'],
                dataLabels: {
                    enabled: true,
                    color: '#FFFFFF',
                    format: '{point.code}'
                },
                name: 'switch state',
                tooltip: {
                    pointFormat: '{point.code}: {point.value}'
                }
            }]
        });

    });


});