export default function Notifications() {
    return (
        <div className="w-full sm:flex sm:flex-col sm:items-center min-h-[100vh] bg-slate-50">
            <section
                className="translate-y-32 p-4 sm:translate-y-0 sm:mt-32 w-[100vw] sm:w-full flex flex-col items-center gap-6"
            >
                <div
                     className="card w-full max-w-2xl flex flex-row p-4 gap-6 justify-between items-center">
                    <div className="avatar placeholder">
                        <div className="bg-secondary/20 text-secondary w-10 rounded-full">
                            <span
                                className="text-md uppercase">CL</span>
                        </div>
                    </div>
                    <p>Notification</p>
                </div>
            </section>
        </div>
    )
}