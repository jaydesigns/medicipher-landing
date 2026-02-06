import Logomark from "@/app/_symbols/Logomark";

export default function FooterSection(){
	return(
		<footer className="w-full bg-[#47b0ff] px-6 py-12 lg:px-[80px] lg:py-[80px]">
			<div className="flex w-full flex-col gap-10">
				<p className="text-[32px] font-semibold leading-[1.2] text-white lg:text-[48px]">
					AI-powered Nursing and Medical documentation
				</p>
				<div className="flex w-full flex-col gap-8 lg:flex-row lg:items-end">
					<div className="flex w-full flex-col gap-2 text-[14px] font-medium text-white">
						<span>Home</span>
						<span>About</span>
						<span>Contact Us</span>
					</div>
					<div className="flex w-full flex-col gap-2 text-[14px] font-medium text-white">
						<span>Partner With Us</span>
						<span>Press</span>
						<span>Links</span>
						<span>Affiliates</span>
					</div>
					<div className="flex w-full items-center justify-start lg:justify-end">
						<div className="flex items-center gap-4">
                            <Logomark />
							<span className="text-[32px] font-semibold text-white lg:text-[36px]">MediCipher</span>
						</div>
					</div>
				</div>
			</div>
		</footer>
	)
}
