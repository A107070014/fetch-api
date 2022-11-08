import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import styles from './App.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';



function App() {
  const [allData, setAllData] = useState([]);
  const [data, setData] = useState([]);
  const [number, setNumber] = useState(10);
  const [loading, setLoading] = useState(true);

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
      setLoading(false);
    }
    _fetchData();
  }, [])

  console.log(allData);

  useEffect(() => {
    function _loadingNewData() {
      console.log("_loadingNewData()");
      const newLoadingData = allData.filter((item, index) => {
        return index < number
      })
      setData(newLoadingData);
    }
    _loadingNewData();
  }, [number, loading]) // 跟上面的useEffect會同時執行，因此第一次allData為[]，需在dependencies加上loading，再執行一次此useEffect



  return (
    <div className={styles.block}>
      {loading && <div className={styles.block_row}>loading</div>}
      <div className={styles.block_row}>
        {data.map((item, index) =>
          <div className={styles.block_col}>
            {item.album_file ?
              <img className={styles.block_img} src={item.album_file} key={index} alt="動物圖片" /> : 
              <FontAwesomeIcon 
                className={styles.block_img} 
                icon={
                  item.animal_kind == '狗' ? ['fas', 'dog'] : 
                  item.animal_kind == '貓' ? ['fas', 'cat'] : ['fas', 'paw-simple']
                } 
              /> 
            }
            <div className={styles.block_animal}>
              <div>序號：{index + 1}</div>
              <div>品種：{item.animal_Variety}</div>
              <div>類別：{item.animal_kind}</div>
              <div>性別：{item.animal_sex === 'M' ? '男' : '女'}</div>
              <div>收容所：{item.shelter_name}</div>
              <div>發現地點：{item.animal_foundplace}</div>
              <div>建立時間：{item.animal_createtime}</div>
            </div>
          </div>
        )}
      </div>
      <div className={styles.block_row} onClick={() => setNumber(preNumber => preNumber + 10)}>click</div>
    </div>
  );
}

export default App;
