import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/bundle';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination, Mousewheel, Keyboard } from 'swiper';

import Navbar from '../../components/Navbar/Navbar';
import { RecentShows, RecentVideos, Section, SlideShow, TheatreTiles, VideoTiles } from './Home.styles';
import ShowTile from '../../components/HomeComp/ShowTitle/ShowTile';
import axios from 'axios';
import VideoTile from '../../components/HomeComp/VideoTile/VideoTile';
import { apiUrl } from '../../Utils/GlobalConstants';

const Home = () => {
  const [upcomingShows, setupcomingShows] = useState([]);
  const [recentVideos, setRecentVideos] = useState([]);

  useEffect(() => {
    async function fetchUpcomingShows () {
      const {data} = await axios.get(`${apiUrl}/api/shows/upcoming`)
      setupcomingShows(data.data)
    }

    async function fetchVideos () {
      const {data} = await axios.get(`${apiUrl}/api/videos`)
      setRecentVideos(data.data)
    }

    fetchUpcomingShows();
    fetchVideos();
  }, [])
  
  return (
    <>
      <Navbar/>
      <Section>
        <RecentShows>
          <h1 className='heading'>Upcoming Theatre Shows</h1>
          <TheatreTiles>
            {
              upcomingShows.map((show,index) => {
                return (
                  <ShowTile key={index} id={show._id} img={show.photo} title={show.name} venue={show.location} description={show.description} price={show.price} date={show.date}/>
                )
              })
            }
          </TheatreTiles>
        </RecentShows>
        <RecentVideos>
          <h1 className='heading'>Recent Videos</h1>
          <VideoTiles>
            {
              recentVideos.map((video,index) => {
                return (
                  <VideoTile key={index} id={video._id} img={video.thumbnail} title={video.name} price={video.price} description={video.description} />
                )
              })
            }
          </VideoTiles>
        </RecentVideos>
      </Section>
    </>
  );
};

export default Home;
