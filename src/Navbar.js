import React, { useState, useEffect } from 'react';
import { Dialog, DialogPanel } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import Cookies from 'js-cookie';

const navigation = [
    { name: 'Home', href: '/', icon: <i className="fa-solid fa-house-chimney"></i> },
    { name: 'Recycle', href: '/recycle', icon: <i className="fa-solid fa-recycle"></i> },
    { name: 'About', href: '/about', icon: <i className="fa-solid fa-circle-info"></i> },
    { name: 'Account', href: '/account', icon: <i className="fa-solid fa-user"></i> },
];

const Navbar = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [bouncingIndex, setBouncingIndex] = useState(null);
    const [userInfo, setUserInfo] = useState(null);

    useEffect(() => {
        // Retrieve user info from cookies on component mount
        const storedUserInfo = Cookies.get('userInfo');
        if (storedUserInfo) {
            setUserInfo(JSON.parse(storedUserInfo)); // Parse the string back to JSON
        }
    }, []);

    // Logout handler
    const handleLogout = () => {
        Cookies.remove('userInfo'); // Remove cookie
        setUserInfo(null); // Clear user info from state
    };

    const handleMouseEnter = (index) => {
        setBouncingIndex(index);
        setTimeout(() => {
            setBouncingIndex(null);
        }, 1200); // Duration of the bounce animation
    };

    return (
        <header className="absolute inset-x-0 top-0 z-50">
            <nav aria-label="Global" className="flex items-center justify-between p-6 lg:px-8">
                <div className="flex lg:flex-1">
                    <a href="#" className="-m-1.5 p-1.5">
                        <span className="sr-only">TrashTag</span>
                        <i className="fa-solid fa-trash-can h-8 w-auto"></i>
                        <span className="text-ml font-bold">&nbsp;&nbsp;TrashTag</span>
                    </a>
                </div>
                <div className="flex lg:hidden">
                    <button
                        type="button"
                        onClick={() => setMobileMenuOpen(true)}
                        className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                    >
                        <span className="sr-only">Open main menu</span>
                        <Bars3Icon aria-hidden="true" className="h-6 w-6" />
                    </button>
                </div>
                <div className="hidden lg:flex lg:gap-x-12">
                    {navigation.map((item, index) => (
                        <a
                            key={item.name}
                            href={item.href}
                            className={`text-sm font-semibold leading-6 text-gray-900 px-4 py-2 transition-all duration-300 cursor-pointer dark:text-gray-300 dark:hover:text-white
                  ${item.name === "Recycle"
                                    ? "dark:text-white rounded-md bg-gradient-to-r from-[#77d95b] to-[#1e803f] text-white backdrop-blur-lg hover:from-[#77d95b]/90 hover:to-[#1e803f]/90 shadow-md"
                                    : ""
                                }`}
                            onMouseEnter={() => handleMouseEnter(index)}
                        >
                            <span
                                className={`inline-block ${bouncingIndex === index ? 'bounce' : ''}`}
                            >
                                {item.icon}
                            </span>
                            &nbsp; {item.name}
                        </a>
                    ))}
                </div>
                <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                    {userInfo ? (
                        <div className="dropdown dropdown-end">
                            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                <div className="w-10 rounded-full">
                                    <img
                                        alt={userInfo.name}
                                        src={userInfo.picture}
                                    />
                                </div>
                            </div>
                            <ul
                                tabIndex={0}
                                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                                <li>
                                    <a className="justify-between">
                                        Profile
                                        <span className="badge">New</span>
                                    </a>
                                </li>
                                <li><a>Settings</a></li>
                                <li><a onClick={handleLogout} >Logout</a></li>
                            </ul>
                        </div>
                    ) : (
                    <a href="/login" className="text-sm font-semibold leading-6 text-gray-900 dark:text-gray-300 dark:hover:text-white">
                        Login <span aria-hidden="true">&rarr;</span>
                    </a>
                    )}
                </div>
            </nav>
            <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
                <div className="fixed inset-0 z-50" />
                <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-base-10 px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
                    <div className="flex items-center justify-between">
                        <a href="#" className="-m-1.5 p-1.5">
                            <span className="sr-only">TrashTag</span>
                            <i className="fa-solid fa-trash-can h-8 w-auto"></i>
                            <span className="text-ml font-bold dark:text-white">&nbsp;&nbsp;TrashTag</span>
                        </a>
                        <button
                            type="button"
                            onClick={() => setMobileMenuOpen(false)}
                            className="-m-2.5 rounded-md p-2.5 text-gray-700"
                        >
                            <span className="sr-only">Close menu</span>
                            <XMarkIcon aria-hidden="true" className="h-6 w-6" />
                        </button>
                    </div>
                    <div className="mt-6 flow-root mt-">
                        <div className="-my-6 divide-y divide-gray-500/10">
                            <div className="space-y-2 py-6">
                                {navigation.map((item) => (
                                    <a
                                        key={item.name}
                                        href={item.href}
                                        className={`-mx-3 block rounded-lg px-3 py-2 bg-gray-300 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50 ${item.name === "Recycle"
                                            ? "bg-gradient-to-r from-[#77d95b] to-[#1e803f] text-white backdrop-blur-lg hover:from-[#77d95b]/90 hover:to-[#1e803f]/90 shadow-md"
                                            : ""
                                            }`}
                                    >
                                        {item.name}
                                    </a>
                                ))}
                            </div>
                            <div className="py-6">
                                <a
                                    href="#"
                                    className="bg-gray-300 -mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                >
                                    Log in
                                </a>
                            </div>
                        </div>
                    </div>
                </DialogPanel>
            </Dialog>
        </header>
    );
}

export default Navbar;