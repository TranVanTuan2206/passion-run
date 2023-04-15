const MY_TEAM = ['tuantv18','yhtn1','thuongva','huydn7','thanhnc40','tungts4','huypvg','trivm3'];

function processTime(seconds) {
    let date = '';

    // a day =  86400 seconds 
    if(seconds > 86400) {
        date += Math.floor(seconds / 86400) + 'd ';
        seconds -= 86400 * Math.floor(seconds / 86400);
    }

    // an hour =  3600 seconds 
    if(seconds > 3600) {
        date += Math.floor(seconds / 3600) + 'h ';
        seconds -= 3600 * Math.floor(seconds / 3600);
    }

    if(seconds > 60) {
        date += Math.floor(seconds / 60) + 'm';
    }


    if(!date) {
        date = 0;
    }

    return date;
}

function prettierClass(index) {
    switch(index) {
        case 1:
            return 'gold';
        case 2:
            return 'silver';
        case 3:
            return 'bronze';
        default:
            return 'normal'
    }
}


function displayData(dataArr) {
    // display count members
    document.getElementById('count').innerHTML = dataArr.length;
    let tableString = '';
    dataArr.map((e,index) => {
        let date = processTime(e.show_time);
        tableString += ` 
        <tr class="${prettierClass(index + 1)}">
            <td>${index + 1}</td>
            <td>${e.user_name}</td>
            <td>${(e.show_km / 1000).toString().replace('.',',')}</td>
            <td>${date}</td>
        </tr>`
    })

    document.getElementById('place-holder').innerHTML = tableString;
}

  
// Defining async function
async function getapi() {
    Promise.all([
        fetch("https://apivrace.vnexpress.net/group/list-members?limit=100&offset=0&detail=gr&gid=2043&s=k&ft%5Btype%5D=-1&size=group_detail.logo.122x122").then(value => value.json()),
        fetch("https://apivrace.vnexpress.net/group/list-members?limit=100&offset=0&detail=gr&gid=2045&s=k&ft%5Btype%5D=-1&size=group_detail.logo.122x122").then(value => value.json()),
      ]).then((res) => {
        let data = [];
        res.map((e) => data = [...data, ...e.data.members.data])
        data = data.filter((e) => MY_TEAM.includes(e.user_name.toLowerCase()));
        data = data.sort((a,b) => b.show_km - a.show_km);
        displayData(data);
          
      }).catch((err) => {
          console.log(err);
      });
}
// Calling that async function
getapi();



