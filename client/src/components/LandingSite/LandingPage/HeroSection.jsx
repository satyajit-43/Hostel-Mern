import { HeroSVG } from "./HeroSVG";
import { Link } from "react-router-dom";
import Logo from '../../../assets/fcritlogo.png'
import fcrit from '../../../assets/fcrit1.jpg'


function HeroSection() {
  return (
    <main className="flex flex-col lg:flex-row-reverse justify-center align-center  text-black text-center bg-white">
      {/* <img src={heroImg} alt='nust-hostel-img' className='opacity-[0.05] absolute top-[50vh] left-[50vw] translate-x-[-50%] translate-y-[-50%] select-none' /> */}
      
      <div className="">
        <div className="main">
          <img src={fcrit} alt="fcrit" />
            <div className="">
             <h1>FCRIT</h1>
             <p>Hostel Management System</p>
            </div>
        </div>

        <div className="">
          <p>About Us</p>
          <hr />
           <div className="">  
             <div className="" />
             <div className="">
               Fr. CRIT. has, within a short span of time, established itself as a leading engineering college in Mumbai University. Though its reputation rests mainly on the high quality, value-based technical education that it imparts, it has to its credit a verdant, well-maintained Campus and extensive facilities. Its location in the vicinity of the holy places of various religious denominations underscores its secular credentials and its philosophy of "Vasudhaiva Kuttumbakam".
             </div>
          </div>
        </div>
      </div>
    </main>
  );
}
export { HeroSection };
