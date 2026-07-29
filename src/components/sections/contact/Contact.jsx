import SectionHeading from "../../common/SectionHeading";
import ContactInfo from "./ContactInfo";
import ContactForm from "./ContactForm";

const Contact = () => {
  return (
    <section
      id="contact"
      className="py-24 lg:py-32"
    >
      <div className="mx-auto max-w-7xl px-6">

        <SectionHeading
          title="Let's Connect"
          subtitle="GET IN TOUCH"
        />

        <div className="mt-16 grid gap-12 lg:grid-cols-2">

          <ContactInfo />

          <ContactForm />

        </div>

      </div>
    </section>
  );
};

export default Contact;