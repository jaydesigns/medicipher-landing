export default function Button({children,className}:{children:React.ReactNode, className:string}){
    return(
        <button className={`${className} px-6 py-2 font-medium button-text bg-accent rounded-full text-white`}><span>{children}</span></button>
    )
}