import React from 'react';
import { Link } from 'react-router-dom';

function FullscreenLinks({ user, activeNav, logoutUser }) {
  return (
    <ul className='grid grid-flow-col w-fit justify-end gap-4 font-semibold text-yellow-500'>
      {/* General */}
      <li
        className={
          activeNav === '/'
            ? 'text-white hover:text-gray-700 active:scale-95'
            : 'hover:text-gray-700 active:scale-95'
        }
      >
        <Link className='w-full' to='/'>
          <span>Home</span>
        </Link>
      </li>
      <li
        className={
          activeNav === '/latest'
            ? 'text-white hover:text-gray-700 active:scale-95'
            : 'hover:text-gray-700 active:scale-95'
        }
      >
        <Link className='w-full' to='/latest'>
          <span>Latest</span>
        </Link>
      </li>
      <li
        className={
          activeNav === '/categories'
            ? 'text-white hover:text-gray-700 active:scale-95'
            : 'hover:text-gray-700 active:scale-95'
        }
      >
        <Link className='w-full' to='/categories'>
          <span>Categories</span>
        </Link>
      </li>
      <li
        className={
          activeNav === '/memes'
            ? 'text-white hover:text-gray-700 active:scale-95'
            : 'hover:text-gray-700 active:scale-95'
        }
      >
        <Link className='w-full' to='/memes'>
          <span>Memes</span>
        </Link>
      </li>

      {/* User links */}
      {!user.email && (
        <>
          <li
            className={
              activeNav === '/login'
                ? 'text-white hover:text-gray-700 active:scale-95'
                : 'hover:text-gray-700 active:scale-95'
            }
          >
            <Link className='w-full' to='/Login'>
              <span>Login</span>
            </Link>
          </li>
          <li
            className={
              activeNav === '/sign-up'
                ? 'text-white hover:text-gray-700 active:scale-95'
                : 'hover:text-gray-700 active:scale-95'
            }
          >
            <Link className='w-full' to='/sign-up'>
              <span>Sign Up</span>
            </Link>
          </li>
        </>
      )}

      {/* Admin */}
      {(user.role === 'ADMIN' || user.role === 'DEVELOPER') && (
        <li
          className={
            activeNav === '/admin'
              ? 'text-white hover:text-gray-700 active:scale-95'
              : 'hover:text-gray-700 active:scale-95'
          }
        >
          <Link className='w-full' to='/admin'>
            <span>Admin</span>
          </Link>
        </li>
      )}

      {/* Developer */}
      {user.role === 'DEVELOPER' && (
        <li
          className={
            activeNav === '/developer'
              ? 'text-white hover:text-gray-700 active:scale-95'
              : 'hover:text-gray-700 active:scale-95'
          }
        >
          <Link className='w-full' to='/developer'>
            <span>Dev</span>
          </Link>
        </li>
      )}
      {user.email && (
        <button className='' onClick={logoutUser}>
          Logout
        </button>
      )}
    </ul>
  );
}

export default FullscreenLinks;
