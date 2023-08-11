const Avatar = () => {
  return (
    <div className="w-1/2 flex justify-center items-center flex-col">
      <video
        id="talk-video"
        autoPlay
        loop
        width={400}
        height={400}
        className="rounded-md"
      ></video>
    </div>
  );
};

export default Avatar;
