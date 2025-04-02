import { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import CarCard from './CarCard'; // Ensure this component exists
import { useRouter } from "next/navigation";

const YourComponent = () => {
    const [allTemps, setAllTemps] = useState(); // Stores products per category
    const router = useRouter();
    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const response = await fetch('/api/products', { cache: 'no-store' });
            if (response.ok) {
                const data = await response.json();
                // Filter items where title contains "box"
                const filteredData = data.filter(item => item.title.toLowerCase().includes("box"));
                setAllTemps(filteredData);
            } else {
                console.error('Failed to fetch categories');
            }
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };
    





    return (
        <div className="ProvidersIfSelectedProductMatchesFilter mt-4">

            <content-block slug="product-page-wssb">
                <div className="ProductTile-SliderContainer ProductTile-SliderContainer--YMAL">

                    {allTemps && Object.keys(allTemps).length > 0 ? (

                        <>

                            <style dangerouslySetInnerHTML={{
                                __html: ".ProductTile-SliderContainer--YMAL .ProductTile-SliderContainer-Title{height:auto;text-align:center; }  "
                            }} />






                            <div className="  ProductTile-SliderContainer ProductTile-SliderContainer--YMAL px-3" data-product-list-category="ymal-slider">

                                <div className="flex items-center justify-between w-full">
                                    <h1 className="py-2 leading-[0rem] font-stretch-[66.66%] not-italic tracking-widest uppercase text-[#ef0f87] transition text-nowrap font-bold text-3xl myBB">
                                        Our Brand
                                    </h1>
                                    <button
                                    id='mybbtn' 
                                    className='myBB' 
                                    onClick={() => router.push("/search?cat=yes")}
                                    >
                                        Shop All
                                    </button>
                                </div>
                                <div className="w-[70px] h-[5px] bg-[#ef0f87] mt-1 mb-5"></div>






                                {allTemps.length > 0 ? (
                                    <section className=' mb-5' style={{ maxWidth: "100%" }}>
                                        <Swiper
                                            spaceBetween={20}

                                            loop breakpoints={{
                                                150: {
                                                    slidesPerView: 2,
                                                },
                                                768: {
                                                    slidesPerView: 4,
                                                },
                                            }}>
                                            <div className="home__cars-wrapper">
                                                {allTemps.map((temp) => (
                                                    <SwiperSlide key={temp.id}>
                                                        <CarCard temp={temp} />
                                                    </SwiperSlide>
                                                ))}
                                            </div>
                                        </Swiper>
                                    </section>



                                ) : (
                                    <p>No products available in {category}</p>
                                )}
                            </div>
                        </>

                    ) : (
                        <div className="home___error-container">
                            <h2 className="text-black text-xl font-bold">No products available</h2>
                        </div>
                    )}
                </div>

            </content-block>
        </div>
    );
};

export default YourComponent;
