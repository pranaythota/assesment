import React,{ useState, useEffect } from 'react';
import MD5 from 'js-md5';
import axios from 'axios';
import Comics from './components/Comics';
import './App.css';
import Header from './components/header';
import PaginationComponent from './components/Pagination';
import { getTruncatedArray } from './utils';


const App = () => {
  const [comics, setComics] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState();
  const [visibleComics, setVisibleComics] = useState();

  useEffect(() => {
    const fetchComics = async () => {
      setLoading(true);
      const ts = new Date().getTime();
      var hash = MD5(`${ts}8608426313cb0baf568d45ac39a468adf838c2b47bd095bd7e7f83447447f5ab569fa17e`);
      const res = await axios.get(`http://gateway.marvel.com/v1/public/comics?limit=40&&ts=${ts}&&apikey=7bd095bd7e7f83447447f5ab569fa17e&&hash=${hash}`);
      setComics(res.data.data.results);
      setLoading(false); 
      setTotalPages(Math.floor(res.data.data.results.length / 9) + 1);
      setVisibleComics(getTruncatedArray(res.data.data.results, 0, 9));
    }
    fetchComics();
  },[]);

  const fetchNextPage = (pageID) => {
    let page = pageID === 1 ? 0: (pageID-1)*9;
    setVisibleComics(getTruncatedArray(comics, page, 9));
    setCurrentPage(pageID);
  }

  return (
    <React.Fragment>
      <Header />
      <PaginationComponent totalPages={totalPages} currentPage={currentPage} fetchNextPage={fetchNextPage} />
      <Comics loading={loading} comics={visibleComics} />
    </React.Fragment>
  );
}

export default App;
