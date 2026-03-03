import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Header from "../assets/images/header-pic/career.svg";
import pic from "../assets/images/career.svg";
import Image from "next/image";
import Search from "../components/common/Search";


const CareerLibrary = () => {

  const careers = [
    {
      title: "Engineering",
      img: pic,
    },
    {
      title: "Mechanical and Automobile Engineering",
      img: pic,
    },
    {
      title: "Engineering",
      img: pic,
    },
    {
      title: "Engineering",
      img: pic,
    },
    {
      title: "Engineering",
      img: pic,
    },
    {
      title: "Engineering",
      img: pic,
    },
    {
      title: "Engineering",
      img: pic,
    },
    {
      title: "Engineering",
      img: pic,
    },
    {
      title: "Engineering",
      img: pic,
    },
    {
      title: "Engineering",
      img: pic,
    },
    {
      title: "Engineering",
      img: pic,
    }
  ];

    return (<>
           <Navbar/>

             <div className="w-full">
                {/* HERO SECTION */}
                <section className="relative w-full h-[300px] md:h-[350px]">
                    <Image
                    src={Header}
                    alt="Career Library"
                    fill
                    className="object-cover"
                    />
 
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <h1 className="text-white text-2xl md:text-4xl font-semibold">
                        Career Library
                    </h1>
                    </div>
                </section>

                {/* SEARCH SECTION */}
                <section className="bg-gray-100 py-14 px-4">
                    <div className="max-w-4xl mx-auto text-center">
                    <div class="inline-block px-4 py-2 bg-purple-100  text-purple-600 text-primary rounded-full text-xs font-bold mb-8">Choose your career goal</div>
                    <h2 className="text-2xl md:text-4xl font-bold mb-8">
                        What’s your <span className="text-purple-600">dream career?</span>
                    </h2>

                    {/* SEARCH BOX */}
                     <Search/>

                    </div>
                </section>

                {/* CARD SECTION */}
                <section className="bg-gray-100 pb-20 px-4">
                    <div className="max-w-6xl mx-auto grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

                    {careers.map((item, index) => (
                        <div
                        key={index}
                        className="bg-white rounded-xl shadow-md hover:shadow-xl transition duration-300"
                        >
                        <div className="relative w-full h-44">
                            <Image
                            src={item.img}
                            alt={item.title}
                            fill
                            className="object-cover rounded-t-xl"
                            />
                        </div>

                        <div className="p-4 text-center">
                            <h3 className="text-sm md:text-base font-medium">
                            {item.title}
                            </h3>
                        </div>
                        </div>
                    ))}

                    </div>
                </section>

                </div>
                
           <Footer/>
        </>)
}

export default CareerLibrary;