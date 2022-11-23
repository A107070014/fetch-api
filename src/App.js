import React from "react";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import styles from './App.module.scss';
import { FaDog, FaCat, FaImage } from 'react-icons/fa';

function App() {
  const [allData, setAllData] = useState([]);
  const [data, setData] = useState([]);
  const [number, setNumber] = useState(10);
  const [loading, setLoading] = useState(true);
  const targetRef = useRef(null);

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

  useEffect(() => {
    // const options = {
    //   threshold: 1, //設定目標元素的可見度達到多少比例時，觸發 callback 函式
    // }
    const callback = (entries, observer) => {
      // entries 能拿到所有目標元素進出(intersect)變化的資訊
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          //  只在目標元素進入 viewport 時執行這裡的工作
          setNumber(preNumber => preNumber + 10);
        }
      })
    }

    const observer = new IntersectionObserver(callback, { threshold: 1 });

    // 設定觀察對象：告訴 observer 要觀察哪個目標元素
    if (targetRef.current) observer.observe(targetRef.current);

    //很重要!!!不會re-render
    return () => {
      observer.disconnect(targetRef.current); // *** Use the same element
    }
  }, [targetRef.current])
  console.log(number);

  return (
    <div className={styles.block}>
      {loading && <div className={styles.block_row}>loading</div>}
      <div className={styles.block_row}>
        {data.map((item, index) =>
          <div className={styles.block_col}>
            {item.album_file ?
              <img className={styles.block_img} src={item.album_file} key={index} alt="動物圖片" /> :
              item.animal_kind === '狗' ? <FaDog className={styles.block_img} /> :
                item.animal_kind === '貓' ? <FaCat className={styles.block_img} /> : <FaImage className={styles.block_img} />
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
        {!loading && <div ref={targetRef}></div>}
      </div>
    </div>
  );
}

export default App;
