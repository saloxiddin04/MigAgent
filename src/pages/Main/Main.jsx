import React from 'react';
import {Swiper, SwiperSlide} from "swiper/react";
import {Autoplay} from "swiper/modules";
import image from "../../assets/image.png";
import image1 from "../../assets/image1.png";
import Navbar from "../../components/Navbar.jsx";
import Footer from "../../components/Footer.jsx";

const Main = () => {
	return (
		<main className="bg-[rgb(248,249,250)]">
			<Navbar/>
			<div className="container mx-auto pt-36">
				<Swiper
					className={"mySwiper w-full"}
					centeredSlides={true}
					autoplay={{
						delay: 5500,
						disableOnInteraction: false,
					}}
					modules={[Autoplay]}
					loop={true}
				>
					<SwiperSlide className="w-full">
						<div
							className="pt-5 flex flex-col lg:flex-row justify-between items-center">
							<img src={image1} alt="Image" className="w-[500px] h-auto w-50 mb-3 md:mb-0"/>
							<p className="px-3 text-3xl">
								<strong className="text-[#3f79bc]">Namunaviy Sinov testlari </strong>
								Sizga rus tili bo‘yicha bilimlaringizni baholash, imtihon savollari bilan tanishish hamda unga yanada
								yaxshiroq tayyorgarlik ko‘rish imkonini beradi!
							</p>
						</div>
					</SwiperSlide>
					<SwiperSlide className="w-full">
						<div
							className="pt-5 flex flex-col lg:flex-row justify-between items-center">
							<img src={image} alt="Image" className="w-[500px] h-auto w-50 mb-3 md:mb-0"/>
							<p className="px-3 text-3xl">
								Ushbu sahifada Siz
								<strong className="text-[#3f79bc]"> rus tili, Rossiya tarixi va Rossiya Federatsiyasi
									qonunchiligi </strong>
								asoslari bo‘yicha test variantlarini tanlab, o‘z bilim darajangizni sinab ko‘rishingiz mumkin.
							</p>
						</div>
					</SwiperSlide>
				</Swiper>
				<div className="w-full text-center py-20">
					<button className="btn btn-primary">Test boshlash</button>
				</div>
			</div>
			<Footer/>
		</main>
	);
};

export default Main;