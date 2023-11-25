const express = require("express");
const ytdl = require("ytdl-core");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(
  cors({
    origin: "*",
  })
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  return res.status(200).json({
    success: true,
    message: "SERVER IS RUNNING",
  });
});

app.get("/yt/:id", async (req, res) => {
  try {
    const videoId = req.params.id;

    const info = await ytdl.getInfo(videoId);
    const formats = ytdl.filterFormats(info.formats, "audioonly");
    const audios = formats.map(
      ({ url, bitrate, audioBitrate, mimeType, audioQuality }) => {
        return { url, bitrate, audioBitrate, mimeType, audioQuality };
      }
    );

    return res.status(200).json({
      success: true,
      message: "Success",
      data: audios,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Error",
    });
  }
});

app.listen(3000, () => {
  console.log("SERVER RUNNING AT PORT 3000");
});
