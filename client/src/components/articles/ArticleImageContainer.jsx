import React from 'react';

function ArticleImageContainer({ image }) {
  return (
    <section className='grid grid-cols-2 shadow-2xl rounded-2xl bg-slate-200'>
      <div className='max-h-[400px] overflow-hidden'>
        {/* Image */}
        <section className='grid w-full h-full object-cover py-2'>
          <img
            src={image.imageUrl}
            alt={image.imageTitle}
            className='w-full h-full object-contain'
          />
        </section>
      </div>
      {/* Comments */}
      <section className='grid  p-4'>
        <div className='outline outline-black outline-1 rounded-lg grid grid-rows-rev overflow-hidden'>
          <div className='grid h-full w-full'>a</div>
          <div className='grid h-full w-full bg-red-500 border-t-2 border-black border-solid'>
            <div className='grid grid-cols-rev h-full w-full'>
              <div className='p-1'>
                <textarea
                  name='comment'
                  id='comment'
                  className='w-full outline outline-1 outline-yellow-500 rounded overflow-hidden overflow-y-scroll'
                ></textarea>
              </div>
              <div className='grid w-full p-1'>
                <button className='outline outline-1 outline-yellow-500 bg-white hover:brightness-95 active:scale-95 rounded-lg px-2'>
                  <span className='text-xs font-semibold'>Comment</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
}

export default ArticleImageContainer;
