import React, { useEffect, useState } from 'react';

function HomePageMainContent({ allArticles, articleImagesEndPoint }) {
  const [article, setArticle] = useState([]);
  console.log('article', article);

  useEffect(() => {
    setArticle(allArticles[0]);
  }, []);

  return (
    <div className='grid h-full w-full'>
      <div>Article</div>
      <div>

      </div>
    </div>
  );
}

export default HomePageMainContent;
