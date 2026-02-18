import Logomark from "@/app/_symbols/Logomark";

export default function FooterSection(){
	return(
		<footer className="w-full bg-secondary px-6 py-12">
			<div className="flex w-full flex-col gap-10">
				<h5 className="text-accent">
					AI-powered Nursing and Medical documentation
				</h5>
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
						</div>
					</div>
				</div>
			</div>
		</footer>
	)
}
