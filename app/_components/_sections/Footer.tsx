import Logomark from "@/app/_symbols/Logomark";

export default function FooterSection(){
	return(
		<footer className="flex justify-center w-full bg-white px-6 py-32">
			<div className="flex w-full max-w-270 flex-col gap-10">
				<h2 className="text-accent">
					AI-powered Nursing and Medical documentation
				</h2>
				<div className="flex w-full flex-col gap-8 lg:flex-row lg:items-end">
					<div className="flex w-full flex-col gap-2 text-[14px] font-medium text-secondary">
						<span>Home</span>
						<span>About</span>
						<span>Contact Us</span>
					</div>
					<div className="flex w-full flex-col gap-2 text-[14px] font-medium text-secondary">
						<span>Partner With Us</span>
						<span>Press</span>
						<span>Links</span>
						<span>Affiliates</span>
					</div>
					<div className="flex w-full items-center justify-start lg:justify-end">
						<div className="flex items-center gap-4">
                            <Logomark color={"#0A9D88"}/>
						</div>
					</div>
				</div>
			</div>
		</footer>
	)
}
