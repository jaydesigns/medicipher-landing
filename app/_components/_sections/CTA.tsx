export default function CTASection(){
    return(
        <section className="flex w-full h-60vh flex-col lg:flex-row">
            <div className="flex w-full lg:w-1/2 flex-col justify-start bg-accent px-6 py-10 lg:px-[110px] lg:py-[100px]">
                <h2 className="text-[56px] leading-none tracking-[-1.92px] text-white lg:text-[96px]">
                    Ready to transform your facility management?
                </h2>
            </div>
            <div className="flex w-full lg:w-1/2 flex-col justify-between bg-light-blue px-2 py-10 lg:px-8 lg:py-12">
                <p className="text-[24px] font-semibold leading-none tracking-[-1px] text-[color:var(--color-dark)] lg:text-[36px]">
                    Our comprehensive suite of tools help you manage the documentation and finances of your nursing facility.
                </p>
                <div className="mt-8 w-full rounded-[40px] bg-pale-blue lg:mt-0">
                    <div className="flex flex-col gap-8 px-6 py-8 lg:px-[52px] lg:py-[78px]">
                        <input
                            className="w-full min-w-0 border-b border-[color:var(--color-navy)] bg-transparent pb-2 text-[18px] font-medium text-[color:var(--color-navy)] outline-none placeholder:text-[color:var(--color-navy)]/60 lg:text-[20px]"
                            placeholder="Full name"
                            type="text"
                        />
                        <input
                            className="w-full min-w-0 border-b border-[color:var(--color-navy)] bg-transparent pb-2 text-[18px] font-medium text-[color:var(--color-navy)] outline-none placeholder:text-[color:var(--color-navy)]/60 lg:text-[20px]"
                            placeholder="Work email"
                            type="email"
                        />
                        <div className="flex justify-center pt-4">
                            <div className="rounded-full bg-[#47b0ff] px-[40px] py-[10px]">
                                <span className="text-[20px] font-bold leading-[1.2] tracking-[-0.24px] text-white lg:text-[24px]">
                                    Sign Up
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}