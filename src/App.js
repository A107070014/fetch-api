import { useState, useEffect } from "react";
import axios from "axios";
import styles from './App.module.scss';

function App() {
  const [allData, setAllData] = useState([]);
  const [data, setData] = useState([]);
  const [number, setNumber] = useState(10);
  useEffect(() => {
    const _fetchData = async () => {
      const resAllData = await axios
        .get('https://data.coa.gov.tw/Service/OpenData/TransService.aspx?UnitId=QcbUEzN6E6DL')
        .then((res) => {
          if (res.status === 200) return res.data
        })
        .catch((res) => {
          console.log(res);
        })
      setAllData(resAllData);
    }
    _fetchData();
  }, [])

  console.log(allData);

  // 跟上面的useEffect同時執行，第一次allData為[]
  useEffect(() => {
    function _loadingNewData() {
      console.log("_loadingNewData()");
      const newLoadingData = allData.filter((item, index) => {
        return index < number
      })
      setData(newLoadingData);
    }
    _loadingNewData();
  }, [number])
  
  

  return (
    <div className={styles.block}>
      <div onClick={()=> setNumber(preNumber => preNumber + 10)}>click</div>
      {data.map((item, index) =>
        <div>
          <img src={item.album_file} key={index} alt="動物圖片" />
          <div>{index} {item.animal_Variety}</div>
        </div>
      )}
    </div>
  );
}

export default App;
