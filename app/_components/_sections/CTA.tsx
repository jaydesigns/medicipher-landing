export default function CTASection(){
    return(
        <section className="flex w-full min-h-screen flex-col lg:flex-row">
            <div className="flex w-full flex-col justify-start bg-accent px-6 py-10 lg:px-[110px] lg:py-[100px]">
                <h2 className="text-[56px] leading-none tracking-[-1.92px] text-white lg:text-[96px]">
                    Ready to transform your facility management?
                </h2>
            </div>
            <div className="flex w-full flex-col justify-between bg-pale-blue px-6 py-10 lg:px-[110px] lg:py-[100px]">
                <p className="text-[24px] font-semibold leading-none tracking-[-1px] text-[color:var(--color-dark)] lg:text-[36px]">
                    Our comprehensive suite of tools help you manage the documentation and finances of your nursing facility.
                </p>
                <div className="relative mt-8 h-[240px] w-full rounded-[40px] bg-light-blue lg:mt-0 lg:h-[283px]">
                    <div className="absolute left-[32px] top-[62px] flex w-[80%] flex-col gap-8 lg:left-[52px] lg:top-[78px] lg:w-[637px]">
                        <input
                            className="w-full border-b border-[color:var(--color-navy)] bg-transparent pb-2 text-[18px] font-medium text-[color:var(--color-navy)] outline-none placeholder:text-[color:var(--color-navy)]/60 lg:text-[20px]"
                            placeholder="Full name"
                            type="text"
                        />
                        <input
                            className="w-full border-b border-[color:var(--color-navy)] bg-transparent pb-2 text-[18px] font-medium text-[color:var(--color-navy)] outline-none placeholder:text-[color:var(--color-navy)]/60 lg:text-[20px]"
                            placeholder="Work email"
                            type="email"
                        />
                    </div>
                    <div className="absolute left-1/2 top-[170px] -translate-x-1/2 rounded-full bg-[#47b0ff] px-[40px] py-[10px] lg:top-[193px]">
                        <span className="text-[20px] font-bold leading-[1.2] tracking-[-0.24px] text-white lg:text-[24px]">
                            Sign Up
                        </span>
                    </div>
                </div>
            </div>
        </section>
    )
}