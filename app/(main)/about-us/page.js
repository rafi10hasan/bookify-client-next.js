import image1 from '../../../public/building-night_1127-3365.jpg'
import image2 from '../../../public/beautiful-young-woman-sitting.jpg'
import Image from 'next/image';
const stories = [
	{
		title: "Our Mission.",
		description:
			"At Luxurious, our mission is to provide more than just a place to stay – we aim to create lasting memories for every guest. From our elegantly appointed rooms and suites to our top-notch amenities, we ensure every detail of your visit is thoughtfully designed. Our dedicated team is passionate about delivering warm and personalized service, making you feel at home from the moment you arrive.",
		image: image1
	},
	{
		title: "A Haven of Relaxation and Elegance",
		description:
			"Our hotel is a perfect blend of relaxation and elegance, offering a tranquil escape amidst the bustling city. With state-of-the-art facilities, a rejuvenating spa, and stunning views, every aspect of your stay is crafted to provide the utmost comfort. Whether you’re here for a romantic getaway, a family vacation, or a corporate retreat, we ensure your experience is nothing short of exceptional.",
		image: image2
	},
];

const StoryItem = ({ item, index }) => {
	const { title, description, image } = item;
	return (
		<>
			<div
				className={`col-span-12 md:col-span-5 ${
					index % 2 === 0
						? "order-1 md:order-2 md:col-start-7"
						: "order-2 md:order-1 md:col-start-2"
				}`}
			>
				<div
					className={`flex flex-col justify-center ${
						index % 2 === 0 ? "lg:pl-14" : "lg:pr-14"
					}`}
				>
					<h4 className="text-2xl font-bold mb-4">{title}</h4>
					<p className="text-base leading-relaxed text-justify opacity-70 mb-0 md:pr-6">
						{description}
					</p>
				</div>
			</div>
			<div
				className={`${
					index % 2 === 0
						? "order-1 md:col-start-2"
						: "order-1 md:order-2 md:col-start-7"
				} col-span-12 md:col-span-5  mb-6 md:mb-0 mt-6 md:mt-0`}
			>
				<div>
					<Image
						src={image}
						alt={title}
						className="max-w-full h-auto rounded-2xl"
					/>
				</div>
			</div>
		</>
	);
};

const AboutUs = () => {
	return (
		<section className="ezy__about6 light py-14 md:py-24 bg-white dark:bg-[#0b1727] text-zinc-900 dark:text-white">
			<div className="container px-4">
				<div className="grid grid-cols-12 justify-center text-center mb-12">
					<div className="col-span-12 md:col-span-8 md:col-start-3">
						<h2 className="text-4xl leading-snug md:text-5xl md:leading-snug font-bold mb-6">
							About Us
						</h2>
						<p className="text-xl opacity-80 mb-4">
            At Luxurious, we blend luxury, comfort, and world-class hospitality to offer you an unforgettable stay. Located in the heart of USA, our hotel provides a serene escape for travelers, whether for leisure or business. Discover elegantly designed rooms, exceptional dining experiences, and impeccable service tailored to meet your every need.
						</p>
					</div>
				</div>

				{stories.map((item, i) => (
					<div
						className="grid grid-cols-12 justify-center items-center mt-12"
						key={i}
					>
						<StoryItem item={item} index={i + 1} />
					</div>
				))}
			</div>
		</section>
	);
};
export default AboutUs