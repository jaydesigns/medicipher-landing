const showcasePhoto = "https://res.cloudinary.com/df9xjyhfb/image/upload/v1770177774/Landscape_candid_sho_xduwvv.png";
const dashboardImage = "https://res.cloudinary.com/df9xjyhfb/image/upload/v1770353660/Dashboard_pmubx7.png";

export default function ShowcaseSection(){
	return(
		<section className="flex w-full flex-col items-center justify-center gap-10 bg-accent p-6 lg:flex-row lg:gap-10 lg:p-[80px]">
			<div className="flex w-full flex-col items-start justify-between gap-8 lg:h-full lg:w-[593px]">
				<div className="flex w-full flex-col gap-2 text-white">
					<h3 className="text-[40px] font-semibold leading-none tracking-[-0.64px] lg:text-[64px]">
						The unseen of spending three years at Medicipher
					</h3>
					<p className="text-[18px] font-medium leading-none lg:text-[20px]">
						The majestic lion, known as the king of the jungle, roams the vast savannahs of Africa. Its golden mane and powerful presence evoke awe and respect. Lions are social creatures, living in prides led by a dominant male. They rely on teamwork during hunts, showcasing their exceptional hunting skills. However, despite their regal status, lions face threats from habitat loss and poaching, making conservation efforts crucial to their survival.
					</p>
				</div>
				<div className="h-[240px] w-full overflow-hidden rounded-[40px] lg:h-[329px]">
					<img alt="" className="h-full w-full object-cover" src={showcasePhoto} />
				</div>
			</div>
			<div className="relative h-[320px] w-full overflow-hidden rounded-[40px] bg-light-blue lg:h-[714px] lg:w-[1004px]">
				<img alt="" className="absolute left-1/2 top-1/2 h-[320px] w-[450px] -translate-x-1/2 -translate-y-1/2 object-cover lg:h-[714px] lg:w-[1004px]" src={dashboardImage} />
			</div>
		</section>
	)
}
