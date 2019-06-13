const gradleBuild=require('child_process');
var path = require('path');

//console.log(child);

let syncPro=()=>{
if(document.getElementById('keygen').innerHTML==='Sync Project'||document.getElementById('proSync').innerHTML==='Sync Project'){
  document.getElementById('overlay').style.display='flex'
  document.getElementById('open').style.display='none'

  const { spawn } = require('child_process');
  let location=localStorage.getItem('projectPath');
  location=path.resolve(location);

  //e.g : "C:\AndroidStudioProjects\Corona"
  console.log(location);
  const bat = spawn('cmd.exe', ['/c','cd',location,'&&','gradlew']);

  let output='';
  console.log(bat.pid);
  bat.stdout.on('data', (data,dawn) => {
    console.log(data.toString()); 
    output=output+'\n'+data.toString();
    document.getElementById('overlay').innerHTML=output;  
  });

  bat.stderr.on('data', (data) => {
    output=output+data.toString();
    document.getElementById('overlay').innerHTML=output;   
  });

  bat.on('exit', (code) => {
    console.log(code.toString());
    /*if(code==0){
      document.getElementById('overlay').innerHTML='<h1 style="color:red;">Project Build Success</h1>';    
    }*/
  });
  }
}
let killProcess=(pid)=>{
  let killMe=spawn('cmd.exe',['/c','taskkill /F /PID'])
}
//document.getElementById('proSync').addEventListener('click',syncPro);
//document.getElementById('keygen').addEventListener('click',syncPro);