import React from 'react';

function HomePageHeader() {
  return (
    <header className='grid bg-purple-500 border-b-4 border-solid border-yellow-500'>
      <article className='py-2 grid grid-cols-2 px-4'>
        <div>
          <h1>
            <span>
              Welcome to <strong>The Bored User</strong>
            </span>
          </h1>
        </div>
        <div className='grid justify-items-end '>
          <h2 className='grid grid-flow-col gap-4'>
            <span>Memes</span>
            <span>Articles</span>
            <span>News</span>
            <span>Funny</span>
            <span>Content</span>
          </h2>
        </div>
      </article>
    </header>
  );
}

export default HomePageHeader;
