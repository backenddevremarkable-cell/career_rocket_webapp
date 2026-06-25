var today = new Date();
var dd = today.getDate();
var mm = today.getMonth()+1; 
var yyyy = today.getFullYear();
var hh=today.getHours();
var min=today.getMinutes();
var ss=today.getSeconds();

if(dd<10) 
{
    dd='0'+dd;
} 

if(mm<10) 
{
    mm='0'+mm;
} 
if(hh<10) 
{
    hh='0'+hh;
} 
if(min<10) 
{
    min='0'+min;
} 
if(ss<10) 
{
    ss='0'+ss;
} 
//today = mm+'-'+dd+'-'+yyyy;
//console.log(today);

//today = mm+'/'+dd+'/'+yyyy;
//console.log(today);

today = dd+'-'+mm+'-'+yyyy+'_'+hh+':'+min+':'+ss;
//console.log(today);
module.exports=today;

//today = dd+'/'+mm+'/'+yyyy;
//console.log(today);
