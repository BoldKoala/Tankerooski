var MSG = false;
var JUMP = false;
function keyDown(d, tanks, POV) {
	// console.log(d.keyCode);
  //W key
  if(!MSG){
    if(d.keyCode === 87){
      tanks[tanks._id].currentSpeed = -tanks[tanks._id].speed;    
    }
    //S key
    if(d.keyCode === 83){
      tanks[tanks._id].currentSpeed = tanks[tanks._id].speed;    
    }
    //D key
    if(d.keyCode === 68){
      tanks[tanks._id].spin = 0.05;
    }
    //A key
    if(d.keyCode === 65){
      tanks[tanks._id].spin = -0.05;
    }
    //space
    if (d.keyCode === 32){
      tanks[tanks._id].isFire = true;
    }

    //Right key
    if(d.keyCode === 39){
      tanks[tanks._id].torretY = 0.02;
    }
    //Left key
    if(d.keyCode === 37){
      tanks[tanks._id].torretY = -0.02;
    }
    //Up key
    if(d.keyCode === 38){
      tanks[tanks._id].torretX = 0.02;
    }
    //Down key
    if(d.keyCode === 40){
      tanks[tanks._id].torretX = -0.02;
    }

    if(d.keyCode === 82){
      document.getElementById('chatbox').style.display = 'block';
      var table = document.getElementById('chatbox-table')
      table.scrollTop = table.scrollHeight;
      MSG = true;
    }

    if(d.keyCode === 76){
      leaderboard(tanks);
      document.getElementById('dead').style.display = document.getElementById('dead').style.display === 'none' ? 'inline-block' : 'none';
    }

    if(d.keyCode === 67 && !JUMP){
      // C - Jump key, implement freefall physics here
      var initialVelocity = 0.35;
      var acceleration = -0.01;
      JUMP = true;

      // Create function for height position
      var jump = function(time) {
        return ((initialVelocity * time) + (acceleration * time * time));
      }

      if(tanks[tanks._id].tanker.position.y < 1){    
        var counter = 0;
        var jumping = setInterval(function(){
          // console.log("counter: ", counter, "height: ", tanks[tanks._id].tanker.position.y);
          if (tanks[tanks._id].tanker.position.y < 0) {
            tanks[tanks._id].tanker.position.y = 0;
            clearInterval(jumping);
            JUMP = false;
            return;
          }
          // Need to change the max counter to be right after height is 0
          if (counter < 60){
            tanks[tanks._id].tanker.position.y = jump(counter);

            tanks[tanks._id].hpbar.position.x = tanks[tanks._id].tanker.position.x;
            tanks[tanks._id].hpbar.position.y = tanks[tanks._id].tanker.position.y+1;
            tanks[tanks._id].hpbar.position.z = tanks[tanks._id].tanker.position.z;
            tanks[tanks._id].hpbar.rotation.y = -tanks[tanks._id].cameraDirection;

            tanks[tanks._id].reloadBar.position.x = tanks[tanks._id].tanker.position.x;
            tanks[tanks._id].reloadBar.position.y = tanks[tanks._id].tanker.position.y + 0.95;
            tanks[tanks._id].reloadBar.position.z = tanks[tanks._id].tanker.position.z;
            tanks[tanks._id].reloadBar.rotation.y = -tanks[tanks._id].cameraDirection;

            counter++
          }
        }, 10)
      }

      // Original jump algorithm
      // if(tanks[tanks._id].tanker.position.y < 0.1){    
      //   var counter = 0;
      //   setInterval(function(){
      //     console.log("counter: ", counter, "height: ", tanks[tanks._id].tanker.position.y);
      //     if (counter < 50){
      //       tanks[tanks._id].tanker.position.y += 0.06;
      //       counter++
      //     }
      //     if (counter >= 50 && counter < 100){
      //       tanks[tanks._id].tanker.position.y -= 0.06;
      //       counter++
      //     }
      //   }, 10)
      // }
    }
  }

  if(d.keyCode === 27){
    document.getElementById('chatbox').style.display = 'none';
    MSG = false;
  }
}

function keyUp (d, tanks){
	//W ke
  if(d.keyCode === 87){
    tanks[tanks._id].currentSpeed = 0;
  }
  //S ke
  if(d.keyCode === 83){
    tanks[tanks._id].currentSpeed = 0;
  }
  //D key
  if(d.keyCode === 68){
    tanks[tanks._id].spin = 0;
  }
  //A key
  if(d.keyCode === 65){
    tanks[tanks._id].spin = 0;    
  }
  //space
  if (d.keyCode === 32){
    tanks[tanks._id].isFire = false;
  }

  //Left key
  if(d.keyCode === 37){
    tanks[tanks._id].torretY = 0;
  }
  //Right key
  if(d.keyCode === 39){
    tanks[tanks._id].torretY = 0;
  }
  //Up key
  if(d.keyCode === 38){
    tanks[tanks._id].torretX = 0;
  }
  //Down key
  if(d.keyCode === 40){
    tanks[tanks._id].torretX = 0;
  }
}

function leaderboard(tanks){
  var result = [];

  for(var tank in tanks){
    if(tank !== '_id'){
      result.push(tanks[tank])
    }
  }

  result.sort(function(a,b){return b.kills-a.kills});

  document.getElementById('leader').innerHTML = "<tr id='leader-header'><td id='leader-rank'>#</td><td id='leader-name'>Name</td><td id='leader-kills'>Kills</td><td id='leader-deaths'>Deaths</td><td id='leader-on-target'>On Target</td><td id='leader-fired'>Attempts</td><td id='leader-accuracy'>%</td></tr>"

  result.forEach(function(tank,i){
    var rank = document.createElement('td')
    var name = document.createElement('td')
    var kills = document.createElement('td')
    var deaths = document.createElement('td')
    var onTarget = document.createElement('td')
    var fired = document.createElement('td')
    var accuracy = document.createElement('td')
    var row = document.createElement('tr')
    rank.setAttribute('id','leader-rank');
    name.setAttribute('id','leader-name');
    kills.setAttribute('id','leader-kills');
    deaths.setAttribute('id','leader-deaths');
    onTarget.setAttribute('id','leader-on-target');
    fired.setAttribute('id','leader-fired');
    accuracy.setAttribute('id','leader-accuracy');
    row.setAttribute('id','leader-stat');
    rank.innerHTML = i+1;
    name.innerHTML = tank.name;
    kills.innerHTML = tank.kills;
    deaths.innerHTML = tank.deaths;
    onTarget.innerHTML = tank.onTarget;
    fired.innerHTML = tank.fired;
    accuracy.innerHTML = Math.floor((tank.onTarget/tank.fired)*100)+'%';
    row.appendChild(rank);
    row.appendChild(name);
    row.appendChild(kills);
    row.appendChild(deaths);
    row.appendChild(onTarget);
    row.appendChild(fired);
    row.appendChild(accuracy);
    document.getElementById('leader').appendChild(row);
  })

  return result;
}
