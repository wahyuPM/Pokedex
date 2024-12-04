import React from "react"

interface TextLabelProps {
    title: string
    value: string | number
}

const TextLabel: React.FC<TextLabelProps> = ({ title, value }) => {
    return (
        <div className="text-lg">
            <p className="text-red-400 font-semibold">{title}</p>
            <p className="capitalize">{value}</p>
        </div>
    )
}

export default TextLabel