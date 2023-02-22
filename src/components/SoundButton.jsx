import React, { useState, useEffect } from "react";
import styles from '../css/SoundButton.module.scss'; 

const SoundButton = ({ category, playing, setPlaying, audio, setAudio, categoryPlaying, setCategoryPlaying, alreadyPlayed, setAlreadyPlayed }) => {
  const [audioFiles, setAudioFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);



  useEffect(() => {
    const fetchAudioFiles = async () => {
      function importAll(r) {
        let tracks = [];
         r.keys().forEach((item, index) => { tracks.push({id: index, name: item.replace('./', ''), src: r(item)})});
        return tracks
       }
      const files = importAll(require.context("../tracks/", true, /\.(mp3|flac|aac)$/));
      setAudioFiles(files);
    };

    fetchAudioFiles();
  }, []);

  const startAudio = () => {
    if (playing) {
      audio.pause();
      setPlaying(false);
    };
    const filteredByCategory = audioFiles.filter(track => track.name.split('/')[0] == categoryName(category.name));
    if (filteredByCategory.length >= 1) {
      let notPlayed = filteredByCategory.filter(i => !alreadyPlayed.includes(i));

      const randomIndex = Math.floor(Math.random() * notPlayed.length);
      const selectedFile = notPlayed[randomIndex];
      if (notPlayed.length == 1) {
        alreadyPlayed = [];
      }
      alreadyPlayed.push(selectedFile);
      setAlreadyPlayed(alreadyPlayed);
      setSelectedFile(selectedFile);
      const currentAudio = new Audio(notPlayed[randomIndex].src);
      setAudio(currentAudio);
      currentAudio.play();
      setPlaying(true);
      setCategoryPlaying(selectedFile.name.split('/')[0]);

      waitForTheEnd(currentAudio);
      
    } else {
      window.alert("No tracks in this category.");
    }
  };

  //play next song if finished
  async function waitForTheEnd(audio){
    while (true){
          if (audio.ended) { startAudio(); return };
          await new Promise(resolve => setTimeout(resolve, 10));
    }
  }

  const songName = (name) => {
    name = name.split('/')[1]
    return (
    <div className={styles.label}>
      <div className={styles.icon}>
        <span />
        <span />
        <span />
        <span />
        <span />
      </div>
      <div className="font-face-bf">
        <div>{name.split('.')[0].split(' - ')[0]}</div>
        <div>-</div>
        <div>{name.split('.')[0].split(' - ')[1]}</div>
      </div>
    </div>)
  };

  const categoryName = (name) => {
    return name.split('_')[1].split('.')[0]
  };

  return (
    
    <div onClick={startAudio} className={styles.category}>
      { (categoryName(category.name) == categoryPlaying) ? 
      <img src={category.src} alt={categoryName(category.name)} className={styles.image} style={{ filter: "brightness(30%)"  }} /> :
      <img src={category.src} alt={categoryName(category.name)} className={styles.image} />
      }
      {(categoryName(category.name) == categoryPlaying) && (
        <div>{songName(selectedFile.name)}</div>
      )}

    </div>
  );
};

export default SoundButton;
