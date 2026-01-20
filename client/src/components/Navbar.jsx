import { Link, useNavigate, useLocation } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));

    const handleLogout = () => {
        localStorage.removeItem('userInfo');
        navigate('/login');
    };

    const isActive = (path) => location.pathname === path;

    const NavLink = ({ to, children }) => (
        <Link
            to={to}
            className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive(to)
                    ? 'bg-purple-100 text-purple-700'
                    : 'text-gray-600 hover:text-purple-600 hover:bg-purple-50'
                }`}
        >
            {children}
        </Link>
    );

    return (
        <nav className="bg-white/90 backdrop-blur-md sticky top-0 z-50 border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        <Link to="/dashboard" className="flex-shrink-0 flex items-center">
                            <span className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-indigo-600 bg-purple-600">
                                SkillForge
                            </span>
                        </Link>
                        <div className="hidden md:ml-10 md:flex md:space-x-4">
                            <NavLink to="/dashboard">Dashboard</NavLink>

                            {userInfo?.role === 'instructor' && (
                                <>
                                    <NavLink to="/instructor/courses">My Courses</NavLink>
                                    <NavLink to="/instructor/create-course">Create Course</NavLink>
                                    <NavLink to="/instructor/generate-quiz">Quiz Generator</NavLink>
                                    <NavLink to="/instructor/analytics">Analytics</NavLink>
                                </>
                            )}

                            {userInfo?.role === 'student' && (
                                <>
                                    <NavLink to="/student/dashboard">My Learning</NavLink>
                                    {/* <NavLink to="/student/recommendations">Recommendations</NavLink> */}
                                    <NavLink to="/student/analytics">My Progress</NavLink>
                                </>
                            )}
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="hidden md:flex flex-col items-end">
                            <span className="text-sm font-semibold text-gray-800">{userInfo?.name}</span>
                            <span className="text-xs text-gray-500 capitalize">{userInfo?.role}</span>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="bg-red-50 text-red-600 hover:bg-red-100 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu (Simple implementation) */}
            <div className="md:hidden border-t border-gray-200 py-2 px-4 flex flex-col space-y-2 bg-gray-50">
                <Link to="/dashboard" className="block text-gray-600 py-2">Dashboard</Link>
                {userInfo?.role === 'instructor' && (
                    <>
                        <Link to="/instructor/courses" className="block text-gray-600 py-2">My Courses</Link>
                        <Link to="/instructor/analytics" className="block text-gray-600 py-2">Analytics</Link>
                        <Link to="/instructor/generate-quiz" className="block text-gray-600 py-2">Quiz Generator</Link>
                    </>
                )}
                {userInfo?.role === 'student' && (
                    <Link to="/student/dashboard" className="block text-gray-600 py-2">My Learning</Link>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
