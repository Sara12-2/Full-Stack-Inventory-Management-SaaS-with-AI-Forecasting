export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-20 sm:px-6">
      <h1 className="text-4xl font-bold text-text-primary dark:text-text-primary-dark">About StockFlow</h1>
      <p className="mt-6 text-text-secondary dark:text-text-secondary-dark">
        StockFlow was built by DevHatch Labs to solve a problem small e-commerce
        businesses face every day: managing inventory on spreadsheets that don't
        scale, don't warn you before you run out of stock, and don't give you a
        single view of how the business is actually doing.
      </p>
      <p className="mt-4 text-text-secondary dark:text-text-secondary-dark">
        We're building StockFlow as a focused, honest alternative to expensive
        ERP software — self-hostable, fast, and built around the workflows a
        small team actually has time for.
      </p>
    </div>
  );
}
