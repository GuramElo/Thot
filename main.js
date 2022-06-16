const fetch = require("node-fetch");
const system = require("child_process").exec;
const nodemailer = require("nodemailer");
let checkedCounter = new Number(0);
function send(ger){
    
    const transporter = nodemailer.createTransport({
        host: 'smtp.mail.yahoo.com',
        port: 465,
        service:'yahoo',
        secure: false,
        auth: {
           user: "guramieliza@yahoo.com",
           pass: 'bewctakfhombynhm'
        },
        debug: false,
        logger: true
});
    
    var mailOptions = {
      from: 'guramieliza@yahoo.com',
      to: ger,
      subject: 'დაიდოოოოოოოოოო!!!!!!!',
      text: 'https://kinoafisha.ge'
    };
    
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
    }
//=============================================
let is_sent = false;
function checker() {
fetch("https://www.kinoafisha.ge/movie/current/?id=625fcb0c956167247a358516")
.then((response) => {
    return response.text();
})
.then((str) => {
    const cinemaArr = ['ამირანი', 'კავეა თბილისი მოლი', 'კავეა სითი მოლი საბურთალო', 'აპოლო ბათუმი', 'კავეა ისთ ფოინთი', 'კავეა გალერია'];
    let counter = 0;
    const arr1=new Array(),arr2=new Array(), arr3=new Array(), cinemaSet = new Set();
    for(let i=0;i<str.length-3;i++){
    if(str[i]!="<")continue;
    
    let serte=str.substring(i,i+4);
    if(serte=="<div"){
    arr1.push(["<div",i]);
    continue;
    }
    else if(serte=="</di" && arr1.length!=0){
    arr2.push([(arr1[arr1.length-1][1]),i+3]);
    arr1.pop();
    continue;
    }
    }
    for(let i=0;i<arr2.length;i++){
    const satu=str.substring((arr2[i])[0],(arr2[i])[1]+3);
    const panel = String(satu).indexOf('cinema-title');
    const divFirstEnd = String(satu).indexOf('>');
    if (
        panel != -1
        && panel < divFirstEnd
    ) {
        arr3.push(satu);
        for (let i of cinemaArr) {
            if (satu.indexOf(i) != -1) {
                cinemaSet.add(i);
            }
        }
    }
}
//=====================
Boolean(checkedCounter % 20) ? process.stdout.write(String(cinemaSet.size).concat("     ")) : process.stdout.write(String(cinemaSet.size).concat('\n\n\n'));

if (Boolean(--cinemaSet.size) && !is_sent) {
    system("start videoplayback.mp4 && start 1.html");
    send("elizbarashvili.guram18@gmail.com");
    send("g_elizbarashvili@cu.edu.ge");
    is_sent = true;
}
});

}
recurse();
function recurse() {
    checkedCounter++;
    return setTimeout(() => {
        checker();
        setTimeout(()=>{
            recurse();
        }, 20);
        return;
        }, 15000 + Math.floor(Math.random()*1000000) % 20000
        );
}