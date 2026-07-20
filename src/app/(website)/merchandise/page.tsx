import MerchandiseProduct from "@/components/merchandise/MerchandiseProduct";
import Hero1 from "@/components/shared/Hero1";

const page = () => {
  return (
    <div className="bg-[#fcf8efb0]">
      <Hero1
        image="/hero.jpg"
        title="MERCHANDISE"
        subtitle="Wear the"
        description="Apparel, accessories, and keepsakes inspired by the thirteen symbols. Designed in Canada, made to last."
        text="Symbols."
      />
      <div>
      <MerchandiseProduct />
      </div>
    </div>
  );
};

export default page;
