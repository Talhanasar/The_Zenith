import Header from './component/header'
import MemberCard from './component/MemberCard'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/all'
import "../css/about.css"

const AboutPage = () => {
  gsap.registerPlugin(ScrollTrigger);

  useGSAP(() => {
    gsap.from(".members .card", {
      opacity: 0,
      y: 50,
      duration: 1,
      stagger: 0.3,
      scrollTrigger: {
        trigger: ".card",
        scroller: "body",
        start:"top 50%",
      }
    });
  }, [])

  return (
    <>
      <Header />
      <div className='page'>
        <div className="top">
          <h1>Our Team</h1>
          <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eveniet, libero.</p>
        </div>
        <ul className="members">
          <MemberCard info={{ name: "Abhilash chowdhury", role: "Leader" }}
            skills={["Video Editor", "Content Creator"]}
            img={"abhilash.jpg"}
            linkedin={"https://www.linkedin.com/in/hassanmehedi/"}
          />
          <MemberCard info={{ name: "Md.Mehedi Hasan", role: "Member" }}
            skills={["Web Devloper", "Web Designer"]}
            img={"mehedi.jpg"}
            linkedin={"https://www.linkedin.com/in/hassanmehedi/"}
          />
          <MemberCard info={{ name: "Talha", role: "Member" }}
            skills={["MERN Devloper"]}
            img={"talha.jpg"}
            linkedin={"https://www.linkedin.com/in/talha-7642a1264/"}
            insta={"https://www.instagram.com/talhabinnasar/"}
          />
        </ul>
      </div>
    </>
  )
}

export default AboutPage
