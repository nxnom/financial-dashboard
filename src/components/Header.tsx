import { MagnifyingGlassIcon, BellIcon, EnvelopeIcon } from '@heroicons/react/24/outline'

const Header = () => {
    return <header className="sticky top-0 z-10 -mx-6 px-6 py-4 bg-inherit flex items-center justify-between dark:text-[#DFDDEB]">
        <h1 className="text-2xl font-semibold">Dashboard</h1>

        <div className="flex items-center space-x-4">
            <div className="relative">
                <input
                    type="text"
                    placeholder="Search..."
                    className="h-8 text-sm pr-10 pl-4 py-2 rounded-lg bg-white dark:bg-[#56459E] focus:outline-none border border-gray-200 dark:border-gray-700"
                />
                <MagnifyingGlassIcon className="w-5 h-5 absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>

            <div className="h-8 flex items-center space-x-1.5 rounded-lg bg-white dark:bg-[#56459E] px-4 py-2 border border-gray-200 dark:border-gray-700">
                <div className="relative flex items-center space-x-3 mr-16">
                    <img
                        src="https://images.vexels.com/media/users/3/157837/isolated/preview/db181fb308b9a32197d9c3cadc58c4d3-asymmetric-cut-hair-woman-avatar.png"
                        alt="Profile"
                        className="w-16 h-16 absolute -left-6"
                    />
                    <p className="ml-9 font-medium text-sm">Hello, Michaela!</p>
                </div>
                <button className="py-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
                    <EnvelopeIcon className="w-5 h-5" />
                </button>
                <button className="py-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 relative">
                    <BellIcon className="w-5 h-5" />
                    <span className="absolute -top-1 -right-1 text-white text-xs w-4 h-4 flex items-center justify-center bg-[#9898EE] dark:bg-[#8F82C9] rounded-full">
                        5
                    </span>
                </button>
            </div>
        </div>
    </header>
}

export default Header