import { Link } from "react-router-dom";

export default function Home() {
    return (
        <div className=" p-4 m-2 rounded">
            <div className="container">
                <div className="text-center mb-5">
                    <h1 className="display-4 fw-bold mb-3">
                        Welcome to AI Assistant
                    </h1>
                    <p className="lead text-secondary">
                        Your intelligent companion for chat and help
                    </p>
                </div>

                <div className="row g-4">
                    <div className="col-md-6">
                        <div className="card h-100 shadow-sm hover-shadow">
                            <div className="card-body">
                                <h2 className="h3 fw-semibold mb-3">
                                    Chat with AI
                                </h2>
                                <p className="text-secondary mb-4">
                                    Start a conversation with our intelligent AI assistant for help, advice, or just casual chat.
                                </p>
                                <Link className="btn btn-primary" to="/chat">
                                    Start Chat
                                </Link>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="card h-100 shadow-sm hover-shadow">
                            <div className="card-body">
                                <h2 className="h3 fw-semibold mb-3">
                                    Get Help
                                </h2>
                                <p className="text-secondary mb-4">
                                    Need assistance with specific tasks? Our AI helper is ready to guide you through any challenge.
                                </p>
                                <Link className="btn btn-success" to="/agent">
                                    Get Assistance
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-5 text-center">
                    <p className="text-muted">
                        Powered by advanced AI technology to provide you with the best assistance possible
                    </p>
                </div>
            </div>
        </div>
    );
}