import '../scss/index.scss'
const htmlDc=document.getElementsByTagName('html')[0];
const clientWidth=document.documentElement.clientWidth||document.body.clientWidth;
htmlDc.style.fontSize=clientWidth/10+'px';
