import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import { motion } from "framer-motion";

const ChatResponse = ({ message, videoLink }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!message && !videoLink) return null;

  // Convert YouTube URL into an Embed URL
  const getYouTubeEmbedUrl = (url) => {
    if (!url) return null;
    const regExp =
      /(?:youtube\.com\/(?:.*v=|.*\/|.*embed\/)|youtu.be\/)([^"&?\/\s]+)/;
    const match = url.match(regExp);
    const videoId = match ? match[1] : null;
    return videoId
      ? `https://www.youtube.com/embed/${videoId}?autoplay=1`
      : null;
  };

  const youtubeEmbedUrl = getYouTubeEmbedUrl(videoLink);
  const isYouTubeVideo = !!youtubeEmbedUrl;
  const isDirectVideo = videoLink?.match(/\.(mp4|webm|ogg)$/);
  console.log("------------------------------------");
  //In console its printing like this
  console.log(message);
  console.log("------------------------------------");
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="p-4 bg-gray-100 border border-gray-300 rounded-md shadow-md mt-2"
      >
        {/* Display Message */}
        {message && (
          <>
            {(() => {
              try {
                const parsedMessage = JSON.parse(message); // ✅ Ensure parsing works

                return (
                  <div>
                    {/* ✅ Properly render the answer */}
                    <ReactMarkdown className="text-gray-800 leading-relaxed">
                      {parsedMessage.answer}
                    </ReactMarkdown>

                    {/* ✅ Render video if available */}
                    {parsedMessage.videoLink && (
                      <div className="mt-3">
                        <iframe
                          width="100%"
                          height="250"
                          src={parsedMessage.videoLink.replace(
                            "watch?v=",
                            "embed/"
                          )}
                          title="Video Response"
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        ></iframe>
                      </div>
                    )}

                    {/* ✅ Render Follow-up question if available */}
                    {parsedMessage.followUp && (
                      <p className="text-sm text-gray-500 mt-2">
                        {parsedMessage.followUp}
                      </p>
                    )}
                  </div>
                );
              } catch (e) {
                return (
                  <ReactMarkdown className="text-gray-800 leading-relaxed">
                    {message}
                  </ReactMarkdown>
                );
              }
            })()}
          </>
        )}

        {/* Video Thumbnail (Click to Open Modal) */}
        {videoLink && (
          <div
            className="video-thumbnail mt-3"
            onClick={(e) => {
              e.preventDefault();
              setIsModalOpen(true);
            }}
            style={{ cursor: "pointer", position: "relative" }}
          >
            {isYouTubeVideo ? (
              <img
                src={`https://img.youtube.com/vi/${
                  youtubeEmbedUrl.split("/embed/")[1].split("?")[0]
                }/hqdefault.jpg`}
                alt="Video Thumbnail"
                width="100%"
                height="200"
                className="rounded-md shadow-md"
              />
            ) : (
              <video width="100%" height="200" className="rounded-md shadow-md">
                <source src={videoLink} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            )}
            <div className="play-button-overlay">▶</div>
          </div>
        )}
      </motion.div>

      {/* Video Modal Popup */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            {/* Close Button */}
            <span
              className="close-button"
              onClick={() => setIsModalOpen(false)}
            >
              ✖
            </span>

            {/* YouTube Video Embed */}
            {isYouTubeVideo ? (
              <iframe
                width="100%"
                height="400"
                src={youtubeEmbedUrl}
                title="Video Response"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            ) : (
              /* Direct Video Embed */
              <video width="100%" height="400" controls autoPlay>
                <source src={videoLink} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            )}
          </div>
        </div>
      )}

      {/* Styling */}
      <style jsx>{`
        .video-thumbnail {
          position: relative;
          display: inline-block;
        }

        .play-button-overlay {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background: rgba(0, 0, 0, 0.6);
          color: white;
          font-size: 40px;
          padding: 10px 20px;
          border-radius: 50%;
          cursor: pointer;
        }

        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.7);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
        }

        .modal-content {
          position: relative;
          background: white;
          padding: 20px;
          border-radius: 10px;
          max-width: 600px;
          width: 90%;
          box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
        }

        .close-button {
          position: absolute;
          top: 10px;
          right: 15px;
          font-size: 24px;
          cursor: pointer;
          color: #333;
          background: white;
          border: 2px solid #999;
          border-radius: 50%;
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease-in-out;
        }

        .close-button:hover {
          color: white;
          background: red;
          border: 2px solid red;
        }
      `}</style>
    </>
  );
};

export default ChatResponse;
