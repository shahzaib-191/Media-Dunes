import React from 'react';

const AuthorBox = ({ singlePost }) => {

    const imgUrl = "http://localhost:1337";

    return (
        <div className="border border-gray-600 p-4 mt-4 rounded-md bg-gray-800 text-black flex items-center gap-3" style={{ display: "flex" }}>
            <div>
                <img
                    src={`${imgUrl}${singlePost?.author_image?.url}`}
                    alt="Author"
                    className="!w-10 !h-10 rounded-full object-cover"
                    style={{ width: '120px', height: '120px' }}
                />
            </div>
            <div>
                <h4 className="text-base font-bold">{singlePost?.author?.name}</h4>
                <p className="text-xs">{singlePost?.author_description}</p>
            </div>
        </div>
    );
}

export default AuthorBox;
