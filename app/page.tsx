
import AboutSection from "@/components/aboutsection";
import Footer from "@/components/footer";
import HeroSection from "@/components/herosection";
import Navbar from "@/components/navbar";
import ProjectSection from "@/components/projectsection";



export default function Example() {
  


  return (
    <div>
      {/* ini navbar */}
      <Navbar/>
      {/* ini hero section */}
      <HeroSection/>
      {/* ini about section */}
      <AboutSection/>
      {/* ini project section */}
      <ProjectSection/>
      {/* ini footer  */}
      <Footer/>
    </div>
  )
}
