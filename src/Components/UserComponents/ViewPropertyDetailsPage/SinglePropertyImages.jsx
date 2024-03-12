import React from 'react';

function SinglePropertyImages(data) {
  return (
    <div className="grid lg:grid-cols-5 lg:grid-rows-4 sm:grid-cols-1 sm:grid-rows-1 gap-3">
      <div className="lg:col-span-3 lg:row-span-4 sm:col-span-1 sm:row-span-1 overflow-x-auto">
        <div>
          <img
            className="object-cover lg:h-[500px] w-full rounded-md"
            src={data.images[0]}
            alt=""
          />
        </div>
      </div>
      <div className="lg:col-span-2 lg:row-span-2 lg:col-start-4 hidden lg:block col-span-2 row-span-2" style={{ whiteSpace: 'nowrap' }}>
        <div>
          <img
            className="object-cover lg:h-[248px] w-full rounded-md"
            src={data.images[1]}
            alt=""
          />
        </div>
      </div>
      <div className="lg:col-span-2 lg:row-span-2 lg:col-start-4 hidden lg:block col-span-2 row-span-2 overflow-x-auto" style={{ whiteSpace: 'nowrap' }}>
        <div>
          <img
            className="object-cover lg:h-[242px] w-full rounded-md"
            src={data.images[2]}
            alt=""
          />
        </div>
      </div>
    </div>
  );
}

export default SinglePropertyImages;
