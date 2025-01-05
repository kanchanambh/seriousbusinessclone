import gsap from "gsap"

export const animatePageIn = () => {
  console.log('Page animation triggered')
    const bannerOne = document.getElementById("banner-1")
    const bannerTwo = document.getElementById("banner-2")
    const bannerThree = document.getElementById("banner-3")
    if (bannerOne && bannerTwo && bannerThree ) {
      const tl = gsap.timeline()
  
      tl.set([bannerThree,bannerTwo,bannerOne], {
        yPercent: 0,
      }).to([bannerThree,bannerTwo,bannerOne], {
        yPercent: 100,
        stagger: 0.2,
        ease: "power2.out",
      })
    }
  }

  export const animatePageOut = (href, router) => {
    // const bannerOne = document.getElementById("banner-1")
    // const bannerTwo = document.getElementById("banner-2")
    // const bannerThree = document.getElementById("banner-3")
  
    // if (bannerOne && bannerTwo && bannerThree ) {
    //   const tl = gsap.timeline()
  
    //   tl.set([bannerOne, bannerTwo, bannerThree], {
    //     yPercent: -100,
    //   }).to([bannerOne, bannerTwo, bannerThree], {
    //     yPercent: 0,
    //     stagger: 0.2,
    //     onComplete: () => {
    //       router.push(href)
    //     },
    //   })
    // }
    router.push(href)
  }