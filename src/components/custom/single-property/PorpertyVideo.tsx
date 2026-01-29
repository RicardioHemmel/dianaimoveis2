import { Video } from "@/components/custom/Video";

interface PropertyVideoProps {
  videoUrl: string;
}

export default function PropertyVideo({ videoUrl }: PropertyVideoProps) {
  return (
    <section className="pt-20 pb-8 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="title-section">Vídeo do Projeto</h2>
          <p className="subtitle-section">
            Explore cada detalhe do empreendimento
          </p>
        </div>
        <div className="flex justify-center">
          <div className="w-full md:w-[80%]">
            <Video src={videoUrl} />
          </div>
        </div>
      </div>
    </section>
  );
}
