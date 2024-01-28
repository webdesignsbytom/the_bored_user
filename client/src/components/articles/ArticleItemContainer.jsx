import React from 'react';
import ArticleImageContainer from './ArticleImageContainer';

function ArticleItemContainer({ articleItem }) {
  return (
    <article className='grid grid-rows-reg w-full h-full'>
      <section className='grid outline outline-2 outline-black bg-white rounded-xl p-4 h-fit'>
        <div className='mb-2'>
          <h4 className='text-xl font-semibold'>
            <span>{articleItem.articleTitle}</span>
          </h4>
        </div>
        <div>
          <p>{articleItem.articleContent}</p>
        </div>
        <div>
          <p>{articleItem.articleTags}</p>
        </div>
      </section>

      {/* Article images */}
      <section className='grid w-full h-full mt-6'>
        <div className='grid gap-y-4 w-full h-full '>
          {articleItem.articleImages.map((image, index) => {
            return <ArticleImageContainer key={index} image={image} />;
          })}
        </div>
      </section>
    </article>
  );
}

export default ArticleItemContainer;
