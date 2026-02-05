export default function Features(){
    return(
        <section className="relative flex flex-col justify-start w-full h-screen p-6 pt-24">
            <h2>Features</h2>
            <div className="grid grid-flow-col grid-cols-6 grid-rows-4 gap-4 h-full w-full">
                <FeatureCard additionalClass="row-span-4 col-span-2">
                    <h3>57%</h3>
                </FeatureCard>
                <FeatureCard additionalClass="row-span-2 col-span-2">
                    <h3>57%</h3>
                </FeatureCard>
                <FeatureCard additionalClass="row-span-2 col-span-4">
                    <h3>57%</h3>
                </FeatureCard>
                <FeatureCard additionalClass="row-span-2 col-span-2">
                    <h3>57%</h3>
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