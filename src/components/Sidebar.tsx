import { useState } from 'react';
import { NavLink } from 'react-router-dom';


import {
    FaHome,
    FaBars,
    FaThLarge
} from 'react-icons/fa'; // 'fa' = Font Awesome

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(true);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <aside className={`sidebar ${isOpen ? 'open' : 'collapsed'}`}>
            <div className="sidebar-header">
                <button className="toggle-btn" onClick={toggleSidebar}>
                    {/* {isOpen ? <FaChevronLeft /> : <FaChevronRight />} */}
                    <FaBars />
                </button>
                {/* {isOpen && <span className="logo-text">TSG FRONTEND</span>} */}

            </div>


            <div className="sidebar-content">
                {/* <div className="sidebar-header">
                    <h2>{isOpen && 'Dashboard'}</h2>
                </div> */}

                <nav>
                    <ul>
                        <li>
                            <NavLink to="/home">
                                <FaHome className="nav-icon" />
                                {isOpen && <span className="link-text">Home</span>}
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to='/campaign-details'>
                                <FaThLarge className="icon" />
                                {isOpen && <span className="link-text">Campaign Details</span>}
                            </NavLink>
                        </li>
                    </ul>
                </nav>
            </div>
        </aside>
    );
};

export default Sidebar;