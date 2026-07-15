import PricingTable from "@/components/marketing/PricingTable";

export default function PricingPage() {
  return (
    <div className="pt-12">
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
        <h1 className="font-heading text-4xl font-bold text-text-primary dark:text-text-primary-dark">Pricing</h1>
        <p className="mt-3 text-text-secondary dark:text-text-secondary-dark">Start free. Upgrade only when you actually need to.</p>
      </div>
      <PricingTable />
    </div>
  );
}
