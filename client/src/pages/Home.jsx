import Homeimg from "../assets/homeimg.png"
import Typewriter from 'typewriter-effect';

export default function Home(){
    return(
      <div>
        {/* 1st section */}
        <div className="w-[100vw] h-[100vh]">
        <div className="h-[100vh] flex flex-row  relative">
          <div className="w-[50%] bg-[#303841] ">
            <div className="text-xl drop-shadow-lg font-bold m-2 text-[#ef6407]">SLICE<span className="text-[#F5E8E4]">MATE</span></div>
            <div className="lg:text-5xl text-3xl font-bold mt-20 ml-6 text-[#F5C7A9]">EXPENSE<span className="text-[#F5E8E4]">divider</span></div>
            <div className="text-white ml-6">
            <Typewriter
            options={
                {strings:['Simplify Your Shared Spending'],
                    autoStart: true,
                    loop: true,  
                }

            }
            />
            </div>
             
            <div>
                <button className="">Login</button>
                <button>Sign UP</button>
            </div>

            <div className="mt-[370px]  h-[120px] absolute inset-0 lg:w-[200px] w-40 bg-[#3b444b] bg-opacity-80 "></div>
            <div className="mt-[210px] pl-5 absolute ">
                <div className="text-white font-semibold">Simplify Your Shared Spending</div> 
                <p className="text-white text-xs w-[250px]">
                Effortlessly divide expenses among friends with our tool, making it easy to split bills and track shared spending. No more manual calculations—just simple, fair splits for all your group expenses.</p>
            </div>   
          </div>
          <div className="w-[50%] bg-[#3b444b]">
          <div className="relative mt-[370px] w-[300px] h-[100px]">
            <div className="absolute text-[#303841] font-extrabold text-8xl -mt-[400px] ml-28">
            <div>Simplify Your</div>
            <div>Shared</div>
            <div>Spending</div>

            </div>
             <div className="absolute inset-0 lg:w-[300px] w-40 bg-[#303841] bg-opacity-80 ml-[50px] lg:ml-[400px] right-0"></div>
             <div className="absolute pl-[60px] lg:pl-[300px]">
               <div className="text-white font-semibold">Track Group Expenses Easily</div> 
               <p className="text-white text-xs w-[250px]">
                 Keep track of all your group expenses in one place. Our tool lets you manage contributions, settle balances, and ensure everyone stays on the same page, making group spending simple and transparent.
               </p>
             </div> 
           </div>

  
          </div> 
        </div>
        <img src={Homeimg} className="lg:h-[200px] h-[150px] lg:w-[400px] w-[300px] absolute drop-shadow-custom-black top-[40%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 -rotate-90 "></img>
        </div>

      </div>
    );
}