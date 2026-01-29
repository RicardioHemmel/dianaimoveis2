interface VideoProps {
  src: string;
}

export function Video({ src }: VideoProps) {
  return (
    <iframe
      className="w-full aspect-video"
      src={`https://www.youtube.com/embed/${src}`}
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      title="YouTube video player"
    ></iframe>
  );
}
