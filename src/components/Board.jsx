import React, { useState, useEffect } from "react";
import SoundButton from "./SoundButton";

const Board = () => {
  const [imageFiles, setImageFiles] = useState([]);
  const [playing, setPlaying] = useState(false);
  const [audio, setAudio] = useState(null);
  const [categoryPlaying, setCategoryPlaying] = useState(null);

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
    <div style={{ display: "flex", flexWrap: "wrap", backgroundColor: "#333333", fontSize: "0" }}>
      {imageFiles.map(category => (
        <div
          key={category.id}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "50%",
          }}
        >
          <SoundButton 
            category={category}
            playing={playing}
            setPlaying={setPlaying}
            audio={audio}
            setAudio={setAudio}
            categoryPlaying={categoryPlaying}
            setCategoryPlaying={setCategoryPlaying}
          />
        </div>
      ))}
    </div>
  );
};

export default Board;
