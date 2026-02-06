export default function Features(){
    return(
        <section className="relative flex flex-col justify-start w-full h-screen p-6 pt-24">
            <h2>Features</h2>
            <div className="grid grid-flow-col grid-cols-6 grid-rows-4 gap-4 h-full w-full">
                <FeatureCard additionalClass="row-span-4 col-span-2 bg-light-blue">
                    <h3>43%</h3>
                    <p>Less time spent on skilled nursing documentation with AI-assisted summaries and auto-filled MDS sections.</p>
                    <span className="caption">Across 120 SNF teams, 6-month average.</span>
                </FeatureCard>
                <FeatureCard additionalClass="row-span-2 col-span-2 bg-accent text-white">
                    <h3>18 hrs</h3>
                    <p>Saved per clinician each month on daily notes, therapy updates, and care-plan edits.</p>
                    <span className="caption"><span className="text-white/50">Median savings per FTE.</span></span>
                </FeatureCard>
                <FeatureCard additionalClass="row-span-2 col-span-4 bg-cover bg-[url(https://res.cloudinary.com/df9xjyhfb/image/upload/v1770350247/pexels-marcus-aurelius-6787761_og4odb.jpg)]">
                    <div className="w-1/3 text-white">
                        <h3>2.4x</h3>
                        <p>Faster narrative generation for skilled nursing visits, with structured citations from the chart.</p>
                        <span className="caption">Average speedup in pilot sites.</span>
                    </div>
                </FeatureCard>
                <FeatureCard additionalClass="row-span-2 col-span-2 bg-primary">
                    <h3>92%</h3>
                    <p>Documentation accuracy when AI checks for missing risk factors and inconsistent meds.</p>
                    <span className="caption">Internal QA review, 3,800 notes.</span>
                </FeatureCard>
            </div>
        </section>
    )
}

const FeatureCard = ({children,additionalClass}:{children:React.ReactNode, additionalClass?:string}) => {
    return(
        <div className={`rounded-3xl p-6 ${additionalClass}`}>
            {children}
        </div>
    )
}