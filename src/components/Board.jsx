import React, { useState, useEffect } from "react";
import SoundButton from "./SoundButton";
import styles from '../css/Board.module.scss'; 

const Board = () => {
  const [imageFiles, setImageFiles] = useState([]);
  const [playing, setPlaying] = useState(false);
  const [audio, setAudio] = useState(null);
  const [categoryPlaying, setCategoryPlaying] = useState(null);
  const [alreadyPlayed, setAlreadyPlayed] = useState([]);

  useEffect(() => {
    const fetchImageFiles = async () => {
      function importAll(r) {
        let images = [];
         r.keys().forEach((item, index) => { images.push({id: index, name: item.replace('./', ''), src: r(item)})});
        return images
       }
      const files = importAll(require.context('../img', false, /\.(png|jp?g)$/));
      setImageFiles(files);
    };

    fetchImageFiles();
  }, []);

  return (
    <div className={styles.box}>
      {imageFiles.map((category) => {
        let props = {
          category: category,
          playing: playing,
          setPlaying: setPlaying,
          audio: audio,
          setAudio: setAudio,
          categoryPlaying: categoryPlaying,
          setCategoryPlaying: setCategoryPlaying,
          alreadyPlayed: alreadyPlayed,
          setAlreadyPlayed: setAlreadyPlayed,
        }
        return (
          <div
            key={category.id}
            className={styles.cell}
          >
            <SoundButton {...props}
            />
          </div>
        )
      })}
    </div>
  );
};

export default Board;
