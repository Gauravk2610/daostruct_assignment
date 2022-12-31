import React from "react";

const SpotLight = ({ data }) => {
  return (
    <div className="py-6 flex gap-4 flex-col px-6 xl:flex-row justify-between">
      <div className="flex flex-col max-w-lg w-full space-y-4">
        <div className="text-4xl font-semibold">{data?.title}</div>
        <p className="text-xl">{data?.explanation?.substring(0, 400)}...</p>
        {/* Author */}
        <div className=" text-lg text-gray-300">
            Author: {data?.copyright || "No Author"}
        </div>
      </div>
      <div className="xl:w-1/2">
        {data?.media_type === "video" ? (
          <iframe
            className="w-full h-96"
            src={data?.url}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        ) : (
          <img className="w-full h-96 object-contain" src={data?.url} alt="" />
        )}
      </div>
    </div>
  );
};

export default SpotLight;
