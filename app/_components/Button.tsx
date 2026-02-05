export default function Button({children}:{children:React.ReactNode}){
    return(
        <button className="px-6 py-2 font-medium bg-accent rounded-full text-white"><h6>{children}</h6></button>
    )
}