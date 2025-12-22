import { Link } from "react-router-dom"



const Footer = () => {
    return (
        <footer className="bg-white py-12 px-6 border-t border-gray-100">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
                <p className="text-sm text-gray-400">© 2024 PhotoSafe Inc. All rights reserved.</p>
                <div className="flex gap-8">
                    {['Privacy', 'Terms', 'Support'].map(link => (
                        <Link key={link} to="#" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">
                            {link}
                        </Link>
                    ))}
                </div>
            </div>
        </footer>
    )
}

export default Footer;