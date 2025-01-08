"use client"
import gsap from "gsap"
import BannerSection from "./components/BannerSection";  
import { animatePageIn } from "@/utils/animations";
import { useEffect, useRef, useState } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ReactLenis, useLenis } from 'lenis/react'


export default function Home() {

  const lenisOptions = {
    lerp: 0.1,
    duration: 1.5,
    smoothTouch: false, //smooth scroll for touch devices
    smooth: true,
  };

  gsap.registerPlugin(ScrollTrigger);
  const textRef = useRef(null); 
  const blackDivRef = useRef(null);
  const blackTextRef = useRef(null);
  const sphere1Ref = useRef(null);
  const sphere2Ref = useRef(null);
  const trackerRef = useRef(null)
  const videoRef = useRef(null)
  const heroReelWrapperRef = useRef(null);
  const heroReelContainerRef = useRef(null);
  const [heroHeight, setHeroHeight] = useState(0);

  useEffect(() => {
    

    animatePageIn();
   gsap.fromTo(
    textRef.current,
    { y: 400, scale: 1.5 }, 
    {
      y: 0, // Move it up
      scale: 1, // Scale down
      duration: 1,
      ease: "power2.in",
      delay: 1, 
    }
  );

  gsap.fromTo(
    blackTextRef.current,
    { y: 400, scale: 1.5 },
    {
      y: 0, 
      scale: 1, 
      duration: 1,
      ease: "power2.in",
      delay: 1, 
      onStart: () => {
       
        blackTextRef.current.style.display = "block";
      },
      onUpdate: () => {
       
        if (gsap.getProperty(blackTextRef.current, "y") < 250) {
          textRef.current.style.display = "none";
        }
      },
    }
  );
  gsap.to(blackDivRef.current, {
    y: "100%",
    duration: 1,
    ease: "power2.in",
    delay: 1, 
    onComplete: () => {
    
      blackDivRef.current.style.display = "none";
    },
  });
  if (heroReelWrapperRef.current) {
    const height = heroReelWrapperRef.current.offsetHeight;
    setHeroHeight(height); // Update the state with the height
  }
 
  const handleAnimations = () => {
  const tracker = trackerRef.current;

  

  const moveEvent = (e) => {
    
    const wrapperRect = tracker.getBoundingClientRect();

    const relX = e.clientX - (wrapperRect.left + wrapperRect.width / 2);
    const relY = e.clientY - (wrapperRect.top + wrapperRect.height / 2);


    const sphere1DisX = (relX / wrapperRect.width) * 25;
    const sphere1DisY = (relY / wrapperRect.height) * 25;

    const sphere2DisX = (relX / wrapperRect.width) * 50;
    const sphere2DisY = (relY / wrapperRect.height) * 50;

    gsap.to(sphere1Ref.current, {
      x: sphere1DisX,
      y: sphere1DisY,
      ease: "power3.out",
      duration: 0.35,
    });

    gsap.to(sphere2Ref.current, {
      x: sphere2DisX,
      y: sphere2DisY,
      ease: "power3.out",
      duration: 0.35,
    });
  };

  const leaveEvent = () => {
    gsap.to(sphere1Ref.current, {
      x: 0,
      y: 0,
      ease: "power3.out",
      duration: 1,
    });

    gsap.to(sphere2Ref.current, {
      x: 0,
      y: 0,
      ease: "power3.out",
      duration: 1,
    });
  };

  tracker.addEventListener("mousemove", moveEvent);
  tracker.addEventListener("mouseleave", leaveEvent);

  return () => {
    tracker.removeEventListener("mousemove", moveEvent);
    tracker.removeEventListener("mouseleave", leaveEvent);
  };
};


if (typeof window !== "undefined") {
  handleAnimations();
}
if (videoRef.current) {
  videoRef.current.play();
}


const tl = gsap.timeline({
  scrollTrigger: {
    trigger: heroReelWrapperRef.current,
    start: "100% 100%", // Start when the element reaches 10% of the viewport
    end: "bottom 20%", // End when the element reaches 10% from the bottom
    scrub: 1, // Tie the animation to the scroll position
    pin:true,
    onEnter: () => {
      // This will reset the transform when the ScrollTrigger is triggered
      gsap.set(heroReelWrapperRef, { clearProps: "transform" });
    },
    onRefresh: () => {
      // Recalculate the layout after page refresh and reset any issues with transforms
      gsap.set(heroReelWrapperRef, { clearProps: "transform" });
    },
   
  },

});

tl.fromTo(
  heroReelContainerRef.current,
  {
    transformOrigin:"left bottom",
    width: "20%", // Starting width
    height: "20%", // Starting height
  },
  {
    transformOrigin:"left bottom",
    width: "100%", // Final width
    height: "100%", // Final height
    ease: "none", // Easing for smooth scaling
  },
  0 // 0 means the second animation starts at the same time as the first
);

ScrollTrigger.refresh(); 

     // Cleanup function on component unmount
     return () => {
      // Kill all active ScrollTriggers
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };

  }, []);
  


   
  return (
    <> 
    <ReactLenis root options={lenisOptions}>
    <BannerSection />
    <div className="content w-full h-full ">
   
    <div  ref={blackDivRef} className=" absolute w-full h-full top-0 left-0 right-0 bottom-0 bg-black flex items-start justify-center z-10"> </div>
    <h1
        ref={blackTextRef}
        className="text-[80px] absolute top-0 right-1/2 translate-x-1/2 translate-y-1/2 font-bold text-black uppercase z-20"
        style={{ display: "none" }} // Start by hiding the black text
      >
         Main Logo
      </h1>

      {/* White text */}
      <h1
        ref={textRef}
        className="text-[80px] absolute top-0 right-1/2 translate-x-1/2 translate-y-1/2 font-bold text-white uppercase z-20"
      >
        Main Logo
      </h1>
      
      <div className=" h-full w-full flex items-end " >
      

        <div ref={trackerRef} className=" tracker" >
          

         
          <div ref={sphere1Ref} className="sphere1"></div>
          <div ref={sphere2Ref} className="sphere2"></div>

         
        </div>


       <div ref={heroReelWrapperRef} className="hero_reel_wrapper flex items-end w-[90%] h-[85%] mb-10 ml-10"
       style={{
        margin: 'auto', // Set margin to auto to center the div horizontally
        padding:"50px"
      }}
       
       >


        <div ref={heroReelContainerRef} className="hero_reel_container w-[20%] h-[20%] flex justify-center items-center m-auto">
                <div className="hero_reel_video"  >
                    <video 
                    ref={videoRef}
                    preload="none"
                    playsInline
                    muted
                    loop
                    src="/video1.mp4"
                    className="w-full h-full"
                    ></video>
                </div>
              </div>
      </div>

      </div>
    

     
  

  <section style={{
          position: 'relative',
          top: `${heroHeight}px`, // Adding a little offset (e.g., 20px)
          backgroundColor: 'red', // Just an example
        }} className=" ">
      <h1 className="text-4xl uppercase pb-5" >Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed velit urna, iaculis sed fermentum non, finibus vitae arcu.</h1>
        <h1 className="text-4xl uppercase pb-5" >Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed velit urna, iaculis sed fermentum non, finibus vitae arcu.</h1>
        <h1 className="text-4xl uppercase pb-5" >Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed velit urna, iaculis sed fermentum non, finibus vitae arcu.</h1>
        <h1 className="text-4xl uppercase pb-5" >Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed velit urna, iaculis sed fermentum non, finibus vitae arcu.</h1>
        <h1 className="text-4xl uppercase pb-5" >Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed velit urna, iaculis sed fermentum non, finibus vitae arcu.</h1>
        <h1 className="text-4xl uppercase pb-5" >Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed velit urna, iaculis sed fermentum non, finibus vitae arcu.</h1>
        <h1 className="text-4xl uppercase pb-5" >Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed velit urna, iaculis sed fermentum non, finibus vitae arcu.</h1>
        <h1 className="text-4xl uppercase pb-5" >Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed velit urna, iaculis sed fermentum non, finibus vitae arcu.</h1>
        <h1 className="text-4xl uppercase pb-5" >Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed velit urna, iaculis sed fermentum non, finibus vitae arcu.</h1>
        <h1 className="text-4xl uppercase pb-5" >Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed velit urna, iaculis sed fermentum non, finibus vitae arcu.</h1>
        <h1 className="text-4xl uppercase pb-5" >Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed velit urna, iaculis sed fermentum non, finibus vitae arcu.</h1>
        <h1 className="text-4xl uppercase pb-5" >Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed velit urna, iaculis sed fermentum non, finibus vitae arcu.</h1>
        <h1 className="text-4xl uppercase pb-5" >Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed velit urna, iaculis sed fermentum non, finibus vitae arcu.</h1>
        <h1 className="text-4xl uppercase pb-5" >Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed velit urna, iaculis sed fermentum non, finibus vitae arcu.</h1>
        <h1 className="text-4xl uppercase pb-5" >Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed velit urna, iaculis sed fermentum non, finibus vitae arcu.</h1>
        <h1 className="text-4xl uppercase pb-5" >Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed velit urna, iaculis sed fermentum non, finibus vitae arcu.</h1>
      </section>

      </div>    
  </ReactLenis>
  </>
  )
}
