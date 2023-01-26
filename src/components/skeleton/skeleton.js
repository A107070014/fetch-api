import React from "react";
import { useState, useEffect, useRef } from "react";
import styles from "./skeleton.module.scss";
import SkeletonNpm from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function Skeleton() {
  const [number, setNumber] = useState([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  return (
    <div className={styles.block}>
      <div className={styles.block_row}>
        {number.map((item, index) => (
          <div key={item} className={styles.block_col}>
            <SkeletonNpm count={1} height={200} width={250} circle={false} />
            <SkeletonNpm count={1} height={22} width={50} circle={false} />
            <SkeletonNpm count={1} height={22} width={90} circle={false} />
            <SkeletonNpm count={1} height={22} width={120} circle={false} />
            <SkeletonNpm count={1} height={22} width={150} circle={false} />
            <SkeletonNpm count={1} height={22} width={180} circle={false} />
            <SkeletonNpm count={1} height={22} width={210} circle={false} />
            <SkeletonNpm count={1} height={22} width={250} circle={false} />
          </div>
        ))}
      </div>
    </div>
  );
}
