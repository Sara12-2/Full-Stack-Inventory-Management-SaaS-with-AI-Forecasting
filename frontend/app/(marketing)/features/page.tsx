import FeatureGrid from "@/components/marketing/FeatureGrid";

export default function FeaturesPage() {
  return (
    <div className="pt-12">
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
        <h1 className="text-4xl font-bold text-text-primary dark:text-text-primary-dark">Features</h1>
        <p className="mt-3 text-text-secondary dark:text-text-secondary-dark">
          Everything StockFlow does, built around how small e-commerce teams actually operate day to day.
        </p>
      </div>
      <FeatureGrid />
    </div>
  );
}
