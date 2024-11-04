interface Props {
    content: string
}

export function Notification({ content }: Props) {
    return (
        <div
            className="card w-full max-w-2xl flex flex-row p-4 gap-6 justify-between items-center">
            <div className="avatar placeholder">
                <div className="bg-secondary/20 text-secondary w-10 rounded-full">
                    <span className="text-md uppercase">
                         {
                             content.length >= 2 ? `${content[0]}${content[1]}` : content
                         }
                    </span>
                </div>
            </div>
            <p>{ content }</p>
        </div>
    )
}