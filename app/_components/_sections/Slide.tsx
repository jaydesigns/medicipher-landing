const heroPhoto = "https://res.cloudinary.com/df9xjyhfb/image/upload/v1770177769/pexels-cottonbro-6939460_pb0y5r.jpg";

export default function SlideSection(){
	return(
		<section className="flex w-full flex-col items-center bg-pale-blue px-6 py-12 lg:py-20">
			<div className="flex w-full max-w-[1701px] flex-col overflow-hidden rounded-[40px] bg-light-blue lg:flex-row">
				<div className="h-[260px] w-full overflow-hidden lg:h-[758px] lg:w-1/2">
					<img alt="" className="h-full w-full object-cover" src={heroPhoto} />
				</div>
				<div className="flex w-full flex-col items-start justify-center gap-4 px-8 py-10 lg:w-1/2 lg:px-[80px]">
					<h3 className="text-[40px] font-semibold leading-none tracking-[-0.64px] text-accent lg:text-[64px]">
						Save time and maximize savings
					</h3>
					<p className="text-[24px] font-semibold leading-none tracking-[-0.36px] text-[color:var(--color-navy)] lg:text-[36px]">
						Our comprehensive suite of tools help you manage the documentation and finances of your nursing facility.
					</p>
					<div className="mt-6 flex flex-col gap-3 sm:flex-row">
						<button className="rounded-full bg-accent px-10 py-2 text-[18px] font-bold leading-[1.2] tracking-[-0.24px] text-white lg:text-[24px]">
							Schedule FREE Consultation
						</button>
						<button className="rounded-full border border-accent px-10 py-2 text-[18px] font-bold leading-[1.2] tracking-[-0.24px] text-accent lg:text-[24px]">
							Schedule a Demo
						</button>
					</div>
				</div>
			</div>
			<div className="mt-8 flex w-full max-w-[787px] items-center justify-between rounded-full bg-white p-2">
				<span className="rounded-full bg-light-blue px-6 py-2 text-[16px] font-semibold tracking-[-0.24px] text-black lg:text-[24px]">
					Features
				</span>
				<span className="rounded-full px-6 py-2 text-[16px] font-semibold tracking-[-0.24px] text-[color:var(--color-navy)] lg:text-[24px]">
					Products
				</span>
				<span className="rounded-full px-6 py-2 text-[16px] font-semibold tracking-[-0.24px] text-[color:var(--color-navy)] lg:text-[24px]">
					Services
				</span>
				<span className="rounded-full px-6 py-2 text-[16px] font-semibold tracking-[-0.24px] text-[color:var(--color-navy)] lg:text-[24px]">
					Tools
				</span>
			</div>
		</section>
	)
}
