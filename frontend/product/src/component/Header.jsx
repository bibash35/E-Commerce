import React, { useEffect,  useRef,  useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaShoppingCart, FaRegUserCircle, FaSearch } from 'react-icons/fa';
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/slice/userSlice";
import { toast } from "react-hot-toast";
import { setSearchTerm } from '../redux/slice/productSlice';
import { selectCartItemCount } from "../redux/slice/productSlice";
import { clearCart } from "../redux/slice/productSlice";


import { GiHamburgerMenu } from "react-icons/gi";
import { RxCross1 } from "react-icons/rx";

export default function Header() {
  let user = useSelector((store) => store.user.value);
  const cartItemCount = useSelector(selectCartItemCount);

  const dispatch = useDispatch()
  const navigate = useNavigate();

  const searchInputRef = useRef(null);

  React.useImperativeHandle(searchInputRef, () => ({
    focus: () => {
      if (searchInputRef.current) {
        searchInputRef.current.focus();
      }
    }
  }));
  const [searchTerm, setSearchTermState] = useState("");


  const handleSearchChange = (event) => {
    setSearchTermState(event.target.value);
  };
 
  const handleSearchClick = () => {
    dispatch(setSearchTerm(searchTerm));
    navigate('/search-page');
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSearchClick();
    }
  };

  const [showUser, setShowUser] = useState(false);
  const handleShowMenu = () => {
    setShowUser(!showUser);
  };
 
  const [activeLink, setActiveLink] = useState("home");


  // const handleLogout = () => {
  //   dispatch(logout());
  //     // dispatch(clearCart()); // ✅ clears cart immediately

  //   toast.success("Logout successfully");
  // };

const handleLogout = () => {
  dispatch(logout());
  dispatch(clearCart());
  toast.success("Logout successfully");
};
  const cartItemNumber = useSelector((state)=>state.product.cartItem)

  const [isNavOpen, setIsNavOpen] = useState(false);
  const [activeStatus, setActiveStatusLink] = useState(""); 

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };
  const handleLinkClick = (link) => {
    setActiveStatusLink(link);
    setIsNavOpen(false); // Close the menu after clicking a link
  };


  return (
    <>
      


  <header className="fixed shadow-md w-full h-14 px-3 z-50 bg-white">
      <div className="flex items-center h-full justify-between">
        <Link to={""}>
          <div className="h-10 flex items-center justify-start flex-grow">
            <span className="text-base md:text-3xl md:h-full text-red-600 font-bold">
              SpeedyNepal
            </span>
          </div>
        </Link>

        <div className="flex-grow flex justify-center md:justify-center">
          <div className="relative w-36 max-w-xs md:w-48 md:max-w-md lg:w-60">
            <input
              type="text"
              ref={searchInputRef}
              onKeyDown={handleKeyDown}
              placeholder="Search Products"
              className="border border-gray-300 rounded-full px-4 py-1 pr-10 w-full focus:outline-none focus:border-gray-500"
              onChange={handleSearchChange}
            />
            <FaSearch
              className="absolute cursor-pointer top-1/2 right-3 transform -translate-y-1/2 text-slate-600"
              onClick={handleSearchClick}
            />
          </div>
        </div>

        <div className="hidden md:flex md:text-lg  items-center font-semibold">
        <Link to="/" onClick={() => setActiveLink("home")}
        className={`px-4 py-2 ${activeLink === "home" ? "text-red-600" : ""}`}>
        Home
      </Link>
      <Link to="/about" onClick={() => setActiveLink("about")}
       className={`px-4 py-2 ${activeLink === "about" ? " text-red-600" : ""}`}>
        About
      </Link>
      <Link to="/contact" onClick={() => setActiveLink("contact")}
     className={`px-4 py-2 ${activeLink === "contact" ? "text-red-600" : ""}`}>
        Contact
      </Link>
    </div>

        <div className="flex items-center gap-2 md:gap-4">
          <div className="text-2xl text-slate-600 relative">
            <Link to={"cart"}>
              <FaShoppingCart />
              <div className="absolute -top-1 -right-1 text-white bg-red-500 h-4 w-4 rounded-full text-sm text-center">
                {/* {cartItemNumber.length} */}
                {cartItemCount} {/* Display cart item count here */}

              </div>
            </Link>
          </div>

          <div className="flex items-center">
            <div className="text-2xl text-slate-600 relative" onClick={handleShowMenu}>
              <div className="cursor-pointer drop-shadow-md">
                <FaRegUserCircle />
              </div>
              {showUser && (
                <div className="absolute right-2 flex flex-col text-sm bg-white py-2 shadow drop-shadow-md">
                  {user?.user.role === "seller" && (
                  // {user?.role === "seller" && (
      
                    <Link to={"new-product"} className="whitespace-nowrap cursor-pointer px-2">
                      Create & Edit Products
                    </Link>
                  )}
                  {user ? (
                    <p className="cursor-pointer text-white bg-red-500 px-2" onClick={handleLogout}>
                      Logout ({user?.user.firstName})
                      {/* Logout ({user?.firstName}) */}
                    </p>
                  ) : (
                    <Link to={"login"} className="whitespace-nowrap cursor-pointer px-2">
                      Login
                    </Link>
                  )}
                </div>
              )}
            </div>
            <span className="text-red-500 font-bold hidden md:inline">
              {user?.user.firstName}
              {/* {user?.firstName} */}
            </span>
          </div>

          <div className="block md:hidden">
            {isNavOpen ? (
              <RxCross1 onClick={toggleNav} />
            ) : (
              <GiHamburgerMenu onClick={toggleNav} />
            )}
          </div>
        </div>
      </div>

      {isNavOpen && (
         <nav className="flex flex-col md:hidden bg-white text-black text-base shadow-md rounded-md">
         <Link to="/" onClick={() => handleLinkClick("home")}
           className={`px-4 py-2 ${activeLink === "home" ? "text-red-600" : ""}`}>
           Home
         </Link>
         <Link to="/about" onClick={() => handleLinkClick("about")}
           className={`px-4 py-2 ${activeLink === "about" ? "text-red-600" : ""}`}>
           About
         </Link>
         <Link to="/contact" onClick={() => handleLinkClick("contact")}
           className={`px-4 py-2 ${activeLink === "contact" ? "text-red-600" : ""}`}>
           Contact
         </Link>
       </nav>
       
      )}
    </header>

    </>
  );
}

