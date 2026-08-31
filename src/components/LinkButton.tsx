import { Link } from "react-router-dom"

interface ButtonProps {
    value: string,
    path: string,
}

export const LinkButton = ({ value, path }: ButtonProps) =>  {
    return (
        <Link className="bg-blue-300 px-4 py-2 rounded hover:bg-blue-500 hover:text-white" to={path}>
            {value}
        </Link>
    )
}