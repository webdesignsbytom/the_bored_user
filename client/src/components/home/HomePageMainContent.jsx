import React from 'react';

function HomePageMainContent({ allArticles, articleImagesEndPoint }) {
  return (
    <div className='grid h-full w-full'>
      <div>
        {allArticles.map((article, index) => {
          return (
            <article key={index}>
              <div>
                <h6>{article.articleTitle}</h6>
              </div>
              <div>
                <span>{article.articleAuthor}</span>
              </div>
              <div>
                {article.articleTags.map((tag, index) => {
                    return (
                        <span key={index}>{tag}</span>
                    )
                })}
              </div>
              <div>
                <img src={articleImagesEndPoint + article.articleHeaderImages[0].imageUrl} alt="" />
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}

export default HomePageMainContent;
