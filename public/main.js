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

fetch('http://localhost:3000/vote')
.then(res => res.json())
.then(data => {
    const votes = data.votes;
    const totalVotes = votes.length;
    //Count vote points - acc/current
    const voteCounts = votes.reduce((acc, vote) => (acc[vote.president] = 
        ((acc[vote.president] || 0) + parseInt(vote.points)), acc), {});
       
    //Canvas chart
    let dataPoints = [
        { label: 'Uche', y: voteCounts.Uche },
        { label: 'Ike', y: voteCounts.Ike },
        { label: 'Latifa', y: voteCounts.Latifa },
        { label: 'Nana', y: voteCounts.Nana }
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

});

    