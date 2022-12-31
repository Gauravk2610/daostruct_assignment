import axios from "axios";
import React, { useCallback, useEffect, useRef, useState } from "react";
import Header from "../components/Header";
import SpotLight from "../components/SpotLight";

// - The section below spotlight will show the previous 7 items as per the design above
// - Each item will show a title, author, and date
// - Horizontal scroller with 7 items
// - Clicking an item should open a new overlay that shows the selected item like
// the spotlight section

// - The next section will be same as the previous one, with 7 older items. You will be
// using the `start_date` and `end_date` parameters in your API requests to fetch paged
// results for these section
// - The web-app will scroll infinitely, and make successive requests requests as the user
// scrolls

const Home = () => {
  const [spotlight, setSpotlight] = useState({});
  const [previous, setPrevious] = useState([]);
    const [loading, setLoading] = useState(true);
  const [isFetching, setIsFetching] = useState(false);

  // set todays date in end date
  const [endDate, setEndDate] = useState(new Date().toISOString().slice(0, 10));
  const [startDate, setStartDate] = useState(
    new Date().toISOString().slice(0, 10)
  );

  const getAPOD = async () => {
    const response = await axios.get(
      "https://api.nasa.gov/planetary/apod?api_key=gaff4Pwpu0Qg6woyFty1YhVRxhj4In1ImvOCyFD7"
    );
    setSpotlight(response.data);
  };

  const getPreviousAPOD = async () => {
    // subtract 7 days to start date
    setLoading(true);
    var start_date = new Date(startDate) - 7 * 24 * 60 * 60 * 1000;
    start_date = new Date(start_date).toISOString().slice(0, 10);

    console.log(start_date, "datat");

    const response = await axios.get(
      `https://api.nasa.gov/planetary/apod?api_key=gaff4Pwpu0Qg6woyFty1YhVRxhj4In1ImvOCyFD7&start_date=${start_date}&end_date=${endDate}`
    );
    var end_date = new Date(endDate) - 7 * 24 * 60 * 60 * 1000;
    end_date = new Date(end_date).toISOString().slice(0, 10);
    console.log(response.data, "enddatat");

    console.log([...response.data], "response", previous);
      
    console.log(previous.includes([...response.data]))

    setPrevious((prev) => [...prev, [...response.data]]);

    setStartDate(start_date);
    setEndDate(end_date);
    setIsFetching(false);
    setLoading(false);
  };

  console.log(previous, "previous");

  useEffect(() => {
    getAPOD();
    // check if the scroll reaches the end of the page
    document.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // if it does, make a new request to fetch the next 7 items
  const handleScroll = useCallback(() => {
    if (
      window.innerHeight + document.documentElement.scrollTop < document.documentElement.offsetHeight - 5 || 
      window.innerHeight + document.documentElement.scrollTop > document.documentElement.offsetHeight + 5 ||
      window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight
    ) {
        setIsFetching(true);
    }
  }, []);


  useEffect(() => {
    if (!isFetching) return;
    getPreviousAPOD();
  }, [isFetching]);
  
  const HorizontalScroll = ({ data }) => {
    const scrollRef = useRef(null);
  
    const leftClick = () => {
      if (scrollRef.current.scrollLeft <= 0) return;
      scrollRef.current.scrollLeft -= 300;
    };
  
    const rightClick = () => {
      if (scrollRef.current.scrollLeft >= scrollRef.current.scrollWidth) return;
      scrollRef.current.scrollLeft += 300;
    };
  
    return (
      <div className="flex relative select-none">
        {/* left Icon for scroll */}
        <div
          onClick={leftClick}
          className="w-8 h-8 bg-gray-300 rounded-full cursor-pointer flex items-center justify-center absolute -left-10 z-10 top-1/2 transform -translate-y-1/2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-gray-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          {/* right Icon for scroll */}
        </div>
        <div
          ref={scrollRef}
          //   for small screen only 1 image will be visible
          className="relative gap-x-10 flex overflow-x-scroll scroll-smooth backdrop-blur-md shadow-lg py-2"
        >
          {data.map((item, index) =>
            item?.media_type === "video" ? (
              <iframe
                key={index}
                className="w-full h-[350px]"
                src={item?.url}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            ) : (
              <div className="w-[500px] h-[350px] relative">
                  <img
                  key={index}
                  className="max-w-[500px] w-[70vw] sm:w-auto h-[350px] object-contain sm:object-none"
                  src={item?.url}
                  alt=""
                  />
              </div>
            )
          )}
        </div>
        <div
          onClick={rightClick}
          className="w-8 h-8 bg-gray-300 rounded-full cursor-pointer flex items-center justify-center absolute -right-10 z-10 top-1/2 transform -translate-y-1/2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-gray-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </div>
      </div>
    );
  };
  return (
    <div>
      <Header />
      <div className="max-w-7xl w-full mx-auto py-6">
        <SpotLight data={spotlight} />
        <div className="slr space-y-8 px-12 min-h-screen mb-10">
          {previous.map((item, index) => (
            <HorizontalScroll key={index} data={item} />
            ))}
            {
              loading && (
              <div className="flex relative select-none">
                <div className="slr relative gap-x-10 flex overflow-x-scroll scroll-smooth backdrop-blur-md shadow-lg py-2">
                  {
                    [...Array(7)].map((item, index) => (
                      // skeleton loader
                      <div key={index} className="w-[500px] h-[300px] relative">
                        <div className="w-[350px] h-full bg-gray-400 animate-pulse"></div>
                      </div>
  
                    ))
                  }
                </div>
              </div>
              )
            }
        </div>
      </div>
    </div>
  );
};


export default Home;
