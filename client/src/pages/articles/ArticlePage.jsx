import React, { useState } from 'react';
// Components
import Navbar from '../../components/nav/Navbar';
// Data
import { tempMemeArticlesArray } from '../../data/TemporaryData';
import ArticleItemContainer from '../../components/articles/ArticleItemContainer';

function ArticlePage() {
  const [article, setArticle] = useState(tempMemeArticlesArray[1]);

  console.log('article', article);
  return (
    <div className='grid font-poppins min-h-screen h-full w-full'>
      <div className='grid grid-rows-reg h-full w-full'>
        {/* Navigation */}
        <Navbar />

        {/* Main */}
        <main className='grid h-full w-full'>
          <section className='bg-gray-50 grid grid-rows-reg h-ful w-2/3 mx-auto'>
            {/* Article Header */}
            <div>
              <header className='grid grid-cols-2 px-2 bg-slate-300 py-1 border-b-2 border-solid border-yellow-500'>
                <span>Writen by: {article.author}</span>
                <span className='grid justify-items-end'>20/8/2023</span>
              </header>
            </div>

            <div className='px-4 pt-4 h-fit mb-20'>
              <section className='grid h-full'>
                {article.articleItems.map((articleItem, index) => {
                  return (
                    <ArticleItemContainer key={index} articleItem={articleItem} />
                  )
                })}
              </section>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

export default ArticlePage;
