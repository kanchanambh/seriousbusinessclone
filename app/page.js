"use client"
import gsap from "gsap"
import BannerSection from "./components/BannerSection";  
import { animatePageIn } from "@/utils/animations";
import { useEffect, useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";



export default function Home() {
  gsap.registerPlugin(ScrollTrigger);
  const textRef = useRef(null); 
  const blackDivRef = useRef(null);
  const blackTextRef = useRef(null);
  const sphere1Ref = useRef(null);
  const  sphere2Ref = useRef(null);
  const trackerRef = useRef(null

)
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


  }, []);




   
  return (
    <> <BannerSection />
    <div className="content w-full h-full">
   
    <div  ref={blackDivRef} className=" absolute w-full h-full top-0 left-0 right-0 bottom-0 bg-black flex items-start justify-center z-10"> </div>
    <h1
        ref={blackTextRef}
        className="text-[80px] absolute top-0 right-1/2 translate-x-1/2 font-bold text-black uppercase z-20"
        style={{ display: "none" }} // Start by hiding the black text
      >
         Main Logo Section
      </h1>

      {/* White text */}
      <h1
        ref={textRef}
        className="text-[80px] absolute top-0 right-1/2 translate-x-1/2 font-bold text-white uppercase z-20"
      >
        Main Logo Section
      </h1>
      
      <div className=" fixed top-0 left-0 h-full w-full  z-0">

        <div ref={trackerRef} className=" tracker" >
          <div ref={sphere1Ref} className="sphere1"></div>
          <div ref={sphere2Ref} className="sphere2"></div>
        </div>

      </div>
      <section className="video-content " >
            <div className="section-header">
                <h1>Video</h1>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum finibus at lacus nec lacinia. Aenean feugiat non lacus et cursus.</p>
            </div>
         
      </section>

     
  
  </div>
  </>
  )
}
