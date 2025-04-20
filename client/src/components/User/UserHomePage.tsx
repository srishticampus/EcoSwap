import React from 'react';
import heroImg from '../../asserts/userHome.jpg';

export default function UserHomePage() {
  return (
    <div className="container mx-auto p-6 mt-5">
      {/* Hero Section */}
      <div className="flex flex-col-reverse md:flex-row items-center mb-12 mt-5">
        {/* Text Block */}
        <div className="md:w-1/2 text-center md:text-left">
          <h1 className="text-4xl font-bold text-green-800 mb-4">Welcome to EcoSwap</h1>
          <p className="text-lg text-green-700">
            Join our community-driven platform to exchange, borrow, or give away items and help build a circular economy.
          </p>
        </div>
        {/* Image Block */}
        <div className="md:w-1/2 mb-6 md:mb-0 mt-5" >
          <img
            src={heroImg}
            style={{height:"500px"}}
            alt="People sharing items in a community setting"
            className="w-full  shadow-lg"
          />
        </div>
      </div>

      {/* Why EcoSwap Matters */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-green-800 mb-3">Why EcoSwap Matters</h2>
        <p className="text-gray-700 leading-relaxed">
          Every year millions of perfectly good items end up in landfills simply because we outgrow them, tire of them, or move on to the next new thing. EcoSwap empowers you to break that cycle. By giving your unwanted items a second life—whether you swap, lend, or give them away—you’re directly reducing waste, saving resources, and cutting carbon emissions from manufacturing and shipping.
        </p>
        <p className="text-gray-700 leading-relaxed mt-2">
          Best of all, you get to discover unique finds right in your neighborhood, build new connections, and make sustainability part of your everyday routine.
        </p>
      </section>

      {/* How It Works */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-green-800 mb-3">How It Works</h2>
        <ol className="list-decimal list-inside text-gray-700 leading-relaxed space-y-2">
          <li><strong>List It:</strong> Snap a photo, write a quick description, choose whether you’re swapping, lending, or giving away—and hit “Post.”</li>
          <li><strong>Browse & Request:</strong> Search by category, location, or exchange type. Tap “Request” to chat directly with the owner.</li>
          <li><strong>Connect & Exchange:</strong> Coordinate pickup or drop-off in-app. Loan items return on your schedule; giveaways are yours to keep.</li>
          <li><strong>Rate & Review:</strong> Leave star ratings and comments to build trust and reward top swappers.</li>
        </ol>
      </section>

      {/* Join a Thriving Community */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-green-800 mb-3">Join a Thriving Community</h2>
        <p className="text-gray-700 leading-relaxed">
          From gardeners trading tools to parents passing on toys, EcoSwap has something for everyone. Our members love sharing tips, swapping stories, and organizing local “swap meets” through the app. The more you participate—by listing, requesting, or simply chatting—the stronger our circular‑economy network becomes.
        </p>
        <p className="text-gray-700 leading-relaxed mt-2">
          Every item you share is an act of environmental stewardship that ripples out to make a big difference.
        </p>
      </section>

      {/* Get Started Today */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-green-800 mb-3">Get Started Today</h2>
        <ul className="list-disc list-inside text-gray-700 leading-relaxed space-y-2">
          <li>Create your profile in under 2 minutes—no fees, ever.</li>
          <li>Browse items in your zip code or region.</li>
          <li>List your first item in seconds and earn Green Points when friends join.</li>
          <li>Help reduce waste and build community, one swap at a time.</li>
        </ul>
      </section>
    </div>
  );
}
