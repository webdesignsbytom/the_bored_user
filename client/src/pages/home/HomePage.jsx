import React, { useContext, useEffect } from 'react';
// Components
import Navbar from '../../components/nav/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import { ToggleContext } from '../../context/ToggleContext';
import HomePageHeader from '../../components/home/HomePageHeader';

function HomePage() {
  const { setActiveNav } = useContext(ToggleContext);

  let navigate = useNavigate();

  useEffect(() => {
    setActiveNav('/');
  }, []);

  const navigateToPage = (event) => {
    const { id } = event.target;
    setActiveNav(id);
    navigate(`${id}`);
  };

  return (
    <div className='grid font-poppins h-screen overflow-hidden w-full'>
      <div className='grid grid-rows-reg h-full w-full overflow-hidden'>
        {/* Navigation */}
        <Navbar />

        {/* Main */}
        <main className='grid h-full w-full bg-pink-200'>
          <div className='grid grid-rows-reg w-full h-full overflow-y-scroll'>
            {/* Main page header */}
            <HomePageHeader />

            <div className='bg-white grid w-full h-full'>
              <section className='bg-red-300 grid grid-rows-reg h-ful w-2/3 mx-auto'>
                {/* Titles */}
                <section className='grid bg-blue-400 h-fit text-center'>
                  <div className='grid'>
                    <h3>
                      <span>
                        <strong>The Bored User</strong>
                      </span>{' '}
                      is there for everyone when they need a little pick me up!
                    </h3>
                    <h4>
                      Choose from years worth of funny memes, daft work stories
                      and mad bosses & brides.
                    </h4>
                  </div>
                </section>

                {/* Main */}
                <section className='grid bg-orange-300 mt-4'>
                  <div className='grid grid-cols-2 gap-4'>
                    <section className='bg-green-300'>latest</section>
                    <section className='bg-purple-300'>Funny</section>
                  </div>
                </section>
              </section>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default HomePage;
