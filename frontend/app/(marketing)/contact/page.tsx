import ContactForm from "@/components/marketing/ContactForm";

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-20 sm:px-6">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-text-primary dark:text-text-primary-dark">Get in touch</h1>
        <p className="mt-3 text-text-secondary dark:text-text-secondary-dark">Questions, feedback, or want a demo? Send us a message.</p>
      </div>
      <div className="mt-12">
        <ContactForm />
      </div>
    </div>
  );
}
