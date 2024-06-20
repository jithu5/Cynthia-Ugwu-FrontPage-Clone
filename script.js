const scroll = new LocomotiveScroll({
    el: document.querySelector('#main'),
    smooth: true
});
function firstPageAnim() {
    const timeLine = gsap.timeline();
    timeLine.from('body',{
        y:'100%',
        duration:1.5,
        ease:"expo.easeOut"
    }).from("#nav",{
        y:'-10',
        opacity:0,
        duration:1.3,
        ease:"expo.easeInOut"
    }).to(".boundingElem",{
        y:0,
        ease:"expo.easeInOut",
        duration:1.7,
        stagger:.2
    },"-=0.8").from("#heroFooter",{
      y:-10,
      opacity:0,
      duration:1.5,
      ease:"expo.easeInOut"
    },"-=0.9")
}

var timeout;
function circleShrink() {
    //define default scale value
    var xScale=1;
    var yScale=1;
    var xprevious=0;
    var yprevious=0;
    window.addEventListener("mousemove",(dets)=>{
        clearTimeout(timeout)
        var xdiff=dets.clientX - xprevious;
        var ydiff=dets.clientY- yprevious;

        xScale=gsap.utils.clamp(.8,1.2 ,xdiff);
        yScale= gsap.utils.clamp(.8,1.2 ,ydiff);

        xprevious =dets.clientX;
        yprevious = dets.clientY;
       
        mouseFollower(xScale,yScale);

       timeout= setTimeout(() => {
            document.querySelector("#miniCircle").style.transform=`translate(${dets.clientX}px,${dets.clientY}px) scale(1,1)`
        }, 100);
    })
}
function mouseFollower(xScale,yScale) {
    window.addEventListener("mousemove",(dets)=>{
        document.querySelector("#miniCircle").style.transform=`translate(${dets.clientX}px,${dets.clientY}px) scale(${xScale},${yScale})`
    })
}
mouseFollower()
firstPageAnim()
circleShrink()

// document.querySelectorAll(".elem").forEach((element)=>{
//     var rotate = 0;
//     var difference = 0;
//     const img=element.querySelector("img")
    
//     element.addEventListener("mouseleave",(dets)=>{
//         gsap.to(img,{
//             opacity:0,
//             ease:Power3,
//         })
//     })

//     element.addEventListener("mousemove",(dets)=>{
        
//        let diff =dets.clientY - element.getBoundingClientRect().top;
//         difference=dets.clientX - rotate;
//         rotate=dets.clientX;

//         let imgWidth = img.offsetWidth; // Get the width of the image
//         let imgHeight = img.offsetHeight;
//         gsap.to(img,{
//             opacity:1,
//             ease:Power3,
//             top: diff - (imgHeight / 2) + "px",  // Centering the image vertically
//             left:dets.clientX - (imgWidth / 2) + "px",
//             rotate:gsap.utils.clamp(-20,20,difference *0.8), 
//         })
//     })
// })

document.querySelectorAll(".elem").forEach((element)=>{
    let rotate = 0;
    let difference = 0;
    const key = element.attributes['key'].value;
  
    const img = element.querySelector("img"); // or element.getElementsByTagName("img")[0]
    const value = img.attributes['value'].value;
    element.addEventListener("mouseleave",(dets)=>{
      if (key === value) {
        gsap.to(img,{
          opacity:0,
          ease:Power3,
        })
      }
     
    })
  
    element.addEventListener("mousemove",(dets)=>{
      let diff = dets.clientY - element.getBoundingClientRect().top;
      difference = dets.clientX - rotate;
      rotate = dets.clientX;
  
      let imgWidth = img.offsetWidth; // Get the width of the image
      let imgHeight = img.offsetHeight;
      if (key === value) {
        console.log("hey")
        gsap.to(img,{
          opacity:1,
          ease:Power3,
          top: diff - (imgHeight / 2) + "px",  // Centering the image vertically
          left: dets.clientX - (imgWidth / 2) + "px",
          rotate: gsap.utils.clamp(-20, 20, difference * 0.8), 
        })
      }
      
    })
  })

  //time

  function timeClock() {
    const realTime = document.querySelector("#realTime");
    const now1 = new Date();
    const hours = now1.getHours().toString().padStart(2, "0");
    const minutes = now1.getMinutes().toString().padStart(2, "0");
    let period = "AM";

        if (hours === 0) {
          hours = 12;
        } else if (hours > 12) {
          hours -= 12;
          period = "PM";
        }

        realTime.textContent=`${hours}:${minutes} ${period}`;
    
  }
  function dateMonthYear() {
    const now = new Date();
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ];
const year = now.getFullYear();
const month = monthNames[now.getMonth()]; // months are 0-based, so add 1
const date = now.getDate();
const dateMonyear = document.querySelector("#reatDate")

dateMonyear.textContent=`${date} ${month} ${year}`;
  }
 
  setInterval(() => {
   timeClock();
   dateMonthYear()
  }, 1000);