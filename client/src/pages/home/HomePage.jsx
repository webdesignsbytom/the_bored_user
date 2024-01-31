import React, { useContext, useEffect, useState } from 'react';
// Components
import Navbar from '../../components/nav/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import HomePageHeader from '../../components/home/HomePageHeader';
import HomePageMainContent from '../../components/home/HomePageMainContent';
// Context
import { ToggleContext } from '../../context/ToggleContext';
// Api
import client from '../../api/client';

function HomePage() {
  const { setActiveNav } = useContext(ToggleContext);

  const [allArticles, setAllArticles] = useState([]);
  const [articleImagesEndPoint, setArticleImagesEndPoint] = useState('');
  console.log('allArticles', allArticles);
  console.log('articleImagesEndPoint', articleImagesEndPoint);

  let navigate = useNavigate();

  useEffect(() => {
    setActiveNav('/');
  }, []);

  useEffect(() => {
    console.log('AAAAAAAAAAAAAAAAAAAAAAAAAAa');
    client
      .get(`/articles/get-latest-articles`)
      .then((res) => {
        console.log(res.data.data.articles);
        setAllArticles(res.data.data.articles);
        setArticleImagesEndPoint(res.data.data.imageEndPoint);
      })
      .catch((err) => {
        console.error('Unable to retrieve user data', err);
      });
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
        <main className='grid h-full w-full bg-pink-200 overflow-hidden'>
          <div className='grid grid-rows-reg w-full h-full overflow-hidden'>
            {/* Main page header */}
            <HomePageHeader />

            <div className='bg-white grid w-full h-full overflow-y-scroll'>
              <section className='bg-red-300 grid grid-rows-reg h-ful xl:w-2/3 mx-auto'>
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
                    <section className='bg-green-300'>
                      <HomePageMainContent
                        allArticles={allArticles}
                        articleImagesEndPoint={articleImagesEndPoint}
                      />
                    </section>
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
