const form = document.getElementById('vote-form');

//Form Submit event
form.addEventListener('submit', e => {
    const choice = document.querySelector('input[name=president]:checked').value;
    const data = {president: choice};

    fetch('http://localhost:3000/vote', {
        method: 'post',
        body: JSON.stringify(data),
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    })
        .then(res => res.json())
        .then(data => console.log(data))
        .catch(err => console.log(err));
    e.preventDefault();
});

//Canvas chart
let dataPoints = [
    { label: 'Uche', y: 0 },
    { label: 'Ike', y: 0 },
    { label: 'Latifa', y: 0 },
    { label: 'Nana', y:0},
];

const chartContainer = document.querySelector('#chartContainer');

if(chartContainer){
    const chart = new CanvasJS.Chart('chartContainer', {
        animationEnabled: true,
        theme: 'theme1',
        title: {
            text: `Voting Results`
        },
        data: [
            {
                type: 'column',
                dataPoints: dataPoints
            }
        ]
    });
    chart.render();

    Pusher.logToConsole = true;

    var pusher = new Pusher('523a5394bb28b6882a6e', {
    cluster: 'eu',
    encrypted: true
    });

    var channel = pusher.subscribe('cdss-vote');
    channel.bind('president-vote', function(data) {
        dataPoints = dataPoints.map(x => {
            if(x.label == data.president) {
                x.y += data.points;
                return x;
            } else{
                return x;
            }
        });
        chart.render();
    });
} 

    