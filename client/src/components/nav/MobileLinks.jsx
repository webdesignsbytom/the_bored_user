import React from 'react';
import { Link } from 'react-router-dom';

function MobileLinks({ user, activeNav }) {
  return (
    <nav className='absolute lg:hidden w-full left-0 top-24 py-2 px-4'>
      <div className='bg-black nav__bg p-2 rounded'>
        <ul className='text-center grid bg-black h-fit w-full text-xl'>
          <li
            className={
              activeNav === '/'
                ? 'w-full no__highlights nav__bg hover:bg-green-500 active:scale-95 grid py-2 outline-2 outline outline-black bg-yellow-700 text-gray-800 font-semibold'
                : 'w-full no__highlights nav__bg hover:bg-blue-500 active:scale-95 grid py-2 outline-2 outline outline-black bg-yellow-500 text-gray-800 font-semibold'
            }
          >
            <Link className='w-full' to='/'>
              Home
            </Link>
          </li>
          <li
            className={
              activeNav === '/latest'
                ? 'w-full no__highlights nav__bg hover:bg-green-500 active:scale-95 grid py-2 outline-2 outline outline-black bg-yellow-700 text-gray-800 font-semibold'
                : 'w-full no__highlights nav__bg hover:bg-blue-500 active:scale-95 grid py-2 outline-2 outline outline-black bg-yellow-500 text-gray-800 font-semibold'
            }
          >
            <Link className='w-full' to='/latest'>
              Latest
            </Link>
          </li>
          <li
            className={
              activeNav === '/categories'
                ? 'w-full no__highlights nav__bg hover:bg-green-500 active:scale-95 grid py-2 outline-2 outline outline-black bg-yellow-700 text-gray-800 font-semibold'
                : 'w-full no__highlights nav__bg hover:bg-blue-500 active:scale-95 grid py-2 outline-2 outline outline-black bg-yellow-500 text-gray-800 font-semibold'
            }
          >
            <Link className='w-full' to='/categories'>
              Categories
            </Link>
          </li>
          <li
            className={
              activeNav === '/memes'
                ? 'w-full no__highlights nav__bg hover:bg-green-500 active:scale-95 grid py-2 outline-2 outline outline-black bg-yellow-700 text-gray-800 font-semibold'
                : 'w-full no__highlights nav__bg hover:bg-blue-500 active:scale-95 grid py-2 outline-2 outline outline-black bg-yellow-500 text-gray-800 font-semibold'
            }
          >
            <Link className='w-full' to='/memes'>
              Memes
            </Link>
          </li>
          {!user.email && (
            <>
              <li
                className={
                  activeNav === '/login'
                    ? 'w-full no__highlights nav__bg hover:bg-green-500 active:scale-95 grid py-2 outline-2 outline outline-black bg-yellow-700 text-gray-800 font-semibold'
                    : 'w-full no__highlights nav__bg hover:bg-blue-500 active:scale-95 grid py-2 outline-2 outline outline-black bg-yellow-500 text-gray-800 font-semibold'
                }
              >
                <Link className='w-full' to='/Login'>
                  Login
                </Link>
              </li>
              <li
                className={
                  activeNav === '/sign-up'
                    ? 'w-full no__highlights nav__bg hover:bg-green-500 active:scale-95 grid py-2 outline-2 outline outline-black bg-yellow-700 text-gray-800 font-semibold'
                    : 'w-full no__highlights nav__bg hover:bg-blue-500 active:scale-95 grid py-2 outline-2 outline outline-black bg-yellow-500 text-gray-800 font-semibold'
                }
              >
                <Link className='w-full' to='/sign-up'>
                  Sign Up
                </Link>
              </li>
            </>
          )}
          {(user.role === 'ADMIN' || user.role === 'DEVELOPER') && (
            <li
              className={
                activeNav === '/admin'
                  ? 'w-full no__highlights nav__bg hover:bg-green-500 active:scale-95 grid py-2 outline-2 outline outline-black bg-yellow-700 text-gray-800 font-semibold'
                  : 'w-full no__highlights nav__bg hover:bg-blue-500 active:scale-95 grid py-2 outline-2 outline outline-black bg-yellow-500 text-gray-800 font-semibold'
              }
            >
              <Link className='w-full' to='/admin'>
                Admin
              </Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default MobileLinks;
