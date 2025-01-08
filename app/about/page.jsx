"use client"
import gsap from "gsap"
import { useEffect, useRef } from "react";
import BannerSection from "../components/BannerSection"; 
import { animatePageIn } from "@/utils/animations";

const AboutPage = () => {
  const textRef = useRef(null); 
  const blackDivRef = useRef(null);
  const blackTextRef = useRef(null);
  const contentDivRef = useRef(null);

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

  gsap.fromTo(
    contentDivRef.current,
    { y: 30, opacity: 0, }, 
    {
      y: 0,
      opacity: 1,
      duration: 0.5,
      ease: "power2.in",
      delay: 1.8, 
  
    }
  );
  }, []);

  return (
    <>
      <BannerSection /> <div className="content">
   
    <div  ref={blackDivRef} className=" absolute w-full h-full top-0 left-0 right-0 bottom-0 bg-black flex items-start justify-center"> </div>
    <h1
        ref={blackTextRef}
        className="text-[80px] absolute top-0 right-1/2 translate-x-1/2 font-bold text-black uppercase"
        style={{ display: "none" }} // Start by hiding the black text
      >
         Main Logo
      </h1>

      {/* White text */}
      <h1
        ref={textRef}
        className="text-[80px] absolute top-0 right-1/2 translate-x-1/2 font-bold text-white uppercase"
      >
        Main Logo
      </h1>
      <div
        ref={contentDivRef}
        className="absolute top-1/4 left-1/2 transform -translate-x-1/2 "
      >
        <h1 className="text-4xl uppercase pb-5" >Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed velit urna, iaculis sed fermentum non, finibus vitae arcu.</h1>
        <h1 className="text-4xl uppercase pb-5" >Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed velit urna, iaculis sed fermentum non, finibus vitae arcu.</h1>
        <h1 className="text-4xl uppercase pb-5" >Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed velit urna, iaculis sed fermentum non, finibus vitae arcu.</h1>
        <h1 className="text-4xl uppercase pb-5" >Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed velit urna, iaculis sed fermentum non, finibus vitae arcu.</h1>
      </div>
  </div>
  </>
  )
}
  export default AboutPage
