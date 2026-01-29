import { ContactForm } from "@/components/custom/single-property/ContactForm";

interface PropertyContactProps {
  propertyTitle: string;
}

export default function PropertyContact({
  propertyTitle,
}: PropertyContactProps) {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="title-section">Gostou do Imóvel?</h2>
            <p className="subtitle-section">Fale com nossos especialistas</p>
          </div>

          <div className="white-card p-8 md:p-12">
            <ContactForm propertyTitle={propertyTitle} />
          </div>
        </div>
      </div>
    </section>
  );
}
