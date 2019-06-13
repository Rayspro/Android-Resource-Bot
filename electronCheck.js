const {app, BrowserWindow,Menu} = require('electron') 
const url = require('url') 
const path = require('path') 
const nativeImage = require('electron').nativeImage;
var image = nativeImage.createFromPath(__dirname + '/Android-PNG-Photots.png'); 
// Where public folder on the root dir

image.setTemplateImage(true);

let win;

/*function createWindow() { 
   win = new BrowserWindow({
       webPreferences:{nodeIntegration:true},
       width: 989, height: 1223
       }) 
   win.loadURL(url.format ({ 
      pathname: path.join(__dirname, 'index.html'), 
      protocol: 'file:', 
      slashes: true 
   }))
}  */
function createWindow () {

   win = new BrowserWindow({
      webPreferences:{nodeIntegration:true},
      width: 989, height: 1223,   
      backgroundColor: '#ffffff',
      transparent: false,
      icon: image
      }) 
  win.loadURL(url.format ({ 
     pathname: path.join(__dirname, 'index.html'), 
     protocol: 'file:', 
     slashes: true 
  }))
   // Other code removed for brevity
   /*var menu = Menu.buildFromTemplate([
           {label:'Exit',click(){
              app.quit();
           }}
   ]);
   Menu.setApplicationMenu(menu); */
 }
app.on('ready', createWindow);