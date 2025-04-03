import PriceConverter from '../../components/PriceConverter';  

// Example Usage
const Page = () => {
  return (
    <div className="p-6">
      <h1 className="text-xl font-bold">Product Name</h1>
      <PriceConverter priceInUSD={100} />
    </div>
  );
};

export default Page;
