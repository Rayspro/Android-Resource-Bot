 const fs=require('fs');
 //const WindowsToaster = require('node-notifier').WindowsToaster;
 const appScript=require('child_process');
 const dialog3=require('electron');
 const dialog4=require('electron');
 const dialog5=require('electron');
 /*var notifier = new WindowsToaster({
    withFallback: false, // Fallback to Growl or Balloons? 
    customPath: void 0 // Relative path if you want to use your fork of toast.exe 
});*/
 document.getElementById('keygen').style.visibility='hidden';
 document.getElementById('reload').style.visibility='hidden';
 let type='';

 //Project Single Selection

 document.getElementById('typeimg1').addEventListener('click',(e)=>{
     document.getElementById('typeimg2').style.visibility='hidden';
     localStorage.setItem('type','1');
     document.getElementById('typeimg1').style.backgroundColor='rgba(255,255,255,0.5)';
     type='1';
 });

 //Project Main Selection

 document.getElementById('typeimg2').addEventListener('click',(e)=>{
    document.getElementById('typeimg1').style.visibility='hidden';
    localStorage.setItem('type','2');
    document.getElementById('typeimg2').style.backgroundColor='rgba(255,255,255,0.5)';
    console.log(localStorage.getItem('type'));
    type='2';
});

 if(localStorage.getItem('projectPath')!==null){
    document.getElementById('overlay').style.display='none';
}
//document.getElementById('loader').style.visibility='hidden'

 let flag=false;
 let clientName="";
 let rootDirectory=localStorage.getItem('projectPath');
 let relativePath="";
 let javaRoot='';
 let keyPath='';

 let promiss=new Promise(function(resolve,reject){
     if(flag===true){
         resolve();
     }
 });

promiss.then(
document.getElementById('submit').addEventListener('click',function(e){
    //document.getElementById('submit').disabled=true;
    type=localStorage.getItem('type');
    if(type==null){
        //Show Dialog
    }
    if(localStorage.getItem('keyPath')===null){
        dialog3.remote.dialog.showMessageBox
    }
    console.log(localStorage.getItem('projectPath'));
    console.log(javaRoot);
    e.stopPropagation;   
    let cname=document.getElementById('cname').value;
    let app_name=document.getElementById('app_name').value;
    let exam_name=document.getElementById('exam_name').value;
    let exam_id=document.getElementById('exam_id').value;
    let contact=document.getElementById('contact').value;
    let email=document.getElementById('email').value;
    let base_url=document.getElementById('base_url').value;
    let pack_name=document.getElementById('pack_name').value;
    let vector= document.getElementById('vector').value;
    rootDirectory=localStorage.getItem('projectPath')

    //Operational Area....
           if(cname===""){
               dialog3.remote.dialog.showMessageBox(null,{message:"Please Fill All Fields",title:"Alert"})
               //alert("Fill Required Fields");
               document.getElementById('cname').focus();
           }else{
            document.getElementById('submit').style.visibility='hidden';
            let FileName=cname; //Directory Name
            clientName='flavour'+FileName;   //jksFileNAme
            let xmlLogoData="Logo Data";    //Container
            let xmlStringData="String Data";    //Container
            let gradleData="GradleData";   //Directory
            relativePath=rootDirectory+"\\app\\"+'\\src\\';

            console.log(rootDirectory);

            const resourceDir=relativePath+clientName+"/res",drawbleDir=resourceDir+"/drawable",valueDir=resourceDir+"/values";
            
            //Genrating Structure Directory..

            if(true){
                try{
                //Creating Structure of Directories(Path:src)    
                fs.mkdirSync(relativePath+clientName,{recursive:true});
                fs.mkdirSync(resourceDir,{recursive:true});
                fs.mkdirSync(drawbleDir,{recursive:true});
                fs.mkdirSync(valueDir,{recursive:true});
                let stringData='';
                if(type==='1'){
                    stringData='<resources>\n'+
                    '<string name="app_name">'+app_name+'</string>\n'+
                    '<!--Change Here For App Exam Change......-->\n'+
                    '<string name="Exam_id">'+exam_id+'</string>\n'+
                    '<string name="Pack_name">'+pack_name+'</string>\n'+
                    '<string name="Contact_number">+91'+contact+'</string>\n'+
                    '<string name="Email_Us">'+email+'</string>\n'+
                    '<string name="exam_name">'+exam_name+'</string>\n'+
                    '<string name="BASE_URL">http://'+base_url+'</string>\n'+
                    '</resources>';
                    fs.writeFile(drawbleDir+"/logo_sqr2.xml",vector,(err)=>{
                        if(err) throw err;
                    });
                }else if(type==='2'){
                 stringData='<resources>\n'+
                '<string name="app_name" translatable="false">'+app_name+'</string>\n'+
                '<string name="intro_text" translatable="false">'+exam_name+'</string>\n'+
                '<string name="base_url" translatable="false">'+base_url+'</string>\n'+
                '</resources>';
                fs.writeFile(drawbleDir+"/square_logo.xml",vector,(err)=>{
                    if(err) throw err;
                });
                }               
                fs.writeFile(valueDir+"/string.xml",stringData,(err)=>{
                    if(err) throw err;
                });

               //Here is A section we deal with gradle File modification

                        //Writing into gradle file here....
                        let dataFile=fs.readFile(rootDirectory+'\\app\\build.gradle',(err,data)=>{
                        //console.log(""+data);
                        console.log(err);
                        //Append after signingConfigs {  (Path:app) }
                        let conf='\t\t\t'+clientName+" {"+"\n\t\t\t\tkeyAlias '"+clientName+
                        "'\n\t\t\t\tkeyPassword '"+clientName+
                        "'\n\t\t\t\tstoreFile file('D:/Android_SDK/"+clientName+"')"+
                        "\n\t\t\t\tstorePassword '"+clientName+"'\n\t\t\t}";
                        //  console.log(conf);
                        let str1='signingConfigs {';
                        let positionFirst=(""+data).toString().indexOf(str1);
                        let slice11=(""+data).slice(0,positionFirst+str1.length+1);
                        let slice12=(""+data).slice(positionFirst+str1.length+1,data.length);
                        //console.log(slice11.toString());
                        data=slice11+"\n"+conf+"\n"+slice12;
                        //console.log(data.toString());
                        //Append after productFlavors {  (Path:app) }                        
                        let formatter='\t\t\t'+clientName+'{\n\t\t\t\tapplicationId "com.edugorilla.'+clientName+'"\n\t\t\t\t'+
                                    'signingConfig signingConfigs.'+clientName+'\n\t\t\t}';
                        //console.log(formatter);                                        
                        let str2='productFlavors {';
                        let positionSecond=(""+data).toString().indexOf(str2);
                        let slice2=(""+data).slice(0,positionSecond+str2.length+1);      
                        let slice22=(""+data).slice(positionSecond+str2.length+1,data.length);
                        data=slice2+"\n"+formatter+"\n"+slice22;
                        console.log(data.toString());                                                  
                        fs.writeFile(rootDirectory+'\\app\\build.gradle',data,(err)=>{console.log(err)}); 
                        });
             /*  notifier.notify({
                title: "Title",
                message: "Message",
               // icon: "c:/path/image.png", // Absolute path to Icon 
                sound: true, // true | false. 
                wait: false, // Wait for User Action against Notification 
            }, function(error, response) {
                console.log(response);
            });*/
               document.getElementById('message').innerHTML='All Resources Created';
               document.getElementById('keygen').style.visibility='visible';
               document.getElementById('reload').style.visibility='visible';
                }catch(error){
                    console.log(error);
                    document.getElementById('message').innerHTML=error;
                }
            }else{
                console.log("OOP's Folder already Exist")
            }
                flag=true;
                console.log(document.getElementById('cname').value);
           }
}));

document.getElementById('keygen').addEventListener('click',function(){
    if(document.getElementById('keyGenrate').innerHTML=='Genrate Key'){
        document.getElementById('keygen').disabled=true;
       // document.getElementsByClassName('loader').style.display='block';
            javaRoot=localStorage.getItem('java');
            keyPath=localStorage.getItem('keyPath');
            console.log(keyPath);
            if(javaRoot!==null&&keyPath!==null){
                let Xcommond=javaRoot+'//keytool -keyalg RSA -keysize 2048 -genkeypair -dname "cn='+clientName+', ou='+clientName+', o='+clientName+', c='+clientName+'" -alias '+clientName+' -keypass '+clientName+' -keystore '+keyPath+'/'+clientName+' -storepass '+ clientName+' -validity 20000';
                    try{
                    appScript.execSync(Xcommond,function(err,stdout,stderr){
                            console.log(stderr);
                            console.log(stdout);
                            if(err) throw err;
                        });
                        document.getElementById('message').innerHTML='Key Genrated , Try new one';
                       // document.getElementById('keygen').innerHTML='Sync Project';
                    }catch(err){
                        document.getElementById('message').innerHTML=err;
                        console.log(err);
                    }
            }else{
                dialog3.remote.dialog.showMessageBox(null,{message:"Please Select Java Path",title:"Alert"})
                //alert("Fill Required Fields");
            }
            console.log(clientName);
         //   document.getElementsByClassName('loader').style.display='none';            
    }
});
document.getElementById('reload').addEventListener('click',()=>{
    document.getElementById('submit').style.visibility='visible';
    document.getElementById('keygen').style.visibility='hidden';
    document.getElementById('reload').style.visibility='hidden';
    window.location.href='index.html';
});

document.getElementById('save').addEventListener('click',()=>{
    let value=document.getElementById('save').innerHTML;
    console.log(value);
    if(javaRoot.search('/Program Files/i')){
        //'C://"Program Files"//Java//jdk-12.0.1//bin//
        //C:\"Program Files"\Java\jdk-12.0.1\bin
        javaRoot=javaRoot.split('\\').join("//");
        javaRoot=javaRoot.replace('Program Files','"'+'Program Files'+'"');
        //C://"Program Files"//Java//jdk-12.0.1//bin
        console.log(localStorage.getItem('projectPath'));
    }
});

document.getElementById('new').addEventListener('click',function(e){
    localStorage.removeItem('projectPath');
    window.location.href='index.html';
    //localStorage.getItem()
});

document.getElementById('open').addEventListener('click',()=>{
    console.log(dialog3.remote.dialog);
    dialog3.remote.dialog.showOpenDialog({properties:['openDirectory']},(dir)=>{
        console.log(dir[0]);
        var rootDirectory=dir[0];
        localStorage.setItem('projectPath',rootDirectory);
        document.getElementById('overlay').style.display='none';
    });
});
let toolFun=()=>{
    dialog4.remote.dialog.showOpenDialog({properties:['openDirectory']},(dir)=>{
        javaRoot=dir[0];
        if(javaRoot.search('/Program Files/i')){        
            //'C://"Program Files"//Java//jdk-12.0.1//bin//
            //C:\"Program Files"\Java\jdk-12.0.1\bin
            javaRoot=javaRoot.split('\\').join("//");
            javaRoot=javaRoot.replace('Program Files','"'+'Program Files'+'"');
            localStorage.setItem('java',javaRoot);
            //C://"Program Files"//Java//jdk-12.0.1//bin
            console.log(javaRoot);
        }
    })
}   

document.getElementById('tool').addEventListener('click',toolFun);

let key=()=>{
    dialog5.remote.dialog.showOpenDialog({properties:['openDirectory']},(dir)=>{
        keyPath=dir[0];
        if(keyPath.search('/Program Files/i')){        
            //'C://"Program Files"//Java//jdk-12.0.1//bin//
            //C:\"Program Files"\Java\jdk-12.0.1\bin
            keyPath=keyPath.split('\\').join("//");
            keyPath=keyPath.replace('Program Files','"'+'Program Files'+'"');
            //C://"Program Files"//Java//jdk-12.0.1//bin
            localStorage.setItem('keyPath',keyPath);
            console.log(keyPath);
        }else{
            localStorage.setItem('keyPath',keyPath);
        }
    })
}   
document.getElementById('keyPath').addEventListener('click',key);

/*document.getElementById('open').addEventListener('click',()=>{
    console.log(dialog2.remote.dialog);
    dialog2.remote.dialog.showOpenDialog({properties:['openDirectory']},(dir)=>{
        console.log(dir[0]);
        rootDirectory=dir[0];
        document.getElementById('overlay').style.display='none';
    });
});*/
//["C:\Users\EduGorilla Community\Desktop\Hence\testrtryrryt\res"]