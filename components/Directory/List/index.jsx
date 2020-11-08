import React, { Component } from 'react';
import { connect, useSelector } from 'react-redux';
import { RingLoader } from 'react-spinners';
import styles from './index.module.css'
import ImageItem from "../../ImageItem";
import dynamic from 'next/dynamic';
const MusicItem = dynamic(() => import("../../MusicItem"), {
  ssr: false,
  loading: () =>         <RingLoader size={50} />
  ,
});

export default function(props){

    return (
         <div className={styles.parentDir}>
        {props.posts ?
            <div className={styles.directoryList}>
              {props.posts.map((item, index) => {
                switch (item.types) {
                  case "image":
                    return (
                      <ImageItem
                        key={index}
                        item={item}
                        isActive={true}
                        name={true}
                        col="col-md-2 col-4"
                      />
                    );
                  case "music":
                    return (
                      <MusicItem
                        key={index}
                        item={item}
                        isActive={true}
                        name={true}
                        col="col-md-2 col-4"
                      />
                    );
    
                  default:
                    return null;
                }
              })}
            </div> : <RingLoader size={200} color="#4A90E2" />}
          </div>
    );
  }
