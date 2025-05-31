import React from 'react';
import heroImg from '../../asserts/image 18.png';
import haircare from "../../asserts/haircare.png"
import skincare from "../../asserts/skincare.png"
import officedecor from "../../asserts/officedecor.png"
import img from "../../asserts/userHome.jpg"

export default function UserHomePage() {
  return (
    <div className="container mx-auto px-4 py-10">
      <div className="flex flex-col-reverse md:flex-row items-center mb-16 md:mt-10 lg:ms-10 ">
        <div className="md:w-1/2 text-center md:text-left space-y-4 lg:relative right-10">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-green-800">
            <span>Welcome </span><span>to </span><span>EcoSwap</span>
          </h1>
          <p className="text-base sm:text-lg text-green-700">
            Join our community-driven platform to exchange, borrow, or give away items and
            help build a circular economy. We offer thoughtfully curated eco-friendly products
            that are kind to the planet and your lifestyle. Every purchase you make supports a
            greener future.
          </p>
          <button className="mt-4 w-36 h-10 bg-green-800 text-white rounded-lg tracking-wider hover:-translate-y-1 transition">Explore</button>
        </div>

        <div className="md:w-1/2 mt-6 md:mt-16 lg:ms-8 ">
  <div className="lg:relative left-20 md:relative right-16">
    <img 
      src={heroImg} 
      alt="Community sharing" 
      className="w-[500px] max-h-[500px] object-cover rounded-lg shadow-lg"
    />
  </div>
</div>


      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        <div className="bg-[#E1E4C2] p-4 rounded-lg text-center space-y-4 h-[33rem]">
          <h3 className="font-medium">NEW COLLECTION</h3>
          <h2 className="text-3xl font-semibold">Hair Care</h2>
          <button className="w-36 h-10 bg-black text-white rounded-full hover:-translate-y-2 transition">Show More</button>
          <div className="mt-4">
            <img src={haircare} alt="Hair Care" className="w-full h-[22rem] rounded-md" />
          </div>
        </div>

        <div className="bg-[#DCEEEE] p-4 rounded-lg text-center space-y-4 h-[33rem]">
          <h3 className="font-medium">NEW COLLECTION</h3>
          <h2 className="text-3xl font-semibold">Skin Care</h2>
          <button className="w-36 h-10 bg-black text-white rounded-full hover:-translate-y-2 transition">Show More</button>
          <div className="mt-4">
            <img src={skincare} alt="Skin Care" className="w-full h-[22rem] rounded-md" />
          </div>
        </div>

        <div className="bg-[#F3EFE1] p-4 rounded-lg text-center space-y-4 h-[33rem]">
          <h3 className="font-medium">NEW COLLECTION</h3>
          <h2 className="text-3xl font-semibold">Office Decor</h2>
          <button className="w-36 h-10 bg-black text-white rounded-full hover:-translate-y-2 transition">Show More</button>
          <div className="mt-4">
            <img src={officedecor} alt="Office Decor" className="w-full h-[22rem] rounded-md" />
          </div>
        </div>
      </div>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-green-800 mb-4">Why EcoSwap Matters</h2>
        <p className="text-gray-700 mb-2">
          Every year millions of perfectly good items end up in landfills simply because we outgrow them,
          tire of them, or move on to the next new thing. EcoSwap empowers you to break that cycle.
        </p>
        <p className="text-gray-700">
          By giving your unwanted items a second life—whether you swap, lend, or give them away—you’re directly
          reducing waste, saving resources, and cutting carbon emissions from manufacturing and shipping.
        </p>
        <p className="text-gray-700 mt-2">
          Best of all, you get to discover unique finds right in your neighborhood, build new connections,
          and make sustainability part of your everyday routine.
        </p>
      </section>

      <section className=" flex flex-col lg:flex-row gap-10 mb-10">
        <div className="flex-1">
          <h2 className="text-2xl font-semibold text-green-800 mb-4">How It Works</h2>
          <ol className="list-decimal list-inside text-gray-700 space-y-2">
            <li><strong>List It:</strong> Snap a photo, write a quick description, choose whether you’re swapping, lending, or giving away—and hit “Post.”</li>
            <li><strong>Browse & Request:</strong> Search by category, location, or exchange type. Tap “Request” to chat directly with the owner.</li>
            <li><strong>Connect & Exchange:</strong> Coordinate pickup or drop-off in-app. Loan items return on your schedule; giveaways are yours to keep.</li>
            <li><strong>Rate & Review:</strong> Leave star ratings and comments to build trust and reward top swappers.</li>
          </ol>
          <h2 className="text-2xl font-semibold text-green-800 mb-4 mt-10">Join a Thriving Community</h2>
        <p className="text-gray-700 mb-2">
          From gardeners trading tools to parents passing on toys, EcoSwap has something for everyone.
          Our members love sharing tips,<br></br> swapping stories, and organizing local “swap meets” through the app.
        </p>
        <p className="text-gray-700">
          The more you participate—by listing, requesting, or <br></br>simply chatting—the stronger our circular‑economy network becomes.
        </p>
        </div>
        <div className="flex-2 col-sm-6 col-md-4 col-lg-3" >
          <img src={img} alt="How it works" className="w-[300px] h-[400px] rounded-lg" />
        </div>
      </section>

      

      <section className="mb-2 mt-2">
        <h2 className="text-2xl font-semibold text-green-800 mb-4">Get Started Today</h2>
        <ul className="list-disc list-inside text-gray-700 space-y-2">
          <li>Create your profile in under 2 minutes—no fees, ever.</li>
          <li>Browse items in your zip code or region.</li>
          <li>List your first item in seconds and earn Green Points when friends join.</li>
          <li>Help reduce waste and build community, one swap at a time.</li>
        </ul>
      </section>
    </div>
  );
}
