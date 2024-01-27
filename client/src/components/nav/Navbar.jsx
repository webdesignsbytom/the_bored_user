import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// Context
import { UserContext } from '../../context/UserContext';
import { ToggleContext } from '../../context/ToggleContext';
// Images
import LogoImage from '../../assets/images/logos/wdbt-black.svg';
import SvgBackground from '../../assets/images/pages/confetti_doodles.svg';
// Icons
import { FaUpload } from 'react-icons/fa';
import { FaPencilAlt } from 'react-icons/fa';
import FullscreenLinks from './FullscreenLinks';
import MobileLinks from './MobileLinks';

function Navbar() {
  const { user, setUser } = useContext(UserContext);
  const { toggleNavbarOpenClosed, toggleNavigation, activeNav, setActiveNav } =
    useContext(ToggleContext);

  let navigate = useNavigate();

  const logoutUser = (event) => {
    event.preventDefault();
    setActiveNav('/');
    toggleNavbarOpenClosed();
    setUser({});
    localStorage.removeItem(process.env.REACT_APP_USER_TOKEN);

    navigate('/', { replace: true });
  };

  const navigateToPage = (event) => {
    const { id } = event.target;
    setActiveNav(id);
    navigate(`${id}`);
  };

  return (
    <div className='grid h-[80px]'>
      {/* Nav background */}
      <section
        style={{
          backgroundImage: `url(${SvgBackground})`,
          backgroundSize: '200px',
          backgroundRepeat: '',
        }}
      >
        {/* Main nav content */}
        <div className='grid grid-cols-3 h-full py-2 border-b-4 border-solid border-yellow-500'>
          {/* Logo */}
          <section className='grid grid-flow-col gap-4 items-center justify-start pl-4 2xl:pl-8'>
            <div>
              <Link className='no__highlights' to='/'>
                <img
                  className='no__highlights w-10 h-10 2xl:w-12 2xl:h-12'
                  src={LogoImage}
                  alt='Logo'
                />
              </Link>
            </div>
            <div className=''>
              <span className='text-xl font-semibold text-white'>THE BORED USER</span>
            </div>
          </section>

          <section className='grid items-center justify-center'>
            <div className='grid grid-cols-2 gap-2'>
              <div className='grid w-full'>
                <button
                  id='/write-article'
                  onClick={navigateToPage}
                  className='grid grid-flow-col gap-2 outline outline-1 outline-black rounded-lg py-2 text-center bg-red-200 hover:brightness-95 active:scale-95 px-4'
                >
                  <span className='grid items-center justify-center'>
                    <FaPencilAlt />
                  </span>
                  <span>Write</span>
                </button>
              </div>
              <div className='grid w-full'>
                <button
                  id='/upload-content'
                  onClick={navigateToPage}
                  className='grid grid-flow-col gap-2 outline outline-1 outline-black rounded-lg py-2 text-center bg-blue-200 hover:brightness-95 active:scale-95 px-4'
                >
                  <span className='grid items-center justify-center'>
                    <FaUpload />
                  </span>
                  <span>Upload</span>
                </button>
              </div>
            </div>
          </section>

          {/* Navigation main page*/}
          <section className='hidden lg:grid justify-end'>
            <div className='grid items-center pr-4'>
              <FullscreenLinks
                user={user}
                activeNav={activeNav}
                logoutUser={logoutUser}
              />
            </div>
          </section>

          {/* Phone Nav menu */}
          <nav
            onClick={() => {
              toggleNavbarOpenClosed();
            }}
            className='grid items-center justify-end lg:hidden no__highlights pr-4'
          >
            {/* Burger menu */}
            <span className='cursor-pointer text-black hover:text-hover-grey'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth='1.5'
                stroke='currentColor'
                className='w-10 h-10 transition no__highlights duration-200 ease-in-out select-none focus:scale-125 active:scale-125'
                data-te-animation-init
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5'
                />
              </svg>
            </span>
          </nav>

          {toggleNavigation && (
            <MobileLinks
              user={user}
              activeNav={activeNav}
              logoutUser={logoutUser}
            />
          )}
        </div>
      </section>
    </div>
  );
}

export default Navbar;
