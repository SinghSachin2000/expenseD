import Homeimg from "../assets/homeimg.png"
import Typewriter from 'typewriter-effect';
import {Button} from "@nextui-org/react"
import { Link } from "react-router-dom";

export default function Home(){
    return(
      <div>
        <div className="flex lg:flex-row flex-col">

           <div className="lg:w-[50%] lg:h-[100vh] h-[90vh] bg-[#303841] p-4 pt-[80px] flex flex-col justify-between">

        <div className="flex flex-col justify-between h-[80vh] ">
        <div>
        <div className="lg:text-5xl text-3xl font-bold  text-[#F5C7A9]">EXPENSE<span className="text-[#F5E8E4]">divider</span></div>
        <div className="text-white">
             <Typewriter
             options={
                 {strings:['Simplify Your Shared Spending'],
                     autoStart: true,
                     loop: true,  
                 
             }}
             />
        </div>
        <div className="flex pt-4 gap-2">
              <Link to="/login">
             <Button radius="full" className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg ">
               Login
             </Button>
              </Link>   
              <Link to="/signup">
             <Button radius="full" className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg">
             Sign up
            </Button>
              </Link>
             </div>
        </div>

        <div className="relative -top-[160px]">
          <div className="w-[200px] lg:h-[100px] h-[150px] bg-[#3b444b] absolute"></div>
          <div className="text-slate-50 absolute p-2">
            <div className="text-xl font-bold">Simplify Your Shared Spending</div>
            <p className="lg:w-[50%] w-[50%]"> Effortlessly divide expenses among friends with our tool, making it easy to split bills and track shared spending. No more manual calculations—just simple, fair splits for all your group expenses.</p>
            </div> 
        </div>
     </div>
           </div>

           <div className="lg:w-[50%] h-[100vh] bg-[#3b444b] flex flex-col justify-between relative">

             <div className="text-8xl font-extrabold text-[#303841] flex flex-col items-center float-right">
               <div>Simplify</div>
               <div>Yours</div>
               <div>Shared</div>
               <div>Spending</div>
             </div>
         
             <div className="text-white relative ">
               <div className="w-[300px] h-[120px] bg-[#303841] absolute right-0 bottom-12"></div>
               <div className="absolute p-4 right-2 bottom-2">
               <div className="text-xl font-bold">Track Group Expenses Easily</div>
               <p className="w-[350px]"> Keep track of all your group expenses in one place. Our tool lets you manage contributions, settle balances, and ensure everyone stays on the same page, making group spending simple and transparent.</p>
             </div>
         </div>



           </div>

        </div>

        <img src={Homeimg} className="lg:h-[200px] h-[100px] lg:w-[400px] w-[180px] absolute drop-shadow-custom-black top-[40%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 -rotate-90 "></img>
      </div>
    );
}